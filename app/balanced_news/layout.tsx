import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Browse nuanced news",
	description: "A news aggregator that shows you both sides of the story",
  keywords: ['sophoz', 'news', 'artificial intelligence', 'machine learning', 'technology', 'politics', 'information', 'understand', 'newspaper', 'search'],
  icons: {
    icon: "/Sophoz logo.jpg",
    apple: "/favicon_io/apple-touch-icon.png",
    //android: "/favicon_io/android-chrome-192x192.png",
  },
  colorScheme: "light",
  themeColor: "#E54B4B",
  category: "news",
}

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
    </main>
  )
}
