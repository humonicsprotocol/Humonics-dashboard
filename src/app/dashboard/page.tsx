'use client';

import { useEffect, useState } from 'react';
import { checkWallet, connectWallet } from '@/lib/wallet';
import { useCertificates } from '@/hooks/useCertificates';
import CertificateCard from '@/components/CertificateCard';
import IssueForm from '@/components/IssueForm';
import type { WalletState } from '@/lib/wallet';

export default function DashboardPage() {
  const [wallet, setWallet] = useState<WalletState>({ connected: false, publicKey: null });
  const [walletLoading, setWalletLoading] = useState(true);
  const { results, status, error, fetchCertificates } = useCertificates();

  useEffect(() => {
    checkWallet().then((w) => {
      setWallet(w);
      setWalletLoading(false);
    });
  }, []);

  async function handleConnect() {
    const w = await connectWallet();
    setWallet(w);
  }

  if (walletLoading) {
    return <p className="text-sm text-gray-500">Checking wallet…</p>;
  }

  if (!wallet.connected) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Creator dashboard</h1>
        <p className="text-gray-500 text-sm max-w-sm">
          Connect your Freighter wallet to view and manage your certificates.
        </p>
        <button
          onClick={handleConnect}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          Connect Freighter
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your certificates</h1>
        <span className="font-mono text-xs text-gray-400 truncate max-w-xs">
          {wallet.publicKey}
        </span>
      </div>

      {/* Issue new certificate */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Issue a certificate</h2>
        <IssueForm />
      </section>

      {/* Certificate list */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Issued certificates</h2>

        {status === 'idle' && (
          <p className="text-sm text-gray-500">
            Your certificates will appear here once you issue them.
          </p>
        )}

        {status === 'loading' && (
          <p className="text-sm text-gray-500">Loading certificates…</p>
        )}

        {status === 'error' && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {status === 'success' && results.length === 0 && (
          <p className="text-sm text-gray-500">No certificates found.</p>
        )}

        {status === 'success' && results.length > 0 && (
          <div className="flex flex-col gap-4">
            {results.map((r, i) =>
              r.certified && r.certificate ? (
                <CertificateCard
                  key={r.certificate.id}
                  certificate={r.certificate}
                  revoked={r.revoked}
                />
              ) : null,
            )}
          </div>
        )}
      </section>
    </div>
  );
}
