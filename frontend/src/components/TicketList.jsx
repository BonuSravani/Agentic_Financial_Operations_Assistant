import React from 'react';
import { Inbox, Play, RefreshCw } from 'lucide-react';

export default function TicketList({ tickets, selectedTicket, onSelectTicket, onProcessTicket }) {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Inbox size={18} color="var(--accent-cyan)" />
          Operations Queue ({tickets.length})
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
        {tickets.map((t) => {
          const isSelected = selectedTicket?.ticketId === t.ticketId;
          const isPending = t.status === 'PENDING';
          const isHitl = t.status === 'AWAITING_APPROVAL';

          return (
            <div
              key={t.ticketId}
              onClick={() => onSelectTicket(t)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                background: isSelected ? 'rgba(0, 242, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                  {t.ticketId}
                </span>
                <span className={`badge badge-${(t.riskLevel || 'LOW').toLowerCase()}`}>
                  {t.riskLevel || 'LOW'} RISK
                </span>
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem' }}>
                {t.customerName}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {t.issueDescription}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', gap: '0.5rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>INR {t.amount?.toLocaleString()}</strong>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {!isPending && (
                    <span style={{ fontSize: '0.7rem', color: isHitl ? 'var(--status-amber)' : 'var(--status-green)', fontWeight: '600' }}>
                      {t.status}
                    </span>
                  )}

                  <button
                    className="btn btn-primary"
                    style={{ padding: '0.3rem 0.65rem', fontSize: '0.7rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProcessTicket(t.ticketId);
                    }}
                  >
                    {isPending ? <Play size={12} /> : <RefreshCw size={12} />}
                    {isPending ? 'Run Agents' : 'Re-run'}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
