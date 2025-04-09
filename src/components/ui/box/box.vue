<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'

import { cn } from '@/libs/utils'
import { boxVariants, type BoxVariants } from '.'

const props = withDefaults(
  defineProps<{
    as?: PrimitiveProps['as']
    asChild?: PrimitiveProps['asChild']
    variant?: BoxVariants['variant']
    padding?: BoxVariants['padding']
    mx?: BoxVariants['mx']
    my?: BoxVariants['my']
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'default',
    as: 'div',
  },
)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(boxVariants({ variant, padding, mx, my }), props.class)"
  >
    <slot />
  </Primitive>
</template>
