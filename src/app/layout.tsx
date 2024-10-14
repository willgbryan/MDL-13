import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/context/providers";
import SupabaseProvider from "./supabase-provider";
import { createClient } from "@/db/server";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'National Football League', 
    'Sports machine learning', 
    '13', 
    'Wager odds analytics'
  ],
  authors: [{ name: 'Will' }],
  creator: 'Will',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mdl-13.com',
    title: 'MDL-13',
    description: 'Machine Learning for Sports Analytics',
    siteName: 'MDL-13',
    images: [{
      url: 'https://i.pinimg.com/236x/3f/ca/ef/3fcaefeeac6a0d6d728048fdd3685918.jpg',
      width: 640,
      height: 320,
      alt: 'mdl-13 preview image',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDL-13',
    description: 'Machine Learning for Sports Analytics',
    images: ['https://i.pinimg.com/236x/3f/ca/ef/3fcaefeeac6a0d6d728048fdd3685918.jpg'],
  },
  icons: {
    icon: '/icon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://mdl-13.com'),
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = createClient(cookies())
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body
        className={cn("antialiased dark:bg-black bg-white", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SupabaseProvider session={session}>
            <Navbar />
            {children}
            <Footer />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
