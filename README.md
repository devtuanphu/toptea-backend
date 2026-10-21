# TOP WELL TEA — CMS (Strapi 5)

Xem hướng dẫn đầy đủ ở [README gốc](../README.md).

```bash
cp .env.example .env   # tạo secret riêng cho APP_KEYS, JWT..., SHOP_API_SECRET, REVALIDATE_SECRET
npm run develop        # http://localhost:1340/admin
```

- Schema: `src/api/*` (single & collection types), `src/components/*` (sections & shared).
- API website: `src/api/site` (đọc, công khai) và `src/api/shop` (đặt hàng/liên hệ, cần `SHOP_API_SECRET`).
- Dữ liệu mẫu: `src/seed/data.ts` + ảnh/icon trong `seed-assets/`, nạp khi `SEED_DATA=true`.
