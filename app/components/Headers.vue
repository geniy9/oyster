<script setup>
const { menuMain } = useMenu()
const isOpen = ref(false)

</script>
<template>
  <header class="fixed left-0 top:0 md:top-1/2 md:-translate-y-1/2 p-4 z-10">
    <div class="flex flex-col items-stretch">
        
      <div class="flex md:hidden">
        <USlideover 
          side="top" 
          v-model:open="isOpen" 
          :ui="{ content: 'max-h-max bg-white divide-none text-black'}">

          <div class="md:hidden flex items-start gap-1">
            <UButton 
              :label="'[ _ ] ' + $t('nav.navigation')"
              color="primary"
              variant="solid" 
              size="sm" 
              class="font-bold uppercase w-32" />
            <ToggleLocale class="hidden sm:block" />
          </div>

          <template #header>
            <div @click="isOpen = false" class="flex items-center justify-between gap-1 w-full">
              <div class="flex items-center gap-1">
                <UButton 
                  :label="'[ x ] ' + $t('text.close')"
                  color="primary"
                  variant="solid" 
                  size="sm" 
                  class="font-bold uppercase w-32" />
                <ToggleLocale />
              </div>
              <div>
                <a href="https://t.me/oystercomputer" target="_blank" class="flex items-center justify-center px-2 py-1 rounded-full border border-black cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 uppercase text-xs font-bold">
                  {{ $t("text.lets_discuss") }}
                </a>
              </div>
            </div>
          </template>
          <template #body>
            <div class="relative flex flex-col justify-start gap-12 mb-8">
              <nav @click="isOpen = false">
                <ul class="flex flex-col items-start gap-2">
                  <li v-for="(m, i) in menuMain" :key="i">
                    <NuxtLinkLocale :to="m.to" class="flex items-center gap-2 text-lg select-none p-0.5 leading-none hover:text-primary uppercase">
                      <span class="font-regular">[ {{ i + 1 }} ]</span>
                      <span class="font-bold tracking-widest">{{ $t(`nav.${m.name}`) }}</span>
                    </NuxtLinkLocale>
                  </li>
                </ul>
              </nav>
            </div>
          </template>
        </USlideover>
      </div>

      <div class="hidden md:flex items-start justify-between gap-1">
        <UCollapsible class="flex flex-col gap-2">
          <UButton
            :label="'[ _ ] ' + $t('nav.navigation')"
            color="primary"
            variant="solid" 
            size="sm" 
            class="font-bold uppercase w-32" />
          <template #content>
            <nav>
              <ul class="flex flex-col items-start gap-1">
                <li v-for="(m, i) in menuMain" :key="i">
                  <NuxtLinkLocale :to="m.to" class="flex items-center gap-2 text-sm select-none p-0.5 mx-2 leading-none hover:text-primary-foreground uppercase">
                    <span class="font-regular">[ {{ i + 1 }} ]</span>
                    <span class="font-medium">{{ $t(`nav.${m.name}`) }}</span>
                  </NuxtLinkLocale>
                </li>
              </ul>
            </nav>
          </template>
        </UCollapsible>
        <ToggleLocale />
      </div>
    </div>
    
  </header>
</template>
