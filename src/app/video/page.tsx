"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Clock, Film, Video, Filter, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";

const CATEGORIES = [
  "Tất cả",
  "Module 1 · Soạn giảng",
  "Module 2 · Thí nghiệm ảo",
  "Module 3 · Trò chơi"
];

const VIDEOS = [
  {
    no: "01",
    lesson: "Bài 01",
    title: "Soạn bài bằng Gemini Custom Gem",
    hook: "🎬 Visual: Thầy Hiệp ôm đầu mệt mỏi gạt phăng giáo án cũ.<br>🔤 Text: <strong>SOẠN BÀI BẰNG AI = LÝ THUYẾT SUÔNG?</strong><br>🎙️ Voiceover: Soạn bài bằng AI chỉ ra toàn chữ chung chung? Thầy cô mất bao đêm sửa prompt ngu ngơ của AI? Hãy cấu hình ngay Custom Gem GEMS Assistant bằng tiếng Việt, 10 phút là xong giáo án 6 bước!",
    solution: "Cấu hình Gemini Custom Gem tự động lập giáo án và phiếu học tập điền khuyết.",
    cta: "Copy prompt cấu hình Gem tại Bài 1 trên Web.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
    wash: "mint"
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
    wash: "cream"
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
    wash: "blossom"
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
    wash: "mint"
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
    wash: "cream"
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
    wash: "blossom"
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
    wash: "mint"
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
    wash: "cream"
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
    wash: "blossom"
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
    wash: "mint"
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
    wash: "cream"
  }
];

function getWashBg(wash: string) {
  switch (wash) {
    case "mint": return "#b9ffe8";
    case "cream": return "#fffded";
    case "blossom": return "#ffc3e6";
    default: return "#ffffff";
  }
}

export default function VideoPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredVideos = VIDEOS.filter(
    (v) => activeCategory === "Tất cả" || v.category === activeCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-1">
        <PageHero
          eyebrow="11 Kịch bản video dọc"
          title={<>Kịch Bản Video Ngắn Đa Kênh</>}
          subtitle="Tổng hợp 11 kịch bản video 60s (TikTok, Reels, Shorts) đồng bộ 1-1 với các bài học thực chiến của thầy Kha Khung Hiệp."
        />

        {/* Filter bar on cream */}
        <section className="py-6 px-5 sm:px-8 bg-cream border-y border-hairline sticky top-[76px] z-30 shadow-sm/5">
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-deep-teal font-semibold text-sm">
              <Filter className="w-4 h-4" />
              <span>Phân loại Module:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-deep-teal text-white shadow-sm"
                      : "bg-paper border border-hairline text-ink hover:border-deep-teal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Scripts grid */}
        <section className="py-16 px-5 sm:px-8 bg-paper">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredVideos.map((vid) => (
                <Reveal key={vid.no}>
                  <article
                    className="flex flex-col bg-paper border border-hairline rounded-[24px] overflow-hidden h-full shadow-sm"
                  >
                    {/* Header inside colored wash */}
                    <div
                      className="p-5 flex items-center justify-between"
                      style={{ backgroundColor: getWashBg(vid.wash) }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 bg-black/10 rounded-full text-ink">
                          {vid.lesson}
                        </span>
                        <span className="text-xs font-medium text-deep-teal">
                          {vid.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-ink/75 bg-paper/50 px-2 py-0.5 rounded-md">
                        <Clock className="w-3.5 h-3.5" />
                        {vid.duration}
                      </div>
                    </div>

                    {/* Content body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="headline-serif text-ink text-2xl mb-4">
                          {vid.title}
                        </h3>

                        {/* Hook details (Visual, Text, Voiceover) */}
                        <div className="space-y-4 mb-6">
                          <p className="font-sans font-bold text-deep-teal uppercase tracking-widest text-[9px] mb-2">🎬 Cấu trúc 3s Visual Hook</p>
                          <div
                            className="bg-cream/45 p-4 rounded-xl border border-hairline font-sans text-sm text-ink leading-relaxed space-y-2.5"
                            dangerouslySetInnerHTML={{ __html: vid.hook }}
                          />
                        </div>

                        {/* Solutions & Practice */}
                        <div className="space-y-3 mt-4 pt-4 border-t border-hairline">
                          <div className="flex gap-3">
                            <span className="shrink-0 font-sans font-medium text-deep-teal mt-0.5 text-xs">
                              💡 GIẢI PHÁP
                            </span>
                            <p className="font-sans text-ink leading-relaxed text-sm">{vid.solution}</p>
                          </div>
                          <div className="flex gap-3">
                            <span className="shrink-0 font-sans font-medium text-deep-teal mt-0.5 text-xs">
                              🎯 KÊNH WEB
                            </span>
                            <p className="font-sans font-medium text-ink leading-relaxed text-sm text-teal-700">{vid.cta}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-hairline flex gap-4">
                        <Link
                          href="/khoa-hoc"
                          className="w-full btn-teal inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl"
                        >
                          <Play className="w-3.5 h-3.5" />
                          Xem Bài Học & Lấy Học Liệu
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
