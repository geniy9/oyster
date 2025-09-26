<script setup>
import { useSmoother } from '~/composables/useSmoother';

const { gsap, SplitText } = useGsap()
const smoother = useSmoother()

let ctx = null
let waveText = null

function initGsap() {
  ctx = gsap.context(() => {
    waveText = new SplitText("#split-stagger", { type: "words,chars" });
    if(smoother.value) {
      smoother.value.effects(waveText.chars, {
        speed: 1,
        lag: (i) => (i + 1) * 0.1,
      });
    }
  })
}

function cleanGsap() {
  if (waveText) waveText.revert()
  if (ctx) ctx.revert()
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
    <!-- <section class="image-grid relative grid grid-cols-3 grid-rows-3 gap-[0.2rem] w-[80vw] mx-auto pt-[40vh] z-[-1] min-h-screen">
      <div class="image_cont relative aspect-square overflow-hidden col-start-1 row-start-1" data-speed="1">
        <img data-speed="auto" src="/img/case/1.png" class="absolute top-0 w-full h-[150%] object-cover" />
      </div>
      <div class="image_cont relative aspect-square overflow-hidden col-start-3 row-start-2" data-speed="1.7">
        <img data-speed="auto" src="/img/case/2.png" class="absolute top-0 w-full h-[150%] object-cover" />
      </div>
      <div class="image_cont relative aspect-square overflow-hidden col-start-2 row-start-3" data-speed="1.5">
        <img data-speed="auto" src="/img/case/3.png" class="absolute top-0 w-full h-[150%] object-cover" />
      </div>
    </section> -->

    <!-- <section class="bars section flex flex-wrap gap-x-16 min-h-screen">
      <div class="bars-text flex-1 basis-[300px] flex flex-col items-start justify-center">
        <div class="flow content space-y-4 border-l border-solid border-white py-2 px-8">
          <h2 class="text-3xl font-medium">Speed Control</h2>
          <p>
            Animate elements along at different speeds, slow
            them down or make them whizz past.
          </p>
        </div>
      </div>
      <div class="bars-cont flex-1 basis-[500px] flex w-full h-[60vh] items-end">
        <div class="bar flex-1 shrink-0 m-[2vw] rounded-[10px] text-center font-bold text-[clamp(16px,3vw,36px)]" data-speed="0.8"><p>0.8</p></div>
        <div class="bar flex-1 shrink-0 m-[2vw] rounded-[10px] text-center font-bold text-[clamp(16px,3vw,36px)]" data-speed="0.9"><p>0.9</p></div>
        <div class="bar flex-1 shrink-0 m-[2vw] rounded-[10px] text-center font-bold text-[clamp(16px,3vw,36px)]" data-speed="1"><p>1</p></div>
        <div class="bar flex-1 shrink-0 m-[2vw] rounded-[10px] text-center font-bold text-[clamp(16px,3vw,36px)]" data-speed="1.1"><p>1.1</p></div>
        <div class="bar flex-1 shrink-0 m-[2vw] rounded-[10px] text-center font-bold text-[clamp(16px,3vw,36px)]" data-speed="1.2"><p>1.2</p></div>
      </div>
    </section> -->

    <!-- <section class="v-center min-h-screen">
      <div class="parallax-slab relative w-full h-[500px] max-h-[500px] overflow-hidden">
        <img data-speed="auto" src="/img/blue_face.jpg" class="absolute bottom-0 w-full h-[180%] object-cover" />
      </div>
    </section> -->

    <!-- <section class="staggered section flex items-center flex-wrap gap-x-16 min-h-screen">
      <div class="staggered_text flex-1 basis-[300px]">
        <div class="flow content space-y-4 border-l border-solid border-white py-2 px-8">
          <h2 class="text-3xl font-medium">Add some lag (the good kind!)</h2>
          <p>
            loosen the connection to the scroll to give a
            feeling of 'follow through.'
          </p>
        </div>
      </div>
      <div class="staggered_demo flex-1 basis-[500px] flex items-center justify-center">
        <h3 id="split-stagger" class="font-light text-7xl tracking-[0.03em]">Oyster Computer...</h3>
      </div>
    </section> -->

    <!-- <section class="parallax-images section grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-[20vh] mt-[10vh] py-40 px-4 min-h-screen">
      <div class="parallax-text col-start-2 row-start-1">
        <div class="flow content space-y-4 border-l border-solid border-white py-2 px-8">
          <h2 class="text-3xl font-medium">Easy parallax image effects</h2>
          <p>
            Pop your images in a container with overflow
            hidden, size them a little larger than the
            container and set data-speed to auto. GSAP does
            the rest.
          </p>
        </div>
      </div>
      <div class="image_cont relative w-full h-[80vh] overflow-hidden col-span-1 col-start-1 row-start-1">
        <img data-speed="auto" src="/img/case/5.png" class="absolute bottom-0 mx-auto w-full h-[140%] object-cover" />
      </div>
      <div class="image_cont relative h-[80vh] overflow-hidden col-span-1 col-start-2 row-start-2">
        <img data-speed="auto" src="/img/case/5.png" class="absolute bottom-0 mx-auto w-full h-[140%] object-cover" />
      </div>
    </section> -->
  </div>
</template>