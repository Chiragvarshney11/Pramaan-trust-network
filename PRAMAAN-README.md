# PRAMAAN — Verified Work Identity Platform

> A modern digital work-identity and trust platform designed to help workers and employers build, verify, and carry reputation through trusted employment records.

PRAMAAN is a **frontend-first product prototype** built with React and Vite. It demonstrates how verified work identity, digital passports, QR verification, review intelligence, trust analytics, worker discovery, messaging, documents, and dispute workflows can come together in one platform.

## Why PRAMAAN?

Informal and fragmented work histories make it difficult for workers to carry a trusted reputation from one employer to another. Employers also face uncertainty when evaluating new workers.

PRAMAAN introduces a portable digital work identity where users can:

- Build a verified professional profile
- Maintain a PRAMAAN Passport
- Share identity through time-limited QR verification
- Collect employment-linked reviews
- Understand trust and reputation signals
- Discover workers and employers
- Communicate through an in-app messaging interface
- Manage employment documents
- Raise and track disputes

---

## Core Features

### 1. Digital Work Identity

Workers and employers can create profiles containing relevant professional information such as:

- Name and profile photo
- Work category
- Skills
- Experience
- Location
- Languages
- Employment information
- Trust and reputation signals

Sensitive identity information is represented through masked/demo values in the frontend prototype.

### 2. PRAMAAN Passport

The PRAMAAN Passport acts as a portable digital representation of a worker's work identity.

It presents:

- Worker identity
- PRAMAAN Worker ID
- Experience
- Skills
- Employment history
- Review count
- Trust Score
- Verification state
- Profile photo

### 3. Time-Limited QR Verification

A worker's passport can be verified through a dynamic QR code.

The frontend prototype includes:

- Responsive QR sizing
- Animated QR viewer
- Fresh 10-second verification token whenever the QR viewer is opened
- Automatic token refresh after expiry
- Verification URL containing an expiry timestamp and nonce
- QR modal with responsive animations

The QR is designed as a short-lived verification mechanism rather than a permanent static credential.

### 4. Review Intelligence

PRAMAAN goes beyond a basic star-rating system.

Reviews can display:

- Rating
- Reviewer identity
- Verified employment signal
- Reviewer verification
- Employment linkage
- Review velocity
- Review consistency
- Account/history signals
- Authenticity confidence
- Genuine / Needs Review assessment

The prototype uses **explainable heuristic signals** rather than claiming to perform production-grade fraud detection.

For example, suspicious patterns may include:

- Very high ratings concentrated in a short period
- Unusual review velocity
- Limited reviewer history
- Weak employment linkage
- Repetitive or low-depth review signals

Mixed ratings and stronger employment-linked evidence can contribute to a healthier reputation assessment.

> **Important:** A "Fraud Risk" or "Needs Review" status is treated as a risk signal for further review, not as a definitive accusation.

### 5. Trust Intelligence

The Trust Intelligence dashboard visualizes reputation signals for the logged-in user.

It includes:

- Overall Trust Score
- Trust Score trend
- Rating distribution
- Identity verification
- Review authenticity
- Employment consistency
- Network health
- Behavioral/review signals
- Risk level

### 6. Worker Discovery

Employers can browse trusted workers using:

- Search
- Location filtering
- Worker category
- Experience
- Rating
- Trust Score
- Verification status

### 7. Messaging

The frontend includes an interactive messaging workspace with:

- Conversation list
- Active chat
- Message bubbles
- Message timestamps
- Send message interaction
- Local browser persistence

This is currently a frontend simulation; it does not use a real-time backend.

### 8. Document Vault

Users can manage document metadata through the Evidence Vault.

The frontend supports:

- Add document
- Document type
- Local file selection
- File validation
- File name display
- Verification/pending status
- Browser-side persistence

### 9. Dispute Center

The interface includes a dispute workflow for reporting or tracking issues related to:

- Employment
- Reviews
- Verification
- Trust/reputation

### 10. Responsive Premium UI

The design follows a dark, trust-oriented visual system:

- Deep navy backgrounds
- Purple gradients
- Cyan verification accents
- Glassmorphism panels
- Responsive layouts
- Hover interactions
- Micro-animations
- Responsive QR viewer
- Mobile-friendly navigation

---

## Tech Stack

### Frontend

- **React 18**
- **Vite**
- **React Router**
- **Lucide React**
- **qrcode.react**
- Modern CSS
- Browser `localStorage` for prototype persistence

### Architecture

