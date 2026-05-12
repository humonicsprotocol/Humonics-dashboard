import type { Certificate } from '@humonics/sdk';

interface Props {
  certificate: Certificate;
  revoked?: boolean;
}

const CONTENT_TYPE_LABELS: Record<string, string> = {
  text: 'Text',
  code: 'Code',
  art: 'Art',
  audio: 'Audio',
  video: 'Video',
};

export default function CertificateCard({ certificate, revoked }: Props) {
  const issuedDate = new Date(certificate.issuedAt * 1000).toLocaleDateString(
    undefined,
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  return (
    <div
      className={`rounded-lg border p-5 ${
        revoked ? 'border-amber-300 bg-amber-50' : 'border-green-300 bg-green-50'
      }`}
      role="region"
      aria-label="Certificate details"
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            revoked ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {revoked ? '⚠ Revoked' : '✓ Certified'}
        </span>
        <span className="text-xs text-gray-500">
          {CONTENT_TYPE_LABELS[certificate.contentType] ?? certificate.contentType}
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-2 text-sm">
        <Row label="Certificate ID" value={certificate.id} mono />
        <Row label="Issued by (DID)" value={certificate.did} mono />
        <Row label="Issued on" value={issuedDate} />
        <Row
          label="Content hash"
          value={`${certificate.contentHash.slice(0, 16)}…`}
          mono
          title={certificate.contentHash}
        />
        <Row
          label="Transaction"
          value={
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${certificate.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              {certificate.txHash.slice(0, 16)}…
            </a>
          }
        />
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  title,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  title?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <dt className="w-40 shrink-0 font-medium text-gray-600">{label}</dt>
      <dd className={`text-gray-900 break-all ${mono ? 'font-mono text-xs' : ''}`} title={title}>
        {value}
      </dd>
    </div>
  );
}
