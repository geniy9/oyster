<script setup>
import { useSmoother } from '~/composables/useSmoother';

const { gsap, SplitText } = useGsap()
const smoother = useSmoother()
const { shifterBg } = useConfig();

let ctx = null
const splitTitle = ref(null)
const waveText = ref(null)

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

const aboutFrame1 = ref(null);


onBeforeUpdate(() => {
  zoomingImgs.value = []
})

function initGsap() {
  ctx = gsap.context(() => {
    const titles = gsap.utils.toArray("#text_separate h1");
    gsap.set(titles, { overflow: 'hidden' });
    splitTitle.value = new SplitText(titles, { type: "lines", linesClass: "line-child" });

    // всплытие заголовка
    gsap.from(splitTitle.value.lines, {
      duration: 1,
      yPercent: 100,
      opacity: 1,
      ease: "power3.out",
      stagger: 0.2,
    });
    gsap.set("#text_separate", { yPercent: 0, opacity: 1, stagger: 0.5, zIndex: 0 })

    waveText.value = new SplitText("#split_stagger", { type: "words,chars" });
    if(smoother.value) {
      smoother.value.effects(waveText.value.chars, {
        speed: 1,
        lag: (i) => (i + 1) * 0.1,
      });
    }

    // линия и шторки
    const curtainTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#curtain_container",
        start: "top top", 
        end: "+=200%",
        scrub: 1,
        pin: true,
      }
    });
    curtainTL.to([leftCurtain.value, rightCurtain.value], {
      height: "100vh", duration: 1, ease: "none", zIndex: 10
    });
    curtainTL.to([leftCurtain.value, rightCurtain.value], {
      width: "50vw", duration: 1, ease: "none"
    });

    // зуминг изображений
    const scalingTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#zooming_section",
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
      }
    });
    gsap.set(zoomingImgs.value, { scale: 0 });
    gsap.set(cuttingContainer.value, { scale: 0 });

    curtainTL.to([leftCurtain.value, rightCurtain.value], { opacity: 0, duration: 0.1 });

    gsap.set(aboutFrame1.value, { yPercent: 100, opacity: 0, zIndex: 4 });

    const scalingDuration = 1;
    zoomingImgs.value.forEach((img, index) => {
      scalingTL.to(img, {
        scale: 1,
        duration: scalingDuration,
        ease: 'none',
        delay: 0.5,
        onComplete: () => shifterBg.value = 'none',
        onReverseComplete: () => shifterBg.value = '/img/bg-1.jpg',
      },
      index * (scalingDuration / 4)
      );
    });

    // контейнер с текстом
    scalingTL.to(cuttingContainer.value, {
      scale: 1,
      duration: scalingDuration,
      ease: 'ease',
      delay: 0.5
    }, 1.25);

    scalingTL.to([leftPanel.value, rightPanel.value], {
      x: (i) => i === 0 ? '-50vw' : '50vw',
      duration: 1.5,
      ease: 'none',
    });

    scalingTL.to(aboutFrame1.value, { opacity: 1, duration: 0.1, ease: 'none'}, "<");
    scalingTL.to(aboutFrame1.value, { yPercent: 0, duration: 2, ease: 'none' }, "<");
    
    scalingTL.to(zoomingImgs.value, { opacity: 0, duration: 0.1 }, '<', '-=0.2'); 
    scalingTL.to(cuttingContainer.value, { backgroundColor: 'transparent', duration: 0 }, '<', '-=0.2');

    // about
    // const aboutTL = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: "#about_section",
    //     start: "top top",
    //     end: "+=100%",
    //     scrub: 1,
    //     // pin: true,
    //   }
    // });

    
    
  })
}

