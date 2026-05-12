'use client';

import { useState, useEffect, useCallback } from 'react';
import { sdk } from '@/lib/sdk';
import { HumonicsError } from '@humonics/sdk';
import type { VerificationResult } from '@humonics/sdk';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseCertificatesReturn {
  results: VerificationResult[];
  status: Status;
  error: string | null;
  fetchCertificates: (contentHashes: string[]) => Promise<void>;
}

export function useCertificates(): UseCertificatesReturn {
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async (contentHashes: string[]) => {
    if (contentHashes.length === 0) {
      setResults([]);
      setStatus('success');
      return;
    }
    setStatus('loading');
    setError(null);
    try {
      const res = await sdk.batchVerify(contentHashes);
      setResults(res);
      setStatus('success');
    } catch (err) {
      const message =
        err instanceof HumonicsError ? err.message : 'Failed to load certificates';
      setError(message);
      setStatus('error');
    }
  }, []);

  return { results, status, error, fetchCertificates };
}
