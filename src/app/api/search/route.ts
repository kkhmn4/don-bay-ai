// Search API — searches lesson titles, descriptions, and tags
// Returns top 10 matches ranked by relevance

const SEARCH_INDEX = [
  { title: "Soạn bài dạy bằng Gemini Custom Gem", slug: "/khoa-hoc#module-1", tags: ["gemini", "soạn giảng", "lesson plan", "GEMS"] },
  { title: "Sử dụng NotebookLM tin cậy trong giảng dạy", slug: "/khoa-hoc#module-1", tags: ["notebooklm", "tài liệu", "nguồn tin cậy"] },
  { title: "Tệp âm thanh song ngữ với NotebookLM", slug: "/khoa-hoc#module-1", tags: ["notebooklm", "audio", "song ngữ", "podcast"] },
  { title: "Mẫu tài liệu Word 2 cột chuẩn in ấn", slug: "/khoa-hoc#module-1", tags: ["gems", "word", "mẫu", "phiếu học tập"] },
  { title: "Dòng truyền nhiệt tương tác SVG", slug: "/khoa-hoc#module-2", tags: ["thí nghiệm ảo", "svg", "tương tác", "nhiệt"] },
  { title: "Nhiệt kế ảo tương tác", slug: "/khoa-hoc#module-2", tags: ["thí nghiệm ảo", "nhiệt kế", "nhiệt độ"] },
  { title: "Động học phân tử khí", slug: "/khoa-hoc#module-2", tags: ["thí nghiệm ảo", "phân tử", "khí"] },
  { title: "Trò chơi khởi động đầu giờ", slug: "/khoa-hoc#module-3", tags: ["trò chơi", "khởi động", "khoa học"] },
  { title: "Trò chơi giải lao bóng nhiệt", slug: "/khoa-hoc#module-3", tags: ["trò chơi", "giải lao", "bóng nhiệt"] },
  { title: "Trò chơi củng cố Đúng/Sai", slug: "/khoa-hoc#module-3", tags: ["trò chơi", "củng cố", "đúng sai"] },
  { title: "Tổ chức dạy học xoay trạm", slug: "/khoa-hoc#module-3", tags: ["trò chơi", "xoay trạm", "dạy học"] },
  { title: "Vũ Trụ Tri Thức AR", slug: "/game", tags: ["ar", "trò chơi", "thực tế tăng cường"] },
  { title: "HandQuiz AR", slug: "/game", tags: ["ar", "trắc nghiệm", "cử chỉ tay"] },
  { title: "Câu lệnh Gemini Gems", slug: "/khoa-hoc", tags: ["gemini", "gems", "câu lệnh", "prompt"] },
  { title: "Phiếu học tập GEMS", slug: "/khoa-hoc", tags: ["gems", "phiếu học tập", "worksheet"] },
  { title: "Mã đồ họa TikZ", slug: "/khoa-hoc", tags: ["tikz", "đồ họa", "latex"] },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim() || "";

  if (!q) {
    return Response.json({ results: [] });
  }

  const results = SEARCH_INDEX
    .map((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const tagMatch = item.tags.some((t) => t.includes(q));
      let score = 0;
      if (titleMatch) score += 10;
      if (tagMatch) score += 5;
      if (item.title.toLowerCase().startsWith(q)) score += 3;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ score, ...rest }) => rest);

  return Response.json({ results });
}
