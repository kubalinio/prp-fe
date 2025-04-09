<script setup lang="ts">
import { cn } from '@/libs/utils'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { containerVariants, type ContainerVariants } from '.'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: ContainerVariants['variant']
    class?: HTMLAttributes['class']
    as?: PrimitiveProps['as']
    asChild?: PrimitiveProps['asChild']
  }>(),
  {
    variant: 'breakpoint-padded',
    as: 'div',
  },
)
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(containerVariants({ variant }), props.class)">
    <slot />
  </Primitive>
</template>
