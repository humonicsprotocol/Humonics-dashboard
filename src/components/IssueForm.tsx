'use client';

import { useState, FormEvent } from 'react';
import { HumonicsError } from '@humonics/sdk';
import type { ZKProof, ContentType } from '@humonics/sdk';
import { sdk } from '@/lib/sdk';
import { checkWallet } from '@/lib/wallet';

const CONTENT_TYPES: ContentType[] = ['text', 'code', 'art', 'audio', 'video'];
const HASH_RE = /^[a-f0-9]{64}$/;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function IssueForm() {
  const [contentHash, setContentHash] = useState('');
  const [contentType, setContentType] = useState<ContentType>('text');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [certId, setCertId] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!HASH_RE.test(contentHash.trim())) {
      setError('Content hash must be a 64-character hex string');
      return;
    }

    setStatus('loading');

    try {
      const wallet = await checkWallet();
      if (!wallet.connected || !wallet.publicKey) {
        setError('Connect your Freighter wallet to issue a certificate');
        setStatus('error');
        return;
      }

      // zkProof generation is handled by the zk-circuits package.
      // TODO: integrate @humonics/zk-circuits here when available.
      // For now we surface a clear placeholder error.
      throw new HumonicsError(
        'INVALID_PROOF',
        'zkProof generation not yet integrated — use the CLI to issue certificates.',
      );
    } catch (err) {
      const message = err instanceof HumonicsError ? err.message : 'Failed to issue certificate';
      setError(message);
      setStatus('error');
    }
  }

  if (status === 'success' && certId) {
    return (
      <div className="rounded-lg border border-green-300 bg-green-50 p-5 text-sm text-green-800">
        <p className="font-semibold mb-1">Certificate issued ✓</p>
        <p className="font-mono text-xs break-all">{certId}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <div className="flex flex-col gap-1">
        <label htmlFor="issueHash" className="text-sm font-medium text-gray-700">
          Content hash (SHA-256)
        </label>
        <input
          id="issueHash"
          type="text"
          value={contentHash}
          onChange={(e) => setContentHash(e.target.value)}
          placeholder="a3f1e2..."
          className="rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contentType" className="text-sm font-medium text-gray-700">
          Content type
        </label>
        <select
          id="contentType"
          value={contentType}
          onChange={(e) => setContentType(e.target.value as ContentType)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {CONTENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors self-start"
      >
        {status === 'loading' ? 'Issuing…' : 'Issue certificate'}
      </button>
    </form>
  );
}
