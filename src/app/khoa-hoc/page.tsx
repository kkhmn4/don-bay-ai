"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, FlaskConical, Gamepad2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

type Hook = { type: "Sư phạm" | "Học sinh" | "Kỹ thuật"; text: string };
type Lesson = {
  no: string;
  module: string;
  title: string;
  topic: string;
  hooks: Hook[];
  solution: string;
  cta: string;
  image: string;
  wash: "mint" | "cream" | "blossom";
  gamePath?: string;
};

const MODULES = [
  {
    no: "Module 1",
    range: "Bài 1–4",
    title: "Soạn giảng với Gemini & NotebookLM",
    icon: Bot,
    desc: "4 bài học ứng dụng AI soạn giảng — hướng dẫn tạo Trợ lý AI (Custom Gem), tài liệu học tập với NotebookLM, âm thanh đối thoại cho lớp học đảo ngược và mẫu in ấn.",
    wash: "mint" as const,
  },
  {
    no: "Module 2",
    range: "Bài 5–7",
    title: "Thí nghiệm ảo tương tác",
    icon: FlaskConical,
    desc: "3 bài học thiết kế thí nghiệm ảo và mô phỏng vật lý trực quan, hiển thị mượt mà trên mọi thiết bị — từ đồ họa SVG đến mô phỏng Canvas.",
    wash: "cream" as const,
  },
  {
    no: "Module 3",
    range: "Bài 8–11",
    title: "Trò chơi tương tác lớp học",
    icon: Gamepad2,
    desc: "4 bài học thiết kế trò chơi học tập tương tác — bao gồm trò chơi khởi động, trò chơi giải lao, trò chơi củng cố và tổ chức dạy học xoay trạm.",
    wash: "blossom" as const,
  },
];

