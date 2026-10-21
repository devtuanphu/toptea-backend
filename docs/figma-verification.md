# Đối chiếu Figma ↔ website ↔ Strapi

Đo trên trình duyệt (Next.js dev, dữ liệu seed) ngày 15/10/2026 ở 1440px (desktop) và 390px (mobile), so với chiều cao frame trong Figma `5jcqfe1svhxBX9C8BevKDk` (Desktop `0:1`, Mobile `1:2`). Đơn vị: px. "≈" = lệch ≤ 30px.

Kiểm tra tự động trên **mọi route**: tất cả `<img>`, icon (CSS mask) và ảnh nền đều lấy từ Strapi `/uploads` (0 ảnh ngoài CMS; `frontend/public/` không có file nào), 1 thẻ H1/trang, không tràn ngang.

## Desktop

| Frame Figma (id) | Route | Single Type → sections (component) | Figma | Website |
| --- | --- | --- | --- | --- |
| Home (10:19) | `/` | Trang chủ → `home.hero-slider` · `sections.split-story` · `home.philosophy` · `sections.split-story` · `home.process` · `home.featured-products` · `sections.cta-band` | 800 · 700 · 584 · 620 · 887 · 1169 · 482 | 800 · 700 · 583 · 620 · 885 · 1167 · 483 ✓ |
| Shop (16:173) | `/cua-hang` | Cửa hàng → `sections.page-banner` · `shop.product-grid` | 380 · 1413 | 380 · 2013 (11 sản phẩm trong CMS so với 8 trong mock = thêm 1 hàng) |
| Product 8g (17:326) | `/cua-hang/gaba-tea` | Sản phẩm (collection) → breadcrumb · thông tin · `product.brew-guides` · liên quan | 53 · 919 · 488 · 847 | 53 · 917 · 487 · 849 ✓ |
| Product Instant (27:787) | `/cua-hang/instant-oolong` | Sản phẩm → `product.usage-steps` · `sections.faq` · liên quan | 53 · 913 · 496 · 656 · 847 | 53 · 913 · 496 · 654 · 849 ✓ |
| About (18:449) | `/ve-chung-toi` | Về chúng tôi → `page-banner` · `image-band` · `split-story`×3 · `quote-band` · `cta-band` | 380 · 520 · 560×3 · 338 · 342 | 381 · 520 · 560×3 · 338 · 344 ✓ |
| Blog (19:510) | `/blog` | Blog → `page-banner` · `blog.article-listing` · `sections.newsletter` | 380 · (159+540+936) · 386 | 380 · (95+460+1239) · 396 (9 bài so với 7 trong mock) |
| Blog Article (29:907) | `/blog/[slug]` | Bài viết (collection, rich text) + Trang chi tiết bài viết → `sections.newsletter` | 259 · 624 · 1431 · 692 · 340 | 267 · 624 · 1410 · 692 · 350 ✓ |
| Contact (20:645) | `/lien-he` | Liên hệ → `page-banner` · `contact.contact-panel` · `sections.card-grid` | 380 · 706 · 484 | 380 · 729 · 484 ✓ |
| Cart (83:1356) | `/gio-hang` | Giỏ hàng → `page-banner` · `commerce.cart` | 380 · 671 | 380 · 678 ✓ |
| Checkout (50:983) | `/thanh-toan` | Thanh toán → `page-banner` · `commerce.checkout` | 380 · 1038 | 380 · 1033 ✓ |
| Thank You (51:1067) | `/dat-hang-thanh-cong` | Đặt hàng thành công → `commerce.order-success` | 909 | 908 ✓ |
| Order Tracking (58:1131) | `/tra-cuu-don-hang` | Tra cứu đơn hàng → `page-banner` · `commerce.order-lookup` | 380 · 436 · 630 | 380 · 437 · 628 ✓ |
| Search (59:1200) | `/tim-kiem?q=oolong` | Tìm kiếm → `commerce.search-results` | 380 · 1412 | 380 · 2010 (CMS có 5 sản phẩm khớp "oolong", mock 4) |
| 404 (84:1431) | mọi URL sai | Trang 404 → `system.not-found` | 810 | 810 ✓ |
| Header / Footer (7:9, 9:12) | mọi trang | Header & menu, Footer, Thông tin chung, Bộ icon | 81 · 440 | 81 · 439 ✓ |

