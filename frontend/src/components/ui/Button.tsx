import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-blue text-white hover:bg-brand-blue-dark focus-visible:ring-brand-blue',
  secondary: 'bg-brand-green text-white hover:bg-brand-green-dark focus-visible:ring-brand-green',
  ghost: 'bg-transparent text-brand-blue hover:bg-brand-neutral-100 focus-visible:ring-brand-blue',
  outline: 'border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-white focus-visible:ring-brand-blue',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
}

export default function Button({ variant = 'primary', size = 'md', href, external, className = '', children, ...props }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    if (external) {
      return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
    }
    return <Link href={href} className={cls}>{children}</Link>
  }

  return <button className={cls} {...props}>{children}</button>
}
