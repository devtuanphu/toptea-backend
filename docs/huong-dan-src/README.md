# Nguồn tài liệu "Hướng dẫn quản trị nội dung TOP WELL TEA"

Kết quả: `../Huong-dan-quan-tri-noi-dung-TOP-WELL-TEA.pdf` (A4).

| File | Vai trò |
| --- | --- |
| `guide.html` | Nội dung hướng dẫn (HTML, in ra PDF). |
| `img/raw/` | Ảnh chụp màn hình gốc của Admin (Chrome 1512×870, đã cắt thanh trình duyệt) và website. |
| `annotate.py` | Vẽ khung đỏ đánh số lên ảnh gốc → `img/`. Toạ độ khung nằm trong `BOXES`. |
| `render.mjs` | Xuất `guide.html` ra PDF bằng Playwright (dùng bản cài trong `top-well-1/frontend`). |

Cập nhật tài liệu:

```bash
python3 annotate.py   # sau khi thay / thêm ảnh trong img/raw
node render.mjs       # xuất lại PDF
```

Ảnh Admin được chụp bằng Orca computer-use trên cửa sổ Chrome thật (giao diện Admin đặt tiếng Việt, tài khoản test
`guide-admin@example.com` trên máy local). Khi chụp lại, giữ nguyên kích thước cửa sổ để toạ độ trong `BOXES` vẫn đúng.
