'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-extrabold text-brand-blue/20 mb-4" aria-hidden="true">!</p>
        <h2 className="text-3xl font-bold text-brand-neutral-900 mb-3">Something Went Wrong</h2>
        <p className="text-brand-neutral-900/60 mb-8">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors"
          >
            Try Again
          </button>
          <Link href="/" className="px-6 py-3 border border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue/5 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
