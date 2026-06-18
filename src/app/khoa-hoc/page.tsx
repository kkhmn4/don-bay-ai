"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";
import { Bot, FlaskConical, Gamepad2 } from "lucide-react";

type Hook = { type: "Sư phạm" | "Học sinh" | "Kỹ thuật"; text: string };
type Lesson = {
  no: string;
  module: string;
  title: string;
  topic: string;
  hooks: Hook[];
  solution: string;
  cta: string;
};

const MODULES = [
  {
    no: "Module 1",
    range: "Bài 1–4",
    title: "Soạn giảng thực chiến với Gemini & NotebookLM",
    icon: Bot,
    desc: "4 bài học thiết lập hệ sinh thái AI soạn giảng — từ Custom Gem, NotebookLM, podcast flipped classroom đến template in ấn.",
  },
  {
    no: "Module 2",
    range: "Bài 5–7",
    title: "Thí nghiệm ảo tương tác lớp học",
    icon: FlaskConical,
    desc: "3 bài học tạo mô phỏng vật lý 60fps chạy mượt trên 4G — SVG tương tác, CSS Spring Bounce, HTML5 Canvas.",
  },
  {
    no: "Module 3",
    range: "Bài 8–11",
    title: "Trò chơi tương tác cho hoạt động lớp học",
    icon: Gamepad2,
    desc: "4 bài học thiết kế game lớp học — warm-up quiz, icebreaker, wrap-up Đúng/Sai và dạy học xoay trạm QR Code.",
  },
];

