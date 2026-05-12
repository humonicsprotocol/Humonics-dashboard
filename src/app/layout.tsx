import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Humonics',
  description: 'Verify and certify content on the Humonics protocol',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight text-indigo-600">
              Humonics
            </a>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="/" className="hover:text-gray-900">Verify</a>
              <a href="/dashboard" className="hover:text-gray-900">Dashboard</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
