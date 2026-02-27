import type { Metadata } from 'next'
import { Oswald, Roboto_Mono } from 'next/font/google'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kurtmetzgerfanclub.com'),
  title: "Kurt Metzger Fanclub — Dark Comedy's Brightest Flame",
  description:
    "Unofficial Kurt Metzger Fanclub — Celebrating dark comedy's brightest flame. Watch clips, read savage quotes, and stay updated on tour dates.",
  keywords: [
    'Kurt Metzger',
    'comedy',
    'comedian',
    'fanclub',
    'standup',
    'dark comedy',
    'Jimmy Dore Show',
    'roast',
    'savage comedy',
  ],
  authors: [{ name: 'Kurt Metzger Fanclub' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: "Kurt Metzger Fanclub — Dark Comedy's Brightest Flame",
    description: 'Unofficial fanclub celebrating the uncompromising comedy genius of Kurt Metzger',
    url: 'https://kurtmetzgerfanclub.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kurt Metzger Fanclub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurt Metzger Fanclub',
    description: "Dark Comedy's Brightest Flame",
    images: ['/images/twitter-card.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${robotoMono.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      </head>
      <body className="bg-primary-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