const LESSONS: Lesson[] = [
  {
    no: "01",
    module: "Module 1",
    title: "Soạn bài bằng Gemini: Tạo giáo án & phiếu học tập bằng Custom Gem",
    topic: "Dùng Gemini/Custom Gem soạn giáo án và phiếu học tập điền khuyết nhanh chóng bằng tiếng Việt.",
    hooks: [
      { type: "Sư phạm", text: "Soạn bài bằng AI ra toàn chữ chung chung? — Cách dùng Custom Gem định hướng GEMS để soạn bài trong 10 phút." },
      { type: "Học sinh", text: "Học sinh ngủ gật và thụ động ghi chép suốt tiết học? — Thiết kế phiếu điền khuyết tăng tương tác thảo luận." },
      { type: "Kỹ thuật", text: "Không biết viết prompt dài bằng tiếng Anh? — Chỉ cần cấu hình Custom Instructions bằng tiếng Việt bám sát SGK." },
    ],
    solution: "Custom Gem \"GEMS Assistant\" tự động lập giáo án và phiếu học tập.",
    cta: "Copy prompt cấu hình Gem tại Bài 1 trên Web.",
  },
  {
    no: "02",
    module: "Module 1",
    title: "Tối ưu NotebookLM: Nạp tài liệu nguồn chuẩn SGK chống AI ảo giác",
    topic: "Tải file PDF SGK mới vào NotebookLM làm trợ lý hỏi đáp và soạn đề chính xác 100%.",
    hooks: [
      { type: "Sư phạm", text: "Sơ AI tự chế kiến thức ngoài sách giáo khoa mới? — Nạp trực tiếp PDF SGK vào NotebookLM để làm não chống ảo giác." },
      { type: "Học sinh", text: "Học sinh tự phát hiện lỗi sai kiến thức nhờ câu hỏi thông minh? — Thiết kế câu hỏi chẩn đoán để lớp thảo luận sâu." },
      { type: "Kỹ thuật", text: "Soạn đề bằng AI bị sai kiến thức cơ bản? — Sử dụng prompt khóa chặt: 'Chỉ sử dụng thông tin trong tài liệu nguồn'." },
    ],
    solution: "NotebookLM bám sát nguồn tài liệu tải lên để xuất câu hỏi chẩn đoán chính xác.",
    cta: "Lấy câu lệnh soạn đề chẩn đoán tại Bài 2 trên Web.",
  },
  {
    no: "03",
    module: "Module 1",
    title: "Podcast Flipped Classroom: NotebookLM Audio Overview làm học liệu tự học",
    topic: "Tải tài liệu nguồn vào NotebookLM để sinh podcast đối thoại 2 MC AI tiếng Anh kèm phụ đề Việt.",
    hooks: [
      { type: "Sư phạm", text: "Biến SGK thành podcast đối thoại 2 MC AI tiếng Anh cực dễ! — Dịch kịch bản và chèn sub Việt để con tự học tại nhà." },
      { type: "Học sinh", text: "Con bạn nghe podcast AI hiểu bản chất Vật lý trước khi lên lớp? — Tiếp cận Vật lý song ngữ CLIL cuốn hút." },
      { type: "Kỹ thuật", text: "Làm phụ đề tiếng Việt cho audio AI không cần chỉnh tay? — Tạo tệp sub SRT qua Aegisub để trẻ vừa nghe vừa đọc." },
    ],
    solution: "Dùng tính năng Generate Audio trong NotebookLM và tải tệp phụ đề Việt dịch sẵn trên website.",
    cta: "Tải audio mẫu và phụ đề tiếng Việt đối thoại tại Bài 3.",
  },
  {
    no: "04",
    module: "Module 1",
    title: "Bố cục Phiếu in Word: Lề 1.5cm, bảng 2 cột GEMS in ấn sắc nét tiết kiệm mực",
    topic: "Thiết kế mẫu Word 2 cột căn lề chuẩn in ấn grayscale sắc nét và tiết kiệm mực cho trường.",
    hooks: [
      { type: "Sư phạm", text: "In phiếu học tập bị nhòe đen, tốn mực của trường? — Cách phối màu tương phản xám sage-copper photocopy sắc nét." },
      { type: "Học sinh", text: "Phiếu in đen trắng sắc nét giúp học sinh nắn nót viết bài? — Bố cục cân xứng, dòng kẻ chấm nề nếp." },
      { type: "Kỹ thuật", text: "Tiết kiệm 90% mực in khi photocopy hàng loạt? — Dùng viền bảng ẩn màu xám nhạt (#e5e7eb) và chữ xám đậm." },
    ],
    solution: "Dán nội dung từ AI vào file template Word chia sẵn 2 cột, lề 1.5cm.",
    cta: "Tải template Word chuẩn in ấn tại Bài 4.",
  },
  {
    no: "05",
    module: "Module 2",
    title: "Thí nghiệm ảo: Dòng truyền nhiệt & Cân bằng nhiệt (SVG tương tác)",
    topic: "Thí nghiệm truyền nhiệt tương tác kéo trượt thay đổi vận tốc dòng nhiệt thời gian thực.",
    hooks: [
      { type: "Sư phạm", text: "Chạm tay kéo slider chạy dòng truyền nhiệt thời gian thực! — Thiết kế SVG nét đứt động theo nhiệt độ." },
      { type: "Học sinh", text: "Học sinh quét mã QR trên phiếu để kéo trượt mô phỏng nhiệt? — Trực quan hóa khái niệm truyền năng lượng vô hình." },
      { type: "Kỹ thuật", text: "Chạy mô phỏng tương tác bằng 4G cực mượt trên điện thoại? — Tối ưu mã nguồn SVG và JS siêu nhẹ dưới 50KB." },
    ],
    solution: "Học sinh quét QR trên phiếu học tập mở trang SVG tương tác kéo slider cảm nhận dòng nhiệt.",
    cta: "Trải nghiệm mô phỏng dòng nhiệt tại Bài 5.",
  },
  {
    no: "06",
    module: "Module 2",
    title: "Thí nghiệm ảo: Sự nở vì nhiệt & Thang đo Celsius/Kelvin (Spring Bounce)",
    topic: "Thí nghiệm nhiệt kế dâng nảy quán tính chất lỏng tự nhiên sử dụng CSS transition.",
    hooks: [
      { type: "Sư phạm", text: "Nhiệt kế dâng nước nảy nhẹ quán tính chất lỏng cực chất! — Chống chuyển động đơ cứng bằng transition cubic-bezier." },
      { type: "Học sinh", text: "Học sinh liên tục bấm nút để ngắm cột nước nhiệt kế dâng nảy? — Rèn luyện ghi nhớ các mốc Celsius và Kelvin." },
      { type: "Kỹ thuật", text: "Tạo độ nảy lò xo cơ học bằng một hàm CSS duy nhất? — Áp dụng cubic-bezier với tham số overshoot 1.56." },
    ],
    solution: "Mô phỏng nhiệt kế 3D dâng mực nước có quán tính nảy nhẹ ở đỉnh tương tác trực tiếp.",
    cta: "Chơi thử mô phỏng nhiệt kế nảy lò xo tại Bài 6.",
  },
  {
    no: "07",
    module: "Module 2",
    title: "Thí nghiệm ảo: Thuyết động học phân tử khí (HTML5 Canvas động)",
    topic: "Mô phỏng chuyển động hỗn loạn của hạt phân tử khí, va chạm thành bình và liên hệ nhiệt độ.",
    hooks: [
      { type: "Sư phạm", text: "Tự tạo video hoạt họa 60fps đăng TikTok chỉ 1 dòng lệnh! — Dùng mã HTML Canvas phân tử chuyển động." },
      { type: "Học sinh", text: "Học sinh cuốn hút xem chuyển động phân tử khí đạt chục nghìn view? — Trực quan hóa thuyết động học phân tử trừu tượng." },
      { type: "Kỹ thuật", text: "Làm video hoạt họa bằng HTML Canvas không cần code phức tạp? — Điều khiển nhiệt độ/vận tốc hạt khí bằng slider." },
    ],
    solution: "Mô phỏng hàng trăm phân tử khí chuyển động 60fps trên Canvas, tăng nhiệt độ làm hạt va đập nhanh hơn.",
    cta: "Nhận mã nguồn mô phỏng phân tử tại Bài 7.",
  },
  {
    no: "08",
    module: "Module 3",
    title: "Trò chơi Khởi động (Warm-up Quiz): Trắc nghiệm nhanh đầu tiết học",
    topic: "Tạo game trắc nghiệm 3 câu hỏi tính giờ 15s để ôn tập bài cũ đầu giờ dạy.",
    hooks: [
      { type: "Sư phạm", text: "Làm trò chơi khởi động đầu giờ chỉ trong 5 phút soạn bằng AI! — Học sinh quét mã QR bắt đầu đua top trả lời." },
      { type: "Học sinh", text: "Học sinh tranh nhau đua top trả lời câu hỏi đầu giờ? — Tiết học bắt đầu với bầu không khí năng lượng 100%." },
      { type: "Kỹ thuật", text: "Soạn câu hỏi trắc nghiệm khởi động bị khô khan? — Gemini lên câu hỏi tình huống thực tế hấp dẫn." },
    ],
    solution: "Game trắc nghiệm tính giờ lật ô chữ phần thưởng trực tiếp hoặc quét QR thi đấu.",
    cta: "Chơi thử Game Khởi động tại Bài 8.",
  },
  {
    no: "09",
    module: "Module 3",
    title: "Trò chơi Giải lao (Icebreaker): Click nổ bóng nhiệt thư giãn giữa giờ",
    topic: "Mini game click nổ bóng bay nhiệt độ rơi tự do giải tỏa stress giữa giờ học căng thẳng.",
    hooks: [
      { type: "Sư phạm", text: "Học sinh mệt mỏi, ngủ gật giữa tiết học dài căng thẳng? — Bật game click nổ bóng nhiệt giải lao 30 giây tỉnh ngủ tức thì." },
      { type: "Học sinh", text: "Học sinh tỉnh táo 100% sau giờ giải lao công nghệ? — Click nổ bóng đỏ/xanh ghi điểm, tránh bóng bom đen." },
      { type: "Kỹ thuật", text: "Tạo mini game giải lao siêu nhẹ không cần cài app? — Thiết lập HTML/JS tĩnh chạy trực tiếp trên trình duyệt điện thoại." },
    ],
    solution: "Chơi game click bóng nhiệt rơi tự do trong 30 giây để lấy lại sự tập trung học tập.",
    cta: "Chơi thử Game Bóng Nhiệt Giải Lao tại Bài 9.",
  },
  {
    no: "10",
    module: "Module 3",
    title: "Trò chơi Củng cố (Wrap-up Đúng/Sai): Chẩn đoán ngộ nhận sắt lạnh hơn gỗ",
    topic: "Game Đúng/Sai chẩn đoán ngộ nhận sờ sắt thấy lạnh hơn gỗ để củng cố lý thuyết cuối tiết.",
    hooks: [
      { type: "Sư phạm", text: "Sờ vào sắt lạnh hơn gỗ ở cùng 20 độ C? — Thiết kế game chẩn đoán Đúng/Sai chốt bài học sau 2 phút." },
      { type: "Học sinh", text: "Học sinh tranh biện nảy lửa và tự vỡ lẽ bản chất nhiệt học? — Nhận biết bản chất truyền nhiệt tiếp xúc qua bối cảnh đời thực." },
      { type: "Kỹ thuật", text: "Soạn 4 phát biểu bẫy hiểu sai chuẩn cấu trúc đề Bộ 2025? — Prompt soạn bẫy ngộ nhận tự động bằng Custom Gem." },
    ],
    solution: "Game trắc nghiệm chẩn đoán Đúng/Sai, chọn đáp án và hiện lời giải thích khoa học lập tức.",
    cta: "Chơi thử Game Củng cố tại Bài 10.",
  },
  {
    no: "11",
    module: "Module 3",
    title: "Dạy học xoay trạm QR Code: Tích hợp mã QR dẫn đến thí nghiệm ảo và trò chơi",
    topic: "Tổ chức dạy học theo trạm luân chuyển 5 trạm học tập mượt mà bằng QR Code.",
    hooks: [
      { type: "Sư phạm", text: "Xoay 5 trạm học tập công nghệ cực nề nếp bằng mã QR! — Dán QR dẫn mô phỏng và game lên bàn học sinh tự nhóm học." },
      { type: "Học sinh", text: "Học sinh thảo luận nhóm sôi nổi quanh mô phỏng trực quan trên điện thoại? — Các nhóm luân chuyển tự giác theo tiếng chuông." },
      { type: "Kỹ thuật", text: "Tránh nghẽn mạng wifi trường khi cả lớp cùng quét QR? — Mô phỏng SVG siêu nhẹ chạy mượt bằng 4G nhóm trưởng." },
    ],
    solution: "Chia 5 trạm: Thực nghiệm · Mô phỏng · Game củng cố · Mindmap · Video STEM.",
    cta: "Tải giáo án mẫu dạy học theo trạm tại Bài 11.",
  },
];

