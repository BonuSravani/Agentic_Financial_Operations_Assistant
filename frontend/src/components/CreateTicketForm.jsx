import React, { useState } from 'react';
import { PlusCircle, CheckCircle, Send } from 'lucide-react';

export default function CreateTicketForm({ onTicketCreated }) {
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('CUST-' + Math.floor(1000 + Math.random() * 9000));
  const [amount, setAmount] = useState('1500');
  const [category, setCategory] = useState('PAYMENTS');
  const [issueDescription, setIssueDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName || 'Custom Customer',
          customerId: customerId || 'CUST-9999',
          amount: parseFloat(amount) || 1000.0,
          category,
          issueDescription: issueDescription || 'Default ticket complaint description.'
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        onTicketCreated();
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to create ticket:", err);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.85rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle color="var(--accent-cyan)" size={20} />
          Create New Financial Operations Ticket
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Submit a new custom ticket into the Spring Boot backend database to test autonomous AI processing.
        </p>
      </div>

      {isSuccess && (
        <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: 'var(--status-green)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <CheckCircle size={18} /> Ticket created successfully! Switch to "Operations Console" to run AI agents on it.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Customer Name</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Sanya Kapoor"
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Amount (INR)</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Issue Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem' }}
          >
            <option value="PAYMENTS">PAYMENTS — Refund & Disputes</option>
            <option value="FRAUD">FRAUD — Suspected Unauthorized Activity</option>
            <option value="SUPPORT">SUPPORT — Account & General Inquiries</option>
            <option value="INTERNAL_OPS">INTERNAL_OPS — Limits & Approvals</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Issue Description (Include Aadhaar / PAN / Card to test PII masking!)</label>
          <textarea
            rows={4}
            required
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="e.g. Money deducted INR 6,500 but order failed. My PAN is XYZPD9922K and Aadhaar 9988 7766 5544..."
            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', fontFamily: 'var(--font-main)' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }}>
          <Send size={16} /> Submit Ticket to Database
        </button>

      </form>

    </div>
  );
}
