'use client';

import {
  isConnected,
  getPublicKey,
  signTransaction,
} from '@stellar/freighter-api';

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
}

export async function connectWallet(): Promise<WalletState> {
  const connected = await isConnected();
  if (!connected) {
    return { connected: false, publicKey: null };
  }
  const publicKey = await getPublicKey();
  return { connected: true, publicKey };
}

export async function checkWallet(): Promise<WalletState> {
  try {
    return await connectWallet();
  } catch {
    return { connected: false, publicKey: null };
  }
}

/** Signs a Stellar XDR transaction via Freighter. */
export async function signWithFreighter(
  xdr: string,
  network: string,
): Promise<string> {
  return signTransaction(xdr, { network });
}
