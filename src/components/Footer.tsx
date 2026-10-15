'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/community', label: 'Community' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer style={{ background: '#0A0C11', borderTop: '1px solid rgba(245,166,35,0.12)' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex">
              <Image
                src="/logo.png"
                width={1291}
                height={294}
                alt="MELKI"
                className="block h-auto max-h-9 w-auto max-w-full object-contain self-center"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
              A network that grows with its people.
            </p>
            <p className="text-xs" style={{ color: 'rgba(160,154,144,0.6)' }}>
              melki.ai
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer links" className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'hsl(var(--primary))' }}>
              Navigate
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-200"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--primary))'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--muted-foreground))'; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'hsl(var(--primary))' }}>
              Connect
            </p>
            <a
              href="mailto:hello@melki.ai"
              className="text-sm transition-colors duration-200"
              style={{ color: 'hsl(var(--muted-foreground))' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--primary))'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--muted-foreground))'; }}
            >
              hello@melki.ai
            </a>
            <div className="flex gap-4 mt-2">
              {/* X (Twitter) */}
              <a
                href="https://x.com/melkiai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                aria-label="MELKI on X"
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--primary))'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--muted-foreground))'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/melkiai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                aria-label="MELKI on LinkedIn"
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--primary))'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--muted-foreground))'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(245,166,35,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(160,154,144,0.5)' }}>
            © {currentYear} MELKI. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(160,154,144,0.4)' }}>
            Connecting communities to the possibilities of AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
