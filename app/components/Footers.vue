<script setup>
const { menuSecond } = useMenu()
const { footerNav } = useConfig()
const { gsap } = useGsap()

const logo3DContainer = ref(null)
const isLogoActive = ref(false)
let logoCtx = null

function logoCorner(isNav) {
  gsap.to(logo3DContainer.value, {
    y: isNav ? '-128px' : '0px',
    bottom: '4px',
    right: '80px',
    xPercent: 0,
    yPercent: 0,
    width: '60px',
    height: '60px',
    duration: 0.5,
    ease: 'power2.out',
  })
}
function logoCenter(toCenter) {
  const isMobile = window.matchMedia('(max-width: 639px)').matches
  gsap.to(logo3DContainer.value, {
    left: toCenter ? '50%' : '',
    top: toCenter ? '50%' : '',
    right: toCenter ? '' : '80px',
    bottom: toCenter ? '' : '4px',
    xPercent: toCenter ? -50 : 0,
    yPercent: toCenter ? -50 : 0,
    width: toCenter ? isMobile ? '200px' : '320px' : '60px',
    height: toCenter ? isMobile ? '200px' : '320px' : '60px',
    duration: 0.4,
    ease: 'power2.inOut',
  })
}

onMounted(() => {
  logoCtx = gsap.context(() => {
    logoCorner(footerNav.value)
    gsap.timeline({
      scrollTrigger: {
        trigger: '#footerSection',
        start: 'center bottom',
        end: '+=50%',
        scrub: 1.5,
        onEnter: () => {
          isLogoActive.value = true
          logoCenter(true)
        },
        onLeaveBack: () => {
          isLogoActive.value = false
          logoCenter(false)
        },
      },
    })
  })
})

watch(() => footerNav.value, (isNav) => {
  if (!isLogoActive.value) {
    logoCorner(isNav)
  }
})
onUnmounted(() => {
  if (logoCtx) {
    logoCtx.revert()
    logo3DContainer.value = null
  }
})
</script>
<template>
  <footer>

    <div class="hidden md:block lets_discuss fixed top-1/2 -translate-y-1/2 right-0 z-20">
      <NuxtLinkLocale to='/#feedback'>
        {{ $t('text.lets_discuss') }}
      </NuxtLinkLocale>
    </div>

    <div ref="logo3DContainer" class="fixed z-60 pointer-events-none">
      <LogoModel />
    </div>

    <div class="fixed flex flex-col md:bottom-0 right-0 px-4 z-20 transition-all duration-300" 
      :class="[ footerNav ? 'translate-y-0' : 'translate-y-full hover:translate-y-0']">
      <div class="bg-white px-2 py-4">
        <ul class="flex flex-col items-start gap-1">
          <li v-for="(m, i) in menuSecond" :key="i">
            <NuxtLinkLocale :to="m.to" class="group flex items-center gap-1 text-xs select-none mx-2 leading-none hover:text-primary-foreground uppercase">
              <span class="font-medium">{{ $t(`nav.${m.name}`) }}</span>
              <Icon name="hugeicons:arrow-right-double" class="w-4 h-4 text-primary group-hover:translate-x-1 transition-all duration-300" />
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </div>

  </footer>
</template>