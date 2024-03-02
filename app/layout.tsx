import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import './globals.css'

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'k-tasts',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={robotoFlex.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
