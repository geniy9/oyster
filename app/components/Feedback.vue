<script setup>
import { z } from "zod";
const { t } = useI18n();
const toast = useToast();

const schema = z.object({
    name: z.string().min(1, t("feedback.form.field_error.name")),
    phone: z.string().min(10, t("feedback.form.field_error.phone")),
    agreement: z.boolean().refine((val) => val === true, {
        message: t("feedback.form.field_error.agreement"),
    }),
    telegram: z
        .string()
        .regex(/^[a-zA-Z0-9_@]*$/, t("feedback.form.field_error.telegram"))
        .optional(),
});
const loading = ref(false);
const state = reactive({
    name: "",
    phone: "",
    agreement: null,
    telegram: "",
});

async function onSubmit() {
    loading.value = true;
    try {
        const formData = {
            name: state.name,
            phone: state.phone,
            telegram: state.telegram || "",
        };
        const idForm = "xykkddkn";
        const response = await fetch(`https://formspree.io/f/${idForm}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast.add({
                title: t("feedback.form.success.title"),
                description: t("feedback.form.success.desc"),
                color: "success",
            });
        } else {
            toast.add({
                title: t("feedback.form.error.title"),
                description:
                    error.data?.message || t("feedback.form.error.desc"),
                color: "error",
            });
        }
    } catch (error) {
        console.error("Submission error:", error);
        toast.add({
            title: t("feedback.form.error.title"),
            description: error.data?.message || t("feedback.form.error.desc"),
            color: "error",
        });
    } finally {
        clearForm();
        loading.value = false;
    }
}

function clearForm() {
    state.name = state.phone = state.agreement = state.telegram = undefined;
    loading.value = false;
}
</script>
<template>
    <div class="w-full md:px-32">
        <UForm
            :schema="schema"
            :state="state"
            @submit="onSubmit"
            class="space-y-4 text-center"
        >
            <UFormField name="name" required>
                <UInput
                    v-model="state.name"
                    :placeholder="$t('feedback.form.name')"
                    variant="custom"
                    size="xxl"
                    class="w-full"
                    :ui="{ base: 'placeholder:text-black/70' }"
                />
            </UFormField>
            <UFormField name="phone" required>
                <UInput
                    v-model="state.phone"
                    :placeholder="$t('feedback.form.phone')"
                    size="xxl"
                    class="w-full"
                    variant="custom"
                    :ui="{ base: 'placeholder:text-black/70' }"
                />
            </UFormField>
            <UFormField name="telegram">
                <UInput
                    v-model="state.telegram"
                    placeholder="TELEGRAM @USERNAME"
                    size="xxl"
                    class="w-full"
                    variant="custom"
                    :ui="{ base: 'placeholder:text-black/70' }"
                />
            </UFormField>
            <UFormField name="agreement" class="w-80 mx-auto" required>
                <UCheckbox
                    v-model="state.agreement"
                    color="primary"
                    size="xxl"
                    :ui="{ root: 'flex flex-col items-center' }"
                />
                <span
                    v-html="$t('feedback.form.agreement')"
                    class="font-bold"
                ></span>
            </UFormField>

            <UButton
                type="submit"
                :loading="loading"
                size="lg"
                class="bg-black text-white text-xs tracking-wider rounded-full uppercase transition-all duration-300 hover:bg-black px-6 py-3 hover:px-12"
            >
                {{ $t("feedback.form.send") }}
            </UButton>
        </UForm>
    </div>
</template>
