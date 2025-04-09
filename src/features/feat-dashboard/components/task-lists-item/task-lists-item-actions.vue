<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const { id } = defineProps<{
  id: string
}>()

const router = useRouter()

const handleRedirectToDetails = () => {
  router.push({
    path: `/task-lists/${id}`,
  })
}

const handleRedirectToEdit = () => {
  router.push({
    path: `/task-lists/${id}/edit`,
  })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <div class="absolute top-4 right-4 flex justify-end">
        <Button
          variant="ghost"
          class="text-muted-foreground/60 p-1 shadow-none md:p-1.5"
          aria-label="Edit item"
        >
          <MoreHorizontal class="size-5" aria-hidden="true" />
        </Button>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-auto">
      <DropdownMenuGroup>
        <DropdownMenuItem @click="handleRedirectToDetails"> Details </DropdownMenuItem>

        <DropdownMenuItem @click="handleRedirectToEdit"> Edit </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          @click="$emit('deleteTaskList', id)"
          variant="destructive"
          class="dark:data-[variant=destructive]:focus:bg-destructive/10 cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
