import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, Users, Link } from 'lucide-react';

export default function ApprovalInbox({ pendingApprovals, onRespondApproval }) {
  const [notesMap, setNotesMap] = useState({});

  if (!pendingApprovals || pendingApprovals.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-green)' }}>
          <CheckCircle size={18} /> Human Approval Inbox (0)
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          All high-risk tickets have been reviewed or auto-resolved by AI Supervisor.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      <h2 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-amber)' }}>
        <ShieldAlert size={18} /> Human-in-the-Loop Approvals ({pendingApprovals.length})
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '400px' }}>
        {pendingApprovals.map((ticket) => {
          const isDualMatch = ticket.crossMatchStatus === 'DUAL_MATCHED_DISPUTE';

          return (
            <div
              key={ticket.ticketId}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                background: isDualMatch ? 'rgba(0, 242, 255, 0.08)' : 'rgba(245, 158, 11, 0.05)',
                border: isDualMatch ? '1px solid var(--accent-cyan)' : '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  {ticket.customerName} ({ticket.ticketId})
                </strong>

                {isDualMatch && (
                  <span className="badge" style={{ background: 'rgba(0, 242, 255, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 242, 255, 0.4)' }}>
                    <Users size={12} /> DUAL-PARTY MATCH ({ticket.linkedTicketId})
                  </span>
                )}

                <span className="badge badge-high">
                  INR {ticket.amount?.toLocaleString()}
                </span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: '8px', fontSize: '0.8rem', borderLeft: isDualMatch ? '3px solid var(--accent-cyan)' : '3px solid var(--status-amber)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: isDualMatch ? 'var(--accent-cyan)' : 'var(--status-amber)', marginBottom: '0.2rem' }}>
                  PROPOSED ACTION: {ticket.actionProposed}
                </div>
                <p style={{ color: 'var(--text-muted)' }}>{ticket.issueDescription}</p>
                {ticket.txnId && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', display: 'block', marginTop: '0.3rem' }}>
                    <Link size={10} /> Linked Txn ID: {ticket.txnId}
                  </span>
                )}
              </div>

              <input
                type="text"
                placeholder="Manager review notes / rationale..."
                value={notesMap[ticket.ticketId] || ''}
                onChange={(e) => setNotesMap({ ...notesMap, [ticket.ticketId]: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-main)'
                }}
              />

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                  onClick={() => onRespondApproval(ticket.ticketId, 'APPROVED', notesMap[ticket.ticketId])}
                >
                  <CheckCircle size={14} /> {isDualMatch ? 'Execute Reverse Settlement' : 'Approve Action'}
                </button>
                <button
                  className="btn btn-danger"
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                  onClick={() => onRespondApproval(ticket.ticketId, 'REJECTED', notesMap[ticket.ticketId])}
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
