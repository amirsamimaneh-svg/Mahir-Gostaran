import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import "@fontsource/vazirmatn/300.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "./globals.css";

const SITE_URL = "https://mahir.ir";
const TITLE = "ماهیر | رشد کسب‌وکار از صفر تا صد";
const DESCRIPTION =
  "ماهیر کسب‌وکارهای کوچک را پیدا می‌کند و از صفر تا صد رشدشان می‌دهد — برندینگ، طراحی، تولید محتوا، جذب کاربر و افزایش فروش، همه در یک تیم.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ماهیر",
    "رشد کسب‌وکار",
    "برندینگ",
    "بازاریابی دیجیتال",
    "تولید محتوا",
    "جذب مشتری",
    "افزایش فروش",
  ],
  authors: [{ name: "ماهیر" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "ماهیر",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
