<script setup>
import { useSmoother } from '~/composables/useSmoother';

const { t } = useI18n()
const { gsap, SplitText } = useGsap()
const smoother = useSmoother()
const { shifterBg, bgVisible } = useConfig();

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

const aboutNitro = ref(null);

const aboutContainer = ref(null);
const aboutFrames = ref([]);
const aboutTextContainers = ref([]);
let aboutSplits = [];
// const aboutFrame1 = ref(null);
// const aboutFrame2 = ref(null);
// const aboutFrame3 = ref(null);

const aboutItems = [{ 
  digit: 8,
  progress: 8 + ' ' + t('text.year', 2),
  name: t('title.about_1.name'),
  description: t('title.about_1.description')
},{ 
  digit: 200,
  progress: '200+',
  name: t('title.about_2.name'),
  description: t('title.about_2.description')
},{ 
  digit: 97,
  progress: '97.1%',
  name: t('title.about_3.name'),
  description: t('title.about_3.description')
}]

onBeforeUpdate(() => {
  zoomingImgs.value = []
  aboutFrames.value = []
  aboutTextContainers.value = []
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

    gsap.set(aboutNitro.value, { yPercent: 100, opacity: 0, zIndex: 4 });

    zoomingImgs.value.forEach((img, index) => {
      scalingTL.to(img, {
        scale: 1,
        duration: 1,
        ease: 'none',
        delay: 0.5,
        onComplete: () => bgVisible.value = false,
        onReverseComplete: () => bgVisible.value = true,
      },
      index * (1 / 4)
      );
    });

    // контейнер с текстом
    scalingTL.to(cuttingContainer.value, {
      scale: 1,
      duration: 1,
      ease: 'ease',
      delay: 0.5
    }, 1.25);

    // открываем шторки, разрезая текст
    scalingTL.to([leftPanel.value, rightPanel.value], {
      x: (i) => i === 0 ? '-50vw' : '50vw',
      duration: 1.5,
      ease: 'none',
    });
    scalingTL.to(zoomingImgs.value, { opacity: 0, duration: 0.1 }, '<', '-=0.2');
    scalingTL.fromTo(aboutNitro.value, 
      { opacity: 1, duration: 0.1, ease: 'none'},
      { yPercent: 0, duration: 2, ease: 'none' }, "<");
    

    // about
    aboutTextContainers.value.forEach(container => {
      const numberTargets = container.querySelectorAll('[data-split-number]');
      const textTargets = container.querySelectorAll('[data-split-text]');
      
      const numberSplit = new SplitText(numberTargets, { 
        type: "lines", 
        linesClass: "split-line",
      });
      const textSplit = new SplitText(textTargets, { 
        type: "words", 
        wordsClass: "split-word", 
      });
      aboutSplits.push({ numbers: numberSplit, text: textSplit });
    });

    aboutSplits.forEach((split, index) => {
      if (index > 0) {
        gsap.set(split.numbers.lines, { yPercent: 100, autoAlpha: 1 });
        gsap.set(split.text.words, { yPercent: 100, autoAlpha: 0 });
      }
    });
    gsap.set(aboutFrames.value.slice(1), { autoAlpha: 0, scale: 1.05 });
    gsap.set(aboutFrames.value[0], { autoAlpha: 1, scale: 1 });

    const aboutTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#about_section",
        start: "top top",
        end: `+=${aboutItems.length * 100}%`,
        scrub: 1,
        pin: true,
      }
    });

    aboutItems.forEach((_, i) => {
      if (i < aboutItems.length - 1) {
        aboutTL.to(aboutSplits[i].numbers.lines, {
          yPercent: -100,
          duration: 1.5,
          ease: "power2.in",
        }, `+=${i === 0 ? 0 : 0.5}`);

        aboutTL.to(aboutSplits[i].text.words, {
          yPercent: -100,
          autoAlpha: 0,
          stagger: 0.03,
          duration: 1.5,
        }, `<`);

        aboutTL.to(aboutFrames.value[i], {
          scale: 1.05,
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.in"
        }, "<");

        aboutTL.to(aboutFrames.value[i + 1], {
          scale: 1,
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.in"
        }, "<");

        aboutTL.to(aboutSplits[i + 1].numbers.lines, {
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "<+=0.5");

        aboutTL.to(aboutSplits[i + 1].text.words, {
          yPercent: 0,
          autoAlpha: 1, 
          stagger: 0.03,
          duration: 1,
        }, "<");
      }
    });

    
  })
}

