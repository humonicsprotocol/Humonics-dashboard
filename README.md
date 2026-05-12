# Humonics Dashboard

> Verify content authenticity. Issue certificates. Manage your creative work on-chain.

The official web interface for the Humonics protocol — built for creators who want cryptographic proof of their work, and verifiers who need to trust it.

---

## What it does

**For verifiers (no wallet needed)**
Paste any SHA-256 content hash and instantly see whether it has a certificate on the Humonics registry — certified, uncertified, or revoked.

**For creators (Freighter wallet)**
Connect your Stellar wallet, issue certificates backed by zero-knowledge proofs, and manage your entire certificate history from one dashboard.

---

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Blockchain | `@humonics/sdk` → Stellar / Soroban |
| Wallet | Freighter (`@stellar/freighter-api`) |
| Language | TypeScript 5 |

---

## Getting started

**Prerequisites:** Node.js ≥ 18. [Freighter](https://www.freighter.app/) browser extension for the creator flow.

```bash
git clone git@github.com:humonicsprotocol/Humonics-dashboard.git
cd Humonics-dashboard
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The verify tool works immediately. For the creator dashboard, install Freighter and switch it to testnet.

### Environment variables

```bash
NEXT_PUBLIC_NETWORK=testnet

# Soroban contract addresses
NEXT_PUBLIC_VERIFICATION_GATEWAY_TESTNET=C...
NEXT_PUBLIC_CERTIFICATE_REGISTRY_TESTNET=C...
```

---

## Pages

| Route | Who | Description |
|---|---|---|
| `/` | Everyone | Paste a content hash → instant on-chain result |
| `/dashboard` | Creators | Issue, view, and revoke certificates |

---

## How it's structured

```
src/
├── app/                     # Next.js App Router pages
│   ├── page.tsx             # Public verify tool
│   └── dashboard/page.tsx   # Creator dashboard (wallet-gated)
├── components/
│   ├── VerifyWidget.tsx     # Hash input + result display
│   ├── CertificateCard.tsx  # Certified / revoked certificate view
│   └── IssueForm.tsx        # Certificate issuance flow
├── hooks/
│   ├── useVerify.ts         # Single hash verification state
│   └── useCertificates.ts   # Batch certificate fetching
└── lib/
    ├── sdk.ts               # HumonicsClient singleton
    └── wallet.ts            # Freighter connect / sign helpers
```

**Data flow:** pages → components → hooks → `lib/sdk.ts` → `@humonics/sdk` → Soroban

Components never call the SDK directly. All signing goes through Freighter — private keys never touch the app.

---

## Security model

- **No private keys in the browser.** Signing is delegated entirely to Freighter.
- **No localStorage caching.** Certificate data is always fetched fresh from the chain.
- **No direct contract calls.** All Stellar/Soroban interaction goes through `@humonics/sdk`.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Roadmap

- [ ] Revoke flow in dashboard
- [ ] zkProof generation (pending `@humonics/zk-circuits`)
- [ ] Loading skeletons
- [ ] Tests (Vitest + React Testing Library)
- [ ] Wallet disconnect / account switching
