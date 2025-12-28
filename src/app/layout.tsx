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
  title: "Ciencia Chile - ANID | NewCooltura Informada",
  description: "Centros de investigacion, fondos ANID, Becas Chile y calculadora de tamano muestral",
  keywords: ["ANID", "ciencia Chile", "investigacion", "Becas Chile", "fondos concursables"],
  openGraph: {
    title: "Ciencia Chile - NewCooltura Informada",
    description: "Investigacion, fondos ANID y Becas Chile",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