/* ---------------- Module header ---------------- */
function ModuleHeader({ module, icon: Icon }: { module: typeof MODULES[0]; icon: React.ElementType }) {
  return (
    <Reveal>
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border-gray">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded surface-elevated shrink-0">
          <Icon className="w-6 h-6 text-pure-white" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-amber-glow">
              {module.no}
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-text">
              {module.range}
            </span>
          </div>
          <h2
            className="font-bold text-pure-white leading-tight mb-2"
            style={{ fontSize: "24px", lineHeight: 1.33 }}
          >
            {module.title}
          </h2>
          <p className="text-[15px] text-helper-gray leading-relaxed">
            {module.desc}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Lesson card ---------------- */
function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Reveal>
      <article
        className="surface-card border border-border-gray rounded-md transition-colors hover:border-edge-gray"
        style={{ padding: "16px" }}
      >
        {/* top row: lesson number + module label */}
        <div className="flex items-start gap-4 mb-4">
          <span
            className="font-extrabold text-pure-white shrink-0"
            style={{ fontSize: "24px", lineHeight: 1 }}
          >
            {lesson.no}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow mb-1">
              {lesson.module}
            </p>
            <h3
              className="font-bold text-pure-white leading-tight"
              style={{ fontSize: "16px", lineHeight: 1.4 }}
            >
              {lesson.title}
            </h3>
          </div>
        </div>

        {/* topic */}
        <div className="mb-4 pl-3 border-l-2 border-border-gray">
          <p className="text-[15px] text-helper-gray leading-relaxed">
            {lesson.topic}
          </p>
        </div>

        {/* hooks */}
        <div className="space-y-2 mb-4">
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-muted-text mb-2">
            3 hướng Hook thực chiến
          </p>
          {lesson.hooks.map((h, idx) => (
            <div
              key={idx}
              className="flex gap-3 p-3 rounded surface-elevated"
            >
              <span
                className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-bold text-pure-white px-2 py-1 rounded surface-canvas"
              >
                {h.type}
              </span>
              <p className="text-[15px] text-helper-gray leading-snug flex-1">{h.text}</p>
            </div>
          ))}
        </div>

        {/* solution + CTA */}
        <div className="pt-4 border-t border-border-gray space-y-2">
          <div className="flex gap-3">
            <span className="shrink-0 text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow mt-0.5">
              Solution
            </span>
            <p className="text-[15px] text-pure-white leading-relaxed flex-1">{lesson.solution}</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="shrink-0 text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow mt-0.5">
              CTA
            </span>
            <p className="text-[15px] font-semibold text-pure-white">{lesson.cta}</p>
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

  return (
    <>
      <PageHero
        eyebrow="Lộ trình 11 bài học"
        title="Khóa học Đòn Bẩy AI v8.0"
        subtitle="11 bài học thực chiến đồng bộ 1-1 với 11 kịch bản video ngắn đa kênh. Mỗi bài có 3 hướng Hook thực chiến, Solution và CTA rõ ràng."
      />

      {/* Quick nav */}
      <section className="px-5 sm:px-8 py-6 border-t border-border-gray bg-pure-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid sm:grid-cols-3 gap-3">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <a
                  key={m.no}
                  href={`#module-${m.no.split(" ")[1]}`}
                  className="group flex items-center gap-3 surface-card border border-border-gray rounded-md transition-colors hover:border-edge-gray"
                  style={{ padding: "16px" }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded surface-elevated shrink-0">
                    <Icon className="w-5 h-5 text-pure-white" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow">
                      {m.no} · {m.range}
                    </p>
                    <p className="text-[13px] font-semibold text-pure-white truncate">
                      {m.title}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules with lessons */}
      <section className="px-5 sm:px-8 py-12 border-t border-border-gray bg-pure-black">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div id="module-1">
            <ModuleHeader module={MODULES[0]} icon={MODULES[0].icon} />
            <div className="grid md:grid-cols-2 gap-4">
              {module1Lessons.map((l) => (
                <LessonCard key={l.no} lesson={l} />
              ))}
            </div>
          </div>

          <div id="module-2">
            <ModuleHeader module={MODULES[1]} icon={MODULES[1].icon} />
            <div className="grid md:grid-cols-2 gap-4">
              {module2Lessons.map((l) => (
                <LessonCard key={l.no} lesson={l} />
              ))}
            </div>
          </div>

          <div id="module-3">
            <ModuleHeader module={MODULES[2]} icon={MODULES[2].icon} />
            <div className="grid md:grid-cols-2 gap-4">
              {module3Lessons.map((l) => (
                <LessonCard key={l.no} lesson={l} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA to video page */}
      <section className="px-5 sm:px-8 py-12 border-t border-border-gray bg-pure-black">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div
              className="relative rounded border border-border-gray overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 200, 64, 0.12) 0%, rgba(250, 58, 25, 0.10) 100%), #000000",
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6">
                <div>
                  <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
                    Đồng bộ 1-1
                  </span>
                  <p
                    className="font-bold text-pure-white mt-2"
                    style={{ fontSize: "20px", lineHeight: 1.4 }}
                  >
                    Mỗi bài học = 1 kịch bản video ngắn
                  </p>
                  <p className="text-[15px] text-helper-gray mt-1">
                    Xem 11 kịch bản TikTok/Shorts/Reels với Hook → Solution → CTA hoàn chỉnh.
                  </p>
                </div>
                <Link
                  href="/video"
                  className="inline-flex items-center gap-2 text-pure-white font-bold rounded-md transition-opacity hover:opacity-90 shrink-0"
                  style={{
                    padding: "8px 16px",
                    fontSize: "15px",
                    background: "linear-gradient(90deg, #ff8a00 0%, #fa3a19 100%)",
                  }}
                >
                  Xem 11 kịch bản video
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
