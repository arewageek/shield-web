import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shield Token Bot - Create Charity Tokens on Base",
  description: "Create and manage charity tokens on the Base blockchain with Shield Token Bot",
  other: {
    'base:app_id': '69498efcc63ad876c9080f30',
    'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: 'https://shield-token-bot.vercel.app/favicon.png',
        button: {
            title: `Shield Token Bot`,
            action: {
                type: 'launch_miniapp',
                name: 'Shield Token Bot',
                url: 'https://shield-token-bot.vercel.app',
                splashImageUrl: 'https://shield-token-bot.vercel.app/favicon.png',
                splashBackgroundColor: '#5A7ACD',
            },
        },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
