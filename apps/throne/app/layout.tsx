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
  // icons: {
    // icon: "/favicon.ico",
  // },
  // keywords: ["aegis", "throne", "command", "system", "leadership", "strategy", "sovereignty"],
  // authors: [{ name: "Aegis", url: "https://aegis.com" }],
  // creator: "Aegis",
  // publisher: "Aegis",
  // openGraph: {
    // title: "Aegis - The Throne Command System",
  // }
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