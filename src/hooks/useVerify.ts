'use client';

import { useState, useCallback } from 'react';
import { sdk } from '@/lib/sdk';
import { HumonicsError } from '@humonics/sdk';
import type { VerificationResult } from '@humonics/sdk';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseVerifyReturn {
  result: VerificationResult | null;
  status: Status;
  error: string | null;
  verify: (contentHash: string) => Promise<void>;
  reset: () => void;
}

export function useVerify(): UseVerifyReturn {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (contentHash: string) => {
    setStatus('loading');
    setError(null);
    setResult(null);
    try {
      const res = await sdk.verify(contentHash);
      setResult(res);
      setStatus('success');
    } catch (err) {
      const message =
        err instanceof HumonicsError ? err.message : 'Verification failed';
      setError(message);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { result, status, error, verify, reset };
}
