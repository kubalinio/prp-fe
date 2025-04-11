<script setup lang="ts">
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { Plus } from 'lucide-vue-next'

import { useListDetails } from '../../composables/use-list-details'
import { Button } from '@/components/ui/button'
import { Box } from '@/components/ui/box'

const { taskList } = useListDetails()

const handleOpenModal = () => {
  console.log('open sidebar')
}
</script>

<template>
  <Container
    variant="without-style"
    className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row"
  >
    <Typography as="h1" variant="h5" className="shrink-0 text-left">
      {{ taskList?.title }}
    </Typography>

    <Box className="flex w-full flex-row items-center justify-end gap-4">
      <Button variant="default" class="px-4" @click="handleOpenModal">
        <Plus className="h-4 w-4" />
        Add Task
      </Button>
    </Box>
  </Container>
</template>
