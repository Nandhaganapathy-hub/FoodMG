import { useState, useEffect } from 'react'

function FleetStat({ value, label, icon, accent }) {
  return (
    <div className={`rounded-xl p-5 ${accent ? 'bg-gradient-to-br from-primary to-primary-container' : 'bg-surface-container-lowest ghost-border'}`}>
      <span className={`material-symbols-outlined text-xl mb-2 ${accent ? 'text-on-primary/70' : 'text-primary'}`}>{icon}</span>
      <p className={`text-2xl font-bold ${accent ? 'text-on-primary' : 'text-on-surface'}`}>{value}</p>
      <p className={`text-[0.625rem] uppercase tracking-wider mt-0.5 ${accent ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>{label}</p>
    </div>
  )
}

function DeliveryCard({ name, items, weight, status, eta }) {
  const statusConfig = {
    'In Transit': { color: 'bg-secondary/10 text-secondary', icon: 'local_shipping' },
    'Loading': { color: 'bg-tertiary-fixed text-tertiary', icon: 'inventory' },
    'Queued': { color: 'bg-surface-container-high text-on-surface-variant', icon: 'schedule' },
  }
  const cfg = statusConfig[status] || statusConfig['Queued']

  return (
    <div className="bg-surface-container-lowest rounded-xl p-4 ghost-border hover:shadow-md hover:shadow-on-surface/4 transition-all duration-200 group relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">{cfg.icon}</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">{name}</h4>
            <p className="text-xs text-on-surface-variant">{items} • {weight}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-[0.625rem] uppercase font-bold px-2 py-0.5 rounded-full ${cfg.color}`}>{status}</span>
          {eta && <p className="text-[0.625rem] text-on-surface-variant mt-1">ETA: {eta}</p>}
        </div>
      </div>
    </div>
  )
}

function DriverCard({ name, vehicle, status, avatar }) {
  const statusColor = status === 'Active' ? 'bg-primary' : status === 'Idle' ? 'bg-secondary' : 'bg-outline-variant'

  return (
    <div className="bg-surface-container-lowest rounded-xl p-4 ghost-border flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/10 to-primary-fixed/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-on-surface truncate">{name}</p>
        <p className="text-xs text-on-surface-variant">{vehicle}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${statusColor}`} />
        <span className="text-xs text-on-surface-variant">{status}</span>
      </div>
    </div>
  )
}

export default function Logistics() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  const deliveries = [
    { name: 'Community Kitchen', items: 'Fresh Produce', weight: '45kg', status: 'In Transit', eta: '25min' },
    { name: 'Hope Shelter', items: 'Baked Goods', weight: '12kg', status: 'Loading', eta: null },
    { name: 'St. Jude Outreach', items: 'Perishables', weight: '28kg', status: 'Queued', eta: null },
  ]

  const drivers = [
    { name: 'Jordan D.', vehicle: 'EV-Transit #402', status: 'Active', avatar: 'JD' },
    { name: 'Sarah M.', vehicle: 'EV-Transit #118', status: 'Active', avatar: 'SM' },
    { name: 'Ray L.', vehicle: 'EV-Transit #309', status: 'Idle', avatar: 'RL' },
    { name: 'Vehicle 501', vehicle: 'EV-Transit #501', status: 'Offline', avatar: 'V5' },
  ]

  return (
    <div className={`p-8 max-w-[1400px] mx-auto transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[2rem] font-extrabold text-on-surface tracking-tight">Redistribution Hub</h1>
          <p className="text-sm text-on-surface-variant mt-1">Active Fleet: <span className="font-semibold text-primary">12 vehicles</span></p>
        </div>
        <button className="btn-primary-gradient text-on-primary px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 w-fit">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          New Dispatch
        </button>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <FleetStat value="8" label="Active Deliveries" icon="local_shipping" accent />
        <FleetStat value="34m" label="Avg. Route Time" icon="timer" />
        <FleetStat value="85kg" label="Waste Diverted Today" icon="recycling" />
        <FleetStat value="2" label="Critical Alerts" icon="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Delivery Queue */}
        <div className="lg:col-span-3">
          <h3 className="text-lg font-bold text-on-surface mb-4">Delivery Queue</h3>
          <div className="space-y-3">
            {deliveries.map(d => <DeliveryCard key={d.name} {...d} />)}
          </div>

          {/* Route Map */}
          <div className="mt-6 bg-surface-container-lowest rounded-xl p-6 ghost-border">
            <h3 className="text-base font-bold text-on-surface mb-4">Active Route Map</h3>
            <div className="relative h-48 rounded-xl bg-surface-container overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <svg className="w-full h-full" viewBox="0 0 600 200">
                {/* Routes */}
                <path d="M80,100 C150,40 250,160 350,80 S500,50 550,100" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary/60" strokeLinecap="round" />
                <path d="M80,100 C130,130 200,140 280,120" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="text-secondary/40" />
                {/* Stops */}
                {[
                  { x: 80, y: 100, label: 'Depot', main: true },
                  { x: 200, y: 130, label: 'Community Kitchen' },
                  { x: 350, y: 80, label: 'Hope Shelter' },
                  { x: 500, y: 70, label: 'St. Jude' },
                ].map((s, i) => (
                  <g key={i}>
                    <circle cx={s.x} cy={s.y} r={s.main ? 10 : 7} className={s.main ? 'fill-primary' : 'fill-secondary'} />
                    {s.main && <circle cx={s.x} cy={s.y} r="16" className="fill-primary/15 animate-pulse" />}
                    <text x={s.x} y={s.y + 20} textAnchor="middle" className="fill-on-surface text-[8px] font-medium">{s.label}</text>
                  </g>
                ))}
                {/* Vehicle icon */}
                <g>
                  <rect x="240" y="88" width="18" height="11" rx="3" className="fill-tertiary-container" />
                  <text x="249" y="97" textAnchor="middle" className="fill-on-tertiary-container text-[6px] font-bold">EV</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Fleet Status */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-on-surface mb-4">Fleet Operational Status</h3>
          <div className="space-y-3">
            {drivers.map(d => <DriverCard key={d.name} {...d} />)}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-surface-container-lowest rounded-xl p-5 ghost-border">
            <h4 className="text-sm font-bold text-on-surface mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: 'refresh', label: 'Re-optimize' },
                { icon: 'pause_circle', label: 'Hold Fleet' },
                { icon: 'map', label: 'Full Map' },
                { icon: 'analytics', label: 'Reports' },
              ].map(a => (
                <button key={a.label} className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm text-on-surface-variant hover:text-on-surface">
                  <span className="material-symbols-outlined text-lg">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
