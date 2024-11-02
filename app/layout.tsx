import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ProcessProvider } from "@/lib/context";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OS Scheduling Algorithms",
  description: "A simple web app to visualize OS scheduling algorithms",
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
        <ProcessProvider>
          <Toaster />
          {children}
        </ProcessProvider>
      </body>
    </html>
  );
}