## Mobile

Câu chữ ngắn của bản mobile nằm trong các trường `mobile*` / `hideOnMobile` của Strapi (xem README → "Nội dung riêng cho mobile"); kiểu chữ, khoảng cách lấy từ `get_design_context` của từng node.

| Frame Figma (id) | Figma | Website | Ghi chú |
| --- | --- | --- | --- |
| Home (21:757) | 680 · 638 · 772 · 623 · 1114 · 1946 · 480 | 680 · 637 · 773 · 620 · 1110 · 1944 · 482 | ✓ (*) |
| Shop (23:848) | 260 · 32+88+24 · thẻ 163×547 | 260 · 32+88+32 · thẻ 163×549 | ✓; CMS có 11 sản phẩm (mock 6) nên lưới dài hơn |
| Product 8g (24:1050) | 468 · 754 · 726 · 731 | 468 · 756 · 723 · 733 | ✓ (không breadcrumb, không bộ chọn số lượng như Figma) |
| Product Instant (28:1413) | 468 · 746 · 596 · 439 · 731 | 468 · 748 · 594 · 438 · 733 | ✓ |
| About (25:1180) | 260 · 300 · 498 · 472 · 472 · 324 · 242 | 263 · 300 · 497 · 471 · 471 · 323 · 244 | ✓ (*) |
| Blog (23:984) | 260 · 209 · thẻ 414/392, cách 32 | 260 · 209 · thẻ 414/392, cách 32 | ✓; CMS có 9 bài (mock 4); không newsletter |
| Blog Article (30:1581) | 228 · 340 · 1503 · 996 | 228 · 340 · 1494 · 996 | ✓ |
| Contact (24:1195) | 260 · 902 · 682 | 260 · 895 · 680 | ✓ |
| Cart (85:2531, 3 sản phẩm) | 260 · 748 | 260 · 689 | Shop bỏ mã giảm giá nên không có ô nhập mã của frame (−61px) |
| Checkout (54:1805, 2 sản phẩm) | 260 · 226 · 424 · 275 · 411 | 260 · 227 · 424 · 210 · 412 | ✓; shop thanh toán thủ công nên chỉ có COD + chuyển khoản QR (bỏ "Thẻ" của frame) |
| Thank You (54:1928) | 829 | 832 | ✓ |
| Order Tracking (60:2117, có kết quả) | 945 | 950 | ✓ |
| Search (60:2221) | 260 · 28/39/28 · thẻ 163×547 | 260 · 28/39/28 · thẻ 163×549 | ✓; CMS có 5 sản phẩm khớp "oolong" (mock 4) |
| 404 (85:2660) | 597 | 599 | ✓ |
| Menu Drawer (45:1640) | — | đối chiếu ảnh chụp | ✓ |
| Footer / Mobile (21:726) | 753 | 753 | ✓ |

(*) Trong Figma, tiêu đề "Hiện đại hoá trải nghiệm thưởng trà" (562px), "Từ truyền thống đến hiện đại" (455px), "Cách chúng tôi chọn lọc" (376px) là một dòng rộng hơn khung 342px nên **bị cắt mất chữ**, và banner About có nội dung 298px trong khung 260px. Để khớp chiều cao Figma mà không cắt chữ, các section này dùng tiêu đề mobile ngắn trong Strapi (`mobileTitle`): "Thưởng trà hiện đại" (309px), "Từ truyền thống" (255px), "Chúng tôi chọn lọc" (297px); banner About: "Wellness" + mô tả mobile 2 dòng. Desktop vẫn hiển thị tiêu đề đầy đủ. Xoá các trường `mobileTitle` này trong Strapi thì mobile quay về tiêu đề đầy đủ (xuống dòng).

Các chênh lệch 1–4px còn lại là do làm tròn line-height (ví dụ tiêu đề 2 dòng 22px × 1.26 = 55.4px, Figma làm tròn 56px); vị trí từng phần tử (eyebrow, H2, mô tả, ảnh 200px, thẻ) trùng toạ độ Figma.

