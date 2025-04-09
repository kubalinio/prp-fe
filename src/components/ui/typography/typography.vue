<script setup lang="ts">
import { cn } from '@/libs/utils'
import { getDefaultComponent, type TypographyVariants, typographyVariants } from '.'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    variant: TypographyVariants['variant']
    class?: HTMLAttributes['class']
    as?: keyof HTMLElementTagNameMap
  }>(),
  {
    variant: 'body-2',
    as: 'p',
  },
)

const tag = props.as || getDefaultComponent(props.variant)
</script>

<template>
  <tag :class="cn(typographyVariants({ variant }), props.class)">
    <slot />
  </tag>
</template>
