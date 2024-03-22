import type { Metadata } from "next";
import "./globals.css";
import { ZenKakuGothicNew } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "まちめし",
  description: "まちめしは、あなたのまちのレストランを紹介するサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${ZenKakuGothicNew.className}`}>{children}</body>
    </html>
  );
}
