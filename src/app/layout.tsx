import { PostHogProvider } from '@/components/PostHogProvider'
import { getEvents } from '@/data'
import '@/styles/tailwind.css'
import { Robin } from '@real-robin/react'
import type { Metadata } from 'next'
import type React from 'react'
import { ApplicationLayout } from './application-layout'

export const metadata: Metadata = {
  title: {
    template: '%s - Robin Demo',
    default: 'Robin Demo',
  },
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let events = await getEvents()

  return (
    <html
      lang="en"
      className="light text-zinc-950 antialiased lg:bg-zinc-100"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <PostHogProvider>
          <ApplicationLayout events={events}>{children}</ApplicationLayout>
          <Robin apiKey={process.env.NEXT_PUBLIC_ROBIN_API_KEY!} />
        </PostHogProvider>
      </body>
    </html>
  )
}
