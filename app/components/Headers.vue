<script setup>
const { menuMain } = useMenu()
const isOpen = ref(false)

</script>
<template>
  <header class="fixed left-0 top:0 md:top-1/2 -translate-y-1/2 z-20 p-2">
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
              class="font-bold uppercase min-w-40" />
            <ToggleLocale />
          </div>

          <template #header>
            <div @click="isOpen = false" class="flex items-center justify-between gap-1 w-full">
              <UButton 
                :label="'[ x ] ' + $t('text.close')"
                color="primary"
                variant="solid" 
                size="sm" 
                class="font-bold uppercase" />
              <ToggleLocale />
              <div>
                {{ $t('text.lets_discuss') }}
              </div>
            </div>
          </template>
          <template #body>
            <div class="relative flex flex-col justify-start gap-12">
              <nav @click="isOpen = false">
                <ul class="flex flex-col items-start gap-1">
                  <li v-for="(m, i) in menuMain" :key="i">
                    <NuxtLinkLocale :to="m.to" class="flex items-center gap-2 text-lg select-none p-0.5 leading-none hover:text-primary uppercase">
                      <span class="font-regular">[ {{ i + 1 }} ]</span>
                      <span class="font-bold">{{ $t(`nav.${m.name}`) }}</span>
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
            class="font-bold uppercase min-w-40" />
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
