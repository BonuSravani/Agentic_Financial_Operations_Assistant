import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import TicketList from './components/TicketList';
import AgentVisualizer from './components/AgentVisualizer';
import ApprovalInbox from './components/ApprovalInbox';
import AuditLedger from './components/AuditLedger';
import AnalyticsChart from './components/AnalyticsChart';
import PiiInspector from './components/PiiInspector';
import CreateTicketForm from './components/CreateTicketForm';
import PitchDeck from './components/PitchDeck';

export default function App() {
  const [activeTab, setActiveTab] = useState('console');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [agentLogs, setAgentLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const API_BASE = '/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tRes, pRes, aRes, mRes] = await Promise.all([
        fetch(`${API_BASE}/tickets`),
        fetch(`${API_BASE}/approvals/pending`),
        fetch(`${API_BASE}/audit-logs`),
        fetch(`${API_BASE}/audit-logs/analytics`)
      ]);

      if (tRes.ok) {
        const data = await tRes.json();
        setTickets(data);
        if (data.length > 0 && !selectedTicket) {
          setSelectedTicket(data[0]);
        }
      }
      if (pRes.ok) setPendingApprovals(await pRes.json());
      if (aRes.ok) setAuditLogs(await aRes.json());
      if (mRes.ok) setAnalytics(await mRes.json());
    } catch (e) {
      console.warn("Backend API connecting...", e);
    }
  };

  const handleProcessTicket = (ticketId) => {
    setIsProcessing(true);
    setAgentLogs([]);

    const t = tickets.find(x => x.ticketId === ticketId);
    if (t) setSelectedTicket(t);

    const eventSource = new EventSource(`${API_BASE}/tickets/stream/${ticketId}`);

    eventSource.addEventListener('AGENT_STEP', (e) => {
      const data = JSON.parse(e.data);
      setAgentLogs((prev) => [...prev, data]);
    });

    eventSource.onerror = () => {
      eventSource.close();
      setIsProcessing(false);
      fetchData();
    };
  };

  const handleRespondApproval = async (ticketId, decision, notes) => {
    try {
      await fetch(`${API_BASE}/approvals/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, decision, notes: notes || '' })
      });
      fetchData();
    } catch (e) {
      console.error("Error responding to approval:", e);
    }
  };

  return (
    <div className="app-layout">
      <Header analytics={analytics} />
      
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'console' && (
        <main className="main-content-grid">
          
          {/* Left Column: Tickets Queue */}
          <div>
            <TicketList
              tickets={tickets}
              selectedTicket={selectedTicket}
              onSelectTicket={(t) => {
                setSelectedTicket(t);
                setAgentLogs([]);
              }}
              onProcessTicket={handleProcessTicket}
            />
          </div>

          {/* Center Column: Live Agent Visualizer & HITL Inbox */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <AgentVisualizer
                ticket={selectedTicket}
                agentLogs={agentLogs}
                isProcessing={isProcessing}
                onProcessTicket={handleProcessTicket}
              />
            </div>

            <ApprovalInbox
              pendingApprovals={pendingApprovals}
              onRespondApproval={handleRespondApproval}
            />
          </div>

          {/* Right Column: Audit Ledger & Performance Analytics */}
          <div className="audit-panel-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnalyticsChart analytics={analytics} />
            
            <div style={{ flex: 1 }}>
              <AuditLedger auditLogs={auditLogs} />
            </div>
          </div>

        </main>
      )}

      {activeTab === 'privacy' && (
        <PiiInspector />
      )}

      {activeTab === 'analytics' && (
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AnalyticsChart analytics={analytics} />
          <AuditLedger auditLogs={auditLogs} />
        </div>
      )}

      {activeTab === 'create' && (
        <CreateTicketForm onTicketCreated={() => {
          fetchData();
          setActiveTab('console');
        }} />
      )}

      {activeTab === 'pitch' && (
        <PitchDeck />
      )}
    </div>
  );
}
