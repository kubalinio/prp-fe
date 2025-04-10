<script setup lang="ts">
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
</script>

<template>
  <DialogHeader>
    <DialogTitle>
      <slot />
    </DialogTitle>
  </DialogHeader>
</template>
