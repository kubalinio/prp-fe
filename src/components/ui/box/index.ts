import { cva, type VariantProps } from 'class-variance-authority'

export { default as Box } from './box.vue'

export const boxVariants = cva('', {
  variants: {
    variant: {
      default: '',
      card: 'border-border rounded-[1.25rem] border-2',
    },
    padding: {
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
      xl: 'p-8',
      '2xl': 'p-10',
    },
    mx: {
      sm: 'mx-4',
      md: 'mx-5',
      lg: 'mx-6',
      xl: 'mx-8',
      '2xl': 'mx-10',
    },
    my: {
      sm: 'my-4',
      md: 'my-5',
      lg: 'my-6',
      xl: 'my-8',
      '2xl': 'my-10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type BoxVariants = VariantProps<typeof boxVariants>
