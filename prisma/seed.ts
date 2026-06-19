import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const categories = [
  { name: 'Toán học', color: '#10b981', icon: 'Calculator' },
  { name: 'Khoa học', color: '#f59e0b', icon: 'FlaskConical' },
  { name: 'Địa lý', color: '#06b6d4', icon: 'Globe' },
  { name: 'Lịch sử', color: '#ec4899', icon: 'Landmark' },
  { name: 'Tiếng Anh', color: '#8b5cf6', icon: 'Languages' },
  { name: 'Tổng hợp', color: '#ef4444', icon: 'Sparkles' },
  { name: 'Âm nhạc', color: '#14b8a6', icon: 'Music' },
  { name: 'Thể thao', color: '#f97316', icon: 'Trophy' },
]

type Q = {
  category: string
  type: 'QUIZ' | 'MATCH' | 'SORT'
  prompt: string
  options: string
  answer: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
}

const questions: Q[] = [
  // Toán - QUIZ
  { category: 'Toán học', type: 'QUIZ', prompt: 'Bao nhiêu là 7 × 8?', options: JSON.stringify(['54', '56', '64', '48']), answer: '1', difficulty: 'EASY' },
  { category: 'Toán học', type: 'QUIZ', prompt: 'Căn bậc hai của 144 là?', options: JSON.stringify(['11', '12', '13', '14']), answer: '1', difficulty: 'EASY' },
  { category: 'Toán học', type: 'QUIZ', prompt: '15% của 200 bằng bao nhiêu?', options: JSON.stringify(['25', '30', '35', '40']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Toán học', type: 'QUIZ', prompt: 'Kết quả của 2^10 là?', options: JSON.stringify(['512', '1024', '2048', '256']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Toán học', type: 'QUIZ', prompt: 'Số π (pi) xấp xỉ bằng?', options: JSON.stringify(['3.14', '3.41', '2.17', '1.61']), answer: '0', difficulty: 'EASY' },
  { category: 'Toán học', type: 'SORT', prompt: 'Sắp xếp các số theo thứ tự tăng dần', options: JSON.stringify(['42', '17', '88', '23']), answer: JSON.stringify([1, 3, 0, 2]), difficulty: 'EASY' },
  { category: 'Toán học', type: 'SORT', prompt: 'Sắp xếp theo thứ tự giảm dần', options: JSON.stringify(['3.14', '2.71', '1.41', '1.61']), answer: JSON.stringify([0, 1, 3, 2]), difficulty: 'MEDIUM' },

  // Khoa học - QUIZ
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Công thức hóa học của nước là?', options: JSON.stringify(['CO2', 'H2O', 'O2', 'NaCl']), answer: '1', difficulty: 'EASY' },
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Hành tinh lớn nhất trong hệ Mặt Trời là?', options: JSON.stringify(['Trái Đất', 'Sao Mộc', 'Sao Thổ', 'Sao Hỏa']), answer: '1', difficulty: 'EASY' },
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Đơn vị đo lực là?', options: JSON.stringify(['Joule', 'Newton', 'Watt', 'Pascal']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Kim loại nào nhẹ nhất?', options: JSON.stringify(['Liti', 'Nhôm', 'Sắt', 'Đồng']), answer: '0', difficulty: 'HARD' },
  { category: 'Khoa học', type: 'MATCH', prompt: 'Ghép chất với công thức', options: JSON.stringify([{ left: 'Nước', right: 'H2O' }, { left: 'Muối ăn', right: 'NaCl' }, { left: 'Đường saccharose', right: 'C12H22O11' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'MEDIUM' },
  { category: 'Khoa học', type: 'MATCH', prompt: 'Ghép hành tinh với thứ tự', options: JSON.stringify([{ left: 'Sao Thủy', right: '1' }, { left: 'Trái Đất', right: '3' }, { left: 'Sao Hỏa', right: '4' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },

  // Địa lý - QUIZ
  { category: 'Địa lý', type: 'QUIZ', prompt: 'Thủ đô của Việt Nam là?', options: JSON.stringify(['Hà Nội', 'Huế', 'Đà Nẵng', 'TP.HCM']), answer: '0', difficulty: 'EASY' },
  { category: 'Địa lý', type: 'QUIZ', prompt: 'Sông dài nhất thế giới là?', options: JSON.stringify(['Sông Nile', 'Sông Amazon', 'Sông Dương Tử', 'Sông Mississippi']), answer: '0', difficulty: 'MEDIUM' },
  { category: 'Địa lý', type: 'QUIZ', prompt: 'Châu lục nào lớn nhất diện tích?', options: JSON.stringify(['Châu Phi', 'Châu Á', 'Châu Mỹ', 'Châu Âu']), answer: '1', difficulty: 'EASY' },
  { category: 'Địa lý', type: 'QUIZ', prompt: 'Đỉnh núi cao nhất thế giới là?', options: JSON.stringify(['K2', 'Everest', 'Kangchenjunga', 'Lhotse']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Địa lý', type: 'SORT', prompt: 'Sắp xếp các thành phố từ Bắc xuống Nam (Việt Nam)', options: JSON.stringify(['Hà Nội', 'Huế', 'Đà Nẵng', 'TP.HCM']), answer: JSON.stringify([0, 1, 2, 3]), difficulty: 'MEDIUM' },

  // Lịch sử - QUIZ
  { category: 'Lịch sử', type: 'QUIZ', prompt: 'Nước Việt Nam Dân chủ Cộng hòa ra đời năm nào?', options: JSON.stringify(['1945', '1954', '1975', '1930']), answer: '0', difficulty: 'EASY' },
  { category: 'Lịch sử', type: 'QUIZ', prompt: 'Chiến thắng Bạch Đằng năm 938 do ai chỉ huy?', options: JSON.stringify(['Trần Hưng Đạo', 'Ngô Quyền', 'Lê Lợi', 'Quang Trung']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Lịch sử', type: 'QUIZ', prompt: 'Trận Điện Biên Phủ diễn ra năm nào?', options: JSON.stringify(['1945', '1950', '1954', '1975']), answer: '2', difficulty: 'MEDIUM' },
  { category: 'Lịch sử', type: 'SORT', prompt: 'Sắp xếp các sự kiện theo thời gian', options: JSON.stringify(['Khởi nghĩa Hai Bà Trưng', 'Chiến thắng Bạch Đằng 938', 'Chiến thắng Chi Lăng', 'Cách mạng Tháng Tám']), answer: JSON.stringify([0, 1, 2, 3]), difficulty: 'HARD' },

  // Tiếng Anh - MATCH & QUIZ
  { category: 'Tiếng Anh', type: 'MATCH', prompt: 'Ghép từ tiếng Anh với nghĩa', options: JSON.stringify([{ left: 'Apple', right: 'Táo' }, { left: 'Book', right: 'Sách' }, { left: 'Sun', right: 'Mặt trời' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },
  { category: 'Tiếng Anh', type: 'MATCH', prompt: 'Match the antonyms', options: JSON.stringify([{ left: 'Hot', right: 'Cold' }, { left: 'Big', right: 'Small' }, { left: 'Fast', right: 'Slow' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'MEDIUM' },
  { category: 'Tiếng Anh', type: 'QUIZ', prompt: 'Choose the correct spelling', options: JSON.stringify(['Recieve', 'Receive', 'Receeve', 'Receve']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Tiếng Anh', type: 'QUIZ', prompt: 'Past tense of "go" is?', options: JSON.stringify(['Goed', 'Went', 'Gone', 'Going']), answer: '1', difficulty: 'EASY' },

  // Tổng hợp
  { category: 'Tổng hợp', type: 'QUIZ', prompt: 'Có bao nhiêu màu trong cầu vồng?', options: JSON.stringify(['5', '6', '7', '8']), answer: '2', difficulty: 'EASY' },
  { category: 'Tổng hợp', type: 'QUIZ', prompt: 'Nhạc sĩ sáng tác bài "Tiến quân ca"?', options: JSON.stringify(['Văn Cao', 'Trịnh Công Sơn', 'Phạm Tuyên', 'Hoàng Hiệp']), answer: '0', difficulty: 'MEDIUM' },
  { category: 'Tổng hợp', type: 'QUIZ', prompt: 'Mỗi năm có bao nhiêu ngày?', options: JSON.stringify(['364', '365', '366', '360']), answer: '1', difficulty: 'EASY' },

  // Toán học — thêm
  { category: 'Toán học', type: 'QUIZ', prompt: 'Tổng các góc trong tam giác bằng bao nhiêu độ?', options: JSON.stringify(['90', '180', '270', '360']), answer: '1', difficulty: 'EASY' },
  { category: 'Toán học', type: 'QUIZ', prompt: 'Số nguyên tố đầu tiên là?', options: JSON.stringify(['0', '1', '2', '3']), answer: '2', difficulty: 'EASY' },
  { category: 'Toán học', type: 'QUIZ', prompt: 'Kết quả của 9! (9 giai thừa) là?', options: JSON.stringify(['362880', '40320', '3628800', '5040']), answer: '0', difficulty: 'HARD' },
  { category: 'Toán học', type: 'QUIZ', prompt: 'Số thập phân 0.5 bằng phân số nào?', options: JSON.stringify(['1/4', '1/3', '1/2', '2/3']), answer: '2', difficulty: 'EASY' },
  { category: 'Toán học', type: 'MATCH', prompt: 'Ghép phép tính với kết quả', options: JSON.stringify([{ left: '6 × 7', right: '42' }, { left: '8 × 9', right: '72' }, { left: '12 × 12', right: '144' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },
  { category: 'Toán học', type: 'SORT', prompt: 'Sắp xếp số nguyên tố tăng dần', options: JSON.stringify(['13', '7', '2', '11']), answer: JSON.stringify([2, 1, 3, 0]), difficulty: 'MEDIUM' },

  // Khoa học — thêm
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Khí nào chiếm nhiều nhất trong khí quyển Trái Đất?', options: JSON.stringify(['Oxy', 'Nitơ', 'CO2', 'Hydro']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Âm thanh truyền qua chân không được không?', options: JSON.stringify(['Có', 'Không', 'Chỉ âm cao', 'Chỉ âm trầm']), answer: '1', difficulty: 'EASY' },
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Bao nhiêu xương trong cơ thể người trưởng thành?', options: JSON.stringify(['186', '206', '226', '246']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Khoa học', type: 'QUIZ', prompt: 'Nước sôi ở nhiệt độ nào (°C, áp suất chuẩn)?', options: JSON.stringify(['90', '95', '100', '105']), answer: '2', difficulty: 'EASY' },
  { category: 'Khoa học', type: 'MATCH', prompt: 'Ghép cơ quan với chức năng', options: JSON.stringify([{ left: 'Phổi', right: 'Hô hấp' }, { left: 'Tim', right: 'Bơm máu' }, { left: 'Dạ dày', right: 'Tiêu hóa' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },

  // Địa lý — thêm
  { category: 'Địa lý', type: 'QUIZ', prompt: 'Việt Nam có bao nhiêu tỉnh thành?', options: JSON.stringify(['61', '63', '64', '65']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Địa lý', type: 'QUIZ', prompt: 'Đại dương lớn nhất thế giới là?', options: JSON.stringify(['Ấn Độ Dương', 'Thái Bình Dương', 'Đại Tây Dương', 'Bắc Băng Dương']), answer: '1', difficulty: 'EASY' },
  { category: 'Địa lý', type: 'QUIZ', prompt: 'Sa mạc khô nhất thế giới là?', options: JSON.stringify(['Sahara', 'Gobi', 'Atacama', 'Kalahari']), answer: '2', difficulty: 'HARD' },
  { category: 'Địa lý', type: 'SORT', prompt: 'Sắp xếp các quốc gia theo diện tích giảm dần', options: JSON.stringify(['Việt Nam', 'Trung Quốc', 'Nhật Bản', 'Nga']), answer: JSON.stringify([3, 1, 0, 2]), difficulty: 'HARD' },
  { category: 'Địa lý', type: 'MATCH', prompt: 'Ghép quốc gia với thủ đô', options: JSON.stringify([{ left: 'Nhật Bản', right: 'Tokyo' }, { left: 'Hàn Quốc', right: 'Seoul' }, { left: 'Thái Lan', right: 'Bangkok' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },

  // Lịch sử — thêm
  { category: 'Lịch sử', type: 'QUIZ', prompt: 'Vua đầu tiên của nước Văn Lang là?', options: JSON.stringify(['Hùng Vương', 'An Dương Vương', 'Lý Thái Tổ', 'Đinh Tiên Hoàng']), answer: '0', difficulty: 'EASY' },
  { category: 'Lịch sử', type: 'QUIZ', prompt: 'Triều đại nào định đô ở Hoa Lư?', options: JSON.stringify(['Lý', 'Trần', 'Đinh', 'Lê']), answer: '2', difficulty: 'MEDIUM' },
  { category: 'Lịch sử', type: 'QUIZ', prompt: 'Người sáng lập Đảng Cộng sản Việt Nam là?', options: JSON.stringify(['Hồ Chí Minh', 'Lê Duẩn', 'Phạm Văn Đồng', 'Võ Nguyên Giáp']), answer: '0', difficulty: 'EASY' },
  { category: 'Lịch sử', type: 'SORT', prompt: 'Sắp xếp các triều đại theo thời gian', options: JSON.stringify(['Nhà Lý', 'Nhà Trần', 'Nhà Lê', 'Nhà Nguyễn']), answer: JSON.stringify([0, 1, 2, 3]), difficulty: 'MEDIUM' },

  // Tiếng Anh — thêm
  { category: 'Tiếng Anh', type: 'QUIZ', prompt: 'Choose: She ___ to school every day.', options: JSON.stringify(['go', 'goes', 'going', 'gone']), answer: '1', difficulty: 'EASY' },
  { category: 'Tiếng Anh', type: 'QUIZ', prompt: 'Synonym of "happy"?', options: JSON.stringify(['Sad', 'Joyful', 'Angry', 'Tired']), answer: '1', difficulty: 'EASY' },
  { category: 'Tiếng Anh', type: 'QUIZ', prompt: 'How many letters in English alphabet?', options: JSON.stringify(['24', '25', '26', '27']), answer: '2', difficulty: 'EASY' },
  { category: 'Tiếng Anh', type: 'MATCH', prompt: 'Match jobs with workplaces', options: JSON.stringify([{ left: 'Teacher', right: 'School' }, { left: 'Doctor', right: 'Hospital' }, { left: 'Chef', right: 'Kitchen' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'MEDIUM' },

  // Tổng hợp — thêm
  { category: 'Tổng hợp', type: 'QUIZ', prompt: 'Bản đồ Việt Nam có hình gì?', options: JSON.stringify(['Chữ S', 'Chữ Z', 'Tròn', 'Vuông']), answer: '0', difficulty: 'EASY' },
  { category: 'Tổng hợp', type: 'QUIZ', prompt: 'Động vật nào lớn nhất trên cạn?', options: JSON.stringify(['Hổ', 'Voi', 'Hươu cao cổ', 'Gấu']), answer: '1', difficulty: 'EASY' },
  { category: 'Tổng hợp', type: 'QUIZ', prompt: 'Mùa nào có Tết Nguyên Đán ở Việt Nam?', options: JSON.stringify(['Xuân', 'Hạ', 'Thu', 'Đông']), answer: '0', difficulty: 'EASY' },
  { category: 'Tổng hợp', type: 'QUIZ', prompt: 'Quốc huy Việt Nam có hình con gì ở giữa?', options: JSON.stringify(['Rồng', 'Hổ', 'Trâu', 'Ngựa']), answer: '0', difficulty: 'MEDIUM' },
  { category: 'Tổng hợp', type: 'SORT', prompt: 'Sắp xếp các ngày lễ trong năm theo thứ tự', options: JSON.stringify(['Tết Nguyên Đán', '30/4 Giải phóng', '2/9 Quốc khánh', '20/11 Nhà giáo']), answer: JSON.stringify([0, 1, 2, 3]), difficulty: 'MEDIUM' },
  { category: 'Tổng hợp', type: 'MATCH', prompt: 'Ghép môn thể thao với số người', options: JSON.stringify([{ left: 'Bóng đá', right: '11 người' }, { left: 'Bóng rổ', right: '5 người' }, { left: 'Bóng chuyền', right: '6 người' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },

  // Âm nhạc
  { category: 'Âm nhạc', type: 'QUIZ', prompt: 'Nhạc sĩ sáng tác bài "Tiến quân ca" (Quốc ca VN)?', options: JSON.stringify(['Văn Cao', 'Trịnh Công Sơn', 'Phạm Tuyên', 'Hoàng Hiệp']), answer: '0', difficulty: 'MEDIUM' },
  { category: 'Âm nhạc', type: 'QUIZ', prompt: 'Đàn có bao nhiêu dây (đàn ghi-ta thường)?', options: JSON.stringify(['4', '5', '6', '7']), answer: '2', difficulty: 'EASY' },
  { category: 'Âm nhạc', type: 'QUIZ', prompt: 'Nhạc cụ nào có phím đen trắng?', options: JSON.stringify(['Sáo', 'Đàn piano', 'Trống', 'Kèn']), answer: '1', difficulty: 'EASY' },
  { category: 'Âm nhạc', type: 'QUIZ', prompt: 'Bài "Cho con" do nhạc sĩ nào sáng tác?', options: JSON.stringify(['Trịnh Công Sơn', 'Phạm Tuyên', 'Nguyễn Văn Tý', 'Trần Hoàn']), answer: '1', difficulty: 'MEDIUM' },
  { category: 'Âm nhạc', type: 'MATCH', prompt: 'Ghép nhạc cụ với họ', options: JSON.stringify([{ left: 'Đàn tranh', right: 'Dây' }, { left: 'Sáo trúc', right: 'Khí' }, { left: 'Trống', right: 'Gõ' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },
  { category: 'Âm nhạc', type: 'SORT', prompt: 'Sắp xếp nốt nhạc theo thứ tự tăng dần', options: JSON.stringify(['Đô', 'Mi', 'Rê', 'Son']), answer: JSON.stringify([0, 2, 1, 3]), difficulty: 'EASY' },

  // Thể thao
  { category: 'Thể thao', type: 'QUIZ', prompt: 'Một đội bóng đá có bao nhiêu người trên sân?', options: JSON.stringify(['9', '10', '11', '12']), answer: '2', difficulty: 'EASY' },
  { category: 'Thể thao', type: 'QUIZ', prompt: 'World Cup bóng đá tổ chức mấy năm một lần?', options: JSON.stringify(['2', '3', '4', '5']), answer: '2', difficulty: 'EASY' },
  { category: 'Thể thao', type: 'QUIZ', prompt: 'Vận động viên nào nổi tiếng điền kinh VN?', options: JSON.stringify(['Nguyễn Thị Oanh', 'Park Hang-seo', 'Công Phượng', 'Hoàng Xuân Vinh']), answer: '0', difficulty: 'MEDIUM' },
  { category: 'Thể thao', type: 'QUIZ', prompt: 'Bóng rổ mỗi đội có mấy người trên sân?', options: JSON.stringify(['4', '5', '6', '7']), answer: '1', difficulty: 'EASY' },
  { category: 'Thể thao', type: 'MATCH', prompt: 'Ghép môn thể thao với dụng cụ', options: JSON.stringify([{ left: 'Tennis', right: 'Vợt' }, { left: 'Bóng đá', right: 'Quả bóng' }, { left: 'Bắn cung', right: 'Cung tên' }]), answer: JSON.stringify([0, 1, 2]), difficulty: 'EASY' },
  { category: 'Thể thao', type: 'SORT', prompt: 'Sắp xếp các môn theo số người chơi tăng dần', options: JSON.stringify(['Bóng rổ (5)', 'Bóng chuyền (6)', 'Bóng đá (11)', 'Đơn tennis (2)']), answer: JSON.stringify([3, 0, 1, 2]), difficulty: 'MEDIUM' },
]

async function main() {
  console.log('Seeding database...')

  // Create categories
  const catMap: Record<string, string> = {}
  for (const c of categories) {
    const cat = await db.category.upsert({
      where: { name: c.name },
      update: { color: c.color, icon: c.icon },
      create: c,
    })
    catMap[c.name] = cat.id
  }

  // Clear existing questions then re-insert
  await db.question.deleteMany({})

  for (const q of questions) {
    await db.question.create({
      data: {
        categoryId: catMap[q.category],
        type: q.type,
        prompt: q.prompt,
        options: q.options,
        answer: q.answer,
        difficulty: q.difficulty,
      },
    })
  }

  console.log(`Seeded ${categories.length} categories and ${questions.length} questions.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
