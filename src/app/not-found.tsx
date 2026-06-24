import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="text-center max-w-[480px]">
        <p
          className="text-mega text-teal-gradient"
          style={{ fontSize: "clamp(96px, 20vw, 180px)", lineHeight: 0.9 }}
        >
          404
        </p>
        <h1
          className="headline-serif text-ink mt-6 mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 36px)" }}
        >
          Trang không tìm thấy
        </h1>
        <p className="font-sans text-mist mb-8" style={{ fontSize: "16px", lineHeight: 1.5 }}>
          Có thể bài học này đã được sắp xếp lại hoặc đường dẫn không đúng.
        </p>
        <Link
          href="/"
          className="btn-teal-glow inline-flex items-center gap-2 px-6 py-3"
          style={{ fontSize: "16px" }}
        >
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
