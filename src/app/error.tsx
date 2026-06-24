"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-background">
      <div className="text-center max-w-[480px]">
        <AlertTriangle className="w-20 h-20 mx-auto text-destructive mb-6 animate-float-slow" />
        <h1 className="headline-serif text-foreground mb-4" style={{ fontSize: "clamp(28px, 5vw, 36px)" }}>
          Đã xảy ra lỗi
        </h1>
        <p className="font-sans text-muted-foreground mb-8" style={{ fontSize: "16px", lineHeight: 1.5 }}>
          Ứng dụng gặp sự cố. Vui lòng thử lại.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 font-sans font-medium text-white bg-deep-teal hover:bg-bright-teal transition-colors"
            style={{ fontSize: "16px", borderRadius: "8px" }}
          >
            <RefreshCw className="w-5 h-5" />
            Thử lại
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 font-sans font-medium text-mist border border-hairline hover:bg-cream transition-colors"
            style={{ fontSize: "16px", borderRadius: "8px" }}
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
