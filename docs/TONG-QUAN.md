# TOP WELL TEA — Next.js 16 + Strapi 5

Website thương mại TOP WELL TEA dựng từ Figma (Desktop `node 0:1`, Mobile `node 1:2`). Toàn bộ chữ, hình ảnh và icon được quản lý trong Strapi; frontend chỉ hiển thị.

| Ứng dụng | Thư mục | Địa chỉ dev |
| --- | --- | --- |
| Website (Next.js 16.4, React 19, App Router, Cache Components) | `frontend/` | http://localhost:3010 |
| CMS (Strapi 5.58, SQLite mặc định) | `backend/` | http://localhost:1340/admin |

Cổng 1340/3010 được dùng để không đụng các dự án khác đang chạy ở 1337/3000.

## Chạy trên máy

```bash
npm run setup      # cài dependencies cho cả hai app
npm run dev        # chạy Strapi + Next.js cùng lúc
```

1. Lần đầu Strapi khởi động với `SEED_DATA=true`: tự tạo toàn bộ nội dung mẫu và upload ảnh/icon từ `backend/seed-assets/` vào Media Library. Các lần sau **không ghi đè** nội dung đã sửa.
2. Mở http://localhost:1340/admin, tạo tài khoản quản trị (giao diện admin tiếng Việt).
3. Mở http://localhost:3010.

Biến môi trường: xem `backend/.env.example` và `frontend/.env.example`. Hai giá trị phải khớp nhau giữa hai app:

- `SHOP_API_SECRET` — Next.js dùng để gọi API đặt hàng/liên hệ của Strapi (trình duyệt không bao giờ thấy).
- `REVALIDATE_SECRET` — Strapi webhook gọi `POST /api/revalidate` để website cập nhật ngay khi Publish.

Build production cần Strapi đang chạy (Next.js prerender trang từ CMS):

```bash
npm run build
npm run start:cms   # NODE_ENV=production
npm run start:web
```

## Hướng dẫn sử dụng CMS

Tài liệu cho người quản trị nội dung (có ảnh chụp từng bước): **[docs/Huong-dan-quan-tri-noi-dung-TOP-WELL-TEA.pdf](docs/Huong-dan-quan-tri-noi-dung-TOP-WELL-TEA.pdf)** — đăng nhập, sửa trang và khối nội dung, thay ảnh, nội dung riêng cho điện thoại, sản phẩm, bài viết, menu/footer, cài đặt cửa hàng & QR, xử lý đơn hàng, lời nhắn liên hệ. Nguồn và cách xuất lại: [docs/huong-dan-src/README.md](docs/huong-dan-src/README.md).

Admin hiển thị nhãn và gợi ý tiếng Việt cho mọi trường (`backend/src/admin-labels.ts`, áp dụng khi Strapi khởi động qua `backend/src/localize-admin.ts`); chỉ đổi phần hiển thị, không đổi API.

## Cấu trúc Strapi

Quy ước: **1 trang = 1 Single Type**, mỗi section trong trang là **1 component** trong Dynamic Zone `sections`; component dùng chung nằm ở nhóm `sections`/`shared`, component riêng từng trang nằm ở nhóm của trang đó; nội dung dạng danh sách là **Collection Type**.

### Single Types — trang

| Single Type | Route | Section riêng của trang |
| --- | --- | --- |
| Trang chủ (`home-page`) | `/` | `home.hero-slider`, `home.philosophy`, `home.process`, `home.featured-products` |
| Về chúng tôi (`about-page`) | `/ve-chung-toi` | — (dùng section chung) |
| Cửa hàng (`shop-page`) | `/cua-hang` | `shop.product-grid` (chip lọc do CMS định nghĩa) |
| Blog (`blog-page`) | `/blog` | `blog.article-listing` |
| Liên hệ (`contact-page`) | `/lien-he` | `contact.contact-panel` |
| Giỏ hàng (`cart-page`) | `/gio-hang` | `commerce.cart` |
| Thanh toán (`checkout-page`) | `/thanh-toan` | `commerce.checkout` (phương thức thanh toán) |
| Đặt hàng thành công (`thank-you-page`) | `/dat-hang-thanh-cong` | `commerce.order-success` |
| Tra cứu đơn hàng (`order-tracking-page`) | `/tra-cuu-don-hang` | `commerce.order-lookup` |
| Tìm kiếm (`search-page`) | `/tim-kiem?q=` | `commerce.search-results` |
| Trang 404 (`not-found-page`) | mọi URL không tồn tại | `system.not-found` |
| Trang chi tiết sản phẩm (chung) | `/cua-hang/[slug]` | nhãn nút, breadcrumb, tiêu đề "Sản phẩm liên quan" |
| Trang chi tiết bài viết (chung) | `/blog/[slug]` | tiêu đề "Bài viết liên quan", newsletter cuối bài |

