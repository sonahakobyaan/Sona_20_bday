import type { Metadata } from "next";
import { Merriweather } from 'next/font/google';
import "./globals.css";

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sona's 20th Bday",
  description: "Sona's 20th Bday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={merriweather.className}>
      <body>{children}</body>
    </html>
  );
}
