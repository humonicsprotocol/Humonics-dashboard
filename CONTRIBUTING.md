# Contributing to Humonics Dashboard

## Prerequisites

- Node.js ≥ 18
- [Freighter wallet](https://www.freighter.app/) browser extension (for testing creator flows)

## Local setup

```bash
git clone git@github.com:humonicsprotocol/Humonics-dashboard.git
cd Humonics-dashboard
cp .env.example .env.local   # set NEXT_PUBLIC_NETWORK=testnet + contract addresses
npm install
npm run dev                  # http://localhost:3000
```

The verify tool works immediately. For the creator dashboard, install Freighter and connect to testnet.

## Branch naming

| Prefix | Use |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `chore/` | Tooling, deps, config |
| `docs/` | Documentation only |

## PR checklist

- [ ] `npm run build` passes (no type errors)
- [ ] All loading, error, and empty states handled in every component
- [ ] No SDK calls directly in components — always through hooks
- [ ] No private keys or keypairs in the browser
- [ ] No certificate data stored in `localStorage`
- [ ] Accessible: labels, `aria-*` attributes, `role="alert"` on errors

## Hard constraints

- **No direct Soroban calls.** All contract interaction goes through `@humonics/sdk`.
- **No private key input.** Never ask users to paste a private key — all signing via Freighter.
- **No localStorage caching.** Certificate data is always fetched fresh from the SDK.
- **Hooks only.** Components use `useVerify` / `useCertificates` — never `sdk.*` directly.

## Adding a new component

1. Create in `src/components/`
2. Handle loading, error, and empty states
3. Use existing hooks — add a new hook in `src/hooks/` if needed
4. Never import from `@stellar/stellar-sdk` directly in components
