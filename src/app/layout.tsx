import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prestij CRM — AI-Powered Real Estate Platform",
  description: "AI-native CRM for Prestij Consulting — Dubai & Istanbul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
