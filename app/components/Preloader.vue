<script setup>
const { gsap } = useGsap();
const emit = defineEmits(['loaded']);

const preloaderRef = ref(null);
const navEl = ref(null);
const logoEl = ref(null);
const discussEl = ref(null);

onMounted(() => {
  setTimeout(() => { emit('loaded') }, 2000);
});

const playPreloader = () => {
  if (!preloaderRef.value) return;

  const tl = gsap.timeline();
  
  tl.set(navEl.value, { left: '98%', xPercent: -100, opacity: 0 })
  tl.set(discussEl.value, { left: '2%', xPercent: 0, opacity: 0 })

  tl.to(navEl.value, { left: '100%', xPercent: -100, opacity: 1, duration: 0.7 });
  tl.to(discussEl.value, { left: '0%', xPercent: 0, opacity: 1, duration: 0.7 }, '<');

  tl.to(navEl.value, { left: '0%', xPercent: 0, duration: 0.7, ease: 'power2.inOut' });
  tl.to(discussEl.value, { left: '100%', xPercent: -100, duration: 0.7, ease: 'power2.inOut' }, '<');

  tl.to(logoEl.value, { top: '100%', yPercent: '100%', duration: 0.5, ease: 'power2.in' });

  tl.to(preloaderRef.value, {
    opacity: 0,
    duration: 1,
    ease: 'power1.out',
    onComplete: () => {
      if (preloaderRef.value) {
        preloaderRef.value.style.display = 'none';
        preloaderRef.value.style.zIndex = '-100';
      }
    }
  }, '+=0.2');
};

defineExpose({ playPreloader });
</script>
<template>
  <div ref="preloaderRef" class="fixed inset-0 w-screen h-screen bg-black z-[999] text-white">
    
    <div ref="navEl" class="fixed top-1/2 left-full -translate-y-1/2 opacity-0 p-2 z-[1000]">
      <UButton
        :label="'[ _ ] ' + $t('nav.navigation')"
        color="primary"
        variant="solid" 
        size="sm" 
        class="font-bold uppercase min-w-40" 
      />
    </div>

    <div ref="discussEl" 
      class="fixed top-1/2 left-0 -translate-y-1/2 text-nowrap text-lg opacity-0 p-2 z-[1000]">
      <p>{{ $t('text.lets_discuss') }}</p>
    </div>

    <div ref="logoEl" 
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-full p-2 z-[1000]">
      <img src="/logo.svg" alt="Logo" class="w-10">
    </div>

  </div>
</template>