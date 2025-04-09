<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="cn('bg-card text-card-foreground shadow-z16 rounded-md p-4 border', props.class)"
  >
    <slot />
  </div>
</template>
