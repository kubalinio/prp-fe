<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '@/libs/utils'
// import type { InputProps } from './index'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        'border-input focus-visible:ring-ring disabled:border-opacity-25 aria-[invalid=true]:border-error bg-background flex h-[2.875rem] w-full rounded-md border px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed',
        props.class,
      )
    "
  />
</template>
