<script setup lang="ts">
import { DialogContent } from '@/components/ui/dialog'

const { class: className, ...props } = defineProps<{
  class?: string
}>()
</script>

<template>
  <DialogContent :class="className" v-bind="props">
    <slot />
  </DialogContent>
</template>
