<script setup>
const props = defineProps({
  error: Object
})
</script>
<template>
  <div class="flex flex-col gap-6 items-center justify-center text-center w-screen h-screen">
    <h1 class="uppercase text-xl font-bold">
      {{ $t('text.page_not_found') }}
    </h1>
    <!-- <img src="" alt=""> -->
    <NuxtLink to="/" class="uppercase text-sm">
      {{ $t('text.go_back_home') }}
    </NuxtLink>
    <pre>{{ error.status }}</pre>
  </div>
</template>