const LESSONS: Lesson[] = [
  {
    no: "01",
    module: "Module 1",
    title: "Soạn bài dạy bằng Gemini Custom Gem",
    topic: "Dùng Gemini soạn kế hoạch bài dạy và phiếu học tập điền khuyết nhanh chóng bằng tiếng Việt.",
    hooks: [
      { type: "Sư phạm", text: "Soạn bài bằng AI ra kết quả chung chung? — Cách dùng Trợ lý AI định hướng GEMS để soạn bài trong 10 phút." },
      { type: "Học sinh", text: "Học sinh dễ thụ động khi chỉ ghi chép? — Thiết kế phiếu học tập điền khuyết tăng tương tác thảo luận." },
      { type: "Kỹ thuật", text: "Không quen viết câu lệnh dài bằng tiếng Anh? — Chỉ cần cấu hình chỉ dẫn bằng tiếng Việt bám sát sách giáo khoa." },
    ],
    solution: "Trợ lý AI tự động soạn thảo kế hoạch bài dạy và phiếu học tập.",
    cta: "Xem câu lệnh mẫu tại Bài 1.",
    image: "/images/lesson-01.png",
    wash: "mint",
  },
  {
    no: "02",
    module: "Module 1",
    title: "NotebookLM chống thông tin sai lệch",
    topic: "Tải tài liệu PDF sách giáo khoa vào NotebookLM để làm trợ lý học tập và thiết kế câu hỏi chính xác bám sát nội dung.",
    hooks: [
      { type: "Sư phạm", text: "E ngại AI tự tạo kiến thức sai lệch? — Nạp tài liệu trực tiếp vào NotebookLM để đối chiếu thông tin chính xác." },
      { type: "Học sinh", text: "Học sinh chủ động ôn tập nhờ câu hỏi gợi mở? — Thiết kế câu hỏi kiểm tra nhanh để lớp thảo luận sâu." },
      { type: "Kỹ thuật", text: "Thiết kế câu hỏi bị sai kiến thức cơ bản? — Sử dụng câu lệnh ràng buộc chỉ dùng thông tin từ nguồn cung cấp." },
    ],
    solution: "Hệ thống tự động phân tích tài liệu để tạo bộ câu hỏi thảo luận bám sát chương trình học.",
    cta: "Xem hướng dẫn và câu lệnh tại Bài 2.",
    image: "/images/lesson-02.png",
    wash: "cream",
  },
  {
    no: "03",
    module: "Module 1",
    title: "Tệp âm thanh đối thoại cho lớp học đảo ngược",
    topic: "Tạo tệp âm thanh đối thoại (podcast) song ngữ từ tài liệu học tập giúp học sinh chuẩn bị bài trước khi đến lớp.",
    hooks: [
      { type: "Sư phạm", text: "Biến sách giáo khoa khô khan thành tệp âm thanh đối thoại sinh động giúp học sinh tự học tại nhà." },
      { type: "Học sinh", text: "Tăng khả năng tự học qua âm thanh trực quan giúp học sinh nắm vững kiến thức trước giờ lên lớp." },
      { type: "Kỹ thuật", text: "Tự động tạo phụ đề tiếng Việt đồng bộ với âm thanh đối thoại giúp học sinh dễ dàng theo dõi." },
    ],
    solution: "Sử dụng công cụ chuyển tài liệu thành tệp âm thanh đối thoại và kết hợp phụ đề tiếng Việt.",
    cta: "Tải học liệu mẫu và xem hướng dẫn tại Bài 3.",
    image: "/images/lesson-03.png",
    wash: "blossom",
  },
  {
    no: "04",
    module: "Module 1",
    title: "Thiết kế mẫu tài liệu Word 2 cột tối ưu in ấn",
    topic: "Thiết kế phiếu học tập chia cột chuẩn hóa giúp tiết kiệm không gian giấy và tối ưu lượng mực in cho trường học.",
    hooks: [
      { type: "Sư phạm", text: "Tài liệu in ra bị mờ hoặc tốn nhiều mực? — Cách phối màu sắc và độ tương phản giúp bản in rõ nét." },
      { type: "Học sinh", text: "Phiếu học tập rõ ràng, khoa học giúp học sinh ghi chép nề nếp và tập trung hơn." },
      { type: "Kỹ thuật", text: "Tối ưu hóa chi phí in ấn số lượng lớn nhờ sử dụng viền mỏng và màu sắc tối giản." },
    ],
    solution: "Cung cấp mẫu cấu trúc tài liệu Word chia cột chuẩn hóa để giáo viên sử dụng ngay.",
    cta: "Tải mẫu tài liệu Word tại Bài 4.",
    image: "/images/lesson-04.png",
    wash: "mint",
  },
  {
    no: "05",
    module: "Module 2",
    title: "Thí nghiệm ảo: Dòng truyền nhiệt tương tác",
    topic: "Mô phỏng quá trình truyền nhiệt cho phép điều chỉnh các tham số và quan sát sự thay đổi trực quan.",
    hooks: [
      { type: "Sư phạm", text: "Giúp học sinh dễ dàng hình dung dòng nhiệt nhờ thanh trượt thay đổi nhiệt độ và tốc độ truyền." },
      { type: "Học sinh", text: "Học sinh quét mã QR trên phiếu học tập để tự tương tác với mô phỏng trên thiết bị cá nhân." },
      { type: "Kỹ thuật", text: "Thiết kế mô phỏng chạy trực tiếp trên trình duyệt web, không cần cài đặt ứng dụng phức tạp." },
    ],
    solution: "Mô phỏng tương tác giúp học sinh tự khám phá bài học thông qua thao tác điều chỉnh thanh trượt.",
    cta: "Trải nghiệm mô phỏng truyền nhiệt tại Bài 5.",
    image: "/images/lesson-05.png",
    wash: "cream",
  },
  {
    no: "06",
    module: "Module 2",
    title: "Mô phỏng tương tác nhiệt kế chất lỏng",
    topic: "Tạo mô phỏng nhiệt kế chất lỏng chuyển động tự nhiên giúp học sinh nhận biết các thang đo nhiệt độ Celsius và Kelvin.",
    hooks: [
      { type: "Sư phạm", text: "Trực quan hóa sự nở vì nhiệt của chất lỏng bằng chuyển động mượt mà, phản ánh đúng thực tế." },
      { type: "Học sinh", text: "Học sinh tương tác thay đổi nhiệt độ để so sánh trực quan các thang đo Celsius và Kelvin." },
      { type: "Kỹ thuật", text: "Lập trình hiệu ứng vật lý tự nhiên bằng các thuộc tính chuyển động (CSS transition) tối ưu." },
    ],
    solution: "Nhiệt kế ảo tương tác giúp giải thích khái niệm thang đo nhiệt độ một cách dễ hiểu.",
    cta: "Trải nghiệm mô phỏng nhiệt kế tại Bài 6.",
    image: "/images/lesson-06.png",
    wash: "blossom",
  },
  {
    no: "07",
    module: "Module 2",
    title: "Mô phỏng động học phân tử khí",
    topic: "Minh họa chuyển động hỗn loạn của các phân tử khí, quá trình va chạm vào thành bình chứa và sự thay đổi theo nhiệt độ.",
    hooks: [
      { type: "Sư phạm", text: "Trực quan hóa sinh động mô hình phân tử mà mắt thường không thể quan sát được." },
      { type: "Học sinh", text: "Giúp học sinh tự rút ra mối liên hệ giữa nhiệt độ của chất khí và tốc độ chuyển động của phân tử." },
      { type: "Kỹ thuật", text: "Lập trình chuyển động va chạm đàn hồi của các hạt khí bằng ngôn ngữ web tiêu chuẩn, chạy trực tiếp." },
    ],
    solution: "Mô phỏng tương tác giúp học sinh tự khám phá thuyết động học phân tử khí thông qua quan sát.",
    cta: "Xem hướng dẫn và mã nguồn tại Bài 7.",
    image: "/images/lesson-07.png",
    wash: "mint",
  },
  {
    no: "08",
    module: "Module 3",
    title: "Thiết kế trò chơi khởi động tiết học",
    topic: "Xây dựng trò chơi trắc nghiệm ngắn có giới hạn thời gian để củng cố kiến thức bài cũ và bắt đầu bài mới.",
    hooks: [
      { type: "Sư phạm", text: "Tạo bầu không khí sôi nổi ngay từ đầu tiết học nhờ các câu hỏi tương tác nhanh." },
      { type: "Học sinh", text: "Kích thích tinh thần học tập chủ động của học sinh thông qua hoạt động ôn tập vui nhộn." },
      { type: "Kỹ thuật", text: "Sử dụng trí tuệ nhân tạo hỗ trợ thiết kế bộ câu hỏi khởi động gắn liền với thực tiễn đời sống." },
    ],
    solution: "Trò chơi trắc nghiệm củng cố bài cũ giúp học sinh hào hứng bước vào bài học mới.",
    cta: "Chơi thử trò chơi khởi động tại Bài 8.",
    image: "/images/lesson-08.png",
    wash: "cream",
    gamePath: "/games/warmup-quiz/index.html",
  },
  {
    no: "09",
    module: "Module 3",
    title: "Trò chơi giải lao bóng nhiệt tương tác",
    topic: "Trò chơi nhỏ tương tác giúp học sinh giải tỏa căng thẳng và tăng cường tập trung giữa tiết học.",
    hooks: [
      { type: "Sư phạm", text: "Giúp giải tỏa mệt mỏi cho học sinh trong các tiết học dài bằng hoạt động giải lao ngắn." },
      { type: "Học sinh", text: "Kích thích phản xạ nhanh nhạy của học sinh thông qua thao tác tương tác thú vị trên màn hình." },
      { type: "Kỹ thuật", text: "Trò chơi chạy trực tiếp trên trình duyệt điện thoại mà không cần cài đặt thêm phần mềm." },
    ],
    solution: "Hoạt động tương tác ngắn giúp học sinh lấy lại sự tập trung cao độ cho phần tiếp theo của bài học.",
    cta: "Trải nghiệm trò chơi giải lao tại Bài 9.",
    image: "/images/lesson-09.png",
    wash: "blossom",
    gamePath: "/games/bong-nhiet/index.html",
  },
  {
    no: "10",
    module: "Module 3",
    title: "Trò chơi củng cố và phát hiện ngộ nhận",
    topic: "Xây dựng câu hỏi Đúng/Sai giúp học sinh tự kiểm tra kiến thức và nhận diện những hiểu lầm phổ biến trong vật lý.",
    hooks: [
      { type: "Sư phạm", text: "Giúp học sinh khắc sâu kiến thức nhờ các tình huống thực tế dễ gây hiểu lầm." },
      { type: "Học sinh", text: "Khuyến khích học sinh thảo luận, phản biện để hiểu sâu sắc bản chất khoa học." },
      { type: "Kỹ thuật", text: "Ứng dụng Trợ lý AI để tự động biên soạn các câu hỏi trắc nghiệm Đúng/Sai bám sát cấu trúc đề thi." },
    ],
    solution: "Bài trắc nghiệm củng cố kèm lời giải thích khoa học hiển thị ngay lập tức khi học sinh trả lời.",
    cta: "Trải nghiệm trò chơi củng cố tại Bài 10.",
    image: "/images/lesson-10.png",
    wash: "mint",
  },
  {
    no: "11",
    module: "Module 3",
    title: "Tổ chức dạy học theo trạm với mã QR",
    topic: "Phương pháp tổ chức lớp học chia nhóm luân chuyển qua các trạm học tập tích hợp công nghệ quét mã QR.",
    hooks: [
      { type: "Sư phạm", text: "Thiết lập quy trình xoay trạm học tập tự giác bằng cách dán mã QR dẫn tới mô phỏng tại mỗi bàn nhóm." },
      { type: "Học sinh", text: "Tăng tính chủ động và kỹ năng làm việc nhóm khi học sinh cùng thảo luận về bài học ảo." },
      { type: "Kỹ thuật", text: "Sử dụng các mô phỏng tối ưu hóa dung lượng nhẹ để chạy ổn định trên mọi kết nối di động." },
    ],
    solution: "Mô hình 5 trạm hoạt động: Thực hành · Mô phỏng · Củng cố · Sơ đồ tư duy · Xem tư liệu.",
    cta: "Tải kế hoạch bài dạy xoay trạm tại Bài 11.",
    image: "/images/lesson-11.png",
    wash: "cream",
    gamePath: "/games/ar-knowledge-universe/index.html",
  },
];

