'use client';

import { useState, FormEvent } from 'react';
import { useVerify } from '@/hooks/useVerify';
import CertificateCard from './CertificateCard';

const HASH_RE = /^[a-f0-9]{64}$/;

export default function VerifyWidget() {
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const { result, status, error, verify, reset } = useVerify();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const hash = input.trim().toLowerCase();
    if (!HASH_RE.test(hash)) {
      setInputError('Enter a valid SHA-256 hex string (64 characters)');
      return;
    }
    setInputError(null);
    verify(hash);
  }

  function handleChange(value: string) {
    setInput(value);
    if (inputError) setInputError(null);
    if (status !== 'idle') reset();
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="contentHash" className="text-sm font-medium text-gray-700">
          Content hash (SHA-256)
        </label>
        <div className="flex gap-2">
          <input
            id="contentHash"
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="a3f1e2..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby={inputError ? 'hash-error' : undefined}
            aria-invalid={!!inputError}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? 'Checking…' : 'Verify'}
          </button>
        </div>

        {inputError && (
          <p id="hash-error" role="alert" className="text-sm text-red-600">
            {inputError}
          </p>
        )}
      </form>

      {/* Results */}
      <div className="mt-6" aria-live="polite">
        {status === 'loading' && (
          <p className="text-sm text-gray-500">Checking the Humonics registry…</p>
        )}

        {status === 'error' && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {status === 'success' && result && (
          <>
            {result.certified && result.certificate ? (
              <CertificateCard certificate={result.certificate} revoked={result.revoked} />
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                This content has no certificate on the Humonics registry.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
