import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found — MELKI',
};

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-xxxl" style={{ background: '#0F1117' }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'hsl(var(--primary))' }}>
        404
      </p>
      <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(var(--card-foreground))' }}>
        Page not found
      </h1>
      <p className="mb-10 w-full max-w-md" style={{ color: 'hsl(var(--muted-foreground))' }}>
        The page you're looking for doesn't exist yet.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
        style={{ background: 'hsl(var(--primary))', color: '#0F1117' }}
      >
        Back to home
      </Link>
    </main>
  );
}
