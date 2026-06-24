# Changelog

All notable changes to this project will be documented in this file.

## [2026-06-22]
### Fixed
- **Khôi phục Portal Đòn Bẩy AI**: Khôi phục mã nguồn chính về commit `7c85e52` để đưa giao diện quay lại bản ổn định lúc 10h sáng ngày 19/06, loại bỏ các thay đổi không mong muốn trong lúc phát triển.
- **Tương thích Build trên Windows**: Thay thế lệnh Unix `cp -r` trong kịch bản build bằng file Node.js di động `scripts/copy-build.js` giúp tránh lỗi trên môi trường terminal Windows/PowerShell.

## [2026-06-19]
### Added
- **Cổng Trò Chơi Học Tập (/game)**: Xây dựng cổng chọn game AR & Đối kháng tập trung bằng giao diện glassmorphic cao cấp.
- **Tích Hợp Game Sóng Năng Lượng**: Tích hợp game lật thẻ đối kháng (Vật lý 11 - Dao động điều hòa) hỗ trợ 1-4 đội thi đấu trực tiếp.
- **Tích Hợp Game Vũ Trụ Tri Thức AR**: Tích hợp game toán học tương tác nhận diện cử chỉ bàn tay qua camera.

### Changed
- **Đồng Bộ Giao Diện Sáng (Light Theme)**: 
  - Khắc phục sự lệch tông bằng cách chuyển đổi game Sóng Năng Lượng từ Dark Neon sang Light Theme ấm áp chuẩn Lyssna (sử dụng màu nền Cream `#fffded`, màu thẻ Mint Glass `#b9ffe8`, chữ màu Ink `#061d29`).
  - Cập nhật bảng màu chính của game Vũ Trụ Tri Thức AR sang Deep Teal (`#006e75`) và Bright Teal (`#0b978e`).
- **Nâng Cấp Điều Hướng (Navbar)**: Thay thế link game AR cũ bằng liên kết mượt mà trỏ về Cổng Trò chơi `/game` thay vì mở trang html rời rạc.

### Fixed
- **Lỗi Đường Dẫn Tĩnh Trong Iframe**: Sửa đổi cấu hình build của các game phụ với base path `./` để toàn bộ tài sản `.js` và `.css` tải chính xác dưới thư mục con `/public/games/`.
- **Bypass PowerShell Script Blocking**: Sử dụng `npm.cmd` và `npx.cmd` trên môi trường Windows để đảm bảo build Next.js và Vite chạy ổn định không gặp lỗi Execution Policy.
