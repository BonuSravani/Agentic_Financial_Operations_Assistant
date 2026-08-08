import React, { useState } from 'react';
import { Presentation, ChevronRight, ChevronLeft, Award, Shield, Cpu, DollarSign, Rocket } from 'lucide-react';

export default function PitchDeck() {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "1. The FinOps Problem",
      icon: Shield,
      color: "var(--status-red)",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Financial operations teams handle customer support, payment gateway failures, fraud alerts, and internal ops requests — each living in completely different software systems.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--status-red)', display: 'block', marginBottom: '0.3rem' }}>⏱️ Slow Resolution Time</strong>
              Simple UPI refund requests take 24–48 hours due to manual context switching across 4–5 tools.
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--status-red)', display: 'block', marginBottom: '0.3rem' }}>💸 High Operational Cost</strong>
              Companies waste millions on large operations teams manually copy-pasting data between systems.
            </div>
          </div>
        </div>
      )
    },
    {
      title: "2. The AI Solution — Autonomous FinOps Assistant",
      icon: Cpu,
      color: "var(--accent-cyan)",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            An autonomous multi-agent platform powered by <strong>Spring Boot (Java)</strong>, <strong>MySQL</strong>, and <strong>React</strong> that orchestrates customer support, payments, and fraud investigation workflows seamlessly.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(0, 242, 255, 0.05)', border: '1px solid rgba(0, 242, 255, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>🤖 Multi-Agent Mesh</strong>
              Specialized Router, Support, Payments, Fraud, and Supervisor agents.
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--status-green)' }}>🔒 RBI PII Gateway</strong>
              Automatic masking of Aadhaar, PAN, Cards, and Phone numbers.
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--status-amber)' }}>🛡️ Human-in-the-Loop</strong>
              Automatic escalation for high-risk actions (Refund &gt; ₹5,000 or Fraud).
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Enterprise Architecture & Tech Stack",
      icon: Award,
      color: "var(--accent-purple)",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.5' }}>
            [ Customer Input ] ➔ [ PII Sanitizer ] ➔ [ Router Agent ]<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──➔ [ Support Agent ]<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──➔ [ Payments Agent ]<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──➔ [ Fraud Agent ]<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>
            [ Audit Log Ledger ] ◄── [ Supervisor Self-Correction Check ] ➔ [ HITL Manager Inbox / Auto-Refund ]
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Backend:</strong> Spring Boot 3 (Java 17) + Spring Data JPA + SSE Streaming.<br/>
            <strong>Database:</strong> MySQL / H2.<br/>
            <strong>Frontend:</strong> React 18 + Vite + Custom Glassmorphism UI.
          </p>
        </div>
      )
    },
    {
      title: "4. Business Impact & Cost-per-Transaction",
      icon: DollarSign,
      color: "var(--status-green)",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Automation Rate</span>
            <h3 style={{ fontSize: '2rem', color: 'var(--status-green)', margin: '0.3rem 0' }}>85.0%</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Routine tickets auto-resolved under 5 seconds with zero human touch.</p>
          </div>

          <div style={{ background: 'rgba(0, 242, 255, 0.08)', border: '1px solid rgba(0, 242, 255, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cost per Decision</span>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent-cyan)', margin: '0.3rem 0' }}>$0.0024</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>vs $4.50 human ops cost per ticket — <strong>99.9% cost reduction</strong>.</p>
          </div>
        </div>
      )
    },
    {
      title: "5. Roadmap & What's Next",
      icon: Rocket,
      color: "var(--accent-blue)",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ background: 'var(--accent-cyan)', color: '#000', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem' }}>Phase 1</span>
            <div><strong>Production Core (Current):</strong> Multi-agent routing, PII redactor, HITL approvals, Spring Boot & MySQL backend.</div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ background: 'var(--accent-blue)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem' }}>Phase 2</span>
            <div><strong>Native Enterprise Connectors:</strong> Real-time webhooks for Razorpay, Stripe, Zendesk, Salesforce CRM, and Jira Service Desk.</div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ background: 'var(--accent-purple)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem' }}>Phase 3</span>
            <div><strong>Self-Learning & Fine-Tuning:</strong> Fine-tuned open-source SLMs (e.g. Llama 3 8B) for on-premise bank deployments.</div>
          </div>
        </div>
      )
    }
  ];

  const current = slides[slide];
  const Icon = current.icon;

  return (
    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.6rem', color: current.color }}>
          <Icon size={24} color={current.color} />
          {current.title}
        </h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Slide {slide + 1} of {slides.length}
        </span>
      </div>

      <div style={{ minHeight: '220px', display: 'flex', alignItems: 'center' }}>
        {current.content}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
        <button
          className="btn"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)' }}
          disabled={slide === 0}
          onClick={() => setSlide(slide - 1)}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setSlide(idx)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: idx === slide ? current.color : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>

        <button
          className="btn btn-primary"
          disabled={slide === slides.length - 1}
          onClick={() => setSlide(slide + 1)}
        >
          Next Slide <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}
