import type { LucideIcon } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'

export { default as Input } from './Input.vue'

export interface InputProps {
  defaultValue?: string | number
  modelValue?: string | number
  placeholder?: HTMLAttributes['placeholder']
  class?: HTMLAttributes['class']
  icon?: LucideIcon
}
