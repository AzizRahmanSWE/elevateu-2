import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider" // Add this import
import { Toaster } from "@/components/ui/sonner" // Add this import

const font = DM_Sans({ subsets: ["latin"] })

// Get site URL from environment variable, with proper fallback handling
// This ensures production builds fail if NEXT_PUBLIC_SITE_URL is not configured
const getSiteUrl = (): string | undefined => {
  // In production, this MUST be set - no fallback to avoid broken URLs
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Only use localhost fallback in development mode
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  // In production, return undefined to skip URL-dependent metadata
  // This prevents broken URLs while still allowing the app to build
  return undefined;
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "ElevateU - Fitness Platform",
  description: "Your personal fitness journey starts here",
  // Only set metadataBase and URL-dependent metadata if siteUrl is available
  ...(siteUrl && {
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "ElevateU - Fitness Platform",
      description: "Your personal fitness journey starts here",
      url: siteUrl,
      siteName: "ElevateU",
      images: [
        {
          url: '/images/elevateuLogo.png',
          width: 1200,
          height: 630,
          alt: 'ElevateU Fitness Platform',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "ElevateU - Fitness Platform",
      description: "Your personal fitness journey starts here",
      images: ['/images/elevateuLogo.png'],
    },
  }),
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}