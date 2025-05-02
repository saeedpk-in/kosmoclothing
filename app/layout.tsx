import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const manrop = Manrope({
  variable: "--font-manrop",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    template: '%s | Kosmo Clothing',
    default: "Kosmo Clothing",
  },
  description: "Kosmo Clothing is a clothing brand that offers a wide range of stylish and comfortable apparel for all occasions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrop.variable} font-manrop antialiased `}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
