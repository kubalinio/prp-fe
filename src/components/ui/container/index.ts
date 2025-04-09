import { cva, type VariantProps } from 'class-variance-authority'

export { default as Container } from './container.vue'

export const containerVariants = cva('mx-auto', {
  variants: {
    variant: {
      default: 'container mx-auto sm:px-6 lg:px-8',
      'without-style': 'px-0 sm:px-0 lg:px-0',
      'breakpoint-padded': 'container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-12 lg:pt-6',
      'narrow-constrained-padded': 'max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8',
    },
  },
  defaultVariants: {
    variant: 'breakpoint-padded',
  },
})

export type ContainerVariants = VariantProps<typeof containerVariants>