function getWashBg(wash: string) {
  switch (wash) {
    case "mint": return "#b9ffe8";
    case "cream": return "#fffded";
    case "blossom": return "#ffc3e6";
    default: return "#ffffff";
  }
}

/* ---------------- Module header ---------------- */
function ModuleHeader({ module, icon: Icon }: { module: typeof MODULES[0]; icon: React.ElementType }) {
  return (
    <Reveal>
      <div className="text-center mb-12 max-w-[720px] mx-auto">
        <span className="badge-mint mb-4 animate-badge-bounce">{module.no} · {module.range}</span>
        <h2
          className="headline-serif text-ink mb-3"
          style={{ fontSize: "clamp(36px, 5.5vw, 52px)", lineHeight: 1.1 }}
        >
          {module.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-teal-gradient">{module.title.split(" ").slice(-1)[0]}</span>
        </h2>
        <p className="font-sans text-mist mx-auto" style={{ fontSize: "17px", lineHeight: 1.5, maxWidth: "560px" }}>
          {module.desc}
        </p>
      </div>
    </Reveal>
  );
}

/* ---------------- Lesson card with tri-tone wash ---------------- */
function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Reveal>
      <article
        className="overflow-hidden h-full flex flex-col bg-paper border border-hairline lift-on-hover"
        style={{ borderRadius: "24px" }}
      >
        {/* Image header inside tri-tone wash */}
        <div
          className="p-5 relative"
          style={{ backgroundColor: getWashBg(lesson.wash) }}
        >
          {/* Mega lesson number — overlaid on wash background */}
          <span
            className="absolute top-2 right-6 headline-serif text-ink select-none pointer-events-none number-glow"
            style={{ fontSize: "96px", lineHeight: 0.85, opacity: 0.18, letterSpacing: "-0.04em" }}
          >
            {lesson.no}
          </span>

          <div
            className="relative aspect-[16/10] overflow-hidden bg-paper"
            style={{ borderRadius: "8px" }}
          >
            <Image
              src={lesson.image}
              alt={`Bài ${lesson.no} — ${lesson.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* lesson number badge — solid teal pill */}
            <div className="absolute top-3 left-3">
              <span
                className="font-sans font-medium text-paper"
                style={{
                  backgroundColor: "#006e75",
                  borderRadius: "9999px",
                  padding: "4px 14px",
                  fontSize: "13px",
                }}
              >
                Bài {lesson.no}
              </span>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 flex flex-col" style={{ padding: "24px" }}>
          <h3
            className="headline-serif text-ink mb-2"
            style={{ fontSize: "24px", lineHeight: 1.2 }}
          >
            {lesson.title}
          </h3>

          {/* topic */}
          <p className="font-sans text-mist mb-5 pl-3 border-l-2 border-hairline" style={{ fontSize: "15px", lineHeight: 1.5 }}>
            {lesson.topic}
          </p>

          {/* hooks */}
          <div className="space-y-2 mb-5">
            <p className="font-sans font-medium text-deep-teal mb-3" style={{ fontSize: "13px", letterSpacing: "0.1em" }}>
              💡 THÁCH THỨC VÀ BÀI TOÁN LỚP HỌC
            </p>
            {lesson.hooks.map((h, idx) => (
              <div
                key={idx}
                className="flex gap-3 bg-cream"
                style={{ borderRadius: "8px", padding: "10px 12px" }}
              >
                <span
                  className="shrink-0 font-sans font-medium text-ink"
                  style={{
                    backgroundColor: "#b9ffe8",
                    borderRadius: "9999px",
                    padding: "2px 10px",
                    fontSize: "12px",
                  }}
                >
                  {h.type}
                </span>
                <p className="font-sans text-mist leading-snug flex-1" style={{ fontSize: "13px" }}>{h.text}</p>
              </div>
            ))}
          </div>

          {/* solution + CTA */}
          <div className="mt-auto pt-4 border-t border-hairline space-y-3">
            <div className="flex gap-3">
              <span className="shrink-0 font-sans font-medium text-deep-teal mt-0.5" style={{ fontSize: "12px" }}>
                ✅ GIẢI PHÁP THỰC TẾ
              </span>
              <p className="font-sans text-ink leading-relaxed flex-1" style={{ fontSize: "14px" }}>{lesson.solution}</p>
            </div>
            <div
              className="flex gap-3 items-start p-3"
              style={{ backgroundColor: "#fffded", borderRadius: "8px" }}
            >
              <span className="shrink-0 font-sans font-medium text-deep-teal mt-0.5" style={{ fontSize: "12px" }}>
                🎯 THỰC HÀNH
              </span>
              <p className="font-sans font-medium text-ink" style={{ fontSize: "14px" }}>{lesson.cta}</p>
            </div>
            {lesson.gamePath && (
              <div className="pt-3">
                <Link
                  href={lesson.gamePath}
                  target="_blank"
                  className="w-full btn-teal inline-flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all"
                  style={{ borderRadius: "12px" }}
                >
                  <Gamepad2 className="w-4 h-4" />
                  Chơi Game Tương Tác
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------------- Page ---------------- */
export default function KhoaHocPage() {
  const module1Lessons = LESSONS.filter((l) => l.module === "Module 1");
  const module2Lessons = LESSONS.filter((l) => l.module === "Module 2");
  const module3Lessons = LESSONS.filter((l) => l.module === "Module 3");

  // alternate section backgrounds: white → mint → white → cream
  const moduleSections = [
    { module: MODULES[0], lessons: module1Lessons, bg: "bg-paper" },
    { module: MODULES[1], lessons: module2Lessons, bg: "bg-mint-glass" },
    { module: MODULES[2], lessons: module3Lessons, bg: "bg-paper" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Lộ trình 11 bài học"
        title={<>Khóa học Đòn Bẩy AI</>}
        subtitle="11 bài học soạn giảng bằng AI, thiết kế thí nghiệm ảo tương tác và trò chơi học tập trực quan bám sát khung chương trình giảng dạy."
      />

      {/* Quick nav on cream */}
      <section className="py-8 px-5 sm:px-8 bg-cream border-y border-hairline">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <a
                  key={m.no}
                  href={`#module-${m.no.split(" ")[1]}`}
                  className="group flex items-center gap-3 bg-paper border border-hairline hover:border-deep-teal transition-colors"
                  style={{ borderRadius: "24px", padding: "20px" }}
                >
                  <div
                     className="inline-flex items-center justify-center bg-mint-glass text-deep-teal shrink-0"
                     style={{ borderRadius: "9999px", width: "40px", height: "40px" }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans font-medium text-deep-teal" style={{ fontSize: "12px" }}>
                      {m.no} · {m.range}
                    </p>
                    <p className="font-sans font-medium text-ink truncate" style={{ fontSize: "14px" }}>
                      {m.title}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules with alternating backgrounds */}
      {moduleSections.map((section, idx) => (
        <section
          key={section.module.no}
          id={`module-${section.module.no.split(" ")[1]}`}
          className={`py-20 px-5 sm:px-8 ${section.bg}`}
        >
          <div className="max-w-[1200px] mx-auto">
            <ModuleHeader module={section.module} icon={section.module.icon} />
            <div className="grid md:grid-cols-2 gap-6">
              {section.lessons.map((l) => (
                <LessonCard key={l.no} lesson={l} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA to games page on mint */}
      <section className="py-20 px-5 sm:px-8 bg-mint-glass">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <span className="badge-mint mb-6 animate-badge-bounce">Học qua chơi</span>
            <h2
              className="headline-serif text-ink mb-4"
              style={{ fontSize: "clamp(36px, 5.5vw, 52px)", lineHeight: 1.1 }}
            >
              Trải nghiệm <span className="text-teal-gradient">Trò chơi tương tác AR/3D</span>
            </h2>
            <p className="font-sans text-ink mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
              Tương tác thực tế tăng cường ngay trên webcam của bạn để trực quan hóa kiến thức và tăng hứng thú học tập tích cực.
            </p>
            <Link href="/games/ar-knowledge-universe/index.html" target="_blank" className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2">
              Chơi trò chơi AR ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
