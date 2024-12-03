import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ProcessProvider } from "@/context/process";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader'
import { SelectedProvider } from "@/context/selected";
import Navbar from "@/components/shared/navigation/navbar";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Toaster duration={2000} position="bottom-left" />
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <SelectedProvider>
          <Navbar />
        </SelectedProvider>
        {children}
      </body>
    </html>
  );
}
