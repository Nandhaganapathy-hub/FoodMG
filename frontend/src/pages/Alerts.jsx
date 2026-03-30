import { useState, useEffect } from 'react'

function AlertCard({ type, icon, title, description, time, actions }) {
  const typeConfig = {
    critical: { bg: 'bg-error-container/30', border: 'border-l-4 border-error', iconColor: 'text-error' },
    warning: { bg: 'bg-tertiary-fixed/20', border: 'border-l-4 border-tertiary', iconColor: 'text-tertiary' },
    info: { bg: 'bg-surface-container-low', border: 'border-l-4 border-secondary', iconColor: 'text-secondary' },
  }
  const cfg = typeConfig[type] || typeConfig.info

  return (
    <div className={`rounded-xl p-4 ${cfg.bg} ${cfg.border} transition-all duration-200 hover:shadow-md hover:shadow-on-surface/4`}>
      <div className="flex items-start gap-3">
        <span className={`material-symbols-outlined text-xl mt-0.5 ${cfg.iconColor}`}>{icon}</span>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-bold text-on-surface">{title}</h4>
            <span className="text-[0.625rem] text-on-surface-variant">{time}</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{description}</p>
          {actions && (
            <div className="flex gap-2 mt-3">
              {actions.map((a, i) => (
                <button key={i} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${i === 0 ? 'btn-primary-gradient text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'}`}>
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NetworkHealth() {
  const metrics = [
    { label: 'API Uptime', value: 99.7, status: 'healthy' },
    { label: 'Sensor Grid', value: 94.2, status: 'healthy' },
    { label: 'Fleet Comms', value: 88.5, status: 'warning' },
    { label: 'NGO Gateway', value: 97.1, status: 'healthy' },
  ]

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-on-surface">Network Health</h3>
        <span className="text-[0.625rem] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">Live</span>
      </div>
      <div className="space-y-4">
        {metrics.map(m => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-on-surface-variant">{m.label}</span>
              <span className={`font-bold ${m.status === 'healthy' ? 'text-primary' : 'text-tertiary'}`}>{m.value}%</span>
            </div>
            <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${m.status === 'healthy' ? 'bg-gradient-to-r from-primary to-primary-fixed' : 'bg-gradient-to-r from-tertiary to-tertiary-fixed-dim'}`} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityLogs() {
  const logs = [
    { icon: 'local_shipping', text: 'Vehicle TR-42 loaded from North Canteen.', time: '2m ago' },
    { icon: 'inventory_2', text: 'Global inventory ledger updated successfully.', time: '8m ago' },
    { icon: 'group_add', text: 'Green Leaf Co. joined the redistribution chain.', time: '15m ago' },
    { icon: 'route', text: 'Route optimization completed for Zone B-12.', time: '22m ago' },
    { icon: 'verified', text: 'Daily Bread verified compliance documents.', time: '45m ago' },
  ]

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-on-surface-variant text-xl">history</span>
        <h3 className="text-base font-bold text-on-surface">Activity Logs</h3>
      </div>
      <div className="space-y-3">
        {logs.map((l, i) => (
          <div key={i} className="flex items-start gap-3 py-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-sm text-on-surface-variant">{l.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-on-surface leading-snug">{l.text}</p>
              <p className="text-[0.625rem] text-on-surface-variant mt-0.5">{l.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DeploymentBanner() {
  return (
    <div className="bg-gradient-to-r from-primary-container to-primary rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-primary text-2xl">local_shipping</span>
        </div>
        <div>
          <p className="text-sm font-bold text-on-primary">Active Deployments</p>
          <p className="text-xs text-on-primary/70">12 Vehicles in Transit across Metro Area</p>
        </div>
      </div>
      <button className="bg-white/20 backdrop-blur-sm text-on-primary text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition-colors shrink-0">
        View Fleet
      </button>
    </div>
  )
}

export default function Alerts() {
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState('all')
  useEffect(() => { setLoaded(true) }, [])

  const criticalAlerts = [
    { type: 'critical', icon: 'priority_high', title: 'Surplus Alert', description: 'Canteen #4: 50kg perishable surplus unassigned. Immediate redistribution required.', time: '3m ago', actions: ['Assign NGO', 'Dismiss'] },
    { type: 'critical', icon: 'sensors_off', title: 'Sensor Failure', description: 'Refrigeration Unit TR-204 signal lost. Cold chain integrity may be compromised.', time: '12m ago', actions: ['Dispatch Tech', 'Acknowledge'] },
    { type: 'critical', icon: 'block', title: 'NGO Refusal', description: 'Hope Shelter rejected Batch #881 (Capacity reached). Re-routing required.', time: '28m ago', actions: ['Re-route', 'Hold'] },
  ]

  const warnings = [
    { type: 'warning', icon: 'thermostat', title: 'Temperature Drift', description: 'Storage unit B-07 trending 2°C above threshold. Monitor closely.', time: '1h ago' },
    { type: 'warning', icon: 'schedule', title: 'Late Pickup', description: 'Scheduled pickup at North Canteen delayed by 20 minutes.', time: '1.5h ago' },
  ]

  const filters = ['all', 'critical', 'warnings', 'info']

  return (
    <div className={`p-8 max-w-[1400px] mx-auto transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[2rem] font-extrabold text-on-surface tracking-tight">System Alerts</h1>
          <p className="text-sm text-on-surface-variant mt-1">Real-time monitoring of the food redistribution chain</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3.5 py-2 rounded-xl capitalize transition-colors ${filter === f ? 'btn-primary-gradient text-on-primary' : 'bg-surface-container-lowest ghost-border text-on-surface-variant hover:text-on-surface'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Critical Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-error text-lg">priority_high</span>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Critical Exceptions</h3>
              <span className="text-[0.625rem] bg-error-container text-error font-bold px-2 py-0.5 rounded-full">{criticalAlerts.length}</span>
            </div>
            <div className="space-y-3">
              {criticalAlerts.map((a, i) => <AlertCard key={i} {...a} />)}
            </div>
          </div>

          {/* Warnings Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-tertiary text-lg">warning_amber</span>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">System Warnings</h3>
            </div>
            <div className="space-y-3">
              {warnings.map((a, i) => <AlertCard key={i} {...a} />)}
            </div>
          </div>

          <DeploymentBanner />
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          <NetworkHealth />
          <ActivityLogs />
        </div>
      </div>
    </div>
  )
}
