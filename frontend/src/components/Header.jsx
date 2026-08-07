import React from 'react';
import { ShieldCheck, Cpu, DollarSign, Clock, Zap } from 'lucide-react';

export default function Header({ analytics }) {
  return (
    <header className="glass-panel" style={{ padding: '1.25rem 1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #00f2ff, #3b82f6)',
            padding: '0.6rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 255, 0.4)'
          }}>
            <ShieldCheck size={28} color="#000" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: '700', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #fff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              FinOps Agentic Platform
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-green)', display: 'inline-block', boxShadow: '0 0 8px var(--status-green)' }}></span>
              Spring Boot Multi-Agent Engine • RBI / DPDP Privacy Sanitized
            </p>
          </div>
        </div>

        {/* Analytics Top Stats Bar */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Zap size={18} color="var(--accent-cyan)" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Auto-Resolution</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{analytics?.automationRatePercentage || '85.0'}%</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <DollarSign size={18} color="var(--status-green)" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Avg Cost / Decision</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--status-green)' }}>${analytics?.costPerTicketUsd || '0.0024'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={18} color="var(--accent-purple)" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Hours Saved</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--accent-purple)' }}>{analytics?.humanHoursSaved || '12.5'} hrs</strong>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
