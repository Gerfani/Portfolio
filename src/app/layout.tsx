import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aliyousefli.com'),
  title: "Amirali (Ali) Yousefli's Portfolio",
  description: "Healthcare AI Developer, Business Strategist, and Healthcare Innovator passionate about transforming healthcare through AI and business innovation.",
  openGraph: {
    title: "Amirali (Ali) Yousefli's Portfolio",
    description: "Healthcare AI Developer, Business Strategist, and Healthcare Innovator passionate about transforming healthcare through AI and business innovation.",
    images: [
      {
        url: "/meta.png",
        width: 1788,
        height: 1370,
        alt: "Amirali (Ali) Yousefli's Portfolio"
      }
    ],
    type: 'website',
    siteName: "Amirali (Ali) Yousefli's Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Amirali (Ali) Yousefli's Portfolio",
    description: "Healthcare AI Developer, Business Strategist, and Healthcare Innovator passionate about transforming healthcare through AI and business innovation.",
    images: ["/meta.png"],
    creator: "@aliyousefli"
  },
  other: {
    'share-id': 'portfolio-ali-yousefli'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
