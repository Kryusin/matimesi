import type { Metadata } from "next";
import "./globals.css";
import { Kiwi_Maru } from "next/font/google";

export const metadata: Metadata = {
  title: "まちめし",
  description: "まちめしは、あなたのまちのレストランを紹介するサイトです。",
};

// kiwi_maru fonts
const KiwiMaru = Kiwi_Maru({
  weight: '500',
  style: 'normal',
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={KiwiMaru.className}>{children}</body>
    </html>
  );
}
