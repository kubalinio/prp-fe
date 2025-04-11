<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Box } from '@/components/ui/box'

import { useTaskDetails } from './composables/use-task-details'
import { formatTaskListItemDate } from '@/libs/utils'

const { task, handleOpenChange, handleStartEdit } = useTaskDetails()
</script>

<template>
  <Sheet :default-open="true" @update:open="handleOpenChange">
    <SheetContent class="flex w-[calc(100%-3rem)] flex-col gap-8 overflow-y-auto">
      <SheetHeader>
        <SheetTitle>
          <span class="text-muted-foreground text-xs">{{ task?.listTitle }}</span>

          <br />

          {{ task?.title }}
        </SheetTitle>

        <SheetDescription class="sr-only">{{ task?.listTitle }} Details</SheetDescription>

        <div class="flex flex-col gap-2">
          <div
            class="[&>span]:text-muted-foreground flex items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter"
          >
            <Typography as="span" variant="subtitle-2">Status:</Typography>

            <!-- <TaskStatusButton status="{task.status}" /> -->
          </div>

          <div
            class="[&>span]:text-muted-foreground flex h-8 items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter"
          >
            <Typography as="span" variant="subtitle-2">Created At:</Typography>

            <Typography as="span" variant="body-2">
              {{ formatTaskListItemDate(task?.createdAt!) }}
            </Typography>
          </div>

          <div
            class="[&>span]:text-muted-foreground flex h-8 items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter"
          >
            <Typography as="span" variant="subtitle-2">Updated At:</Typography>

            <Typography as="span" variant="body-2">
              {{ formatTaskListItemDate(task?.updatedAt!) }}
            </Typography>
          </div>
        </div>

        <Separator />
      </SheetHeader>

      <Box class="flex flex-col gap-2 px-4">
        <Typography as="h5" variant="subtitle-2" class="text-muted-foreground">
          Description
        </Typography>

        <Box class="border-border overflow-hidden rounded-lg border p-4 text-pretty">
          <Typography as="p" variant="body-2"> {{ task?.description }} </Typography>
        </Box>
      </Box>

      <SheetFooter class="mt-auto">
        <Button variant="outline" class="flex-1" @click="handleOpenChange(false)">Cancel</Button>

        <Button variant="default" class="flex-1" @click="handleStartEdit">Edit</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
