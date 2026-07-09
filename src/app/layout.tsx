import type { Metadata } from "next";
import ParticlesBg from "@/components/ParticlesBg";
import BottomNav from "@/components/BottomNav";
import ChatBot from "@/components/ChatBot";
import PageLoader from "@/components/PageLoader";
import "@fontsource/vazirmatn/300.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ماهیر | Mahir — مشاور رشد کسب‌وکار",
  description: "ماهیر — شریک هوشمند رشد کسب‌وکار شما. استراتژی، هویت برند و بازاریابی دیجیتال.",
  openGraph: {
    title: "ماهیر | Mahir — مشاور رشد کسب‌وکار",
    description: "استراتژی رشد، هویت برند، بازاریابی دیجیتال و هوش مصنوعی برای کسب‌وکار شما.",
    siteName: "ماهیر",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ماهیر | Mahir",
    description: "شریک هوشمند رشد کسب‌وکار شما",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className="antialiased min-h-full">
        <PageLoader />
        <ParticlesBg />
        {children}
        <BottomNav />
        <ChatBot />
      </body>
    </html>
  );
}
