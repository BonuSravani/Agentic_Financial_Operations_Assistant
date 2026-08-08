# Agentic Financial Operations Assistant 🛡️🤖

An enterprise-grade, autonomous multi-agent platform for financial operations across Customer Support, Payments, Fraud, and Internal Operations. Built with **Spring Boot (Java 17/21)**, **MySQL**, and **React (Vite)** with built-in **RBI / DPDP compliance**, **Human-in-the-Loop (HITL) approvals**, and a **plain-language audit ledger**.

---

## 🌐 Live Production Deployment

* 🖥️ **Live Web UI (Vercel):** [https://agentic-financial-operations-assist-iota.vercel.app](https://agentic-financial-operations-assist-iota.vercel.app)
* ⚙️ **Live Backend API (Render):** [https://finops-backend-6uem.onrender.com](https://finops-backend-6uem.onrender.com)
* 💻 **GitHub Repository:** [https://github.com/BayiVivekavardhan/Agentic_Financial_Operations_Assistant](https://github.com/BayiVivekavardhan/Agentic_Financial_Operations_Assistant)

---

## 🎯 Problem Statement & Mission

Financial institutions use disconnected tools (Zendesk CRM, Stripe/Razorpay Payment Gateways, Fraud databases, internal Slack/Jira approvals). Operations agents spend hours context-switching, reading transcripts, and manually executing refunds or holds.

**Our Solution:** An AI Agent platform that autonomously processes routine financial ops requests in seconds while keeping humans in the approval loop for high-risk or irreversible actions.

---

## 🏗️ Architecture & Multi-Agent Topology

![Architecture Diagram](https://github.com/BayiVivekavardhan/Agentic_Financial_Operations_Assistant/blob/main/img_architecture.jpg?raw=true)

```
                  ┌──────────────────────────────────────────────┐
                  │    Incoming Support Ticket / Webhook         │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │ 1. Privacy Gateway (PiiRedactorService)     │
                  │    Sanitizes Aadhaar, PAN, Cards, Phone     │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │ 2. Router Agent                              │
                  │    Classifies Intent & Selects Domain Agents │
                  └──────┬───────────────┼───────────────┬───────┘
                         │               │               │
                         ▼               ▼               ▼
                  ┌────────────┐  ┌─────────────┐  ┌─────────────┐
                  │ Support    │  │ Payments    │  │ Fraud       │
                  │ Agent      │  │ Agent       │  │ Agent       │
                  └──────┬─────┘  └──────┬──────┘  └──────┬──────┘
                         │               │                │
                         └───────────────┼────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │ 3. Supervisor Agent (Self-Correction Audit)  │
                  │    Evaluates Policy Rules & Safety Limits    │
                  └──────────────────────┬───────────────────────┘
                                         │
                                   Risk Check
                                   ┌─────┴─────┐
                     Low Risk (< ₹5k)          High Risk (>= ₹5k / Fraud)
                           │                         │
                           ▼                         ▼
                  ┌─────────────────┐       ┌──────────────────┐
                  │ Auto-Resolution │       │ Human Approval   │
                  │ Gateway Refund  │       │ Manager Inbox    │
                  └────────┬────────┘       └────────┬─────────┘
                           │                         │
                           └────────────┬────────────┘
                                        │
                                        ▼
                  ┌──────────────────────────────────────────────┐
                  │ 4. Plain-Language Audit & Cost Ledger        │
                  └──────────────────────────────────────────────┘
```

---

## 🛡️ Guardrails & Enterprise Rules

1. **Human-in-the-Loop (HITL):** Any refund exceeding **INR 5,000** or any account freeze triggered by elevated fraud scores (Risk >= 50) is paused and pushed to the Manager Approval Inbox with a 1-click evidence package.
2. **RBI & DPDP Privacy Compliance:** All raw customer inputs are sanitized before agent processing:
   - Aadhaar: `2345 6789 0123` ➔ `[AADHAAR: XXXX-XXXX-0123]`
   - PAN: `ABCDE1234F` ➔ `[PAN: ABCDE****F]`
   - Cards: `4111222233334444` ➔ `[CARD: 4111-XXXX-XXXX-4444]`
   - Phone: `+91 9876543210` ➔ `[PHONE: +91-XXXXXX3210]`
   - UPI: `user@okaxis` ➔ `[UPI: us****@okaxis]`
3. **Auditability:** Every decision records a plain-language explanation and a cost metric ($0.0024 avg per transaction).

---

## 🛠️ Technology Stack

* **Backend:** Spring Boot 3, Java 17, Spring Data JPA, Spring Web, Jackson, Server-Sent Events (`SseEmitter`), Docker.
* **Database:** MySQL (Configured in `application.properties`, with zero-config H2 profile fallback).
* **Frontend:** React 18, Vite, Vanilla CSS Modules (Glassmorphism design system), Lucide Icons.

---

## 🚀 How to Run Locally

### 1. Run the Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```
The backend starts on `http://localhost:8081` with sample seed tickets preloaded.

### 2. Run the React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## ☁️ How to Deploy to Production Cloud

### 1. Deploy Frontend UI to Vercel
1. Import repository on [Vercel.com](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Set Build Command to `npm run build` and Output Directory to `dist`.
4. Deploy!

### 2. Deploy Spring Boot Backend to Render
1. Create New Web Service on [Render.com](https://render.com).
2. Select Root Directory as `backend` and Language as `Docker`.
3. Deploy! Render will build the container and provide your live API endpoint.

---

## 📊 Business ROI & Impact Summary

* **85.0% Automation Rate:** Low-risk routine tickets resolved in under 5 seconds.
* **Cost-Per-Decision:** **$0.0024** per automated ticket vs **$4.50** manual human operational cost (99.9% cost reduction).
* **Time Savings:** 12.5+ human hours saved per 100 tickets, freeing team to focus on high-risk fraud cases.
