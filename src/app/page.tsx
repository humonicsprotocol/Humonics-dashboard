import VerifyWidget from '@/components/VerifyWidget';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
          Verify content authenticity
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Paste a SHA-256 content hash to check whether it has a certificate
          on the Humonics protocol.
        </p>
      </section>

      <VerifyWidget />
    </div>
  );
}
