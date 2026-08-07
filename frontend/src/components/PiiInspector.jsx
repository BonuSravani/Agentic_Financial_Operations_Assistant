import React, { useState } from 'react';
import { Lock, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function PiiInspector() {
  const [inputText, setInputText] = useState(
    "My name is Ananya Sharma. My Aadhaar is 2345 6789 0123 and my PAN card is ABCDE1234F. I tried sending INR 4,500 via my debit card 4111222233334444 and UPI ananya.sharma@okaxis, but payment failed. Contact me at +91 9876543210."
  );
  const [sanitizedText, setSanitizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTestPii = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/audit-logs/test-pii', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      const data = await res.json();
      setSanitizedText(data.sanitized);
    } catch (e) {
      console.error("PII test error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lock color="var(--status-green)" size={22} />
            RBI / DPDP PII Privacy Sanitizer Sandbox
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Test how sensitive Indian financial data (Aadhaar, PAN, Card Numbers, Phone, UPI IDs) is masked BEFORE reaching LLM engines.
          </p>
        </div>
        <span className="badge badge-low" style={{ padding: '0.4rem 0.8rem' }}>
          <ShieldCheck size={14} /> 100% Compliant
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Raw Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={16} color="var(--status-amber)" />
            Raw Customer Input (Unsanitized)
          </label>
          <textarea
            rows={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.5'
            }}
          />
          <button className="btn btn-primary" onClick={handleTestPii} disabled={isLoading}>
            <Sparkles size={16} /> {isLoading ? 'Sanitizing...' : 'Run PII Sanitizer'}
          </button>
        </div>

        {/* Sanitized Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--status-green)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} color="var(--status-green)" />
            Sanitized Prompt (Safe for AI LLMs)
          </label>
          <div
            style={{
              height: '180px',
              padding: '1rem',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.04)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              overflowY: 'auto'
            }}
          >
            {sanitizedText || <span style={{ color: 'var(--text-muted)' }}>Click "Run PII Sanitizer" to view redacted prompt output.</span>}
          </div>
        </div>

      </div>

    </div>
  );
}
