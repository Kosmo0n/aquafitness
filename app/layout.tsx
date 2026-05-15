import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AquaFit Wellness Club — Premium Aqua Fitness in Kazakhstan",
  description:
    "Discover the future of wellness at AquaFit. Premium aqua fitness, Pilates, Surf, and Standard memberships. Join today and transform your lifestyle.",
  keywords: "aqua fitness, wellness club, pilates, surf, Kazakhstan, membership",
  openGraph: {
    title: "AquaFit Wellness Club",
    description: "Premium aqua fitness memberships in Kazakhstan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="antialiased font-inter">{children}</body>
    </html>
  );
}
