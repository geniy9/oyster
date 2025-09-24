<script setup>
const { locale, locales, setLocale } = useI18n()

async function changeLocale(code) {
  setLocale(code)
  await refreshNuxtData()
}
</script>
<template>
  <div>
    <div v-for="(loc, i) in locales" :key="i" @click="changeLocale(loc.code)">
      <UButton
        v-if="locale !== loc.code" 
        class="uppercase font-bold"
        :label="loc.code" 
        variant="solid" 
        color="primary" 
        size="sm" />
    </div>
  </div>
</template>