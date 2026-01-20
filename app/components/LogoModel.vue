<script setup>
const { gsap } = useGsap()
const props = defineProps({
  src: { type: String, default: '/logo.glb' }
})

const modelRef = ref(null)
let tween

onMounted(() => {
  const orbit = { theta: -24 }
  tween = gsap.to(orbit, {
    theta: 24,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    onUpdate: () => {
      modelRef.value?.setAttribute('camera-orbit', `${orbit.theta}deg 105deg 105%`)
    }
  })
})
onUnmounted(() => { tween?.kill() })
</script>
<template>
  <div class="w-full h-full pointer-events-none">
    <model-viewer
      ref="modelRef"
      :src="src"
      disable-zoom
      interaction-prompt="none"
      environment-image="neutral"
      camera-target="0m 0m 0m"
      class="w-full h-full"
      style="background: transparent"
    />
  </div>
</template>
