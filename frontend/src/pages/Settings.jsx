import { useState, useEffect } from 'react'

function SettingsSection({ icon, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-surface-container-lowest rounded-xl ghost-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
          <h3 className="text-sm font-bold text-on-surface">{title}</h3>
        </div>
        <span className={`material-symbols-outlined text-on-surface-variant text-lg transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-5 pb-5 pt-0">
          {children}
        </div>
      </div>
    </div>
  )
}

function ToggleSwitch({ label, description, defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-center justify-between py-3 gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-on-surface">{label}</p>
        {description && <p className="text-xs text-on-surface-variant mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

function InputField({ label, value, type = 'text', placeholder }) {
  const [val, setVal] = useState(value || '')

  return (
    <div className="py-3">
      <label className="text-[0.6875rem] uppercase tracking-wider text-on-surface-variant font-medium">{label}</label>
      <div className="mt-1.5 relative">
        <input
          type={type}
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none border-b-2 border-transparent focus:border-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/40"
        />
      </div>
    </div>
  )
}

function SelectField({ label, options, defaultValue }) {
  const [val, setVal] = useState(defaultValue || options[0])

  return (
    <div className="py-3">
      <label className="text-[0.6875rem] uppercase tracking-wider text-on-surface-variant font-medium">{label}</label>
      <select
        value={val}
        onChange={e => setVal(e.target.value)}
        className="mt-1.5 w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-sm text-on-surface outline-none border-b-2 border-transparent focus:border-primary focus:bg-surface-container-lowest transition-all appearance-none cursor-pointer"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function Settings() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <div className={`p-8 max-w-[900px] mx-auto transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[2rem] font-extrabold text-on-surface tracking-tight">System Preferences</h1>
        <p className="text-sm text-on-surface-variant mt-1 leading-relaxed max-w-xl">
          Configure the operational parameters and redistribution protocols for The Living Ledger ecosystem. All changes are logged for integrity audits.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-1 bg-surface-container-low rounded-xl p-1 mb-8 overflow-x-auto">
        {['Overview', 'History', 'Sustainability'].map((tab, i) => (
          <button key={tab} className={`flex-1 min-w-[120px] py-2.5 rounded-lg text-sm font-medium transition-all ${i === 0 ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        <SettingsSection icon="person" title="Profile Management" defaultOpen={true}>
          <div className="flex items-center gap-5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary text-xl font-bold">
              AR
            </div>
            <div>
              <p className="text-base font-bold text-on-surface">Alex Rivera</p>
              <p className="text-xs text-on-surface-variant">Canteen Manager • ID #402</p>
              <button className="text-xs text-primary font-medium mt-1 hover:underline">Change Avatar</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField label="Full Name" value="Alex Rivera" />
            <InputField label="Email" value="alex.rivera@ledger.org" type="email" />
            <InputField label="Phone" value="+1 (555) 042-1988" type="tel" />
            <SelectField label="Role" options={['Canteen Manager', 'Fleet Coordinator', 'Admin', 'Observer']} />
          </div>
        </SettingsSection>

        <SettingsSection icon="share" title="Data Portability">
          <p className="text-xs text-on-surface-variant mb-4">Export or import your operational data for auditing and compliance purposes.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-primary-gradient text-on-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
              <span className="material-symbols-outlined text-sm">download</span>
              Export All Data
            </button>
            <button className="bg-surface-container-high text-on-surface-variant px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-sm">upload</span>
              Import Dataset
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['CSV', 'JSON', 'PDF'].map(f => (
              <div key={f} className="bg-surface-container-low rounded-xl p-3 text-center">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">description</span>
                <p className="text-xs font-medium text-on-surface mt-1">{f} Format</p>
              </div>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection icon="settings_input_component" title="System Parameters">
          <div className="space-y-1">
            <SelectField label="Surplus Threshold" options={['10kg (Aggressive)', '25kg (Standard)', '50kg (Conservative)']} defaultValue="25kg (Standard)" />
            <SelectField label="Prediction Model" options={['Neural V4.2 (Recommended)', 'Neural V3.8', 'Statistical Baseline']} />
            <ToggleSwitch label="Auto-Redistribution" description="Automatically assign surplus to nearest NGO" defaultChecked={true} />
            <ToggleSwitch label="Real-time Sensor Sync" description="Continuous cold-chain monitoring integration" defaultChecked={true} />
            <ToggleSwitch label="Predictive Route Optimization" description="AI-driven fleet routing adjustments" defaultChecked={false} />
          </div>
        </SettingsSection>

        <SettingsSection icon="notifications_active" title="Communication Channels">
          <div className="space-y-1">
            <ToggleSwitch label="Email Notifications" description="Receive alerts via email" defaultChecked={true} />
            <ToggleSwitch label="SMS Alerts" description="Critical notifications via text message" defaultChecked={false} />
            <ToggleSwitch label="In-App Push Notifications" description="Browser push notifications for live updates" defaultChecked={true} />
            <ToggleSwitch label="NGO Partner Broadcasts" description="Automated surplus notifications to partner network" defaultChecked={true} />
          </div>
        </SettingsSection>

        {/* Danger Zone */}
        <div className="bg-error-container/15 rounded-xl p-5 border border-error/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-error text-xl">warning</span>
            <h3 className="text-sm font-bold text-error">Danger Zone</h3>
          </div>
          <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
            Irreversible actions that affect the core ledger state. Wipe operations are logged for security.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <button className="bg-error/10 text-error px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-error/20 transition-colors">
              Reset Predictions
            </button>
            <button className="bg-error/10 text-error px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-error/20 transition-colors">
              Purge Activity Logs
            </button>
            <button className="bg-error text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-error/90 transition-colors">
              Wipe All Data
            </button>
          </div>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-outline-variant/15">
        <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">
          Discard Changes
        </button>
        <button className="btn-primary-gradient text-on-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all">
          Save Preferences
        </button>
      </div>
    </div>
  )
}
