<script setup>
import { z } from 'zod'

const config = useRuntimeConfig()
const apiUrl = config.public.ORIGIN
const toast = useToast()

const schema = z.object({
  name: z.string().min(1, 'Name Required'),
  phone: z.string().min(8, 'Phone must be at least 10 characters'),
  agreement: z.boolean(),
  telegram: z.string().min(1, 'Telegram or Email Required'),
})
const state = reactive({
  name: undefined,
  phone: undefined,
  agreement: undefined,
  telegram: undefined,
})
const loading = ref(false);

async function onSubmit(event) {
  return
  loading.value = true;
  try {
    const payload = { ...event.data }
    await $fetch(`${apiUrl}/api/feedback`, {
      method: 'POST',
      body: payload,
    });

    toast.add({
      title: 'Successful',
      description: 'Your contacts was successfully sent.',
      icon: 'i-heroicons-check-circle',
      color: 'success'
    })

  } catch (error) {
    console.error('Submission error:', error);
    toast.add({
      title: 'Error',
      description: error.data?.message || 'Failed to send.',
      icon: 'i-heroicons-x-circle',
      color: 'error'
    });
  } finally {
    state.name = undefined
    state.phone = undefined
    state.agreement = undefined
    state.telegram = undefined
    loading.value = false
  }
}
</script>
<template>
  <div class="w-full md:px-32">
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4 text-center">
      <UFormField name="name" required>
        <UInput v-model="state.name" 
          :placeholder="$t('feedback.form.name')" 
          variant="custom" 
          size="xxl" 
          class="w-full"
          :ui="{ base: 'placeholder:text-black/70' }" />
      </UFormField>
      <UFormField name="phone" required>
        <UInput v-model="state.phone" 
          :placeholder="$t('feedback.form.phone')" 
          size="xxl" 
          class="w-full"
          variant="custom" 
          :ui="{ base: 'placeholder:text-black/70' }" />
      </UFormField>
      <UFormField name="telegram" required>
        <UInput v-model="state.telegram" 
          placeholder="TELEGRAM @USERNAME" 
          size="xxl" 
          class="w-full"
          variant="custom" 
          :ui="{ base: 'placeholder:text-black/70' }" />
      </UFormField>
      <UFormField name="agreement" required class="w-80 mx-auto">
        <UCheckbox 
          v-model="state.agreement"
          color="primary" size="xl" 
          :ui="{ root: 'flex flex-col items-center'}" />
        <span v-html="$t('feedback.form.agreement')" class="font-bold"></span>
      </UFormField>

      <UButton 
        type="submit" 
        :loading="loading" 
        size="lg" 
        class="bg-black text-white text-xs tracking-wider rounded-full uppercase transition-all duration-300 hover:bg-black px-6 py-3 hover:px-12">
        {{ $t('feedback.form.send') }}
      </UButton>
    </UForm>
  </div>
</template>