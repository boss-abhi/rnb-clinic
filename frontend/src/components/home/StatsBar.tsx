const STATS = [
  { value: '10+', label: 'Years of Experience', icon: '📅' },
  { value: '5,000+', label: 'Patients Treated', icon: '🏥' },
  { value: '50+', label: 'Conditions Managed', icon: '🔬' },
  { value: '98%', label: 'Patient Satisfaction', icon: '⭐' },
]

export default function StatsBar() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden" aria-label="Clinic highlights">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-brand" aria-hidden="true" />
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {STATS.map(({ value, label, icon }, i) => (
            <div
              key={label}
              className={`text-center ${i < 3 ? 'md:border-r md:border-white/15' : ''}`}
            >
              <div className="text-2xl mb-2" aria-hidden="true">{icon}</div>
              <p className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {value}
              </p>
              <p className="text-white/70 text-sm font-medium mt-1 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
