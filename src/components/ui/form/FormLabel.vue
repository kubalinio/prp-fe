<script lang="ts" setup>
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'
import { Label } from '@/components/ui/label'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>

<template>
  <Label
    data-slot="form-label"
    :data-error="!!error"
    :class="
      cn(
        'data-[error=true]:!text-error peer-disabled:text-opacity-70 text-sm leading-none font-medium peer-disabled:cursor-not-allowed',
        props.class,
      )
    "
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
