<script setup>
const { gsap } = useGsap();
const emit = defineEmits(['loaded']);

const preloaderRef = ref(null);
const navEl = ref(null);
const logoEl = ref(null);
const discussEl = ref(null);

onMounted(() => {
  setTimeout(() => { emit('loaded') }, 1000);
});

const playPreloader = () => {
  if (!preloaderRef.value) return;

  let mm = gsap.matchMedia();
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(preloaderRef.value, {
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        onComplete: () => {
          if (preloaderRef.value) {
            preloaderRef.value.style.display = 'none';
            preloaderRef.value.style.zIndex = '-100';
          }
        }
      });
    }
  });

  // DESKTOP
  mm.add("(min-width: 768px)", () => {
    tl.set(navEl.value, { left: '98%', top: '50%', yPercent: -50, xPercent: -100, opacity: 0 });
    tl.set(discussEl.value, { left: '2%', top: '50%', yPercent: -50, xPercent: 0, opacity: 0 });
    tl.set(logoEl.value, { scale: 1, top: '50%', yPercent: -50, opacity: 1 });

    tl.to(navEl.value, { left: '100%', opacity: 1, duration: 0.7 });
    tl.to(discussEl.value, { left: '0%', opacity: 1, duration: 0.7 }, '<');

    tl.to(logoEl.value, { top: '40%', duration: 0.5, ease: 'power2.inOut' });
    tl.to(navEl.value, { left: '0%', xPercent: 0, duration: 0.7, ease: 'power2.inOut' }, '<');
    tl.to(discussEl.value, { left: '100%', xPercent: -100, duration: 0.7, ease: 'power2.inOut' }, '<');

    tl.to(logoEl.value, { top: '100%', yPercent: 0, duration: 0.5, ease: 'power2.in' });
  });

  // MOBILE
  mm.add("(max-width: 767px)", () => {
    tl.set(navEl.value, { left: '50%', xPercent: -50, top: '100%', yPercent: -100, opacity: 0 });
    tl.set(discussEl.value, { left: '50%', xPercent: -50, top: '0%', yPercent: 0, opacity: 0 });
    tl.set(logoEl.value, { scale: 1, opacity: 1 });

    tl.to([navEl.value, discussEl.value], { opacity: 1, duration: 0.5 });

    tl.to(navEl.value, { top: '0%', yPercent: 0, duration: 1, ease: 'power2.inOut' });
    tl.to(discussEl.value, { top: '100%', yPercent: -100, duration: 1, ease: 'power2.inOut' }, '<');
    tl.to(navEl.value, { left: '0%', xPercent: 0, duration: 0.5, ease: 'power2.inOut' });
    tl.to(discussEl.value, { left: '100%', xPercent: -100, duration: 0.5, ease: 'power2.inOut' }, '<');

    tl.to(logoEl.value, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.in(1.7)' }, '-=0.3');
  });
};
defineExpose({ playPreloader });
</script>
<template>
  <div ref="preloaderRef" class="fixed inset-0 w-screen h-screen bg-black z-[999] text-white">
    
    <div ref="navEl" class="fixed opacity-0 p-4 z-[1000]">
      <UButton
        :label="'[ _ ] ' + $t('nav.navigation')"
        color="primary"
        variant="solid" 
        size="sm" 
        class="font-bold uppercase w-32" 
      />
    </div>
    <div ref="discussEl" 
      class="lets_discuss fixed opacity-0 z-1000 p-4 whitespace-nowrap">
      <p>{{ $t('text.lets_discuss') }}</p>
    </div>
    <div ref="logoEl" 
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 z-[1000]">
      <img src="/logo.svg" alt="Logo" class="w-10">
    </div>

  </div>
</template>