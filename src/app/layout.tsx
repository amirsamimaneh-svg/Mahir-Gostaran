import type { Metadata } from "next";
import ParticlesBg from "@/components/ParticlesBg";
import BottomNav from "@/components/BottomNav";
import "@fontsource/vazirmatn/300.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ماهیر | Mahir — مشاور رشد کسب‌وکار",
  description:
    "ماهیر — شریک هوشمند رشد کسب‌وکار شما. استراتژی، هویت برند و بازاریابی دیجیتال.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className="antialiased min-h-full">
        <ParticlesBg />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
