import "./globals.scss";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { AppProvider } from "@/context";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"] 
})

export const metadata: Metadata = {
  title: "Todo list challenge",
  description: "Solution of Todo App frontend mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable}`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
