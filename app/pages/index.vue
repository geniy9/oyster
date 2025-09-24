<script setup>
import { useSmoother } from '~/composables/useSmoother';

const { gsap, SplitText } = useGsap()
const smoother = useSmoother()

let ctx = null
const splitTitle = ref(null)
const leftCurtain = ref(null) 
const rightCurtain = ref(null)
const zoomingImgs = ref([])
const zoomingImages = [
  '/img/blue_face.jpg',
  '/img/hologram_abstract.jpg',
  '/img/render_3d.jpg',
  '/img/identity_tech.jpg',
]
const cuttingContainer = ref(null);
const leftPanel = ref(null);
const rightPanel = ref(null);

onBeforeUpdate(() => {
  zoomingImgs.value = []
})

function initGsap() {
  ctx = gsap.context(() => {
    const titles = gsap.utils.toArray("#text_separate h1");
    gsap.set(titles, { overflow: 'hidden' });
    splitTitle.value = new SplitText(titles, {
      type: "lines",
      linesClass: "line-child"
    });

    // всплытие заголовка
    gsap.from(splitTitle.value.lines, {
      duration: 0.8,
      yPercent: 100,
      opacity: 1,
      ease: "power3.out",
      stagger: 0.2,
    });
    // + расслоение
    gsap.set("#text_separate", { yPercent: 5, opacity: 1, stagger: 0.5, })

    // линия и шторки
    const curtainTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#curtain_container",
        endTrigger: '#zooming_section',
        start: "top top", 
        end: "+=180%",
        scrub: 1,
        pin: true,
      }
    });
    curtainTL.to([leftCurtain.value, rightCurtain.value], {
      height: "100vh", duration: 1, ease: "none",
    });
    curtainTL.to([leftCurtain.value, rightCurtain.value], {
      width: "50vw", duration: 1, ease: "none",
    });

    // зуминг изображений
    const imgScalingTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#zooming_section",
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      }
    });
    gsap.set(zoomingImgs.value, { scale: 0 });
    gsap.set(cuttingContainer.value, { scale: 0 });

    const imageAnimDuration = 2;
    const splitDuration = 2;

    zoomingImgs.value.forEach((img, index) => {
      imgScalingTL.to(img, {
        scale: 1,
        duration: imageAnimDuration,
        ease: 'none',
        delay: 0.5
      },
      index * (imageAnimDuration / 2)
      );
    });
    const startTimeForSplitBlock = 4 * (imageAnimDuration / 2);

    // Масштабируем контейнер с текстом
    imgScalingTL.to(cuttingContainer.value, {
      scale: 1,
      duration: imageAnimDuration,
      ease: 'ease',
      delay: 0.5
    }, startTimeForSplitBlock);
    
    imgScalingTL.to(leftPanel.value, {
      x: '-50vw',
      duration: splitDuration,
      ease: 'none',
    });
    imgScalingTL.to(rightPanel.value, {
      x: '50vw',
      duration: splitDuration,
      ease: 'none',
    }, '<');
    
  })
}

function cleanGsap() {
  if (ctx) ctx.revert()
  if (splitTitle.value) splitTitle.value.revert()
  ctx = null
  splitTitle.value = null
  zoomingImgs.value = []
  cuttingContainer.value = null
  leftCurtain.value = null
  rightCurtain.value = null
  leftPanel.value = null
  rightPanel.value = null
}

watch(() => smoother.value, (newSmooth, oldSmooth) => {
  if (newSmooth) {
    initGsap();
  } else if (oldSmooth) {
    cleanGsap();
  }
}, { immediate: true });

onUnmounted(() => { cleanGsap() })
</script>
<template>
  <div class="w-full">

    <div class="relative flex flex-col justify-center items-center h-screen">
      <div id="text_separate" class="opacity-0 lg:min-w-lg xl:min-w-2xl text-bold relative z-10" aria-hidden="true">
        <h1 class="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase h-20 xs:h-24 sm:h-28 lg:h-36 xl:h-48">
          <span class="block">
            {{ $t('title.internet') }}
          </span>
          <span class="block ml-4 xs:ml-10 sm:ml-16">
            {{ $t('title.marketing') }}
          </span>
        </h1>
        <div class="text-xs xs:text-base sm:text-lg font-bold uppercase relative z-10">
          <p>{{ $t('title.for_your_business') }}</p>
        </div>
      </div>
      <div id="curtain_container" class="absolute w-screen h-screen overflow-hidden">
        <div ref="leftCurtain" class="fixed top-1/2 left-1/2 h-0 w-2 -mr-0.5 -translate-y-1/2 -translate-x-full bg-primary">
        </div>
        <div ref="rightCurtain" class="fixed top-1/2 left-1/2 h-0 w-2 -ml-0.5 -translate-y-1/2 bg-primary">
        </div>
      </div>
    </div>

    <section id="zooming_section">
      <div class="relative w-screen h-screen overflow-hidden">
        <img
          v-for="(image, index) in zoomingImages"
          :key="image"
          :ref="el => { if (el) zoomingImgs[index] = el }"
          :src="image"
          class="zooming_img"
          :style="{ zIndex: index + 1 }" 
        />
        <div ref="cuttingContainer" class="absolute top-0 left-0 w-screen h-screen flex overflow-hidden z-[5]">
          <div ref="leftPanel" class="cutting_gate">
            <h2 class="left-full -translate-x-1/2" v-html="$t('title.advertising_agency')"></h2>
          </div>
          <div ref="rightPanel" class="cutting_gate">
            <h2 class="right-full translate-x-1/2" v-html="$t('title.advertising_agency')"></h2>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full h-screen bg-white bg-[url(/img/tooth_paste.jpg)] bg-no-repeat bg-[bottom_center]">
      <div class="section">
        <h2>О нас</h2>
        <p>Мы — маркетинговое агентство полного цикла. Наша команда соединяет стратегию, креатив и аналитику, чтобы ваш бизнес развивался быстрее конкурентов. Мы понимаем рынок и говорим на языке цифр, а не обещаний.</p>
      </div>
    </section>

  </div>
</template>