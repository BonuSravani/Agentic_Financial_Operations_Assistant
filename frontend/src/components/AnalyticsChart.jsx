import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function AnalyticsChart({ analytics }) {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      <h2 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BarChart3 size={18} color="var(--status-green)" />
        Operational ROI & Performance Metrics
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        
        <div style={{ background: 'rgba(0, 242, 255, 0.05)', border: '1px solid rgba(0, 242, 255, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Auto-Resolution</span>
          <strong style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)' }}>{analytics?.automationRatePercentage || '85.0'}%</strong>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>Zero Human Touch</span>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Cost / Decision</span>
          <strong style={{ fontSize: '1.4rem', color: 'var(--status-green)' }}>${analytics?.costPerTicketUsd || '0.0024'}</strong>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>vs $4.50 Human Cost</span>
        </div>

        <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Avg Speed</span>
          <strong style={{ fontSize: '1.4rem', color: 'var(--accent-purple)' }}>{analytics?.avgResolutionTimeSec || 4.2}s</strong>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>vs 24h SLA</span>
        </div>

        <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Human Hours Saved</span>
          <strong style={{ fontSize: '1.4rem', color: 'var(--status-amber)' }}>{analytics?.humanHoursSaved || 12.5} hrs</strong>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>Shifted to Complex Cases</span>
        </div>

      </div>

    </div>
  );
}
