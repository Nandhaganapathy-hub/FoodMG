import { useState, useEffect } from 'react'

function ImpactMetric({ value, label, icon }) {
  return (
    <div className="text-center">
      <span className="material-symbols-outlined text-primary text-2xl mb-1">{icon}</span>
      <p className="text-2xl font-bold text-on-surface">{value}</p>
      <p className="text-[0.625rem] uppercase tracking-wider text-on-surface-variant mt-0.5">{label}</p>
    </div>
  )
}

function ConnectionMap() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-on-surface">Live Connection View</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Status: <span className="text-primary font-semibold">Operational</span></p>
        </div>
      </div>
      <div className="relative h-64 rounded-xl bg-surface-container overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <svg className="w-full h-full" viewBox="0 0 500 260">
          {/* Grid */}
          {[...Array(6)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="500" y2={i * 50} stroke="currentColor" strokeWidth="0.3" className="text-outline-variant/15" />
          ))}
          {/* Central Hub */}
          <circle cx="250" cy="130" r="24" className="fill-primary/10" />
          <circle cx="250" cy="130" r="16" className="fill-primary animate-pulse" />
          <text x="250" y="134" textAnchor="middle" className="fill-on-primary text-[7px] font-bold">HUB</text>
          {/* Connections */}
          {[
            { x: 80, y: 60, label: 'City Harvest', color: 'fill-secondary' },
            { x: 420, y: 50, label: 'Daily Bread', color: 'fill-primary-fixed-dim' },
            { x: 100, y: 200, label: 'Unity Kitchen', color: 'fill-tertiary' },
            { x: 380, y: 190, label: 'Hope Shelter', color: 'fill-secondary' },
            { x: 250, y: 30, label: 'Green Leaf Co.', color: 'fill-primary' },
          ].map((node, i) => (
            <g key={i}>
              <line x1="250" y1="130" x2={node.x} y2={node.y} stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-outline-variant/30" />
              <circle cx={node.x} cy={node.y} r="12" className={`${node.color}/20`} />
              <circle cx={node.x} cy={node.y} r="7" className={node.color} />
              <text x={node.x} y={node.y + 22} textAnchor="middle" className="fill-on-surface text-[7px] font-medium">{node.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

function GlobalImpact() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <h3 className="text-base font-bold text-on-surface mb-2">Global Impact</h3>
      <p className="text-xs text-on-surface-variant mb-6">Surplus redirected this month</p>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <ImpactMetric value="42" label="Active Hubs" icon="hub" />
        <ImpactMetric value="$128K" label="Est. Savings" icon="savings" />
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-on-surface-variant">Monthly Goal</span>
          <span className="font-bold text-on-surface">78%</span>
        </div>
        <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-fixed rounded-full transition-all duration-1000" style={{ width: '78%' }} />
        </div>
      </div>

      {/* Critical Delay Alert */}
      <div className="bg-tertiary-container/10 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-tertiary text-lg flex-shrink-0">warning</span>
          <div>
            <p className="text-sm font-bold text-on-surface">Critical Delay</p>
            <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
              Canteen-04 pickup delayed by 45m due to heavy traffic on Route 9. Cold storage priority activated.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PartnerCard({ name, description, frequency, score, status }) {
  const statusColors = {
    verified: 'bg-primary/10 text-primary',
    pending: 'bg-tertiary-fixed text-tertiary',
    new: 'bg-secondary/10 text-secondary',
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 ghost-border hover:shadow-lg hover:shadow-on-surface/4 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary-fixed/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">apartment</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">{name}</h4>
            <p className="text-xs text-on-surface-variant">{description}</p>
          </div>
        </div>
        <span className={`text-[0.625rem] uppercase font-bold px-2 py-0.5 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <div>
          <p className="text-[0.625rem] uppercase tracking-wider text-on-surface-variant">Frequency</p>
          <p className="text-sm font-semibold text-on-surface">{frequency}</p>
        </div>
        <div>
          <p className="text-[0.625rem] uppercase tracking-wider text-on-surface-variant">Impact Score</p>
          <p className="text-sm font-semibold text-on-surface">{score}</p>
        </div>
        <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs font-medium flex items-center gap-1">
          View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}

export default function NGOs() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  const partners = [
    { name: 'City Harvest', description: 'Regional distribution hub for perishables', frequency: 'Daily', score: '9.8/10', status: 'verified' },
    { name: 'Daily Bread', description: 'Community bakery and dry goods network', frequency: 'Weekly', score: '8.4/10', status: 'verified' },
    { name: 'Unity Kitchen', description: 'Hot meal program for urban shelters', frequency: 'TBD', score: 'N/A', status: 'new' },
  ]

  return (
    <div className={`p-8 max-w-[1400px] mx-auto transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[2rem] font-extrabold text-on-surface tracking-tight">NGO Network</h1>
          <p className="text-sm text-on-surface-variant mt-1">Coordinating real-time surplus distribution across 42 verified regional partners.</p>
        </div>
        <button className="btn-primary-gradient text-on-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 w-fit">
          <span className="material-symbols-outlined text-lg">person_add</span>
          Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <ConnectionMap />
        <GlobalImpact />
      </div>

      {/* Partner Verification Board */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-on-surface mb-4">Partner Verification Board</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map(p => <PartnerCard key={p.name} {...p} />)}
        </div>
      </div>
    </div>
  )
}
