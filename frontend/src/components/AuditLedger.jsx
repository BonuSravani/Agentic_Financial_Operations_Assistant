import React from 'react';
import { FileText, DollarSign, Layers } from 'lucide-react';

export default function AuditLedger({ auditLogs }) {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} color="var(--accent-purple)" />
          Auditability Ledger ({auditLogs.length})
        </h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '4px' }}>
        {auditLogs.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem 0' }}>
            No audit records logged yet. Process a ticket to populate audit trails.
          </div>
        )}

        {auditLogs.map((log) => (
          <div
            key={log.id || Math.random()}
            style={{
              padding: '0.75rem 0.85rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.8rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span style={{ fontWeight: '600', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                {log.ticketId} • {log.agentName}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--status-green)', fontFamily: 'var(--font-mono)' }}>
                ${log.estimatedCostUsd != null ? log.estimatedCostUsd.toFixed(4) : '0.0004'}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              Action: {log.actionType}
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.45' }}>
              {log.plainLanguageRationale}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