Mọi trang đều có `seo` (meta title, description, keywords, canonical, noIndex, ảnh chia sẻ) và đều có thể thêm các **section dùng chung**: `page-banner`, `split-story` (ảnh + chữ, chọn nền kem/trắng/navy, ảnh trái/phải), `image-band`, `quote-band`, `cta-band`, `newsletter`, `card-grid`, `faq`. Kéo-thả để đổi thứ tự section.

### Single Types — toàn site

- **Thông tin chung** (`global`): logo, tên, slogan, hotline, email, địa chỉ, mạng xã hội (icon + link), favicon, SEO mặc định.
- **Header & menu** (`header`): menu trái/phải, menu mobile, nút "MUA TRÀ NGAY", nhãn trợ năng.
- **Footer** (`footer`): mô tả, các cột liên kết, dòng bản quyền (`{year}` = năm hiện tại).
- **Bộ icon** (`icon-set`): 22 icon giao diện (menu, tìm kiếm, giỏ, mũi tên, +/−, ...). Upload SVG mới để thay; icon tự đổi màu theo nền.
- **Cài đặt cửa hàng** (`site-settings`): đơn vị tiền, phí ship, ngưỡng miễn phí ship, tiền tố mã đơn, các nhãn giao diện/trợ năng, **mẫu email** (tiêu đề/nội dung, biến `{code}`, `{name}`, `{items}`, `{total}`, `{payment}`, `{paymentNote}`, `{trackingUrl}`...) và **chuyển khoản**: ảnh **QR thanh toán** (`bankQr`), tiêu đề và ghi chú (biến `{code}` = mã đơn).

### Collection Types

- **Sản phẩm**: tên, slug, SKU, giá, còn hàng, danh mục, cách pha, mô tả ngắn, ảnh (nhiều ảnh, có alt), thông điệp chính, thông số, các section chi tiết (`product.brew-guides`, `product.usage-steps`, `sections.faq`, ...), các trường cho thẻ "Sản phẩm nổi bật" (subtitle, dung tích, badge, ghi chú), SEO, thứ tự.
- **Danh mục sản phẩm**, **Cách pha** (Pha nóng / Ủ lạnh / Pha ngay, có icon).
- **Bài viết**: tiêu đề, slug, chuyên mục, tóm tắt, ảnh bìa, tác giả, ngày đăng, thời gian đọc, nội dung rich text (tiêu đề, trích dẫn, ảnh, danh sách), thẻ, bài nổi bật, SEO.
- **Chuyên mục bài viết**.
- **Đơn hàng** (tạo từ website; cập nhật trạng thái + lịch sử trạng thái + đơn vị giao + ngày dự kiến để khách tra cứu), **Lời nhắn liên hệ**, **Người đăng ký nhận tin**.

### Nội dung riêng cho mobile

Figma mobile dùng câu chữ ngắn hơn và ẩn bớt vài mục. Các component có thêm trường tuỳ chọn để biên tập viên chỉnh riêng cho màn hình ≤ 767px — để trống thì mobile dùng nội dung desktop:

- `mobileTitle`, `mobileDescription`, `mobileBody`, `mobileQuote`, `mobileStatement`, `mobileEyebrow`, `mobileLabel`, `mobileValue`, `mobileAnswer`, `mobilePlaceholder`, `mobileSeeAllLabel`, `mobileTitleTemplate`... (banner, slide, câu chuyện, triết lý, quy trình, thông số, FAQ, form, footer, thanh toán, trang cảm ơn, tra cứu, tìm kiếm, 404).
- Sản phẩm: `mobileShortDescription`, `mobileCardNote`; Bài viết: `mobileExcerpt`.
- Ẩn trên mobile: `hideOnMobile` (link footer, dòng thông số, câu hỏi FAQ, trường form), `hideDescriptionOnMobile` (banner, phương thức thanh toán); FAQ có `closeOnMobile` (mở trên desktop, đóng trên mobile).

Nội dung mới cần **Publish**. Website cập nhật ngay nhờ webhook "Next.js — làm mới nội dung website" (Settings → Webhooks); nếu webhook tắt, cache tự làm mới sau ~1 phút.

## Frontend

```text
frontend/app/                    route (tên tiếng Việt), metadata, sitemap.ts, robots.ts, api/*
frontend/components/sections/    component React cho từng section Strapi + SectionRenderer
frontend/components/commerce/    giỏ hàng, thanh toán, tra cứu đơn (client components)
frontend/components/layout/      header, menu mobile, footer
frontend/lib/cms.ts              đọc Strapi với 'use cache' + cacheTag
frontend/lib/seo.ts              metadata, Open Graph, JSON-LD
frontend/app/styles/             CSS theo design system Figma (desktop / tablet / mobile)
```

