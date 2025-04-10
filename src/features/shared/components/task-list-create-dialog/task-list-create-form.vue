<script setup lang="ts">
import { useForm } from 'vee-validate'
import { DialogFooter } from '@/components/ui/dialog'

import { ControlledInputField } from '@/components/common/controlled-form-fields'
import { CreateTaskListSchema } from '@/api/actions/tasks/task.validators'
import { Button } from '@/components/ui/button'
import type { CreateTaskListInput } from '@/api/actions/tasks/task.types'
import { toTypedSchema } from '@vee-validate/zod'

const form = useForm({
  validationSchema: toTypedSchema(CreateTaskListSchema),
})

const emit = defineEmits<{
  (e: 'submit', values: CreateTaskListInput): void
}>()

const onSubmit = form.handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <ControlledInputField name="title" label="Title" />

    <DialogFooter>
      <Button type="submit"> Submit </Button>
    </DialogFooter>
  </form>
</template>
