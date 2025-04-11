<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const {
  as,
  asChild,
  variant,
  size,
  class: className,
  ...props
} = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), className)"
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>
