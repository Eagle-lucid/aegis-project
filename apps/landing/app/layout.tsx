// apps/landing/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aegis - A Throne for Digital Sovereignty",
  description: "Not a dashboard. A throne. Where leaders command, not react.",
  keywords: ["aegis", "throne", "command system", "AI", "sovereignty", "leadership"],
  authors: [{ name: "Lucid the Eagle" }],
  creator: "Lucid the Eagle",
  publisher: "Lucid the Eagle",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Aegis - A Throne for Digital Sovereignty",
    description: "Not a dashboard. A throne.",
    type: "website",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "Aegis Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aegis - A Throne for Digital Sovereignty",
    description: "Not a dashboard. A throne.",
    images: ["/logo-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}