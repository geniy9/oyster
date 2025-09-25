<script setup>
import { useSmoother } from '~/composables/useSmoother'
const { shifterBg } = useConfig();

const { gsap, ScrollSmoother } = useGsap()
const { locale } = useI18n()
const smoother = useSmoother()
const isLoading = ref(true);
const preloaderRef = ref(null);

let ctx = null

const onPreloaderLoaded = () => {
  if (preloaderRef.value) {
    preloaderRef.value.playPreloader();
  }
  // Здесь можно оставить isLoading = false, если нужно для других целей,
};

function updateSmoother() {
  if (smoother.value) smoother.value.kill()
  if (ctx) ctx.revert()
  smoother.value = null

  setTimeout(() => {
    ctx = gsap.context(() => {
      smoother.value = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
      });

      // if (isLoading.value && smoother.value) {
      //   smoother.value.paused(true);
      // }
    });
  }, 100)
}

watch(() => locale.value, () => { updateSmoother() })
onMounted(() => { 
  updateSmoother()
})

onUnmounted(() => {
  if (smoother.value) smoother.value.kill()
  if (ctx) ctx.revert()
})
</script>
<template>
  <UApp>

    <!-- <Preloader v-if="isLoading" ref="preloaderRef" @loaded="onPreloaderLoaded" /> -->

    <div id="smooth-wrapper" :style="{ backgroundImage: `url(${shifterBg})` }" class="flex flex-col min-h-screen overflow-hidden text-black bg-white bg-fixed bg-no-repeat bg-cover w-full z-0">
      <Headers />
      <div id="smooth-content" class="flex-grow overflow-visible w-full">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
      <Footers />
    </div>
  </UApp>
</template>
<!-- <style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(24px);
}
</style> -->
