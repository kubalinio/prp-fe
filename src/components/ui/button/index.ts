import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'focus-visible:ring-primary-50 focus-visible:ring-offset-primary-50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-[0.9375rem] leading-6 font-semibold whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground focus-visible:bg-primary-50 disabled:bg-black-25 hover:bg-primary/90 focus-visible:ring-primary-50 focus-visible:ring-offset-primary-50 p-0',
        secondary:
          'bg-accent text-accent-foreground hover:bg-accent-50 focus-visible:ring-accent-50 focus-visible:ring-offset-accent-50',
        destructive:
          'border-destructive bg-background text-destructive hover:border-destructive/90 hover:text-destructive/90 rounded-none border-b text-lg',
        outline: 'hover:bg-white-50 hover:text-black-100',
        ghost:
          'hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent-50 focus-visible:ring-offset-accent-50',
        link: 'text-primary underline-offset-4 hover:underline',
        action:
          'bg-white-50 hover:bg-white-25 [&_svg]:text-black-75 size-full flex-col rounded-[0.625rem] focus-visible:ring-4 focus-visible:ring-inset disabled:opacity-25 [&_svg]:size-32',
      },
      size: {
        default: 'px-8 py-2',
        sm: 'rounded-md px-8 py-1',
        lg: 'rounded-md px-8 py-2',
        icon: 'size-10',
        link: 'px-2 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
