import React from 'react';
import { LayoutDashboard, Lock, BarChart3, PlusCircle, Presentation } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'console', label: 'Operations Console', icon: LayoutDashboard },
    { id: 'privacy', label: 'PII Privacy Inspector', icon: Lock },
    { id: 'analytics', label: 'Enterprise Analytics', icon: BarChart3 },
    { id: 'create', label: 'Create Ticket', icon: PlusCircle },
    { id: 'pitch', label: 'Hackathon Pitch Deck', icon: Presentation },
  ];

  return (
    <nav className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.1rem',
              borderRadius: '10px',
              fontFamily: 'var(--font-main)',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              border: isActive ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              background: isActive ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.15), rgba(59, 130, 246, 0.15))' : 'transparent',
              color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon size={16} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
