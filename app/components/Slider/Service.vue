<script setup>
const { gsap } = useGsap()
const props = defineProps({
  qty: {
    type: Number,
    default: 4
  },
})

const slides = computed(() => {
  const items = [];
  for (let i = 1; i <= props.qty; i++) {
    items.push({
      index: i,
      img: `/img/service/${i}.jpg`, 
      title1: `title.service_${i}.name1`,
      title2: `title.service_${i}.name2`,
      desc: `title.service_${i}.desc`
    });
  }
  return items.slice(0, props.qty);
});

const activeIndex = ref(0);
const displayIndex = ref(1); 
const isAnimating = ref(false);

const slideRefs = ref([]);       // Контейнеры слайдов
const imageRefs = ref([]);       // Картинки
const titleRefs = ref([]);       // Заголовки
const descriptionRefs = ref([]); // Описания

onBeforeUpdate(() => {
  slideRefs.value = [];
  imageRefs.value = [];
  titleRefs.value = [];
  descriptionRefs.value = [];
});

onMounted(() => {
  gsap.set(slideRefs.value, { autoAlpha: 0, zIndex: 0 });
  gsap.set(slideRefs.value[0], { autoAlpha: 1, zIndex: 2 });
});

function changeSlide(direction) {
  if (isAnimating.value) return;
  
  const total = slides.value.length;
  const currentIdx = activeIndex.value;
  let nextIdx;

  if (direction === 'next') {
    nextIdx = (currentIdx + 1) % total;
  } else {
    nextIdx = (currentIdx - 1 + total) % total;
  }

  isAnimating.value = true;
  displayIndex.value = nextIdx + 1;

  const currentSlide = slideRefs.value[currentIdx];
  const nextSlide = slideRefs.value[nextIdx];

  const currentImg = imageRefs.value[currentIdx];
  const nextImg = imageRefs.value[nextIdx];

  const currentTitle = titleRefs.value[currentIdx];
  const nextTitle = titleRefs.value[nextIdx];

  const currentDesc = descriptionRefs.value[currentIdx];
  const nextDesc = descriptionRefs.value[nextIdx];

  const tl = gsap.timeline({
    onComplete: () => {
      activeIndex.value = nextIdx;
      isAnimating.value = false;
      gsap.set(currentSlide, { zIndex: 0 });
    }
  });

  gsap.set(nextSlide, { zIndex: 2, autoAlpha: 1 }); 
  gsap.set(currentSlide, { zIndex: 1 });

  gsap.set(nextImg, { scale: 1.2 });
  gsap.set([nextTitle, nextDesc], { yPercent: 100 });

  tl.to([currentTitle, currentDesc], {
    yPercent: -100,
    duration: 0.6,
    ease: 'power2.in',
    stagger: 0.05
  }, 0);

  tl.to(currentImg, {
    scale: 1, // 1 или 0.8 для эффекта отдаления
    opacity: 0,
    duration: 0.6,
    ease: 'power2.in'
  }, 0);

  tl.to(nextImg, {
    scale: 1, // Zoom к нормальному размеру
    opacity: 1, // плавное появление
    duration: 0.8,
    ease: 'power2.out'
  }, 0.2); // Чуть раньше текста

  tl.to([nextTitle, nextDesc], {
    yPercent: 0, // всплытие снизу
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.05
  }, 0.3);
}

function onClickPrev() { changeSlide('prev') }
function onClickNext() { changeSlide('next') }
</script>
<template>
  <div class="relative w-full min-h-[500px] flex flex-col">
    
    <div class="relative grid grid-cols-1 w-full grow">
      <div v-for="(item, index) in slides" 
        :key="item.index"
        :ref="el => { if(el) slideRefs[index] = el }"
        class="col-start-1 row-start-1 w-full h-full flex items-center"
        style="visibility: hidden;">

        <div class="flex flex-col-reverse md:flex-row justify-center items-center md:items-stretch w-full gap-6 md:gap-12">
          
          <!-- TEXT -->
          <div class="w-full md:w-1/2 flex flex-col justify-center items-start relative z-10 px-4 md:px-0 md:pl-8 pb-2 md:pb-0">
            <div class="flex flex-col gap-4 max-w-80 self-end">
              <div class="overflow-hidden">
                <h3 :ref="el => { if(el) titleRefs[index] = el }" class="uppercase font-bold text-2xl md:text-4xl">
                  <span v-html="$t(item.title1)"></span><br />
                  <span v-html="$t(item.title2)" class="text-primary"></span>
                </h3>
              </div>
              <div class="overflow-hidden">
                <p :ref="el => { if(el) descriptionRefs[index] = el }" 
                  v-html="$t(item.desc)"
                  class="text-sm md:text-base uppercase">
                </p>
              </div>
            </div>
            <div class="hidden md:block h-32 w-full"></div>
          </div>

          <!-- IMG -->
          <div class="w-full md:w-1/2 flex justify-center md:justify-start">
            <div class="w-72 h-128 overflow-hidden rounded-xl relative shrink-0">
              <img :ref="el => { if(el) imageRefs[index] = el }"
                :src="item.img" 
                :alt="$t(item.title1)" 
                class="w-full h-full object-cover origin-center absolute inset-0" />
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- NAV (COUNTER + BUTTONS) -->
    <div class="flex flex-col items-center md:items-start gap-4 mt-6 md:mt-0 md:absolute md:bottom-10 md:left-8 z-30">
      
      <!-- COUNTER -->
      <div class="w-full text-center text-xl md:text-2xl font-light tabular-nums">
        <span>{{ displayIndex }}</span>
        <span class="text-black/50 mx-2">/</span>
        <span class="text-black/50">{{ qty }}</span>
      </div>

      <!-- BUTTONS -->
      <div class="flex items-center gap-2">
        <a href="t.me/oystercomputer" target="_blank" class="group flex items-center justify-center p-2 w-44 h-10 rounded-full border border-black cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 uppercase text-xs font-bold">
          {{ $t('text.lets_discuss') }}
        </a>
        <div @click="onClickPrev" class="group flex items-center justify-center p-2 w-10 h-10 rounded-full border border-black cursor-pointer hover:bg-black hover:text-white transition-colors duration-300">
          <UIcon name="mynaui:arrow-long-left" class="h-6 w-6 duration-300" />
        </div>
        <div @click="onClickNext" class="group flex items-center justify-center p-2 w-10 h-10 rounded-full border border-black cursor-pointer hover:bg-black hover:text-white transition-colors duration-300">
          <UIcon name="mynaui:arrow-long-right" class="h-6 w-6" />
        </div>
      </div>
    </div>

  </div>
</template>