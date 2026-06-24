"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock, Download, FileText, ChevronRight, Copy,
  Check, ArrowLeft, Gamepad2, FileDown, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";

type Video = {
  no: string;
  lesson: string;
  title: string;
  hook: string;
  solution: string;
  cta: string;
  duration: string;
  category: string;
  wash: "mint" | "cream" | "blossom";
  gamePath?: string;
};

/* ===================== DATA ===================== */
const VIDEOS: Video[] = [
  {
    no: "01",
    lesson: "Bài 01",
    title: "Soạn bài bằng Gemini Custom Gem",
    hook: "🎬 Visual: Thầy Hiệp ôm đầu mệt mỏi gạt phăng giáo án cũ.<br>🔤 Text: <strong>SOẠN BÀI BẰNG AI = LÝ THUYẾT SUÔNG?</strong><br>🎙️ Voiceover: Soạn bài bằng AI chỉ ra toàn chữ chung chung? Thầy cô mất bao đêm sửa prompt ngu ngơ của AI? Hãy cấu hình ngay Custom Gem GEMS Assistant bằng tiếng Việt, 10 phút là xong giáo án 6 bước!",
    solution: "Cấu hình Gemini Custom Gem tự động lập giáo án và phiếu học tập điền khuyết.",
    cta: "Copy prompt cấu hình Gem tại Bài 1 trên Web.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
    wash: "mint",
  },
  {
    no: "02",
    lesson: "Bài 02",
    title: "NotebookLM chống AI ảo giác",
    hook: "🎬 Visual: Thầy Hiệp đứng cạnh TV cầm cuốn SGK tung nhẹ lên bàn lắc đầu.<br>🔤 Text: <strong>SỢ AI BỊA KIẾN THỨC SÁCH GIÁO KHOA?</strong><br>🎙️ Voiceover: Khiếp sợ cảnh AI tự chế kiến thức khoa học ngoài sách giáo khoa mới? Nạp trực tiếp PDF sách giáo khoa vào NotebookLM để khóa chặt AI. Đảm bảo trả lời chuẩn đét 100%, có nguồn dẫn chứng rõ ràng!",
    solution: "Tải PDF tài liệu chuẩn vào NotebookLM làm trợ lý chống ảo giác, soạn đề thi chẩn đoán.",
    cta: "Lấy câu lệnh soạn đề chẩn đoán tại Bài 2 trên Web.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
    wash: "cream",
  },
  {
    no: "03",
    lesson: "Bài 03",
    title: "Podcast Flipped Classroom NotebookLM",
    hook: "🎬 Visual: Thầy Hiệp đeo tai nghe gật gù ngạc nhiên nhìn điện thoại.<br>🔤 Text: <strong>BIẾN SGK THÀNH PODCAST 2 MC AI?</strong><br>🎙️ Voiceover: Biến cuốn sách giáo khoa khô khan thành podcast đối thoại của 2 MC AI cực dễ thương? Đây là cách giúp học sinh nghe hiểu bản chất Vật lý bằng tiếng Anh tại nhà trước khi lên lớp!",
    solution: "Sinh audio đối thoại 2 MC trong NotebookLM và tải tệp phụ đề song ngữ dịch sẵn.",
    cta: "Tải audio mẫu và phụ đề song ngữ tại Bài 3.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
    wash: "blossom",
  },
  {
    no: "04",
    lesson: "Bài 04",
    title: "Template Word GEMS tiết kiệm mực in",
    hook: "🎬 Visual: Thầy Hiệp cầm tờ phiếu in nhòe đen lem luốc nhăn mặt cạnh máy photo.<br>🔤 Text: <strong>IN PHIẾU HỌC TẬP BỊ LEM ĐEN, TỐN MỰC?</strong><br>🎙️ Voiceover: In phiếu học tập cho học sinh bị nhòe đen, tốn hàng lít mực của trường? Hãy chuyển sang thiết kế bảng ẩn grayscale 2 cột lề 1.5cm này. Vừa thẩm mỹ sang trọng, vừa tiết kiệm 90% mực in!",
    solution: "Bố cục phiếu học tập 2 cột side-by-side, dùng viền xám nhạt photocopy grayscale sắc nét.",
    cta: "Tải template Word chuẩn GEMS tại Bài 4.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
    wash: "mint",
  },
  {
    no: "05",
    lesson: "Bài 05",
    title: "Thí nghiệm SVG dòng truyền nhiệt tương tác",
    hook: "🎬 Visual: Thầy Hiệp chạm ngón tay kéo slider dòng nhiệt di chuyển nhanh chậm trên điện thoại.<br>🔤 Text: <strong>KÉO SLIDER CHẠY DÒNG TRUYỀN NHIỆT 60FPS?</strong><br>🎙️ Voiceover: Dạy bài truyền nhiệt chỉ nói lý thuyết suông? Hãy cho học sinh quét mã QR trên phiếu tự kéo slider điều khiển tốc độ dòng nhiệt chuyển động thời gian thực ngay trên điện thoại cực trực quan!",
    solution: "Mô phỏng SVG động dòng truyền nhiệt nét đứt trượt trên điện thoại di động.",
    cta: "Trải nghiệm mô phỏng dòng nhiệt tại Bài 5.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
    wash: "cream",
  },
  {
    no: "06",
    lesson: "Bài 06",
    title: "Nhiệt kế Spring Bounce cubic-bezier",
    hook: "🎬 Visual: Cột chất lỏng màu đỏ dâng vọt lên nẩy nhẹ lò xo ở đỉnh nhiệt kế.<br>🔤 Text: <strong>CỘT NƯỚC NHIỆT KẾ DÂNG NẨY QUÁN TÍNH?</strong><br>🎙️ Voiceover: Cột chất lỏng dâng lên đơ cứng nhìn mất tự nhiên? Chỉ với một hàm chuyển động lò xo CSS cubic-bezier, cột nước dâng nẩy nhẹ ở đỉnh cực chất, học sinh ngắm hoài không chán để học thang nhiệt độ!",
    solution: "Cột nước dâng quán tính lò xo bằng CSS transition transition cubic-bezier.",
    cta: "Chơi thử mô phỏng nhiệt kế nảy lò xo tại Bài 6.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
    wash: "blossom",
  },
  {
    no: "07",
    lesson: "Bài 07",
    title: "Động học phân tử khí HTML5 Canvas",
    hook: "🎬 Visual: Hàng trăm hạt màu va đập dồn dập vào nhau trong hộp kín Canvas.<br>🔤 Text: <strong>TẠO HOẠT HỌA 60FPS CHỈ BẰNG 1 DÒNG CODE?</strong><br>🎙️ Voiceover: Làm sao vẽ hàng trăm phân tử chuyển động hỗn loạn va đập thành bình để giải thích áp suất? Chỉ cần một dòng lệnh Canvas 2D cực nhẹ, kéo slider tăng nhiệt độ hạt khí bay vù vù!",
    solution: "Mô phỏng hàng trăm phân tử khí chuyển động, tăng nhiệt độ làm hạt va đập mạnh gây áp suất.",
    cta: "Nhận mã nguồn mô phỏng phân tử tại Bài 7.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
    wash: "mint",
  },
  {
    no: "08",
    lesson: "Bài 08",
    title: "Game Warm-up Quiz khởi động",
    hook: "🎬 Visual: Thầy Hiệp gõ phím hiển thị QR game lớn, học sinh đồng loạt quét QR đua top.<br>🔤 Text: <strong>SOẠN GAME KHỞI ĐỘNG CHỈ MẤT 5 PHÚT?</strong><br>🎙️ Voiceover: Mất cả tiếng thiết kế slide game khởi động? Tôi chỉ mất đúng 5 phút nhờ AI soạn câu hỏi bẫy, học sinh quét QR đua top trả lời trực tiếp trên điện thoại lấy điểm cộng, lớp học hào hứng 100%!",
    solution: "Game trắc nghiệm tính giờ lật ô chữ thi đấu trực tuyến qua mã QR.",
    cta: "Chơi thử Game Khởi động tại Bài 8.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
    wash: "cream",
    gamePath: "/games/warmup-quiz/index.html",
  },
  {
    no: "09",
    lesson: "Bài 09",
    title: "Game Icebreaker click nổ bóng nhiệt",
    hook: "🎬 Visual: Học sinh click nổ bóng bay nhiệt độ rơi tự do trên điện thoại cười đùa.<br>🔤 Text: <strong>TỈNH NGỦ 100% SAU 30 GIÂY GIẢI LAO?</strong><br>🎙️ Voiceover: Học sinh ngủ gật, uể oải giữa tiết học dài? Hãy bật ngay mini game click nổ bóng nhiệt giải lao 30 giây này. Click bóng đỏ/cam, tránh bóng bom đen. Học sinh tỉnh ngủ 100% tiếp thu bài học cực tốt!",
    solution: "Game giải lao click nổ bóng bay tính điểm trong 30 giây giải tỏa stress.",
    cta: "Chơi thử Game Bóng Nhiệt Giải Lao tại Bài 9.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
    wash: "blossom",
    gamePath: "/games/bong-nhiet/index.html",
  },
  {
    no: "10",
    lesson: "Bài 10",
    title: "Game Đúng/Sai chẩn đoán ngộ nhận",
    hook: "🎬 Visual: Thầy Hiệp cầm thanh sắt và gỗ gõ nhẹ vào nhau đặt câu hỏi đầy thách thức.<br>🔤 Text: <strong>SẮT LẠNH HƠN GỖ Ở CÙNG NHIỆT ĐỘ?</strong><br>🎙️ Voiceover: Tại sao sờ vào thanh sắt thấy lạnh hơn miếng gỗ dù cả hai ở cùng nhiệt độ phòng? Dùng ngay game Đúng/Sai chẩn đoán ngộ nhận này để lật tẩy các quan niệm sai lầm khoa học của học sinh chỉ sau 2 phút!",
    solution: "Game chẩn đoán Đúng/Sai hiện thẻ giải thích bản chất truyền nhiệt tiếp xúc lập tức.",
    cta: "Chơi thử Game Củng cố tại Bài 10.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
    wash: "mint",
  },
  {
    no: "11",
    lesson: "Bài 11",
    title: "Dạy học xoay trạm game AR cử chỉ tay",
    hook: "🎬 Visual: Học sinh giơ bàn tay trước webcam điều khiển radar AR trên màn hình cực kỳ thích thú.<br>🔤 Text: <strong>HỌC VẬT LÝ TƯƠNG TÁC AR BẰNG WEBCAM?</strong><br>🎙️ Voiceover: Không cần kính VR đắt đỏ, chỉ cần webcam laptop thông thường! Đây là cách tôi tổ chức trạm công nghệ xoay trạm, học sinh quét cử chỉ bàn tay điều khiển radar AR vượt qua thử thách, thảo luận nhóm sôi nổi vô cùng!",
    solution: "Dạy học 5 trạm xoay vòng tích hợp game tương tác quét camera nhận dạng bàn tay (Hand Pose).",
    cta: "Trải nghiệm Game AR và tải giáo án mẫu tại Bài 11.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
    wash: "cream",
    gamePath: "/games/ar-knowledge-universe/index.html",
  },
];

