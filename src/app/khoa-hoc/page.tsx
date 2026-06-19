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
    desc: "4 bài học thiết lập hệ sinh thái AI soạn giảng — từ Custom Gem, NotebookLM, podcast flipped classroom đến template in ấn.",
    wash: "mint" as const,
  },
  {
    no: "Module 2",
    range: "Bài 5–7",
    title: "Thí nghiệm ảo tương tác",
    icon: FlaskConical,
    desc: "3 bài học tạo mô phỏng vật lý 60fps chạy mượt trên 4G — SVG tương tác, CSS Spring Bounce, HTML5 Canvas.",
    wash: "cream" as const,
  },
  {
    no: "Module 3",
    range: "Bài 8–11",
    title: "Trò chơi tương tác lớp học",
    icon: Gamepad2,
    desc: "4 bài học thiết kế game lớp học — warm-up quiz, icebreaker, wrap-up Đúng/Sai và dạy học xoay trạm QR Code.",
    wash: "blossom" as const,
  },
];

const LESSONS: Lesson[] = [
  {
    no: "01",
    module: "Module 1",
    title: "Soạn bài bằng Gemini Custom Gem",
    topic: "Dùng Gemini/Custom Gem soạn giáo án và phiếu học tập điền khuyết nhanh chóng bằng tiếng Việt.",
    hooks: [
      { type: "Sư phạm", text: "Soạn bài bằng AI ra toàn chữ chung chung? — Cách dùng Custom Gem định hướng GEMS để soạn bài trong 10 phút." },
      { type: "Học sinh", text: "Học sinh ngủ gật và thụ động ghi chép? — Thiết kế phiếu điền khuyết tăng tương tác thảo luận." },
      { type: "Kỹ thuật", text: "Không biết viết prompt dài bằng tiếng Anh? — Chỉ cần cấu hình Custom Instructions bằng tiếng Việt bám sát SGK." },
    ],
    solution: "Custom Gem \"GEMS Assistant\" tự động lập giáo án và phiếu học tập.",
    cta: "Copy prompt cấu hình Gem tại Bài 1 trên Web.",
    image: "/images/lesson-01.png",
    wash: "mint",
  },
  {
    no: "02",
    module: "Module 1",
    title: "NotebookLM chống AI ảo giác",
    topic: "Tải file PDF SGK mới vào NotebookLM làm trợ lý hỏi đáp và soạn đề chính xác 100%.",
    hooks: [
      { type: "Sư phạm", text: "Sơ AI tự chế kiến thức ngoài SGK? — Nạp trực tiếp PDF SGK vào NotebookLM để làm não chống ảo giác." },
      { type: "Học sinh", text: "Học sinh tự phát hiện lỗi sai nhờ câu hỏi thông minh? — Thiết kế câu hỏi chẩn đoán để lớp thảo luận sâu." },
      { type: "Kỹ thuật", text: "Soạn đề bằng AI bị sai kiến thức cơ bản? — Sử dụng prompt khóa chặt: 'Chỉ sử dụng thông tin trong tài liệu nguồn'." },
    ],
    solution: "NotebookLM bám sát nguồn tài liệu tải lên để xuất câu hỏi chẩn đoán chính xác.",
    cta: "Lấy câu lệnh soạn đề chẩn đoán tại Bài 2 trên Web.",
    image: "/images/lesson-02.png",
    wash: "cream",
  },
  {
    no: "03",
    module: "Module 1",
    title: "Podcast Flipped Classroom với NotebookLM Audio",
    topic: "Tải tài liệu nguồn vào NotebookLM để sinh podcast đối thoại 2 MC AI tiếng Anh kèm phụ đề Việt.",
    hooks: [
      { type: "Sư phạm", text: "Biến SGK thành podcast 2 MC AI tiếng Anh cực dễ! — Dịch kịch bản và chèn sub Việt để con tự học tại nhà." },
      { type: "Học sinh", text: "Con nghe podcast AI hiểu bản chất Vật lý trước khi lên lớp? — Tiếp cận Vật lý song ngữ CLIL cuốn hút." },
      { type: "Kỹ thuật", text: "Làm phụ đề Việt cho audio AI không cần chỉnh tay? — Tạo tệp sub SRT qua Aegisub để trẻ vừa nghe vừa đọc." },
    ],
    solution: "Dùng tính năng Generate Audio trong NotebookLM và tải tệp phụ đề Việt dịch sẵn trên website.",
    cta: "Tải audio mẫu và phụ đề tiếng Việt đối thoại tại Bài 3.",
    image: "/images/lesson-03.png",
    wash: "blossom",
  },
  {
    no: "04",
    module: "Module 1",
    title: "Template Word 2 cột in ấn tiết kiệm mực",
    topic: "Thiết kế mẫu Word 2 cột căn lề chuẩn in ấn grayscale sắc nét và tiết kiệm mực cho trường.",
    hooks: [
      { type: "Sư phạm", text: "In phiếu học tập bị nhòe đen, tốn mực của trường? — Cách phối màu tương phản xám sage-copper photocopy sắc nét." },
      { type: "Học sinh", text: "Phiếu in đen trắng sắc nét giúp học sinh nắn nót viết bài? — Bố cục cân xứng, dòng kẻ chấm nề nếp." },
      { type: "Kỹ thuật", text: "Tiết kiệm 90% mực in khi photocopy hàng loạt? — Dùng viền bảng ẩn màu xám nhạt và chữ xám đậm." },
    ],
    solution: "Dán nội dung từ AI vào file template Word chia sẵn 2 cột, lề 1.5cm.",
    cta: "Tải template Word chuẩn in ấn tại Bài 4.",
    image: "/images/lesson-04.png",
    wash: "mint",
  },
  {
    no: "05",
    module: "Module 2",
    title: "Thí nghiệm SVG: Dòng truyền nhiệt tương tác",
    topic: "Thí nghiệm truyền nhiệt tương tác kéo trượt thay đổi vận tốc dòng nhiệt thời gian thực.",
    hooks: [
      { type: "Sư phạm", text: "Chạm tay kéo slider chạy dòng truyền nhiệt thời gian thực! — Thiết kế SVG nét đứt động theo nhiệt độ." },
      { type: "Học sinh", text: "Học sinh quét mã QR trên phiếu để kéo trượt mô phỏng nhiệt? — Trực quan hóa khái niệm truyền năng lượng vô hình." },
      { type: "Kỹ thuật", text: "Chạy mô phỏng tương tác bằng 4G cực mượt trên điện thoại? — Tối ưu mã nguồn SVG và JS siêu nhẹ dưới 50KB." },
    ],
    solution: "Học sinh quét QR trên phiếu học tập mở trang SVG tương tác kéo slider cảm nhận dòng nhiệt.",
    cta: "Trải nghiệm mô phỏng dòng nhiệt tại Bài 5.",
    image: "/images/lesson-05.png",
    wash: "cream",
  },
  {
    no: "06",
    module: "Module 2",
    title: "Nhiệt kế Spring Bounce với CSS cubic-bezier",
    topic: "Thí nghiệm nhiệt kế dâng nảy quán tính chất lỏng tự nhiên sử dụng CSS transition.",
    hooks: [
      { type: "Sư phạm", text: "Nhiệt kế dâng nước nảy nhẹ quán tính chất lỏng cực chất! — Chống chuyển động đơ cứng bằng cubic-bezier." },
      { type: "Học sinh", text: "Học sinh liên tục bấm nút để ngắm cột nước nhiệt kế dâng nảy? — Rén luyện ghi nhớ mốc Celsius và Kelvin." },
      { type: "Kỹ thuật", text: "Tạo độ nảy lò xo cơ học bằng một hàm CSS duy nhất? — Áp dụng cubic-bezier với tham số overshoot 1.56." },
    ],
    solution: "Mô phỏng nhiệt kế 3D dâng mực nước có quán tính nảy nhẹ ở đỉnh tương tác trực tiếp.",
    cta: "Chơi thử mô phỏng nhiệt kế nảy lò xo tại Bài 6.",
    image: "/images/lesson-06.png",
    wash: "blossom",
  },
  {
    no: "07",
    module: "Module 2",
    title: "Động học phân tử khí trên HTML5 Canvas 60fps",
    topic: "Mô phỏng chuyển động hỗn loạn của hạt phân tử khí, va chạm thành bình và liên hệ nhiệt độ.",
    hooks: [
      { type: "Sư phạm", text: "Tự tạo mô phỏng phân tử động 60fps chỉ bằng vài dòng mã! — Cách tích hợp trực tiếp HTML Canvas vào bài giảng." },
      { type: "Học sinh", text: "Học sinh chủ động quan sát va chạm phân tử một cách trực quan — Trực quan hóa thuyết động học phân tử khí." },
      { type: "Kỹ thuật", text: "Lập trình chuyển động phân tử không cần cài đặt thư viện nặng? — Điều khiển nhiệt độ và vận tốc hạt khí thời gian thực bằng thanh trượt." },
    ],
    solution: "Mô phỏng hàng trăm phân tử khí chuyển động 60fps trên Canvas, tăng nhiệt độ làm hạt va đập nhanh hơn.",
    cta: "Nhận mã nguồn mô phỏng phân tử tại Bài 7.",
    image: "/images/lesson-07.png",
    wash: "mint",
  },
  {
    no: "08",
    module: "Module 3",
    title: "Game Warm-up Quiz trắc nghiệm đầu giờ",
    topic: "Tạo game trắc nghiệm 3 câu hỏi tính giờ 15s để ôn tập bài cũ đầu giờ dạy.",
    hooks: [
      { type: "Sư phạm", text: "Thiết kế trò chơi khởi động bài cũ nhanh chóng bằng trợ lý AI — Học sinh tham gia trả lời tương tác qua mã QR." },
      { type: "Học sinh", text: "Học sinh tranh nhau đua top trả lời câu hỏi đầu giờ? — Tiết học bắt đầu với năng lượng 100%." },
      { type: "Kỹ thuật", text: "Hệ thống câu hỏi khởi động bị khô khan? — Dùng Gemini để sáng tạo tình huống thực tế gắn liền kiến thức." },
    ],
    solution: "Game trắc nghiệm tính giờ lật ô chữ phần thưởng — học sinh quét QR thi đấu.",
    cta: "Chơi thử Game Khởi động tại Bài 8.",
    image: "/images/lesson-08.png",
    wash: "cream",
    gamePath: "/games/warmup-quiz/index.html",
  },
  {
    no: "09",
    module: "Module 3",
    title: "Game Icebreaker click nổ bóng nhiệt",
    topic: "Mini game click nổ bóng bay nhiệt độ rơi tự do giải tỏa stress giữa giờ học căng thẳng.",
    hooks: [
      { type: "Sư phạm", text: "Học sinh mệt mỏi, ngủ gật giữa tiết học dài? — Bật game click nổ bóng nhiệt giải lao 30 giây tỉnh ngủ tức thì." },
      { type: "Học sinh", text: "Học sinh tỉnh táo 100% sau giờ giải lao công nghệ? — Click nổ bóng đỏ/xanh ghi điểm, tránh bóng bom đen." },
      { type: "Kỹ thuật", text: "Tạo mini game giải lao siêu nhẹ không cần cài app? — HTML/JS tĩnh chạy trực tiếp trên trình duyệt điện thoại." },
    ],
    solution: "Chơi game click bóng nhiệt rơi tự do trong 30 giây để lấy lại sự tập trung học tập.",
    cta: "Chơi thử Game Bóng Nhiệt Giải Lao tại Bài 9.",
    image: "/images/lesson-09.png",
    wash: "blossom",
    gamePath: "/games/bong-nhiet/index.html",
  },
  {
    no: "10",
    module: "Module 3",
    title: "Game Wrap-up Đúng/Sai chẩn đoán ngộ nhận",
    topic: "Game Đúng/Sai chẩn đoán ngộ nhận sờ sắt thấy lạnh hơn gỗ để củng cố lý thuyết cuối tiết.",
    hooks: [
      { type: "Sư phạm", text: "Sờ vào sắt lạnh hơn gỗ ở cùng 20 độ C? — Thiết kế game chẩn đoán Đúng/Sai chốt bài học sau 2 phút." },
      { type: "Học sinh", text: "Học sinh tranh biện nảy lửa và tự vỡ lẽ bản chất nhiệt học? — Nhận biết bản chất truyền nhiệt tiếp xúc." },
      { type: "Kỹ thuật", text: "Thiết kế 4 phát biểu chẩn đoán ngộ nhận bám sát cấu trúc đề mới? — Prompt tự động hóa phân tích bẫy lỗi sai bằng GEMS Gem." },
    ],
    solution: "Game trắc nghiệm chẩn đoán Đúng/Sai, chọn đáp án và hiện lời giải thích khoa học lập tức.",
    cta: "Chơi thử Game Củng cố tại Bài 10.",
    image: "/images/lesson-10.png",
    wash: "mint",
  },
  {
    no: "11",
    module: "Module 3",
    title: "Dạy học xoay trạm 5 trạm bằng QR Code",
    topic: "Tổ chức dạy học theo trạm luân chuyển 5 trạm học tập mượt mà bằng QR Code.",
    hooks: [
      { type: "Sư phạm", text: "Xoay 5 trạm học tập công nghệ cực nề nếp bằng mã QR! — Dán QR dẫn mô phỏng và game lên bàn tự nhóm học." },
      { type: "Học sinh", text: "Học sinh thảo luận nhóm sôi nổi quanh mô phỏng trên điện thoại? — Các nhóm luân chuyển tự giác theo tiếng chuông." },
      { type: "Kỹ thuật", text: "Tránh nghẽn mạng wifi trường khi cả lớp cùng quét QR? — Mô phỏng SVG siêu nhẹ chạy mượt bằng 4G nhóm trưởng." },
    ],
    solution: "Chia 5 trạm: Thực nghiệm · Mô phỏng · Game củng cố · Mindmap · Video STEM.",
    cta: "Tải giáo án mẫu dạy học theo trạm tại Bài 11.",
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
              ⚡ 3 HƯỚNG HOOK THỰC CHIẾN
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
                ✅ SOLUTION
              </span>
              <p className="font-sans text-ink leading-relaxed flex-1" style={{ fontSize: "14px" }}>{lesson.solution}</p>
            </div>
            <div
              className="flex gap-3 items-start p-3"
              style={{ backgroundColor: "#fffded", borderRadius: "8px" }}
            >
              <span className="shrink-0 font-sans font-medium text-deep-teal mt-0.5" style={{ fontSize: "12px" }}>
                🎯 CTA
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
        title={<>Khóa học Đòn Bẩy AI <span className="text-mist">v8.0</span></>}
        subtitle="11 bài học soạn giảng thực chiến bằng AI, thiết kế thí nghiệm ảo tương tác và trò chơi học tập chất lượng cao bám sát khung chương trình."
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
              Trải nghiệm <span className="text-teal-gradient">Trò chơi AR/3D</span>
            </h2>
            <p className="font-sans text-ink mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
              Tương tác thực tế tăng cường ngay trên webcam của bạn để trực quan hóa kiến thức và tăng hứng thú học tập tích cực.
            </p>
            <Link href="/games/ar-knowledge-universe/index.html" target="_blank" className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2">
              Chơi Game AR ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
