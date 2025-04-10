<script setup lang="ts">
import { DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { cn } from '@/libs/utils'

const { class: className, ...props } = defineProps<{
  class?: string
}>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <DialogTrigger as-child>
          <Button
            variant="ghost"
            size="sm"
            :class="cn('bg-accent hover:bg-accent/80 rounded-md p-1', className)"
            v-bind="props"
          >
            <Plus class="size-5" />

            <slot v-if="$slots.default" />
          </Button>
        </DialogTrigger>
      </TooltipTrigger>

      <TooltipContent side="right">Create Task List</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
