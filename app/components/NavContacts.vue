<script setup>
const { menuContacts } = useMenu()
</script>
<template>
  <div>
    <a v-for="(m, i) in menuContacts" :key="i" :href="m.to" class="block">
      <div class="flex items-center gap-2">
        <div class="bg-primary rounded-full flex items-center justify-center p-1.5">
          <Icon :name="m.icon" class="h-6 w-6 text-black" />
        </div>
        <div class="flex md:hidden lg:flex flex-col gap-1 text-xs sm:text-sm leading-3">
          <span class="font-light tracking-widest">{{ $t(`nav.${m.name}`) }}</span>
          <span class="font-bold text-nowrap">{{ m.contact }}</span>
        </div>
      </div>
    </a>
  </div>
</template>