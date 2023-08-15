import './globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Sophoz - A new way to get informed',
  description: 'Sophoz helps you understnad news easily. With Sophoz, you will catch the information and the arguments of the different sides on a topic.',
  keywords: ['sophoz', 'news', 'artificial intelligence', 'machine learning', 'technology', 'politics', 'information', 'understand', 'newspaper'],
  icons: {
    icon: "/Sophoz logo.jpg",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  colorScheme: "light",
  themeColor: "#E54B4B",
  category: "news",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