### SEO

- SSR/prerender toàn bộ nội dung (42 route static), sản phẩm/bài viết prerender qua `generateStaticParams`.
- Title/description/keywords/canonical/robots/Open Graph/Twitter lấy từ trường `seo` của từng trang/sản phẩm/bài viết, fallback về SEO mặc định.
- JSON-LD: Organization, WebSite + SearchAction, Product + Offer, BlogPosting, BreadcrumbList, ItemList, FAQPage.
- `sitemap.xml`, `robots.txt` (chặn giỏ hàng/thanh toán/tìm kiếm), `lang="vi"`, mỗi trang một H1, alt cho mọi ảnh, `next/image` (AVIF/WebP), font tối ưu qua `next/font`, skip link, focus bàn phím, hỗ trợ reduced motion.

### Mua hàng

Giỏ hàng lưu trên trình duyệt. Thanh toán **thủ công**, không qua cổng thanh toán tự động: COD hoặc chuyển khoản. Danh sách phương thức sửa trong Trang thanh toán; API chỉ nhận mã phương thức đang có trong danh sách này.

- **Chuyển khoản:** upload ảnh QR thanh toán của shop tại **Cài đặt cửa hàng → bankQr**. Trang cảm ơn và email xác nhận hiển thị QR đó cùng ghi chú (nội dung chuyển khoản = mã đơn). Chưa upload QR thì chỉ hiện ghi chú.
- **Xác nhận đơn:** đơn mới có trạng thái `pending`, thanh toán `unpaid`. Khi nhận được tiền, admin mở đơn trong **Đơn hàng**, đổi *Trạng thái thanh toán* → `paid` (có thể ghi mã giao dịch vào *paymentRef*), *Trạng thái* → `confirmed` và thêm dòng vào lịch sử để khách thấy khi tra cứu.

Email: khi đặt hàng, khách nhận email xác nhận và hộp thư cửa hàng (`Thông tin chung → email`) nhận thông báo; lời nhắn liên hệ cũng được báo về hộp thư cửa hàng. Cấu hình `SMTP_*` trong `backend/.env`; nếu chưa có SMTP và `EMAIL_PREVIEW=true`, nội dung email được ghi ra log Strapi (dev). Lỗi gửi email không làm hỏng đơn hàng.

 Giá và phí ship luôn được Strapi **tính lại phía server** (`POST /api/shop/quote`, `/api/shop/orders`). API Next.js kiểm tra Origin, honeypot và giới hạn tần suất; Strapi chỉ nhận request có `SHOP_API_SECRET`. Tra cứu đơn cần mã đơn **và** email/SĐT khớp.

Dữ liệu demo: đơn `TWT-2026-0001` + `email@example.com` để thử trang tra cứu.

## Lưu ý trước khi chạy thật

- Hotline, email, địa chỉ, link mạng xã hội, giá và mô tả là **dữ liệu mẫu từ Figma** — cần rà soát trong CMS.
- Upload ảnh QR thanh toán thật trong Cài đặt cửa hàng (không có QR mẫu, để tránh khách chuyển nhầm).
- Tài khoản Admin `guide-admin@example.com` chỉ dùng để chụp ảnh hướng dẫn trên máy local (mật khẩu trong `backend/.env`): tạo tài khoản quản trị thật rồi xoá tài khoản này ở **Cài đặt → Người dùng**.
- Đặt `SMTP_HOST`/`SMTP_USERNAME`/`SMTP_PASSWORD` để gửi email thật.
- Rate limit lưu trong bộ nhớ của từng instance; khi chạy nhiều instance nên chuyển sang Redis hoặc giới hạn ở reverse proxy.
- Production: dùng Postgres/MySQL (`DATABASE_CLIENT`), đặt `STRAPI_URL`, `NEXT_PUBLIC_SITE_URL`, `FRONTEND_URL`, `CORS_ORIGINS` theo domain thật. `/uploads/*` được Next.js proxy sang Strapi nên ảnh/icon dùng chung domain website.
- Reset dữ liệu dev: dừng Strapi, xoá `backend/.tmp/data.db` và `backend/public/uploads/*`, khởi động lại với `SEED_DATA=true`.

## Đối chiếu thiết kế

Bảng đối chiếu từng frame Figma (desktop + mobile) với route, Single Type/components và số đo thực tế: [docs/figma-verification.md](docs/figma-verification.md).
