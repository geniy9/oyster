<script setup>
import { useSmoother } from '~/composables/useSmoother'
const { gsap, ScrollSmoother } = useGsap()
const { locale } = useI18n()
const smoother = useSmoother()

let ctx = null

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
    });
  }, 100)
}

watch(() => locale.value, () => { updateSmoother() })

onMounted(() => { updateSmoother() })
onUnmounted(() => {
  if (smoother.value) smoother.value.kill()
  if (ctx) ctx.revert()
})
</script>
<template>
  <UApp>
    <div id="smooth-wrapper" class="flex flex-col min-h-screen overflow-hidden text-black bg-gray-200 bg-top bg-fixed bg-[url(/img/bg-1.jpg)] bg-no-repeat bg-cover w-full z-0">
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