/* ===================== HELPERS ===================== */
function getWashBg(wash: string) {
  switch (wash) {
    case "mint": return "#b9ffe8";
    case "cream": return "#fffded";
    case "blossom": return "#ffc3e6";
    default: return "#ffffff";
  }
}

function getModuleLabel(category: string) {
  if (category.startsWith("Module 1")) return "Module 1 · Soạn giảng";
  if (category.startsWith("Module 2")) return "Module 2 · Thí nghiệm ảo";
  if (category.startsWith("Module 3")) return "Module 3 · Trò chơi";
  return category;
}

/* ===================== TAB COMPONENTS ===================== */
function NoiDungTab({ lesson }: { lesson: Video }) {
  return (
    <div className="space-y-8">
      {/* Mục tiêu bài học */}
      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8">
          <h3 className="headline-serif text-ink mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
            🎯 Mục tiêu bài học
          </h3>
          <p className="font-sans text-mist leading-relaxed" style={{ fontSize: "16px" }}>
            Áp dụng mô hình GEMS (Gain – Engage – Master – Succeed) để thiết kế bài giảng,
            giúp học sinh tiếp thu kiến thức một cách chủ động, sáng tạo và hiệu quả.
          </p>
        </div>
      </Reveal>

      {/* Yêu cầu cần đạt */}
      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8">
          <h3 className="headline-serif text-ink mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
            📋 Yêu cầu cần đạt
          </h3>
          <ul className="space-y-3 font-sans text-ink" style={{ fontSize: "15px" }}>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 text-deep-teal font-bold">✓</span>
              <span>Hiểu và vận dụng được kiến thức nền tảng vào thực tiễn giảng dạy.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 text-deep-teal font-bold">✓</span>
              <span>Phát triển kỹ năng ứng dụng công nghệ AI vào soạn giảng và thiết kế học liệu.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 text-deep-teal font-bold">✓</span>
              <span>Rèn luyện tư duy phản biện và sáng tạo thông qua các hoạt động thực hành.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 text-deep-teal font-bold">✓</span>
              <span>Hoàn thiện bộ học liệu số đáp ứng mục tiêu chuyển đổi số trong giáo dục.</span>
            </li>
          </ul>
        </div>
      </Reveal>

      {/* Cấu trúc Hook (từ VIDEOS data) */}
      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8">
          <h3 className="headline-serif text-ink mb-3" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
            🎬 Cấu trúc 3s Visual Hook
          </h3>
          <div
            className="bg-cream/45 p-5 rounded-xl border border-hairline font-sans text-sm text-ink leading-relaxed space-y-2.5"
            dangerouslySetInnerHTML={{ __html: lesson.hook }}
          />
        </div>
      </Reveal>

      {/* Giải pháp thực tế */}
      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8">
          <h3 className="headline-serif text-ink mb-3" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
            💡 Giải pháp thực tế
          </h3>
          <p className="font-sans text-ink leading-relaxed" style={{ fontSize: "16px" }}>
            {lesson.solution}
          </p>
          <div className="mt-4 p-4 bg-cream rounded-xl border border-hairline">
            <span className="font-sans font-medium text-deep-teal text-xs">🎯 KÊNH WEB</span>
            <p className="font-sans font-medium text-ink leading-relaxed mt-1" style={{ fontSize: "15px" }}>
              {lesson.cta}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function TaiVeTab({ lesson }: { lesson: Video }) {
  const downloads = [
    { name: "Phiếu học tập", ext: "docx", size: "245 KB", icon: FileText },
    { name: "Slide bài giảng", ext: "pdf", size: "1.2 MB", icon: FileDown },
    { name: "Bài tập về nhà", ext: "tex", size: "89 KB", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8">
          <h3 className="headline-serif text-ink mb-6" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
            📥 Học liệu bài {lesson.no}
          </h3>
          <div className="space-y-4">
            {downloads.map((file) => {
              const Icon = file.icon;
              return (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-4 rounded-xl border border-hairline bg-cream/30 hover:bg-cream/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-mint-glass flex items-center justify-center text-deep-teal shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-sans font-medium text-ink" style={{ fontSize: "15px" }}>
                        {file.name}.{file.ext}
                      </p>
                      <p className="font-sans text-mist" style={{ fontSize: "13px" }}>
                        {file.size} · {file.ext.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/downloads/bai-${lesson.no}/${file.name.toLocaleLowerCase().replace(/\s+/g, "-")}.${file.ext}`}
                    target="_blank"
                    className="btn-teal inline-flex items-center justify-center gap-2 text-xs font-semibold"
                    style={{ padding: "8px 16px", borderRadius: "8px" }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Tải về
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8 text-center">
          <p className="font-sans text-mist mb-4" style={{ fontSize: "15px" }}>
            Bạn muốn tải tất cả học liệu cùng lúc?
          </p>
          <Link
            href={`/downloads/bai-${lesson.no}/all`}
            target="_blank"
            className="btn-teal inline-flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Tải tất cả học liệu bài {lesson.no}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

function PromptAITab({ lesson }: { lesson: Video }) {
  const [copiedGemini, setCopiedGemini] = useState(false);
  const [copiedNotebook, setCopiedNotebook] = useState(false);

  const geminiPrompt = `## Hướng dẫn Gemini Gem cho bài "${lesson.title}"

Bạn là trợ lý soạn giảng GEMS Assistant chuyên nghiệp. Hãy:

1. **Phân tích mục tiêu bài học** dựa trên chương trình GDPT 2018
2. **Thiết kế giáo án 6 bước** theo mô hình GEMS:
   - Gain: Khởi động/kiểm tra bài cũ
   - Engage: Hình thành kiến thức mới
   - Master: Luyện tập - củng cố
   - Succeed: Vận dụng - mở rộng
3. **Tạo phiếu học tập điền khuyết** tương ứng
4. **Đề xuất câu hỏi thảo luận nhóm**

Yêu cầu đầu ra: Tiếng Việt, bám sát SGK, phân hóa trình độ học sinh.`;

  const notebookLMPrompt = `## Hướng dẫn NotebookLM cho bài "${lesson.title}"

Bạn là trợ lý phân tích tài liệu học tập. Hãy:

1. **Nạp tài liệu PDF SGK** và tài liệu tham khảo vào NotebookLM
2. **Tạo bộ câu hỏi chẩn đoán** để kiểm tra mức độ hiểu bài của học sinh
3. **Thiết kế đề kiểm tra 15 phút** với 3 mức độ: Nhận biết - Thông hiểu - Vận dụng
4. **Tạo audio đối thoại 2 MC** giải thích kiến thức bằng tiếng Việt

Lưu ý: Chỉ sử dụng thông tin từ nguồn tài liệu đã nạp, không tự thêm kiến thức ngoài.`;

  return (
    <div className="space-y-8">
      {/* Gemini Custom Gem Prompt */}
      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="headline-serif text-ink" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
              🤖 Gemini Custom Gem Prompt
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(geminiPrompt);
                setCopiedGemini(true);
                setTimeout(() => setCopiedGemini(false), 2500);
              }}
              className="btn-teal inline-flex items-center justify-center gap-2 text-xs font-semibold"
              style={{ padding: "8px 16px", borderRadius: "8px" }}
            >
              {copiedGemini ? (
                <><Check className="w-3.5 h-3.5" /> Đã copy!</>
              ) : (
                <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>
              )}
            </button>
          </div>
          <pre
            className="bg-cream/60 border border-hairline rounded-xl p-5 overflow-x-auto font-mono text-sm text-ink leading-relaxed whitespace-pre-wrap"
            style={{ fontSize: "14px", lineHeight: 1.6 }}
          >
            {geminiPrompt}
          </pre>
        </div>
      </Reveal>

      {/* NotebookLM Prompt */}
      <Reveal>
        <div className="border border-hairline bg-paper rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="headline-serif text-ink" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
              📓 NotebookLM Prompt
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(notebookLMPrompt);
                setCopiedNotebook(true);
                setTimeout(() => setCopiedNotebook(false), 2500);
              }}
              className="btn-teal inline-flex items-center justify-center gap-2 text-xs font-semibold"
              style={{ padding: "8px 16px", borderRadius: "8px" }}
            >
              {copiedNotebook ? (
                <><Check className="w-3.5 h-3.5" /> Đã copy!</>
              ) : (
                <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>
              )}
            </button>
          </div>
          <pre
            className="bg-cream/60 border border-hairline rounded-xl p-5 overflow-x-auto font-mono text-sm text-ink leading-relaxed whitespace-pre-wrap"
            style={{ fontSize: "14px", lineHeight: 1.6 }}
          >
            {notebookLMPrompt}
          </pre>
        </div>
      </Reveal>
    </div>
  );
}

/* ===================== MAIN PAGE ===================== */
export default function LessonDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Map slug "bai-1" → "01", "bai-2" → "02" ... "bai-11" → "11"
  const match = slug?.match(/^bai-(\d+)$/);
  if (!match) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-5">
          <div className="text-center max-w-[480px]">
            <p className="headline-serif text-deep-teal mb-4" style={{ fontSize: "clamp(96px, 20vw, 140px)", lineHeight: 0.9 }}>404</p>
            <h1 className="headline-serif text-ink mb-4" style={{ fontSize: "clamp(28px, 4vw, 36px)" }}>Bài học không tồn tại</h1>
            <p className="font-sans text-mist mb-8" style={{ fontSize: "16px", lineHeight: 1.5 }}>
              Đường dẫn không hợp lệ. Vui lòng kiểm tra lại.
            </p>
            <Link href="/khoa-hoc" className="btn-teal inline-flex items-center justify-center gap-2">
              ← Quay lại Khóa học
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }
  const lessonNo = match[1].padStart(2, "0");
  const lesson = VIDEOS.find((v) => v.no === lessonNo);
  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-5">
          <div className="text-center max-w-[480px]">
            <p className="headline-serif text-deep-teal mb-4" style={{ fontSize: "clamp(96px, 20vw, 140px)", lineHeight: 0.9 }}>404</p>
            <h1 className="headline-serif text-ink mb-4" style={{ fontSize: "clamp(28px, 4vw, 36px)" }}>Bài học không tồn tại</h1>
            <p className="font-sans text-mist mb-8" style={{ fontSize: "16px", lineHeight: 1.5 }}>
              Bài học này chưa có trên hệ thống. Vui lòng chọn bài khác.
            </p>
            <Link href="/khoa-hoc" className="btn-teal inline-flex items-center justify-center gap-2">
              ← Quay lại Khóa học
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<"noi-dung" | "tai-ve" | "prompt-ai">("noi-dung");

  const tabs: { id: "noi-dung" | "tai-ve" | "prompt-ai"; label: string }[] = [
    { id: "noi-dung", label: "Nội dung bài học" },
    { id: "tai-ve", label: "Tải về" },
    { id: "prompt-ai", label: "Prompt AI" },
  ];

  const washBg = getWashBg(lesson.wash);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-1">
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative pt-28 sm:pt-32 pb-0 px-5 sm:px-8" style={{ backgroundColor: washBg }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-[860px]">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 text-xs sm:text-sm mb-4 flex-wrap"
              >
                <Link href="/" className="text-mist hover:text-deep-teal transition-colors font-sans">
                  Trang chủ
                </Link>
                <ChevronRight className="w-3 h-3 text-mist" />
                <Link href="/khoa-hoc" className="text-mist hover:text-deep-teal transition-colors font-sans">
                  Khóa học
                </Link>
                <ChevronRight className="w-3 h-3 text-mist" />
                <span className="text-ink font-medium font-sans">{lesson.lesson}</span>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-4"
              >
                <span className="badge-mint">{getModuleLabel(lesson.category)}</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="headline-serif text-ink"
                style={{ fontSize: "clamp(36px, 5.5vw, 52px)", lineHeight: 1.1 }}
              >
                {lesson.title}
              </motion.h1>

              {/* Meta: Duration + Category */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mt-5 mb-8"
              >
                <div className="flex items-center gap-1.5 font-sans text-sm text-ink/70">
                  <Clock className="w-4 h-4 text-deep-teal" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 font-sans text-sm text-ink/70">
                  <Sparkles className="w-4 h-4 text-deep-teal" />
                  <span>{lesson.category}</span>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3 pb-8"
              >
                <Link
                  href={`/downloads/bai-${lesson.no}/all`}
                  target="_blank"
                  className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Tải học liệu
                </Link>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`## Hướng dẫn Gemini Gem cho bài "${lesson.title}"\n\nBạn là trợ lý soạn giảng GEMS...`);
                    setActiveTab("prompt-ai");
                  }}
                  className="btn-outlined inline-flex items-center justify-center gap-2"
                  style={{ borderRadius: "8px" }}
                >
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== TABS ==================== */}
        <section className="py-0 px-5 sm:px-8 bg-paper border-b border-hairline sticky top-[76px] z-20 shadow-sm/5">
          <div className="max-w-[1200px] mx-auto flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-sans text-sm font-semibold px-5 py-3.5 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? "text-deep-teal border-deep-teal"
                    : "text-mist border-transparent hover:text-ink hover:border-hairline"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* ==================== TAB CONTENT ==================== */}
        <section className="py-12 sm:py-16 px-5 sm:px-8 bg-paper">
          <div className="max-w-[860px] mx-auto">
            {activeTab === "noi-dung" && <NoiDungTab lesson={lesson} />}
            {activeTab === "tai-ve" && <TaiVeTab lesson={lesson} />}
            {activeTab === "prompt-ai" && <PromptAITab lesson={lesson} />}
          </div>
        </section>

        {/* ==================== GAME DEMO ==================== */}
        {lesson.gamePath && (
          <section className="py-16 px-5 sm:px-8 bg-mint-glass border-y border-hairline">
            <div className="max-w-[720px] mx-auto text-center">
              <Reveal>
                <span className="badge-mint mb-5 animate-badge-bounce">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Trò chơi tương tác
                </span>
                <h2
                  className="headline-serif text-ink mb-3"
                  style={{ fontSize: "clamp(28px, 4vw, 36px)", lineHeight: 1.1 }}
                >
                  Chơi thử trò chơi liên quan
                </h2>
                <p className="font-sans text-ink leading-relaxed mx-auto mb-6" style={{ fontSize: "16px", maxWidth: "480px" }}>
                  Trải nghiệm tương tác thực tế giúp củng cố kiến thức bài học một cách sinh động.
                </p>
                <Link
                  href={lesson.gamePath}
                  target="_blank"
                  className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Chơi Game ngay
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {/* ==================== CTA BACK ==================== */}
        <section className="py-12 px-5 sm:px-8 bg-cream border-b border-hairline">
          <div className="max-w-[860px] mx-auto text-center">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 font-sans font-medium text-deep-teal hover:gap-3 transition-all"
              style={{ fontSize: "15px" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách khóa học
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
