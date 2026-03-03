import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-extrabold text-brand-blue/20 mb-4" aria-hidden="true">404</p>
        <h1 className="text-3xl font-bold text-brand-neutral-900 mb-3">Page Not Found</h1>
        <p className="text-brand-neutral-900/60 mb-8">
          Sorry, we couldn&apos;t find the page you were looking for. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors">
            Go Home
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue/5 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
