import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items, className = '' }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-neutral-900/60">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className="select-none">/</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-brand-blue transition-colors">{item.label}</Link>
            ) : (
              <span className={i === items.length - 1 ? 'text-brand-neutral-900 font-medium' : ''}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
