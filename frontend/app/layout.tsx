import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/context/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MDL-13",
  description: "Applied machine learning for sports analytics.",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased dark:bg-black bg-white",
          inter.className,
          "min-h-screen",
          "p-safe"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar className="sticky top-0 pt-safe px-safe" />
            <main className="flex-grow px-safe">{children}</main>
            <Footer className="px-safe pb-safe" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
