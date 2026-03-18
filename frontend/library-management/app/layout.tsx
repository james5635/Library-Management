import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Library Management System",
  description: "A comprehensive library management system for managing books, members, loans, and digital assets.",
};

import MainLayout from "@/components/MainLayout";
import SettingsInitializer from "@/components/SettingsInitializer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SettingsInitializer />
        <AuthProvider>
          <LanguageProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
