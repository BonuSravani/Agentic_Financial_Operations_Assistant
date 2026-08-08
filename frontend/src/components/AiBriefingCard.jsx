import React from 'react';
import { Bot, Lightbulb, ArrowRight, ShieldAlert, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';

export default function AiBriefingCard({ ticket, isProcessing }) {
  if (!ticket) return null;

  const status = ticket.status || 'PENDING';
  const amount = ticket.amount ? ticket.amount.toLocaleString() : '0';

  let explanation = '';
  let nextSteps = '';
  let cardColor = 'var(--accent-cyan)';
  let StatusIcon = Bot;

  if (isProcessing) {
    explanation = "Multi-agent AI pipeline is currently executing intent classification, PII masking, payment log inspection, and risk scoring...";
    nextSteps = "Please wait a few seconds while agents complete analysis.";
    cardColor = "var(--accent-cyan)";
    StatusIcon = Zap;
  } else if (status === 'AUTO_RESOLVED') {
    explanation = `The AI Supervisor automatically executed the refund of INR ${amount}. Payment gateway logs confirmed a failed transaction (GATEWAY_TIMEOUT), the customer has a clean dispute history, and the amount is under the safety limit (INR 5,000).`;
    nextSteps = "No human action required. Automated confirmation email and SMS notification sent to customer.";
    cardColor = "var(--status-green)";
    StatusIcon = CheckCircle2;
  } else if (status === 'AWAITING_APPROVAL') {
    explanation = `The AI Agent paused auto-execution and escalated this case to the Manager Inbox. Reason: The transaction amount (INR ${amount}) exceeds the safety auto-refund limit (INR 5,000) OR suspicious transfer flags ('another account / unknown') were detected.`;
    nextSteps = "Action Required: Review the Evidence Package in the Human-in-the-Loop Inbox below and click 'Approve' or 'Reject'.";
    cardColor = "var(--status-amber)";
    StatusIcon = ShieldAlert;
  } else if (status === 'APPROVED') {
    explanation = `Human Operations Manager reviewed the escalated Evidence Package and APPROVED the proposed action (${ticket.actionProposed}). Action executed successfully.`;
    nextSteps = "Case resolved and archived in the immutable Audit Ledger.";
    cardColor = "var(--status-green)";
    StatusIcon = CheckCircle2;
  } else if (status === 'REJECTED') {
    explanation = `Human Operations Manager REJECTED the proposed action (${ticket.actionProposed}). No funds were disbursed.`;
    nextSteps = "Case closed. Optional follow-up note logged in Audit Ledger.";
    cardColor = "var(--status-red)";
    StatusIcon = XCircle;
  } else {
    explanation = `Ticket queued for processing. Customer ${ticket.customerName} submitted a ${ticket.category || 'PAYMENTS'} inquiry for INR ${amount}.`;
    nextSteps = "Click 'Run Agents' or 'Re-run' to trigger the autonomous multi-agent analysis pipeline.";
    cardColor = "var(--accent-blue)";
    StatusIcon = Clock;
  }

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.1rem 1.3rem',
        borderRadius: '12px',
        background: `rgba(18, 26, 43, 0.85)`,
        border: `1px solid ${cardColor}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4)`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StatusIcon size={20} color={cardColor} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
            AI Assistant Executive Briefing — {ticket.ticketId}
          </h3>
        </div>
        <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: cardColor, border: `1px solid ${cardColor}` }}>
          Status: {status}
        </span>
      </div>

      {/* Why the AI Acted */}
      <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: '8px', borderLeft: `3px solid ${cardColor}` }}>
        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: cardColor, textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Bot size={13} /> Why The AI Acted:
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
          {explanation}
        </p>
      </div>

      {/* What to Do Next */}
      <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.65rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Lightbulb size={16} color="var(--status-amber)" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--status-amber)' }}>Next Step: </strong>
          {nextSteps}
        </div>
      </div>

    </div>
  );
}
