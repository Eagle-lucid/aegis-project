// apps/throne/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aegis - The Throne Command System",
  description: "Not a dashboard. A throne for leadership, strategy, and sovereignty.",
  icons: {
    icon: "/favicon.svg",
    apple: '/apple-touch-icon.png'
  },
  keywords: ["aegis", "throne", "command", "system", "leadership", "strategy", "sovereignty"],
  authors: [{ name: "LucidTheEagle", url: "https://github.com/Eagle-lucid/aegis-project.git" }],
  creator: "LucidTheEagle",
  publisher: "LucidTheEagle",
  openGraph: {
    title: "Aegis - The Throne Command System",
    description: 'A sovereign command system for modern leaders',
    type: 'website',
    images: [
      {
        url: '/logo-512.png',
        width: 512,
        height: 512,
        alt: 'Project Aegis Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Project Aegis - Throne',
    description: 'A sovereign command system for modern leaders',
    images: ['/logo-512.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-throne-bg-primary text-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}