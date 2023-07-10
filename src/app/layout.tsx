import './globals.css'
import { Inter } from 'next/font/google'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Server remote',
  description: 'Remote control the server easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="57x57" href="/images/favicons/icon-57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/images/favicons/icon-60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/icon-72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/images/favicons/icon-76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/images/favicons/icon-114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/images/favicons/icon-120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/images/favicons/icon-144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/images/favicons/icon-152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/icon-180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/images/favicons/icon-192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/icon-32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicons/icon-96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/icon-16.png"/>
        <meta name="msapplication-TileColor" content="#000000"/>
        <meta name="theme-color" content="#e91e63"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
