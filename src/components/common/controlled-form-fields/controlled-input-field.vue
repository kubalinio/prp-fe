<script setup lang="ts">
import { useField } from 'vee-validate'

import { cn } from '@/libs/utils'

import { Input, type InputProps } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import type { ControlledProps } from './controlled-form-fields.type'

interface InputControlledProps extends InputProps, ControlledProps {
  fullWidth?: boolean
}

const { name, label, description, labelSrOnly, fullWidth } = withDefaults(
  defineProps<InputControlledProps>(),
  {
    labelSrOnly: false,
    fullWidth: false,
  },
)
const { meta } = useField(name)
</script>

<template>
  <FormField :name="name" v-slot="{ componentField }" :validate-on-blur="!meta.dirty">
    <FormItem :class="cn('relative w-full', { 'w-full': fullWidth })">
      <div class="group relative w-full space-y-1.5">
        <FormLabel
          :class="
            cn(
              'has-[+input:not(:placeholder-shown)):-translate-y-1/2 origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground',
              { 'sr-only': labelSrOnly },
            )
          "
        >
          <span class="inline-flex bg-background px-2"> {{ label }} </span></FormLabel
        >

        <FormControl>
          <Input v-bind="{ ...componentField }" />
        </FormControl>
      </div>

      <FormDescription v-if="Boolean(description)">{{ description }}</FormDescription>

      <FormMessage />
    </FormItem>
  </FormField>
</template>
