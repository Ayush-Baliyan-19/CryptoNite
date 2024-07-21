import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { siteConfig } from "@/lib/constant";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { StoreProvider } from "@/store/StoreProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: { index: true, follow: true },
  icons: ["/favicon.ico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <StoreProvider>
        <body
          className={cn(
            "min-h-screen bg-neutral-50 font-sans antialiased dark:bg-neutral-950",
            inter.className
          )}
        >
          <ThemeProvider attribute="class">
            <Navbar themeToggle />
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
