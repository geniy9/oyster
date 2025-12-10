<script setup>
const { menuSecond } = useMenu()
const { footerNav } = useConfig()

</script>
<template>
  <footer class="relative">

    <div class="lets_discuss right-0 z-20">
      <a href="t.me/oystercomputer" target="_blank">
        {{ $t('text.lets_discuss') }}
      </a>
    </div>

    <div class="flex flex-col fixed md:bottom-0 right-0 px-4 z-20 transition-all duration-300" 
      :class="[ footerNav ? 'translate-y-0' : 'translate-y-[calc(100%_-_3rem)] hover:translate-y-0']">
      <div class="flex justify-center mb-2">
        <img src="/logo_3d.png" alt="Logo" class="h-10">
      </div>
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