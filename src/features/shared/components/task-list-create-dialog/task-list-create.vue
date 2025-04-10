<script setup lang="ts">
import { Dialog } from '@/components/ui/dialog'

const open = defineModel<boolean>({ required: true })
</script>

<template>
  <Dialog v-model:open="open">
    <slot />
  </Dialog>
</template>
