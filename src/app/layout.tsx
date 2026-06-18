import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/site/navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Đòn Bẩy AI · Tuyên Ngôn Tầm Nhìn & Sứ Mệnh | Thầy Kha Khung Hiệp",
    template: "%s · Đòn Bẩy AI",
  },
  description:
    "Dự án Đòn Bẩy AI — Biến AI thành chiếc đòn bẩy thực thụ giúp giáo viên Vật lý & Khoa học Tự nhiên THPT giải phóng sức lao động và nâng tầm chất lượng dạy học. Sáng lập bởi Thầy Kha Khung Hiệp.",
  keywords: [
    "Đòn Bẩy AI",
    "Kha Khung Hiệp",
    "GEMS Physics",
    "AI giáo dục",
    "Vật lý THPT",
    "Khoa học Tự nhiên",
    "Edu-Graphic",
    "Gemini Gems",
    "NotebookLM",
    "Marp CLI",
    "TikZ",
    "GEMS V6",
  ],
  authors: [{ name: "Thầy Kha Khung Hiệp" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Đòn Bẩy AI · Tuyên Ngôn Tầm Nhìn & Sứ Mệnh",
    description:
      "Chuyên môn giáo viên làm điểm tựa — Công nghệ AI làm đòn bẩy. Sáng lập bởi Thầy Kha Khung Hiệp.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đòn Bẩy AI · Tuyên Ngôn Tầm Nhìn & Sứ Mệnh",
    description:
      "Chuyên môn giáo viên làm điểm tựa — Công nghệ AI làm đòn bẩy.",
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
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
