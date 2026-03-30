import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Predictor from './pages/Predictor'
import NGOs from './pages/NGOs'
import Logistics from './pages/Logistics'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar mobileOpen={isMobileMenuOpen} setMobileOpen={setIsMobileMenuOpen} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Top App Bar */}
        <div className="md:hidden flex shrink-0 items-center justify-between p-4 bg-surface-container-lowest border-b border-surface-container/50 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-xl hover:bg-surface-container active:bg-surface-container-high transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-sm">eco</span>
              </div>
              <span className="font-bold text-sm tracking-tight text-on-surface">Living Ledger</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const root = document.documentElement;
                if (root.classList.contains('dark')) {
                  root.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } else {
                  root.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
              }}
              className="p-1.5 rounded-xl hover:bg-surface-container text-on-surface"
            >
              <span className="material-symbols-outlined text-xl">palette</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface ring-2 ring-primary/20 shrink-0">
              AR
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-y-none">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predictor" element={<Predictor />} />
            <Route path="/ngos" element={<NGOs />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
