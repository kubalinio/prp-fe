<script setup lang="ts">
import { Box } from '@/components/ui/box'
import { CardFooter } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { formatTaskListItemDate } from '@/libs/utils'

const { createdAt, updatedAt } = defineProps<{
  createdAt: string | number
  updatedAt: string | number
}>()
</script>

<template>
  <CardFooter class="md:ml-auto">
    <Box
      class="[&>p]:text-muted-foreground/60 absolute right-5 bottom-2 flex items-center gap-x-1.5 [&>p]:text-xs [&>p]:tracking-tighter"
    >
      <template v-if="createdAt">
        <Typography variant="body-2">Created: {{ formatTaskListItemDate(createdAt) }}</Typography>
      </template>

      <template v-if="updatedAt">
        <Typography variant="body-2">Updated: {{ formatTaskListItemDate(updatedAt) }}</Typography>
      </template>
    </Box>
  </CardFooter>
</template>
