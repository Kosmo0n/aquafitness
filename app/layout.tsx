import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
