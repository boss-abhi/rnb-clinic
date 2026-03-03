interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
  className?: string
  titleGradient?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
  className = '',
  titleGradient = false,
}: SectionHeaderProps) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-3 ${center ? 'mx-auto' : ''}`}>
          <span className="w-5 h-0.5 bg-brand-green rounded-full" aria-hidden="true" />
          <p className="section-eyebrow text-brand-green">{eyebrow}</p>
          <span className="w-5 h-0.5 bg-brand-green rounded-full" aria-hidden="true" />
        </div>
      )}
      <h2
        className={`font-display font-extrabold text-3xl md:text-4xl leading-tight tracking-tight ${
          titleGradient ? 'gradient-text-brand' : 'text-brand-neutral-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-brand-neutral-900/60 text-base md:text-lg leading-relaxed ${
            center ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
