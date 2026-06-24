export default function LessonNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-background">
      <div className="max-w-md">
        <span className="headline-serif text-ink" style={{ fontSize: "clamp(72px, 15vw, 120px)", lineHeight: 1 }}>
          404
        </span>
        <h1 className="headline-serif text-ink mt-4 mb-3" style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>
          Không tìm thấy bài học
        </h1>
        <p className="font-sans text-mist mb-8" style={{ fontSize: "16px", lineHeight: 1.6 }}>
          Bài học bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <a
          href="/khoa-hoc"
          className="btn-teal inline-flex items-center justify-center gap-2 no-underline"
        >
          ← Quay lại Khóa học
        </a>
      </div>
    </div>
  );
}
