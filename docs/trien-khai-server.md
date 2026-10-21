# Triển khai TOP WELL TEA trên server

| | |
| --- | --- |
| Website | https://topwelltea.com (www tự chuyển về tên miền chính) |
| CMS (Strapi Admin) | https://admin.topwelltea.com/admin |
| Server | 103.77.160.166 · AlmaLinux 9 · Node 22 · dùng chung với topwell.co |
| Repo | `devtuanphu/toptea-backend` (CMS) · `devtuanphu/toptea-frontend` (website) |

## Thư mục và dịch vụ

| Thành phần | Thư mục | Service (systemd) | Cổng nội bộ | Log |
| --- | --- | --- | --- | --- |
| CMS (Strapi) | `/opt/topwelltea/cms` | `topwelltea-cms` | 127.0.0.1:1340 | `/var/log/topwelltea-cms.log` |
| Website (Next.js) | `/opt/topwelltea/web` | `topwelltea-web` | 127.0.0.1:3010 | `/var/log/topwelltea-web.log` |

- Nginx: `/etc/nginx/conf.d/topwelltea.conf` (HTTPS, http → https, www → tên miền chính, CMS cho upload tới 200 MB).
- SSL: Let's Encrypt (`topwelltea.com` + `www`, `admin.topwelltea.com`), tự gia hạn bằng `certbot-renew.timer`, hook reload Nginx có sẵn.
- Dữ liệu: SQLite `/opt/topwelltea/cms/.tmp/data.db`, ảnh `/opt/topwelltea/cms/public/uploads/`. **Sao lưu cả hai** trước khi cập nhật lớn.
- Biến môi trường (không nằm trong Git): `/opt/topwelltea/cms/.env` và `/opt/topwelltea/web/.env.local`. `SHOP_API_SECRET` và `REVALIDATE_SECRET` phải giống nhau ở hai file.

## Cập nhật khi có code mới

Push code lên GitHub, rồi trên server:

```bash
/opt/topwelltea/deploy.sh          # cả CMS và website
/opt/topwelltea/deploy.sh cms      # chỉ CMS
/opt/topwelltea/deploy.sh web      # chỉ website
```

Script làm: `git pull` → `npm ci` → build → restart service → kiểm tra service đã chạy. Website build cần CMS đang chạy (lấy nội dung lúc build), nên khi cập nhật cả hai, CMS luôn được deploy trước.

## Lệnh thường dùng

```bash
systemctl status topwelltea-cms topwelltea-web
systemctl restart topwelltea-cms        # sau khi sửa /opt/topwelltea/cms/.env
systemctl restart topwelltea-web        # sau khi sửa /opt/topwelltea/web/.env.local
tail -f /var/log/topwelltea-cms.log
nginx -t && systemctl reload nginx      # sau khi sửa cấu hình Nginx
```

Sao lưu nhanh:

```bash
cd /opt/topwelltea/cms
sqlite3 .tmp/data.db ".backup '/opt/topwelltea/backup-$(date +%F).db'"
tar czf /opt/topwelltea/uploads-$(date +%F).tgz public/uploads
```

## Gửi email thật (SMTP)

Điền vào `/opt/topwelltea/cms/.env` rồi `systemctl restart topwelltea-cms`:

```env
SMTP_HOST=...
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USERNAME=...
SMTP_PASSWORD=...
EMAIL_FROM=no-reply@topwelltea.com
EMAIL_REPLY_TO=...
```

Khi chưa có SMTP, đơn hàng và lời nhắn vẫn được lưu bình thường, chỉ không gửi email.

## Lần đầu dùng CMS

Dữ liệu được seed từ thiết kế (`SEED_DATA=true`): nội dung, ảnh, sản phẩm, bài viết; không có đơn hàng hay tài khoản mẫu. Mở https://admin.topwelltea.com/admin để **tạo tài khoản quản trị đầu tiên**, sau đó upload ảnh QR thanh toán trong **Cài đặt cửa hàng** và rà soát hotline, email, địa chỉ trong **Thông tin chung**. Hướng dẫn sử dụng: `docs/Huong-dan-quan-tri-noi-dung-TOP-WELL-TEA.pdf`.
