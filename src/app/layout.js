import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/design-system.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aurelia Voice | AI Real Estate Voice Agent Platform",
  description:
    "Premium AI voice platform for real estate teams to answer calls, book tours, and convert inquiries with intelligent automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
