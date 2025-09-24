<script setup>
const { menuSecond } = useMenu()

</script>
<template>
  <footer class="relative h-screen">
    <div class="flex flex-col fixed md:bottom-0 right-0 p-2 z-20">
      <div class="flex justify-center">
        <img src="/logo_3d.png" alt="Logo" class="w-20">
      </div>
      <div class="backdrop-blur-md bg-white/20 px-2 py-4">
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