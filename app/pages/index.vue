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
const aboutItems = [
  { digit: 8, progress: 8 + ' ' + t('text.year', 2) },
  { digit: 200, progress: '200+'},
  { digit: 97, progress: '97.1%' }
]

const caseSection = ref(null);
const caseBg = ref(null);
const caseGrid = ref(null);
const caseItems = ref([]);

const priceSection = ref(null);
const priceTitleKey = ref('price.seo');
const priceItems = ref([]);

const advantageSection = ref(null);
const advantageTitles = ref(null);
const leftAdvantage = ref(null);
const rightAdvantage = ref(null);
const rotatingImage = ref(null);
const advantageTextSlides = ref([]);
const advantageImages = [
  '/img/advantage/1.jpg',
  '/img/advantage/2.jpg',
  '/img/advantage/3.jpg',
  '/img/advantage/4.jpg',
];

onBeforeUpdate(() => {
  zoomingImgs.value = []
  aboutFrames.value = []
  aboutTextContainers.value = []
  caseItems.value = [];
  priceItems.value = []
  advantageTextSlides.value = [];
})

function initGsap() {
  ctx = gsap.context(() => {
    const titles = gsap.utils.toArray("#text_separate h1");
    gsap.set(titles, { overflow: 'hidden' });
    splitTitle.value = new SplitText(titles, { type: "lines", linesClass: "line-child" });

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
      smoother.value.effects(waveText.value.chars, { speed: 1, lag: (i) => (i + 1) * 0.1 });
    } // id="split_stagger"

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

    scalingTL.to(cuttingContainer.value, { scale: 1, duration: 1, ease: 'ease', delay: 0.5 }, 1.25);
    scalingTL.to([leftPanel.value, rightPanel.value], {
      x: (i) => i === 0 ? '-50vw' : '50vw',
      duration: 1.5,
      ease: 'none',
    });
    scalingTL.to(zoomingImgs.value, { opacity: 0, duration: 0.1 }, '<', '-=0.2');
    scalingTL.fromTo(aboutNitro.value, 
      { opacity: 1, duration: 0.1, ease: 'none'},
      { yPercent: 0, duration: 2, ease: 'none' }, "<");
    
    // ABOUT
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

    // CASES
    const transitionTL = gsap.timeline({
      scrollTrigger: {
        trigger: caseSection.value,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      }
    });
    transitionTL.to(aboutFrames.value[aboutFrames.value.length - 1], { autoAlpha: 0, ease: "none" }, 0);
    transitionTL.to(caseSection.value, { autoAlpha: 1, ease: "none" }, 0);

    gsap.set(caseItems.value.map(item => item.querySelector('.case_item')), {
      yPercent: (i) => (i * 10) + 100,
      autoAlpha: 0
    });
    
    const casesTL = gsap.timeline({
      scrollTrigger: {
        trigger: caseSection.value,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      }
    });
    casesTL.to(caseItems.value.map(item => item.querySelector('.case_item')), {
      autoAlpha: 1,
      yPercent: 0,
      stagger: 0.15,
      ease: "power1.inOut",
    });

    if (priceItems.value.length) {
      const price1 = priceItems.value.slice(0, 6);
      const price2 = priceItems.value.slice(6, 13);
      const price3 = priceItems.value.slice(13);

      gsap.set(price2, { yPercent: 100 });
      gsap.set(price3, { yPercent: 100 });
      gsap.set('#priceBg', { xPercent: 100 });

      const priceTL = gsap.timeline({
        scrollTrigger: {
          trigger: priceSection.value,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1.5,
        }
      });
      priceTL.to(price1, { yPercent: -100, stagger: 0.05, delay: 0.5, ease: "power1.in" });
      priceTL.to(price2, { yPercent: 0, stagger: 0.05, ease: "power1.out" }, "<");
      priceTL.to(price2, { yPercent: -100, stagger: 0.05, ease: "power1.in" });
      priceTL.to(price3, { yPercent: 0, stagger: 0.01, ease: "power1.out" }, "<");
      priceTL.to([price2, price3], { color: 'black', stagger: 0.01, ease: "power1.out" }, "<");
      priceTL.to('#price_title_text', {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
        onComplete: () => { priceTitleKey.value = 'price.dev'; },
        onReverseComplete: () => { priceTitleKey.value = 'price.seo'; }
      }, "<");
      priceTL.to('#price_title_text', { opacity: 1, duration: 0.5, ease: 'power1.out' }, "<");
      priceTL.to('#price_title', { backgroundColor: '#47E29F', stagger: 0.01, ease: "power1.out" }, "<");
      priceTL.to('#bg_blured', { backgroundColor: 'transparent', backdropFilter: 'none', ease: "power1.out" }, "<");
      priceTL.to('#bg_vscode_1', { xPercent: -100, stagger: 0.05, ease: "ease" }, "<");
      priceTL.to('#bg_vscode_2', { xPercent: 100, stagger: 0.05, ease: "power1.out" }, "<");
      priceTL.to('#priceBg', { xPercent: 0, duration: 1, ease: "power1.in" }, "<");
    }

    // ADVANTAGE
    if (advantageSection.value && advantageTextSlides.value.length) {
      const titles = advantageTitles.value;
      if (titles.children.length === 5) {
        const titlesContent = titles.innerHTML;
        titles.innerHTML += titlesContent;
      }
      gsap.to(titles, { xPercent: -50, ease: "none", duration: 30, repeat: -1 });

      const totalSlides = advantageTextSlides.value.length;
      const totalTurns = totalSlides - 1;
      const slideDuration = 1 / totalSlides

      const advantageTL = gsap.timeline({
        scrollTrigger: {
          trigger: advantageSection.value,
          start: "top top",
          end: `+=${totalSlides * 100}%`,
          scrub: 1,
          pin: rightAdvantage.value,
          anticipatePin: 1,
        }
      });
      advantageTL.set(leftAdvantage.value, { backgroundImage: 'none' });

      for (let i = 0; i < totalTurns; i++) {
        advantageTL.to(rotatingImage.value, { rotationY: `+=${180}`, ease: 'none', }, `startTurn${i}` );
        advantageTL.set(rotatingImage.value, { attr: { src: advantageImages[i + 1] }}, `<50%`);
      }
      advantageTL.to(leftAdvantage.value, {
        backgroundImage: 'url(/img/team/1.jpg)',
        backgroundSize: '100% 100vh',
        duration: 0.1
      }, slideDuration * 3);
    }
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

  caseSection.value = null;
  caseGrid.value = null;
  caseBg.value = null;
  caseItems.value = [];

  priceSection.value = null; 
  priceItems.value = [];

  advantageSection.value = null;
  advantageTitles.value = null;
  rightAdvantage.value = null;
  leftAdvantage.value = null;
  rotatingImage.value = null;
  advantageTextSlides.value = [];  
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

    <section class="relative flex flex-col justify-center items-center h-screen">
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
          <p>{{ $t('title.for_your_business') }}</p>
        </div>
      </div>
      <div id="curtain_container" class="absolute w-screen h-screen overflow-hidden">
        <div ref="leftCurtain" class="fixed top-1/2 left-1/2 h-0 w-2 -mr-0.5 -translate-y-1/2 -translate-x-full bg-primary">
        </div>
        <div ref="rightCurtain" class="fixed top-1/2 left-1/2 h-0 w-2 -ml-0.5 -translate-y-1/2 bg-primary">
        </div>
      </div>
    </section>

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
          <div :ref="el => { if(el) aboutTextContainers[i] = el }" class="relative w-full h-full p-4">
            <div class="absolute top-4 left-4 z-0">
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
                  {{ $t(`title.about_${i + 1}.name`) }}
                </h3>
              </div>
              <p data-split-text class="text-xl font-light text-white">
                {{ $t(`title.about_${i + 1}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="caseSection" id="case_section" class="relative opacity-0 bg-cover bg-center bg-no-repeat bg-fixed bg-[url(/img/bg_cases.jpg)]">
      <div ref="caseBg" class="sticky top-0 h-screen w-full flex items-center justify-center p-4">
        <div ref="caseGrid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8 w-full h-full">
          <div v-for="i in 8" :key="i" :ref="el => { if (el) caseItems[i] = el }"
            class="relative">
            <div class="case_item absolute min-h-80 top-0 left-0 flex flex-col gap-2">
              <img :src="`/img/case/${i}.jpg`" class="w-full h-full object-cover rounded-xl" />
              <div>
                <h2 class="uppercase font-bold">{{ $t(`title.case_${i}.name`) }}</h2>
                <p class="font-light text-sm">{{ $t(`title.case_${i}.description`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="serviceSection" id="service_section" class="relative min-h-screen">
      <div class="py-8">
        <div class="bg-primary px-4">
          <h1 class="text-2xl font-bold uppercase">
            {{ $t('title.service.name') }}
          </h1>
        </div>
        <div class="px-4 font-regular">
          <p>{{ $t('title.service.description') }}</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-4 items-start justify-evenly">
        <div class="flex flex-col items-start justify-start w-90">
          <h2 class="uppercase text-2xl">{{ $t('text.promotion') }}</h2>
          <Slider service="seo" :qty="14" />
        </div>
        <div class="flex flex-col items-start justify-start w-90">
          <h2 class="uppercase text-2xl">{{ $t('text.development') }}</h2>
          <Slider service="dev" :qty="5" />
        </div>
      </div>
    </section>

    <section ref="priceSection" class="relative min-h-screen overflow-hidden bg-[#d7dee8]">
      <div id="priceBg" class="absolute inset-0 z-0 bg-cover bg-center scale-110" style="background-image: url('/img/hyper_cube.jpg');">
      </div>
      <div id="bg_vscode_1" class="absolute inset-0 z-0 bg-repeat-y bg-center bg-[length:100%_auto] animate-scroll-up xl:w-1/2 xl:bg-left-top xl:bg-[length:100%_auto] xl:animate-scroll-down" style="background-image: url('/img/bg_vscode.jpg');">
      </div>
      <div id="bg_vscode_2" class="hidden xl:block absolute top-0 right-0 z-0 w-1/2 h-full bg-repeat-y bg-right-top bg-[length:100%_auto] animate-scroll-up" style="background-image: url('/img/bg_vscode.jpg');">
      </div>
      
      <div id="bg_blured" class="relative z-10 bg-emerald-900/30 backdrop-blur-[2px] h-screen w-full flex-col justify-center">
        <div class="pt-8">
          <div id="price_title" class="bg-white px-4">
            <h1 id="price_title_text" class="text-2xl font-bold uppercase">
              {{ $t(priceTitleKey) }}
            </h1>
          </div>
        </div>
        <div class="relative max-w-3xl mx-auto w-full h-full flex items-center">
          <div class="absolute w-full">
            <div v-for="i in 6" :key="`batch1-${i}`" class="overflow-hidden w-full">
              <div :ref="el => { if (el) priceItems[i-1] = el }" class="flex items-center justify-between w-full py-2 font-bold text-white text-2xl">
                <div class="uppercase">{{ $t(`price.seo_${i}.name`) }}</div>
                <div class="">{{ $t(`price.seo_${i}.total`) }}</div>
              </div>
            </div>
          </div>
          <div class="absolute w-full">
            <div v-for="i in 7" :key="`batch2-${i}`" class="overflow-hidden w-full">
              <div :ref="el => { if (el) priceItems[i-1+6] = el }" class="flex items-center justify-between w-full py-2 font-bold text-white text-2xl">
                <div class="uppercase">{{ $t(`price.seo_${i+6}.name`) }}</div>
                <div class="">{{ $t(`price.seo_${i+6}.total`) }}</div>
              </div>
            </div>
          </div>
          <div class="absolute w-full">
            <div v-for="i in 5" :key="`batch3-${i}`" class="overflow-hidden w-full">
              <div :ref="el => { if (el) priceItems[i-1+13] = el }" class="flex items-center justify-between w-full py-3 font-bold text-white text-2xl">
                <div class="uppercase">{{ $t(`price.dev_${i}.name`) }}</div>
                <div class="">{{ $t(`price.dev_${i}.total`) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="advantageSection" class="relative overflow-hidden">
      <div class="bg-white py-10 whitespace-nowrap absolute top-0 left-0 w-full z-10">
        <div ref="advantageTitles" class="flex items-center gap-12 text-3xl font-bold">
          <p>{{ $t('text.design') }}</p>
          <p class="text-primary">{{ $t('text.development') }}</p>
          <p>{{ $t('text.promotion') }}</p>
          <p class="text-primary">{{ $t('text.content') }}</p>
          <p>{{ $t('text.targeted_advertising') }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 relative">
        <div ref="leftAdvantage" 
          class="col-span-1 relative z-5 bg-gray-200 bg-no-repeat bg-bottom" 
          style="background-image: url('url(/img/team/1.jpg)');">
          <div :ref="el => { if(el) advantageTextSlides[0] = el }" class="h-screen flex items-center justify-center">
            <div class="max-w-80">
              <h1 class="text-3xl font-bold uppercase">{{ $t('partner.frame_1.name') }}</h1>
              <p class="font-regular">{{ $t('partner.frame_1.desc') }}</p>
            </div>
          </div>
          <div :ref="el => { if(el) advantageTextSlides[1] = el }" class="h-screen flex items-center justify-end">
            <div class="max-w-80 lg:max-w-96 pr-10">
              <h1 class="text-3xl font-bold uppercase">{{ $t('partner.frame_2.name') }}</h1>
              <p class="font-regular">{{ $t('partner.frame_2.desc') }}</p>
            </div>
          </div>
          <div :ref="el => { if(el) advantageTextSlides[2] = el }" class="h-screen flex items-center justify-start">
            <div class="max-w-80 lg:max-w-96 pl-10">
              <h1 class="text-3xl font-bold uppercase">{{ $t('partner.frame_3.name') }}</h1>
              <p class="font-regular">{{ $t('partner.frame_3.desc') }}</p>
            </div>
          </div>
          <div :ref="el => { if(el) advantageTextSlides[3] = el }" class="h-screen flex items-center justify-end">
            <div class="max-w-80 lg:max-w-96 pr-10">
              <h1 class="text-3xl font-bold uppercase">{{ $t('partner.frame_4.name') }}</h1>
              <p class="font-regular">{{ $t('partner.frame_4.desc') }}</p>
            </div>
          </div>
        </div>

        <div ref="rightAdvantage" class="pr-20 top-0 h-screen flex items-center justify-center border-l border-gray-400 bg-gray-200">
          <div style="perspective: 1000px;">
            <img ref="rotatingImage" :src="advantageImages[0]" alt="Advantage Image" class="max-w-60 2xl:w-80" style="transform-style: preserve-3d;" />
          </div>
        </div>
      </div>
    </section>


  </div>
</template>