## Chức năng đã chạy thử

- Thêm giỏ (toast "Đã thêm vào giỏ hàng") → thanh toán COD / chuyển khoản → trang cảm ơn → tra cứu đơn.
- Chuyển khoản: trang cảm ơn + email hiển thị QR upload trong Cài đặt cửa hàng và ghi chú có mã đơn; đơn tạo ra ở `pending` / `unpaid` chờ admin xác nhận. Mã phương thức không có trong Trang thanh toán (vd. `card`) bị API từ chối.
- Email: gửi qua SMTP thật (Ethereal) nhận `250 Accepted`; mẫu email lấy từ Cài đặt cửa hàng.
- Webhook Strapi → `/api/revalidate` làm mới cache ngay khi Publish.
- `next build`: 43 route, lint + typecheck sạch.

## Số đo thô lần cuối (15/10/2026, sau lần seed cuối — chiều cao từng section con của `<main>` + footer)

Giỏ hàng đo với 3 sản phẩm, thanh toán với 2 sản phẩm, tra cứu với kết quả đơn `TWT-2026-0001` — đúng trạng thái trong frame Figma.

```text
1440px /                          hero 800 · split 700 · philosophy 583 · split 620 · process 885 · featured 1167 · cta 483 | footer 439
1440px /cua-hang                  banner 380 · shop-grid 2013 (11 sản phẩm) | footer 439
1440px /cua-hang/gaba-tea         header 81 · breadcrumb 53 · pdp 917 · brew-guides 487 · related 849 | footer 439
1440px /cua-hang/instant-oolong   header 81 · breadcrumb 53 · pdp 913 · usage 496 · faq 654 · related 849 | footer 439
1440px /ve-chung-toi              banner 381 · image 520 · split 560 · 560 · 560 · quote 338 · cta 344 | footer 439
1440px /blog                      banner 380 · listing 2058 (9 bài) · newsletter 396 | footer 439
1440px /blog/mae-salong-…         header 81 · head 267 · cover 544 · body 1410 · related 692 · newsletter 350 | footer 439
1440px /lien-he                   banner 380 · contact 729 · card-grid 484 | footer 439
1440px /gio-hang (3 sp)           banner 380 · 678 | footer 439
1440px /thanh-toan (2 sp)         banner 380 · 1033 | footer 439
1440px /dat-hang-thanh-cong       header 81 · 908 | footer 439
1440px /tra-cuu-don-hang (kết quả) banner 380 · 1065 | footer 439
1440px /tim-kiem?q=oolong         banner 380 · 2010 (5 sản phẩm) | footer 439
1440px 404                        header 81 · 810 | footer 439

390px  /                          hero 680 · split 637 · philosophy 773 · split 620 · process 1110 · featured 1944 · cta 482 | footer 753
390px  /cua-hang                  banner 260 · shop-grid 3683 (11 sản phẩm) | footer 753
390px  /cua-hang/gaba-tea         header 74 · pdp 1224 (468 + 756) · brew-guides 723 · related 733 | footer 753
390px  /cua-hang/instant-oolong   header 74 · pdp 1216 (468 + 748) · usage 594 · faq 438 · related 733 | footer 753
390px  /ve-chung-toi              banner 263 · image 300 · split 497 · 471 · 471 · quote 323 · cta 244 | footer 753
390px  /blog                      banner 260 · listing 4120 (9 bài) | footer 753
390px  /blog/mae-salong-…         header 74 · head 228 · cover 300 (+40) · body 1494 · related 996 | footer 753
390px  /lien-he                   banner 260 · contact 895 · card-grid 680 | footer 753
390px  /gio-hang (3 sp)           banner 260 · 689 (không ô mã giảm giá) | footer 753
390px  /thanh-toan (2 sp)         banner 260 · 227 · 424 · 210 · summary 412 | footer 753
390px  /dat-hang-thanh-cong       header 74 · 832 | footer 753
390px  /tra-cuu-don-hang (kết quả) banner 260 · 950 | footer 753
390px  /tim-kiem?q=oolong         banner 267 · chips y28 · heading y95 · rows y151/y727 · cards 392 | footer 753
390px  404                        header 74 · 599 | footer 753
```
