import { useState, useEffect } from 'react'

function StatCard({ icon, label, value, subtext, accent = false }) {
  return (
    <div className={`rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:shadow-on-surface/4 group ${accent ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary' : 'bg-surface-container-lowest ghost-border'}`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`material-symbols-outlined text-2xl ${accent ? 'text-on-primary/70' : 'text-primary'}`}>{icon}</span>
        {accent && <span className="text-[0.625rem] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-medium">LIVE</span>}
      </div>
      <p className={`text-[0.6875rem] uppercase tracking-widest font-medium mb-1 ${accent ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>{label}</p>
      <p className={`text-2xl font-bold tracking-tight ${accent ? 'text-on-primary' : 'text-on-surface'}`}>{value}</p>
      <p className={`text-xs mt-1 ${accent ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>{subtext}</p>
    </div>
  )
}

function PredictionChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const predicted = [82, 78, 90, 85, 92, 70, 88]
  const actual = [80, 75, 88, 87, 90, 68, 85]
  const max = 100

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-on-surface">Prediction Accuracy</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Last 7 Days Footfall Analysis</p>
        </div>
        <div className="flex gap-4 text-[0.6875rem]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Predicted</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary" />Actual</span>
        </div>
      </div>
      <div className="flex items-end gap-3 h-40">
        {days.map((day, i) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex gap-1 items-end h-32">
              <div className="flex-1 rounded-t-md bg-primary/20 relative transition-all duration-700 ease-out" style={{ height: `${(predicted[i] / max) * 100}%` }}>
                <div className="absolute inset-x-0 bottom-0 rounded-t-md bg-primary" style={{ height: `${(actual[i] / predicted[i]) * 100}%` }} />
              </div>
              <div className="flex-1 rounded-t-md bg-secondary transition-all duration-700 ease-out" style={{ height: `${(actual[i] / max) * 100}%`, opacity: 0.3 }} />
            </div>
            <span className="text-[0.625rem] text-on-surface-variant font-medium">{day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DishSurplus() {
  const dishes = [
    { name: 'Paneer Curry', surplus: 12, unit: 'kg', risk: 'low' },
    { name: 'Rice Biryani', surplus: 8, unit: 'kg', risk: 'medium' },
    { name: 'Dal Makhani', surplus: 5, unit: 'kg', risk: 'low' },
    { name: 'Fresh Salad', surplus: 18, unit: 'kg', risk: 'high' },
    { name: 'Butter Naan', surplus: 2, unit: 'kg', risk: 'low' },
  ]
  const riskColors = { low: 'bg-primary/10 text-primary', medium: 'bg-secondary/10 text-secondary', high: 'bg-tertiary-container text-on-tertiary-container' }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-on-surface">Dish-Level Surplus</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Real-time dish estimates</p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-xl">restaurant</span>
      </div>
      <div className="space-y-3">
        {dishes.map(d => (
          <div key={d.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">lunch_dining</span>
              </div>
              <span className="text-sm font-medium text-on-surface">{d.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-on-surface">{d.surplus}{d.unit}</span>
              <span className={`text-[0.625rem] uppercase font-bold px-2 py-0.5 rounded-full ${riskColors[d.risk]}`}>{d.risk}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProximityMap() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-on-surface">NGO Proximity Map</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Live logistics & distribution network</p>
        </div>
        <span className="text-[0.625rem] bg-primary/10 text-primary font-bold px-2 py-1 rounded-full uppercase">Live</span>
      </div>
      <div className="relative h-52 rounded-xl bg-surface-container overflow-hidden">
        {/* Map placeholder with animated dots */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 28} x2="400" y2={i * 28} stroke="currentColor" strokeWidth="0.5" className="text-outline-variant/20" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="200" stroke="currentColor" strokeWidth="0.5" className="text-outline-variant/20" />
          ))}
          {/* Routes */}
          <path d="M100,80 Q150,40 200,70 T320,60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 3" className="text-primary/40" />
          <path d="M80,140 Q180,100 280,130" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 3" className="text-secondary/40" />
          {/* Nodes */}
          <g>
            <circle cx="100" cy="80" r="8" className="fill-primary animate-pulse" />
            <circle cx="100" cy="80" r="14" className="fill-primary/20" />
            <text x="100" y="105" textAnchor="middle" className="fill-on-surface text-[8px] font-medium">Canteen HQ</text>
          </g>
          <g>
            <circle cx="200" cy="70" r="6" className="fill-secondary" />
            <circle cx="200" cy="70" r="11" className="fill-secondary/20" />
            <text x="200" y="90" textAnchor="middle" className="fill-on-surface text-[8px] font-medium">Hope Foundation</text>
          </g>
          <g>
            <circle cx="320" cy="60" r="6" className="fill-primary-fixed-dim" />
            <circle cx="320" cy="60" r="11" className="fill-primary-fixed-dim/20" />
            <text x="320" y="80" textAnchor="middle" className="fill-on-surface text-[8px] font-medium">Green Kitchen</text>
          </g>
          <g>
            <circle cx="280" cy="130" r="6" className="fill-tertiary" />
            <circle cx="280" cy="130" r="11" className="fill-tertiary/20" />
            <text x="280" y="150" textAnchor="middle" className="fill-on-surface text-[8px] font-medium">Social Bread</text>
          </g>
          {/* Moving vehicle */}
          <g className="animate-pulse">
            <rect x="145" y="52" width="16" height="10" rx="2" className="fill-tertiary-container" />
            <text x="153" y="60" textAnchor="middle" className="fill-on-tertiary-container text-[6px] font-bold">EV</text>
          </g>
        </svg>
      </div>
    </div>
  )
}

function VerificationSteps() {
  const steps = [
    { label: 'Staff Confirmation', sublabel: 'Kitchen Surplus Logged', done: true },
    { label: 'Stage 3/4 Verification', sublabel: 'Quality Checked', done: true },
    { label: 'Pickup Ready State', sublabel: 'Stage 6 Readiness', done: false },
  ]

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <h4 className="text-sm font-bold text-on-surface mb-4">Verification Pipeline</h4>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${s.done ? 'bg-primary' : 'bg-surface-container-high'}`}>
                <span className={`material-symbols-outlined text-sm ${s.done ? 'text-on-primary' : 'text-on-surface-variant'}`}>
                  {s.done ? 'check' : 'hourglass_top'}
                </span>
              </div>
              {i < steps.length - 1 && <div className={`w-0.5 h-6 mt-1 ${s.done ? 'bg-primary/30' : 'bg-surface-container-high'}`} />}
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface">{s.label}</p>
              <p className="text-xs text-on-surface-variant">{s.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-on-surface-variant mt-4 leading-relaxed">Completion of these steps triggers automated notifications to NGO partners for pickup dispatch.</p>
    </div>
  )
}

function NGOAlerts() {
  const alerts = [
    { name: 'Hope Foundation', status: 'Confirmed', time: '12m ago', color: 'bg-primary' },
    { name: 'Green Kitchen', status: 'No Response', time: 'Sent 45m ago', color: 'bg-tertiary' },
    { name: 'Social Bread', status: 'Confirmed', time: '2h ago', color: 'bg-primary' },
  ]

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <h3 className="text-base font-bold text-on-surface mb-4">NGO Alerts</h3>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${a.color}`} />
              <div>
                <p className="text-sm font-medium text-on-surface">{a.name}</p>
                <p className="text-xs text-on-surface-variant">{a.status} • {a.time}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-lg">chevron_right</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <div className={`p-8 max-w-[1400px] mx-auto transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-[2rem] font-extrabold text-on-surface tracking-tight">Operations Dashboard</h1>
          <p className="text-sm text-on-surface-variant mt-1">Live System Status</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl px-4 py-2.5 ghost-border shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
            <input type="text" placeholder="Search operations..." className="bg-transparent text-sm text-on-surface outline-none w-full sm:w-48 placeholder:text-on-surface-variant/50" />
          </div>
          <button className="relative p-2.5 rounded-xl bg-surface-container-lowest ghost-border hover:bg-surface-container-high transition-colors hidden md:block shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full" />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon="group" label="Predicted Footfall" value="1,450" subtext="Students Expected Today" accent />
        <StatCard icon="scale" label="Estimated Surplus" value="45kg" subtext="±2.4kg Deviation Range" />
        <StatCard icon="handshake" label="NGO Matched" value="3 Partners" subtext="Pickup in 2h 15m" />
        <StatCard icon="restaurant" label="Meals Saved" value="90" subtext="+12% from Weekly Avg" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <PredictionChart />
        <DishSurplus />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProximityMap />
        <VerificationSteps />
        <NGOAlerts />
      </div>
    </div>
  )
}
