import React from 'react';
import { Cpu, ShieldCheck, Search, CreditCard, AlertOctagon, CheckCircle2, Bot, RefreshCw, Play } from 'lucide-react';

export default function AgentVisualizer({ ticket, agentLogs, isProcessing, onProcessTicket }) {
  if (!ticket) {
    return (
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
        <Bot size={48} color="rgba(255,255,255,0.2)" style={{ marginBottom: '1rem' }} />
        <p>Select a ticket from the left panel to inspect AI Agent Reasoning</p>
      </div>
    );
  }

  const agentsList = [
    { key: 'PRIVACY_GATEWAY', name: 'Privacy Gateway', icon: ShieldCheck, color: 'var(--status-green)', desc: 'RBI/DPDP PII Sanitizer' },
    { key: 'ROUTER_AGENT', name: 'Router Agent', icon: Cpu, color: 'var(--accent-cyan)', desc: 'Intent & Category Classifier' },
    { key: 'SUPPORT_AGENT', name: 'Support Agent', icon: Search, color: 'var(--accent-blue)', desc: 'Sentiment & Transcript Analyzer' },
    { key: 'PAYMENTS_AGENT', name: 'Payments Agent', icon: CreditCard, color: 'var(--accent-purple)', desc: 'Gateway Logs & Failure Codes' },
    { key: 'FRAUD_AGENT', name: 'Fraud Agent', icon: AlertOctagon, color: 'var(--status-amber)', desc: 'Velocity & Risk Score Calculator' },
    { key: 'SUPERVISOR_AGENT', name: 'Supervisor Agent', icon: CheckCircle2, color: 'var(--status-green)', desc: 'Self-Correction Policy Audit' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Agent Execution Pipeline — {ticket.ticketId}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Customer: <strong>{ticket.customerName}</strong> ({ticket.customerId}) | Amount: <strong>INR {ticket.amount?.toLocaleString()}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className={`badge badge-${(ticket.riskLevel || 'LOW').toLowerCase()}`}>
              Risk Score: {ticket.riskScore || 0}/100
            </span>

            {onProcessTicket && (
              <button
                className="btn btn-primary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                disabled={isProcessing}
                onClick={() => onProcessTicket(ticket.ticketId)}
              >
                <RefreshCw size={14} className={isProcessing ? 'animate-spin' : ''} />
                {isProcessing ? 'Processing...' : 'Re-run Agents'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Agents Mesh Topology */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        {agentsList.map((agent) => {
          const Icon = agent.icon;
          const isActive = agentLogs.some(l => l.agent === agent.key);

          return (
            <div
              key={agent.key}
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                background: isActive ? 'rgba(0, 242, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                border: isActive ? `1px solid ${agent.color}` : '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <Icon size={16} color={isActive ? agent.color : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}>
                  {agent.name}
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                {agent.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Live SSE Stream Console */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem', fontFamily: 'var(--font-mono)', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.4rem', marginBottom: '0.6rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>LIVE AGENT REASONING STREAM (SSE)</span>
          {isProcessing && <span style={{ color: 'var(--accent-cyan)', animation: 'pulse 1.5s infinite' }}>PROCESSING...</span>}
        </div>

        {agentLogs.length === 0 && !isProcessing && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Press "Re-run Agents" to re-trigger the autonomous AI workflow on this ticket.
          </span>
        )}

        {agentLogs.map((log, idx) => (
          <div key={idx} style={{ fontSize: '0.8rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>[{log.agent}]</span>{' '}
            <span style={{ color: 'var(--text-main)' }}>{log.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
