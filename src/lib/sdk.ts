import { HumonicsClient } from '@humonics/sdk';

const network =
  (process.env.NEXT_PUBLIC_NETWORK as 'mainnet' | 'testnet') ?? 'testnet';

// Singleton — one client per app instance
export const sdk = new HumonicsClient({ network });
