import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome Book - Lido di Venezia",
  description: "La guida della casa e i nostri consigli per il tuo soggiorno al Lido di Venezia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} text-gray-800 antialiased font-sans flex items-center justify-center min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