function cleanGsap() {
  if (ctx) ctx.revert()
  if (splitTitle.value) splitTitle.value.revert()
  if (waveText.value) waveText.value.revert()
  if (aboutSplits.length) {
    aboutSplits.forEach(split => {
        if(split.numbers) split.numbers.revert();
        if(split.text) split.text.revert();
    });
    aboutSplits = [];
  }
  ctx = null
  splitTitle.value = null
  zoomingImgs.value = []
  cuttingContainer.value = null
  leftCurtain.value = null
  rightCurtain.value = null
  leftPanel.value = null
  rightPanel.value = null
  aboutNitro.value = null

  aboutContainer.value = null
  aboutFrames.value = []
  aboutTextContainers.value = []
  
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

        <div ref="aboutNitro" class="absolute top-0 left-0 w-full h-full bg-white py-8">
          <div class="section">
            <h2 class="main_title z-0">
              {{ $t('title.about.name') }}
            </h2>
            <p class="text-xl ml-10 md:ml-20">
              {{ $t('title.about.description') }}
            </p>
            <div class="bg-[url(/img/bg_about.jpg)] bg-no-repeat bg-contain pb-[56.25%]"></div>
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

    <section id="about_section" class="relative">
      <div ref="aboutContainer" class="sticky top-0 h-screen w-full overflow-hidden">
        <div v-for="(item, i) in aboutItems" :key="i" 
          :ref="el => { if(el) aboutFrames[i] = el }"
          class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(/img/bg_about_${i + 1}.jpg)` }">
          <div :ref="el => { if(el) aboutTextContainers[i] = el }" class="relative w-full h-full p-2">
            <div class="absolute top-0 left-0 z-0">
              <div class="overflow-hidden">
                <h2 data-split-number class="text-white/30 text-[20rem] leading-60 font-black">
                  {{ item.digit }}
                </h2>
              </div>
            </div>
            <div class="relative flex flex-col items-stretch justify-evenly h-full max-w-3xl mx-auto text-center z-5">
              <div class="flex flex-col gap-4 items-center">
                <div class="overflow-hidden">
                  <h2 data-split-number class="text-9xl font-bold text-center uppercase text-primary">
                    {{ item.progress }}
                  </h2>
                </div>
                <h3 data-split-text class="text-3xl font-light uppercase text-white">
                  {{ item.name }}
                </h3>
              </div>
              <p data-split-text class="text-xl font-light text-white">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative grid grid-cols-4 gap-[0.2rem] mx-auto pt-[10vh] z-[-1] h-screen w-full bg-contain bg-top bg-no-repeat bg-fixed bg-[url(/img/bg_cases.jpg)] p-2">
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-1 row-start-1" data-speed="0.8">
        <img data-speed="auto" src="/img/case/1.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-2 row-start-2" data-speed="1">
        <img data-speed="auto" src="/img/case/2.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-3 row-start-3" data-speed="1.2">
        <img data-speed="auto" src="/img/case/3.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-4 row-start-4" data-speed="0.9">
        <img data-speed="auto" src="/img/case/4.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-1 row-start-5" data-speed="1.1">
        <img data-speed="auto" src="/img/case/5.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-2 row-start-6" data-speed="0.8">
        <img data-speed="auto" src="/img/case/6.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-3 row-start-7" data-speed="1.2">
        <img data-speed="auto" src="/img/case/7.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
      <div class="relative aspect-video overflow-hidden rounded-xl col-start-4 row-start-8" data-speed="0.7">
        <img data-speed="auto" src="/img/case/8.jpg" class="absolute top-0 w-full h-[140%] object-cover" />
      </div>
    </section>

    

  </div>
</template>