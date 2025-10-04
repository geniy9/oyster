<script setup>
const { gsap } = useGsap()
const props = defineProps({
  service: {
    type: String,
    default: ''
  },
  qty: {
    type: Number,
    default: 0
  },
})

const imageRefs = ref([]);
const titleRefs = ref([]);
const descriptionRefs = ref([]);

onBeforeUpdate(() => {
  imageRefs.value = [];
  titleRefs.value = [];
  descriptionRefs.value = [];
});

// const items = [...Array(props.qty).keys()].map(i => `/img/service/${props.service}_${i + 1}.jpg`);
const items = [...Array(props.qty).keys()].map(i => `/img/service/${props.service}_1.jpg`);

const carousel = ref(null);
let emblaApi = null;

function animateSlides(previousIndex, currentIndex) {
  const prevImg = imageRefs.value[previousIndex];
  const currentImg = imageRefs.value[currentIndex];
  
  const prevTitle = titleRefs.value[previousIndex];
  const currentTitle = titleRefs.value[currentIndex];

  const prevDesc = descriptionRefs.value[previousIndex];
  const currentDesc = descriptionRefs.value[currentIndex];
  
  if (!prevImg || !currentImg || !prevTitle || !currentTitle || !prevDesc || !currentDesc) {
    return;
  }

  const tl = gsap.timeline();
  tl.to(prevImg, { scale: 1.2, duration: 0.6, ease: 'power2.inOut' }, 0);
  tl.to([prevTitle, prevDesc], {
    yPercent: -100,
    autoAlpha: 0,
    duration: 0.4,
    ease: 'power2.in',
    stagger: 0.07
  }, 0);

  gsap.set([currentTitle, currentDesc], { yPercent: 100, autoAlpha: 0 });

  tl.to(currentImg, { scale: 1, duration: 0.6, ease: 'power2.inOut' }, 0);
  tl.to([currentTitle, currentDesc], {
    yPercent: 0,
    autoAlpha: 1,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.05
  }, 0.3);
}

onMounted(() => {
  setTimeout(() => {
    emblaApi = carousel.value?.emblaApi;
    if (emblaApi) {
      gsap.set(imageRefs.value.slice(1), { scale: 1.2 });
      gsap.set(titleRefs.value.slice(1), { yPercent: 100, autoAlpha: 0 });
      gsap.set(descriptionRefs.value.slice(1), { yPercent: 100, autoAlpha: 0 });

      emblaApi.on('select', () => {
        const previous = emblaApi.previousScrollSnap();
        const current = emblaApi.selectedScrollSnap();
        if (previous !== current) {
          animateSlides(previous, current);
        }
      });
    }
  }, 100); 
});

onUnmounted(() => {
  if (emblaApi) {
    emblaApi.off('select');
  }
});

function onClickPrev() { carousel.value?.emblaApi?.scrollPrev() }
function onClickNext() { carousel.value?.emblaApi?.scrollNext() }
</script>
<template>
  <div class="flex flex-col sm:flex-row sm:items-end gap-2">
    <UCarousel ref="carousel" :items="items" v-slot="{ item, index }" loop class="w-60">
      <div class="mb-4 overflow-hidden rounded-xl">
        <img :ref="el => { if(el) imageRefs[index] = el }"
          :src="item" 
          :alt="$t(`title.${service}_${index + 1}.name`)" 
          class="w-60 h-90 object-cover origin-center" />
      </div>
      <div class="flex flex-col h-32">
        <div class="overflow-hidden">
          <h3 :ref="el => { if(el) titleRefs[index] = el }" class="uppercase font-bold text-lg leading-5">
            {{ $t(`title.${service}_${index + 1}.name`) }}
          </h3>
        </div>
        <div class="overflow-hidden">
          <p :ref="el => { if(el) descriptionRefs[index] = el }" class="text-sm">
            {{ $t(`title.${service}_${index + 1}.desc`) }}
          </p>
        </div>
      </div>
    </UCarousel>

    <div class="flex flex-col justify-start gap-2 mb-36">
      <div @click="onClickPrev" class="group flex items-center justify-center gap-2 p-1 w-32 rounded-full border border-black cursor-pointer">
        <UIcon name="mynaui:arrow-long-left" 
          class="h-6 w-6 group-hover:-translate-x-2 duration-300 transition-all" />
        <span class="font-bold text-sm leading-3">
          {{ $t('text.back') }}
        </span>
      </div>
      <div @click="onClickNext" class="group flex items-center justify-center gap-2 p-1 w-32 rounded-full border border-black cursor-pointer">
        <span class="font-bold text-sm leading-3">
          {{ $t('text.forward') }}
        </span>
        <UIcon name="mynaui:arrow-long-right" 
          class="h-6 w-6 group-hover:translate-x-2 duration-300 transition-all" />
      </div>
    </div>
  </div>
</template>