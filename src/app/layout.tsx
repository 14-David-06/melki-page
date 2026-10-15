import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const siteUrl = 'https://melki.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'MELKI — The Future Is Local',
  description:
    'MELKI connects underserved communities to the possibilities of AI through affordable connectivity, intelligent applications, and a local developer ecosystem.',
  icons: { icon: '/logo.png' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MELKI — The Future Is Local',
    description: 'Connecting communities to the possibilities of AI.',
    url: siteUrl,
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
