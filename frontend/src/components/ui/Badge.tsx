type Variant = 'blue' | 'green' | 'neutral'

const variants: Record<Variant, string> = {
  blue: 'bg-brand-blue/10 text-brand-blue-dark',
  green: 'bg-brand-green/10 text-brand-green-dark',
  neutral: 'bg-brand-neutral-100 text-brand-neutral-900',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
