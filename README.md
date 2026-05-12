# Humonics Dashboard

The web app for the Humonics protocol. Creators issue and manage content certificates. Verifiers check content authenticity — no wallet required.

Built with Next.js 14, Tailwind CSS, and `@humonics/sdk`.

---

## Features

- **Public verify tool** — paste any SHA-256 content hash, get instant on-chain verification. No wallet needed.
- **Creator dashboard** — connect Freighter wallet, issue certificates, view and revoke your own.
- **Zero private key exposure** — all signing goes through Freighter. Private keys never touch the browser.

---

## Getting started

### Prerequisites

- Node.js ≥ 18
- [Freighter wallet](https://www.freighter.app/) browser extension (creator flow only)

### Setup

```bash
git clone git@github.com:humonicsprotocol/Humonics-dashboard.git
cd Humonics-dashboard
cp .env.example .env.local   # set NEXT_PUBLIC_NETWORK and contract addresses
npm install
npm run dev                  # http://localhost:3000
```

### Environment variables

```bash
NEXT_PUBLIC_NETWORK=testnet                    # or mainnet
NEXT_PUBLIC_VERIFICATION_GATEWAY_TESTNET=C...
NEXT_PUBLIC_CERTIFICATE_REGISTRY_TESTNET=C...
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Public content hash verifier |
| `/dashboard` | Creator dashboard — wallet required |

---

## Architecture

```
page.tsx / dashboard/page.tsx
  └── components (VerifyWidget, CertificateCard, IssueForm)
        └── hooks (useVerify, useCertificates)
              └── lib/sdk.ts  ← HumonicsClient singleton
                    └── @humonics/sdk  ← all Stellar/Soroban logic
```

Components never call the SDK directly — always through hooks. All Stellar interaction goes through `@humonics/sdk`. No direct contract calls.

---

## Key files

| File | Purpose |
|---|---|
| `src/lib/sdk.ts` | `HumonicsClient` singleton |
| `src/lib/wallet.ts` | Freighter connect / sign helpers |
| `src/hooks/useVerify.ts` | Verify a single content hash |
| `src/hooks/useCertificates.ts` | Batch-fetch certificates |
| `src/components/VerifyWidget.tsx` | Public hash checker |
| `src/components/CertificateCard.tsx` | Certificate display |
| `src/components/IssueForm.tsx` | Creator issuance flow |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Roadmap

- [ ] Revoke flow in dashboard
- [ ] zkProof integration (pending `@humonics/zk-circuits`)
- [ ] Loading skeletons
- [ ] Tests (Vitest + React Testing Library)
- [ ] Wallet disconnect / account switching
