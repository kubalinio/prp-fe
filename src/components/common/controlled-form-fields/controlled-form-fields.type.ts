import type { HTMLAttributes } from 'vue'

interface ControlledProps {
  name: string
  label: string
  description?: string
  placeholder?: string
  labelSrOnly?: boolean
  className?: HTMLAttributes['class']
}

export type { ControlledProps }
