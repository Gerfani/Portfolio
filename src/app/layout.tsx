import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ghazal-erfani-portfolio.vercel.app'),
  title: "Ghazal Erfani's Portfolio",
  description: "Engineer, Educator, and Movement Builder. IT Operations student at Red River College passionate about technology, education, and community building.",
  openGraph: {
    title: "Ghazal Erfani's Portfolio",
    description: "Engineer, Educator, and Movement Builder. IT Operations student at Red River College passionate about technology, education, and community building.",
    images: [
      {
        url: "/meta.png",
        width: 1788,
        height: 1370,
        alt: "Ghazal Erfani's Portfolio"
      }
    ],
    type: 'website',
    siteName: "Ghazal Erfani's Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghazal Erfani's Portfolio",
    description: "Engineer, Educator, and Movement Builder. IT Operations student at Red River College passionate about technology, education, and community building.",
    images: ["/meta.png"],
    creator: "@GhazalErfani"
  },
  other: {
    'share-id': 'portfolio-ghazal-erfani'
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
