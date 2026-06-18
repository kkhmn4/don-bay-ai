import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/site/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Đòn Bẩy AI · Khóa học 11 bài + 11 video ngắn đa kênh | Thầy Kha Khung Hiệp",
    template: "%s · Đòn Bẩy AI",
  },
  description:
    "Khóa học Đòn Bẩy AI v8.0 — Giáo viên kiểm soát, AI tối ưu hiệu suất. 11 bài học đồng bộ 1-1 với 11 kịch bản video ngắn đa kênh tích hợp Gemini và NotebookLM.",
  keywords: [
    "Đòn Bẩy AI",
    "Kha Khung Hiệp",
    "GEMS Physics",
    "AI giáo dục",
    "Vật lý THPT",
    "Gemini",
    "NotebookLM",
    "Edu-Graphic",
    "Khóa học AI",
    "Video ngắn giáo dục",
  ],
  authors: [{ name: "Thầy Kha Khung Hiệp" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Đòn Bẩy AI · Khóa học 11 bài + 11 video ngắn đa kênh",
    description:
      "Giáo viên kiểm soát, AI tối ưu hiệu suất. 11 bài · 11 video · Gemini & NotebookLM.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đòn Bẩy AI · Khóa học 11 bài + 11 video ngắn đa kênh",
    description:
      "Giáo viên kiểm soát, AI tối ưu hiệu suất.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col bg-pure-black">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
