import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/site/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dongbayai.vn"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Đòn Bẩy AI · Hệ Sinh Thái Học Liệu Tương Tác K-20 & Trợ Lý AI | Thầy Kha Khung Hiệp",
    template: "%s · Đòn Bẩy AI",
  },
  description:
    "Hệ sinh thái học liệu tương tác, game AR và trợ lý soạn giảng AI chuẩn GEMS dành cho giáo viên, học sinh và phụ huynh từ Mầm non đến Đại học. Sáng lập bởi thầy Kha Khung Hiệp.",
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
    "Game AR",
    "Thí nghiệm ảo",
  ],
  authors: [{ name: "Thầy Kha Khung Hiệp" }],
  icons: {
    icon: [
      { url: "/images/logo.svg", type: "image/svg+xml" },
      { url: "/images/logo.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Đòn Bẩy AI · Hệ Sinh Thái Học Liệu Tương Tác K-20 & Trợ Lý AI",
    description:
      "Cổng học liệu tương tác, game AR và trợ lý soạn giảng AI chuẩn GEMS từ Mầm non đến Đại học. Sáng lập bởi thầy Kha Khung Hiệp.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đòn Bẩy AI · Hệ Sinh Thái Học Liệu Tương Tác K-20 & Trợ Lý AI",
    description:
      "Cổng học liệu tương tác, game AR và trợ lý soạn giảng AI chuẩn GEMS từ Mầm non đến Đại học.",
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
        className={`${inter.variable} ${sourceSerif.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
