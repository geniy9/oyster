<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: []
  }
})

const carousel = useTemplateRef('carousel')

function onClickPrev() {
  carousel.value?.emblaApi?.scrollPrev()
}
function onClickNext() {
  carousel.value?.emblaApi?.scrollNext()
}
</script>
<template>
  <div class="flex flex-col sm:flex-row sm:items-end gap-2">
    <UCarousel ref="carousel" :items="items" v-slot="{ item }" loop class="w-60">
      <div class="mb-4">
        <img :src="item.img" alt="" class="mx-auto rounded-xl w-60 h-90 object-cover" />
      </div>
      <div class="flex flex-col h-36">
        <h3 class="uppercase font-bold text-lg">{{ item.name }}</h3>
        <p class="text-sm">{{ item.description }}</p>
      </div>
    </UCarousel>

    <div class="flex flex-col justify-start gap-2 mb-40">
      <div @click="onClickPrev" class="flex items-center justify-center gap-2 p-1 w-32 rounded-full border border-black cursor-pointer">
        <UIcon name="mynaui:arrow-long-left" class="h-6 w-6" />
        <span class="font-bold text-sm leading-3">назад</span>
      </div>
      <div @click="onClickNext" class="flex items-center justify-center gap-2 p-1 w-32 rounded-full border border-black cursor-pointer">
        <span class="font-bold text-sm leading-3">дальше</span>
        <UIcon name="mynaui:arrow-long-right" class="h-6 w-6" />
      </div>
    </div>
  </div>
</template>