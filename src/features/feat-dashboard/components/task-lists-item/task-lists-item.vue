<script setup lang="ts">
import { Card } from '@/components/ui/card'
</script>

<template>
  <Card
    class="shadow-0 bg-background-secondary hover:bg-background-secondary/80 relative flex flex-col items-center pb-10 transition-colors duration-300 md:flex-row"
  >
    <slot />
  </Card>
</template>
