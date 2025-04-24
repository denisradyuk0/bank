import type { Metadata } from "next";
import localFont from "next/font/local"; // Изменяем импорт с google на local
import "./globals.css";
import "reflect-metadata";

const manrope = localFont({
  variable: "--font-manrope",
  src: [
    {
      path: "../../public/fonts/manrope/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap", // Рекомендуется добавить для лучшей загрузки
});

const graphhiklcg = localFont({
  variable: "--font-graphhiklcg",
  src: [
    {
      path: "../../public/fonts/graphiklcg/GraphikLCG-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/graphiklcg/GraphikLCG-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/graphiklcg/GraphikLCG-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/graphiklcg/GraphikLCG-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/graphiklcg/GraphikLCG-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap", // Рекомендуется добавить для лучшей загрузки
});

export const metadata: Metadata = {
  title: "Dandypay",
  description: "dandypay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${graphhiklcg.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