function cleanGsap() {
  if (ctx) ctx.revert()
  if (splitTitle.value) splitTitle.value.revert()
  if (waveText.value) waveText.value.revert()
  ctx = null
  splitTitle.value = null
  zoomingImgs.value = []
  cuttingContainer.value = null
  leftCurtain.value = null
  rightCurtain.value = null
  leftPanel.value = null
  rightPanel.value = null
  aboutFrame1.value = null
  
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
  <div class="w-full relative">

    <div class="relative flex flex-col justify-center items-center h-screen">
      <div id="text_separate" class="fixed opacity-0 lg:min-w-lg xl:min-w-2xl text-bold z-10" aria-hidden="true">
        <h1 class="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase h-20 xs:h-24 sm:h-28 lg:h-36 xl:h-48">
          <span class="block">
            {{ $t('title.internet') }}
          </span>
          <span class="block ml-4 xs:ml-10 sm:ml-16">
            {{ $t('title.marketing') }}
          </span>
        </h1>
        <div class="text-xs xs:text-base sm:text-lg font-bold uppercase relative z-10">
          <p id="split_stagger">{{ $t('title.for_your_business') }}</p>
        </div>
      </div>
      <div id="curtain_container" class="absolute w-screen h-screen overflow-hidden">
        <div ref="leftCurtain" class="fixed top-1/2 left-1/2 h-0 w-2 -mr-0.5 -translate-y-1/2 -translate-x-full bg-primary">
        </div>
        <div ref="rightCurtain" class="fixed top-1/2 left-1/2 h-0 w-2 -ml-0.5 -translate-y-1/2 bg-primary">
        </div>
      </div>
    </div>

    <section id="zooming_section" class="">
      <div class="relative w-screen h-screen overflow-hidden">
        <img v-for="(image, index) in zoomingImages"
          :key="image"
          :ref="el => { if (el) zoomingImgs[index] = el }"
          :src="image"
          class="zooming_img"
          :style="{ zIndex: index + 1 }" 
        />

        <div ref="aboutFrame1" class="absolute top-0 left-0 w-full h-full bg-white py-8">
          <div class="section">
            <h2 class="main_title z-0">
              {{ $t('title.about_1.name') }}
            </h2>
            <p class="text-lg ml-10 md:ml-20">
              {{ $t('title.about_1.description') }}
            </p>
            <div class="bg-[url(/img/bg_about_1.jpg)] bg-no-repeat bg-contain pb-[56.25%]"></div>
          </div>
        </div>

        <div ref="cuttingContainer" class="absolute top-0 left-0 w-screen h-screen flex overflow-hidden z-[5]">
          <div ref="leftPanel" class="cutting_gate z-[5]">
            <h2 class="left-full -translate-x-1/2" v-html="$t('title.advertising_agency')"></h2>
          </div>
          <div ref="rightPanel" class="cutting_gate z-[5]">
            <h2 class="right-full translate-x-1/2" v-html="$t('title.advertising_agency')"></h2>
          </div>
        </div>
      </div>
    </section>

    <section id="about_section" class="relative w-full bg-white z-0">
      <div ref="aboutFrame2" class="bg-[url(/img/bg_about_2.jpg)] bg-no-repeat">
        <div>8</div>
        <h2 class="main_title">
          8 {{ $t('text.year', 2) }}
        </h2>
        <h3 class="text-lg">
          {{ $t('title.about_2.name') }}
        </h3>
        <div class="">
          <p class="text-lg">
            {{ $t('title.about_2.description') }}
          </p>
        </div>
      </div>
      <div ref="aboutFrame3" class="bg-[url(/img/bg_about_3.jpg)] bg-no-repeat">
        <div>200</div>
        <h2 class="main_title">
          200+
        </h2>
        <h3 class="text-lg">
          {{ $t('title.about_3.name') }}
        </h3>
        <div class="">
          <p class="text-lg">
            {{ $t('title.about_3.description') }}
          </p>
        </div>
      </div>
      <div ref="aboutFrame3" class="bg-[url(/img/bg_about_4.jpg)] bg-no-repeat">
        <div>97</div>
        <h2 class="main_title text-primary">
          97.1%
        </h2>
        <h3 class="text-lg">
          {{ $t('title.about_4.name') }}
        </h3>
        <div class="">
          <p class="text-lg">
            {{ $t('title.about_4.description') }}
          </p>
        </div>
      </div>
    </section>

  </div>
</template>