```text
PRAMAAN
│
├── src/
│   ├── components/
│   │   ├── Logo
│   │   ├── Topbar
│   │   ├── Sidebar
│   │   ├── PRAMAAN branding
│   │   └── reusable UI components
│   │
│   ├── pages/
│   │   ├── Landing
│   │   ├── Auth
│   │   ├── Dashboard
│   │   ├── Passport
│   │   ├── Profile
│   │   ├── Reviews
│   │   ├── Trust Intelligence
│   │   ├── Workers
│   │   ├── Messages
│   │   ├── Documents
│   │   ├── Disputes
│   │   └── Verification
│   │
│   ├── lib/
│   │   ├── mock API/data
│   │   ├── authentication state
│   │   └── utility logic
│   │
│   └── styles/
│       └── application styles
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

Install:

- Node.js 18+ (Node.js 20+ recommended)
- npm

Check your versions:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/pramaan-platform.git
cd pramaan-platform
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Demo Accounts

The current frontend prototype contains demo user flows.

### Worker

```text
Email: worker@pramaan.demo
Password: Worker@123
```

### Employer

```text
Email: employer@pramaan.demo
Password: Employer@123
```

These accounts are for demonstrating the frontend experience and are **not production credentials**.

---

## Project Flow

### Worker Flow

```text
Landing Page
     ↓
Worker Registration / Login
     ↓
Worker Dashboard
     ↓
Profile
     ↓
Identity + Employment Evidence
     ↓
PRAMAAN Passport
     ↓
QR Verification
     ↓
Reviews
     ↓
Trust Intelligence
     ↓
Messages / Documents / Disputes
```

### Employer Flow

```text
Landing Page
     ↓
Employer Registration / Login
     ↓
Employer Dashboard
     ↓
Find Workers
     ↓
Worker Profile / Passport
     ↓
Trust Intelligence
     ↓
Employment Request
     ↓
Messages
     ↓
Reviews / Documents / Disputes
```

---

## Trust & Review Model

The current prototype intentionally follows an **explainable risk-assessment approach**.

A review assessment can consider signals such as:

```text
Reviewer Verification
        +
Employment Linkage
        +
Rating Distribution
        +
Review Velocity
        +
Review Depth
        +
Account / History Signals
        ↓
Authenticity Confidence
        ↓
Genuine / Needs Review
```

This is a product prototype and **not a production fraud-detection model**.

A production implementation should use server-side data, verified employment records, abuse prevention, NLP/text similarity, account/network analysis, audit logs, and a human-review process before taking consequential action.

---

## Privacy & Security Direction

PRAMAAN's product concept is based on privacy-by-design principles.

The frontend demonstrates:

- Masked sensitive identity information
- Short-lived QR verification tokens
- Limited public verification data
- Trust signals instead of exposing unnecessary private data
- Clear separation between public profile information and sensitive identity information

### Current limitation

This repository is **frontend-only**.

There is currently no production:

- Backend API
- PostgreSQL/SQL database
- Real authentication server
- Aadhaar/KYC provider integration
- Cloud file storage
- Real-time messaging server
- Production fraud-detection ML model
- Server-side authorization
- Production audit infrastructure

These should be implemented before handling real personal identity information or deploying PRAMAAN as a production service.

---

## Future Roadmap

### Phase 1 — Current

- Frontend product experience
- Worker/employer flows
- Passport
- QR verification prototype
- Reviews
- Trust Intelligence
- Messaging UI
- Documents
- Disputes

### Phase 2 — Backend

- Node.js / Express or equivalent API
- PostgreSQL
- Secure authentication
- Role-based authorization
- Server-side validation
- Secure document storage
- Audit logs

### Phase 3 — Verification

- Real identity/KYC provider
- Verified employment records
- Signed verification credentials
- QR token validation on the server

### Phase 4 — Trust Intelligence

- Review anomaly detection
- Duplicate review detection
- NLP-based review analysis
- Reviewer-network analysis
- Trust-score calibration
- Human-review workflow

### Phase 5 — Scale

- Real-time messaging
- Notifications
- Worker/employer matching
- Mobile application
- Analytics
- Multi-region deployment

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Test the application
5. Commit:

```bash
git commit -m "Add your feature"
```

6. Push:

```bash
git push origin feature/your-feature
```

7. Open a Pull Request

---

## License

This project is currently intended as a prototype / academic / hackathon project.

Add an appropriate open-source license before distributing the project publicly as a reusable software product.

---

## Built for Trust

**PRAMAAN — Verified Work Identity**

> *Bharose ka Saboot.*
