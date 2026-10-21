/**
 * Sample content for TOP WELL TEA, taken from the Figma design.
 *
 * Markers resolved by the importer (src/seed/index.ts):
 *   img(path, alt)  -> shared.image component { media, alt } (file uploaded to the Media Library)
 *   file(path)      -> media id for a plain media field
 *   product(slug)   -> product documentId (relation)
 *   blockImage(...) -> rich-text image block
 * Paths are relative to backend/seed-assets.
 */

export const img = (path: string, alt: string) => ({ $image: path, alt });
export const file = (path: string) => ({ $file: path });
export const product = (slug: string) => ({ $product: slug });

// ---------- rich text (Strapi blocks) helpers ----------
const t = (text: string) => ({ type: 'text', text });
const p = (text: string) => ({ type: 'paragraph', children: [t(text)] });
const h = (text: string, level = 2) => ({ type: 'heading', level, children: [t(text)] });
const quote = (text: string) => ({ type: 'quote', children: [t(text)] });
const ul = (...items: string[]) => ({
  type: 'list',
  format: 'unordered',
  children: items.map((item) => ({ type: 'list-item', children: [t(item)] })),
});
const blockImage = (path: string, alt: string) => ({ $blockImage: path, alt });

const IMG = {
  leavesDark: 'images/tea-leaves-dark.jpg',
  hills: 'images/mae-salong-hills.jpg',
  cozy: 'images/tea-moment-cozy.jpg',
  bud: 'images/tea-bud-dew.jpg',
  cup: 'images/tea-cup-table.jpg',
  sachet: 'images/sachet-8g.jpg',
  gift: 'images/gift-set.jpg',
  bottle: 'images/instant-bottle.jpg',
  iced: 'images/iced-tea.jpg',
};
const ALT = {
  leavesDark: 'Lá trà khô Mae Salong trên khay gốm tối màu',
  hills: 'Đồi trà Mae Salong trong sương sớm với người hái trà',
  cozy: 'Đôi tay ôm tách trà ấm trong không gian thư thái',
  bud: 'Búp trà non đọng sương trên cành',
  cup: 'Tách trà nóng trên bàn gỗ',
  sachet: 'Gói trà 8g TOP WELL TEA',
  gift: 'Hộp quà trà thủ công nhiều hương vị',
  bottle: 'Chai nước với nắp pha trà tức thì đang giải phóng bột trà',
  iced: 'Ly trà ủ lạnh với đá và lá bạc hà',
};
const photo = (key: keyof typeof IMG, alt?: string) => img(IMG[key], alt || ALT[key]);

const ICON = (name: string) => file(`icons/${name}.svg`);

const seo = (metaTitle: string, metaDescription: string, keywords: string, share?: keyof typeof IMG) => ({
  metaTitle,
  metaDescription,
  keywords,
  noIndex: false,
  ...(share ? { shareImage: file(IMG[share]) } : {}),
});

// ---------- taxonomy ----------
export const productCategories = [
  { name: 'Gói trà 8g', label: 'GÓI TRÀ 8G', slug: 'goi-tra-8g', order: 1 },
  { name: 'Nắp pha trà tức thì', label: 'NẮP PHA TRÀ', slug: 'nap-pha-tra', order: 2 },
  { name: 'Combo / Set trải nghiệm', label: 'COMBO', slug: 'combo', order: 3 },
  { name: 'Danh trà đặc tuyển', label: 'DANH TRÀ', slug: 'danh-tra', order: 4 },
];

export const brewMethods = [
  { name: 'Pha nóng', label: 'PHA NÓNG', slug: 'pha-nong', icon: ICON('flame'), order: 1 },
  { name: 'Ủ lạnh', label: 'Ủ LẠNH', slug: 'u-lanh', icon: ICON('droplet'), order: 2 },
  { name: 'Pha ngay', label: 'PHA NGAY', slug: 'pha-ngay', icon: ICON('bottle'), order: 3 },
];

export const articleCategories = [
  { name: 'Câu chuyện trà', label: 'CÂU CHUYỆN TRÀ', slug: 'cau-chuyen-tra', order: 1 },
  { name: 'Kiến thức', label: 'KIẾN THỨC', slug: 'kien-thuc', order: 2 },
  { name: 'GABA Tea', label: 'GABA TEA', slug: 'gaba-tea', order: 3 },
  { name: 'Hot Brew', label: 'HOT BREW', slug: 'hot-brew', order: 4 },
  { name: 'Cold Brew', label: 'COLD BREW', slug: 'cold-brew', order: 5 },
  { name: 'Instant Tea', label: 'INSTANT TEA', slug: 'instant-tea', order: 6 },
];

// ---------- product detail sections ----------
const brewGuides = {
  __component: 'product.brew-guides',
  title: 'Hướng dẫn thưởng trà',
  guides: [
    {
      icon: ICON('flame'),
      title: 'Pha nóng',
      description: 'Dùng 90–95°C, 200ml nước. Ủ 2–3 phút. Có thể pha lại 2–3 lần, tăng dần thời gian.',
      mobileDescription: '90–95°C, 200ml nước, ủ 2–3 phút. Pha lại 2–3 lần.',
    },
    {
      icon: ICON('droplet'),
      title: 'Ủ lạnh',
      description: '1 gói với 300ml nước lạnh. Ủ trong tủ mát 4–6 giờ. Thưởng thức cùng đá.',
      mobileDescription: '1 gói + 300ml nước lạnh, ủ tủ mát 4–6 giờ.',
    },
    {
      icon: ICON('leaf'),
      title: 'Bảo quản',
      description: 'Nơi khô ráo, tránh ánh nắng trực tiếp và mùi mạnh. Đóng kín sau khi mở.',
      mobileDescription: 'Nơi khô ráo, tránh nắng & mùi mạnh, đóng kín sau khi mở.',
    },
  ],
};

const usageSteps = {
  __component: 'product.usage-steps',
  eyebrow: 'CÁCH SỬ DỤNG',
  title: 'Pha trà trong 4 bước',
  steps: [
    { number: '01', title: 'Vặn', description: 'Vặn nắp để kích hoạt khoang chứa bột trà.' },
    { number: '02', title: 'Giải phóng', description: 'Bột trà giải phóng xuống nước trong chai.' },
    { number: '03', title: 'Lắc', description: 'Lắc đều 5–10 giây cho trà hòa quyện.' },
    { number: '04', title: 'Thưởng thức', description: 'Mở nắp và thưởng thức ngay khi còn tươi.' },
  ],
};

const instantFaq = {
  __component: 'sections.faq',
  title: 'Câu hỏi thường gặp',
  items: [
    {
      question: 'Có cần pha với nước nóng không?',
      answer: 'Không. Nắp pha trà tức thì dùng được với cả nước lạnh và nước thường, tiện lợi mọi lúc.',
      mobileAnswer: 'Không. Dùng được với cả nước lạnh và nước thường, tiện lợi mọi lúc.',
      openByDefault: true,
    },
    {
      question: 'Dùng được mấy lần cho một nắp?',
      answer: 'Mỗi nắp dùng cho một lần pha, đảm bảo hương vị tươi mới nhất.',
      openByDefault: true,
      closeOnMobile: true,
    },
    {
      question: 'Bảo quản như thế nào?',
      hideOnMobile: true,
      answer: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Dùng ngay sau khi mở nắp để giữ trọn hương vị.',
    },
    {
      question: 'Có chứa đường hay phụ gia không?',
      answer: 'Không. Bột trà được cô đặc từ 100% lá trà, không đường, không chất bảo quản và không hương liệu nhân tạo.',
    },
  ],
};

const sachetKeyMessage = {
  title: 'One sachet. Two rituals.',
  items: [
    { icon: ICON('flame'), label: 'HOT BREW' },
    { icon: ICON('droplet'), label: 'COLD BREW' },
  ],
};

const sachetSpecs = (tea: string, aroma: string, taste: string, finish: string, mobile: { aroma?: string; finish?: string } = {}) => [
  { label: 'QUY CÁCH', value: 'Hộp 15 gói × 8g' },
  { label: 'THÀNH PHẦN', value: `100% lá trà ${tea} Mae Salong`, hideOnMobile: true },
  { label: 'HƯƠNG', value: aroma, mobileValue: mobile.aroma },
  { label: 'VỊ', value: taste },
  { label: 'HẬU VỊ', value: finish, mobileValue: mobile.finish },
  { label: 'NGUỒN TRÀ', value: 'Mae Salong, Chiang Rai', mobileLabel: 'NGUỒN', mobileValue: 'Mae Salong' },
];

const instantSpecs = (tea: string, flavor: string, mobileFlavor?: string) => [
  { label: 'THÀNH PHẦN', value: `Bột trà ${tea} cô đặc 100%`, mobileValue: `Bột ${tea} 100%` },
  { label: 'HƯƠNG VỊ', value: flavor, mobileValue: mobileFlavor },
  { label: 'CÁCH SỬ DỤNG', value: 'Vặn · Giải phóng · Lắc · Uống', hideOnMobile: true },
  { label: 'DUNG TÍCH NƯỚC', value: '330–500ml', mobileLabel: 'DUNG TÍCH' },
  { label: 'BẢO QUẢN', value: 'Nơi khô ráo, dùng ngay khi mở', mobileValue: 'Khô ráo, dùng ngay' },
];

const productSeo = (name: string, description: string, share: keyof typeof IMG) =>
  seo(`${name} | TOP WELL TEA`, description, `${name}, trà Mae Salong, TOP WELL TEA`, share);

// ---------- products ----------
export const products = [
  {
    name: 'GABA Tea',
    slug: 'gaba-tea',
    sku: 'TWT-8G-GABA',
    category: 'goi-tra-8g',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 145000,
    shortDescription:
      'Trà GABA giàu axit amin tự nhiên, hương thơm dịu và hậu vị ngọt sâu. Một gói — hai cách thưởng thức.',
    images: [photo('sachet', 'Gói trà GABA 8g'), photo('bud'), photo('cup'), photo('iced'), photo('leavesDark')],
    keyMessage: sachetKeyMessage,
    specs: sachetSpecs('GABA', 'Dịu, thảo mộc nhẹ', 'Mềm, cân bằng', 'Ngọt sâu, kéo dài', { aroma: 'Dịu, thảo mộc', finish: 'Ngọt sâu' }),
    sections: [brewGuides],
    order: 1,
    seo: productSeo(
      'GABA Tea gói 8g',
      'Trà GABA Mae Salong gói 8g giàu axit amin tự nhiên — pha nóng hoặc ủ lạnh, hậu vị ngọt sâu.',
      'sachet',
    ),
  },
  {
    name: 'Oolong Tea',
    slug: 'oolong-tea',
    sku: 'TWT-8G-OOLONG',
    category: 'goi-tra-8g',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 135000,
    shortDescription:
      'Oolong Mae Salong rang nhẹ, hương hoa cỏ thanh mát và hậu vị ngọt dịu. Một gói — hai cách thưởng thức.',
    images: [photo('bud', 'Búp trà Oolong đọng sương'), photo('sachet'), photo('cup'), photo('iced')],
    keyMessage: sachetKeyMessage,
    specs: sachetSpecs('Oolong', 'Hoa cỏ, rang nhẹ', 'Thanh, tròn vị', 'Ngọt dịu'),
    sections: [brewGuides],
    order: 2,
    seo: productSeo('Oolong Tea gói 8g', 'Trà Oolong Mae Salong gói 8g — hương hoa cỏ, pha nóng hoặc ủ lạnh.', 'bud'),
  },
  {
    name: 'Oriental Beauty',
    slug: 'oriental-beauty',
    sku: 'TWT-8G-OB',
    category: 'goi-tra-8g',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 165000,
    shortDescription:
      'Oolong lên men cao với nốt mật ong và trái chín đặc trưng, sắc nước hổ phách. Một gói — hai cách thưởng thức.',
    images: [photo('bud', 'Búp trà Oriental Beauty'), photo('sachet'), photo('cup'), photo('leavesDark')],
    keyMessage: sachetKeyMessage,
    specs: sachetSpecs('Oriental Beauty', 'Mật ong, trái chín', 'Đậm đà, mượt', 'Ngọt mật kéo dài'),
    sections: [brewGuides],
    order: 3,
    seo: productSeo('Oriental Beauty gói 8g', 'Trà Oriental Beauty gói 8g — nốt mật ong, sắc nước hổ phách.', 'bud'),
  },
  {
    name: 'Jin Xuan Milk',
    slug: 'jin-xuan-milk',
    sku: 'TWT-8G-JX',
    category: 'goi-tra-8g',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 155000,
    shortDescription:
      'Oolong Jin Xuan với hương sữa tự nhiên, vị béo nhẹ và mượt mà. Một gói — hai cách thưởng thức.',
    images: [photo('sachet', 'Gói trà Jin Xuan Milk 8g'), photo('cup'), photo('bud'), photo('iced')],
    keyMessage: sachetKeyMessage,
    specs: sachetSpecs('Jin Xuan', 'Sữa tự nhiên, hoa nhài nhẹ', 'Béo nhẹ, mượt', 'Ngọt thanh'),
    sections: [brewGuides],
    order: 4,
    seo: productSeo('Jin Xuan Milk gói 8g', 'Trà Jin Xuan Milk Oolong gói 8g — hương sữa tự nhiên, vị mượt mà.', 'sachet'),
  },
  {
    name: 'Instant · Oolong',
    slug: 'instant-oolong',
    sku: 'TWT-CAP-OOLONG',
    category: 'nap-pha-tra',
    brewMethods: ['pha-nong', 'u-lanh', 'pha-ngay'],
    price: 189000,
    shortDescription:
      'Bột trà oolong cô đặc nằm trong nắp. Vặn để giải phóng, lắc đều và thưởng thức — một ly trà tươi chỉ trong vài giây.',
    mobileShortDescription: 'Bột trà oolong cô đặc trong nắp. Vặn để giải phóng, lắc đều — ly trà tươi chỉ trong vài giây.',
    images: [
      photo('bottle', 'Nắp pha trà tức thì Instant Oolong'),
      photo('cozy'),
      photo('hills'),
      photo('bud'),
      photo('cup'),
    ],
    keyMessage: { title: 'Brew in seconds.', items: [], note: 'TWIST · RELEASE · SHAKE · DRINK' },
    highlight: { icon: ICON('droplet'), label: 'Dung tích nước khuyến nghị: 330–500ml', mobileLabel: 'Dung tích nước: 330–500ml' },
    specs: instantSpecs('oolong', 'Oolong rang nhẹ, hậu ngọt', 'Rang nhẹ, hậu ngọt'),
    sections: [usageSteps, instantFaq],
    order: 5,
    seo: productSeo(
      'Nắp pha trà Instant Oolong',
      'Nắp pha trà tức thì Instant Oolong — vặn, giải phóng, lắc và thưởng thức trà tươi trong vài giây.',
      'bottle',
    ),
  },
  {
    name: 'Instant · GABA',
    slug: 'instant-gaba',
    sku: 'TWT-CAP-GABA',
    category: 'nap-pha-tra',
    brewMethods: ['pha-nong', 'u-lanh', 'pha-ngay'],
    price: 199000,
    shortDescription:
      'Bột trà GABA cô đặc trong nắp pha tức thì — giàu axit amin tự nhiên, sẵn sàng cho ngày bận rộn.',
    images: [photo('bottle', 'Nắp pha trà tức thì Instant GABA'), photo('bud'), photo('cozy'), photo('hills')],
    keyMessage: { title: 'Brew in seconds.', items: [], note: 'TWIST · RELEASE · SHAKE · DRINK' },
    highlight: { icon: ICON('droplet'), label: 'Dung tích nước khuyến nghị: 330–500ml' },
    specs: instantSpecs('GABA', 'Thảo mộc dịu, hậu ngọt sâu'),
    sections: [usageSteps, instantFaq],
    order: 6,
    seo: productSeo('Nắp pha trà Instant GABA', 'Nắp pha trà tức thì Instant GABA — trà GABA tươi chỉ trong vài giây.', 'bottle'),
  },
  {
    name: 'Discovery Set',
    slug: 'discovery-set',
    sku: 'TWT-SET-DISCOVERY',
    category: 'combo',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 420000,
    shortDescription:
      'Bộ trải nghiệm gồm các dòng trà 8g tiêu biểu — lựa chọn lý tưởng để khám phá hương vị Mae Salong.',
    images: [photo('gift', 'Discovery Set — hộp trải nghiệm trà'), photo('sachet'), photo('cup'), photo('hills')],
    keyMessage: sachetKeyMessage,
    specs: [
      { label: 'QUY CÁCH', value: 'Hộp 8 gói × 8g, 4 hương vị' },
      { label: 'THÀNH PHẦN', value: 'GABA · Oolong · Oriental Beauty · Jin Xuan' },
      { label: 'PHÙ HỢP', value: 'Khám phá, làm quà tặng' },
      { label: 'NGUỒN TRÀ', value: 'Mae Salong, Chiang Rai' },
    ],
    sections: [brewGuides],
    order: 7,
    seo: productSeo('Discovery Set', 'Bộ trải nghiệm trà TOP WELL TEA — 4 hương vị Mae Salong trong một hộp quà.', 'gift'),
  },
  {
    name: 'Hot & Cold Set',
    slug: 'hot-cold-set',
    sku: 'TWT-SET-HOTCOLD',
    category: 'combo',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 390000,
    shortDescription: 'Bộ đôi dành cho cả hai nghi thức — pha nóng ấm áp và ủ lạnh sảng khoái.',
    images: [photo('gift', 'Hot & Cold Set — bộ quà trà'), photo('iced'), photo('cup')],
    keyMessage: sachetKeyMessage,
    specs: [
      { label: 'QUY CÁCH', value: 'Hộp 10 gói × 8g' },
      { label: 'THÀNH PHẦN', value: 'GABA · Oolong' },
      { label: 'PHÙ HỢP', value: 'Pha nóng & ủ lạnh' },
      { label: 'NGUỒN TRÀ', value: 'Mae Salong, Chiang Rai' },
    ],
    sections: [brewGuides],
    order: 8,
    seo: productSeo('Hot & Cold Set', 'Bộ quà trà Hot & Cold — trọn vẹn cả pha nóng và ủ lạnh.', 'gift'),
  },
  {
    name: 'Thanh Hoan',
    slug: 'thanh-hoan',
    sku: 'TWT-DT-THANHHOAN',
    category: 'danh-tra',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 320000,
    subtitle: 'GABA OOLONG TEA',
    sizeLabel: '100g',
    badge: '清欢',
    cardNote: 'Mae Salong • Thu hoạch xuân',
    mobileShortDescription: 'Ủ men sinh học tự nhiên giàu GABA, hương hoa cỏ núi cao, hậu vị êm ngọt.',
    shortDescription:
      'Ủ men sinh học tự nhiên giàu hoạt chất GABA, hương thơm dịu ngát của hoa cỏ núi cao, hậu vị êm ngọt thanh.',
    images: [photo('sachet', 'Danh trà Thanh Hoan GABA Oolong'), photo('bud'), photo('hills'), photo('cup')],
    keyMessage: sachetKeyMessage,
    specs: [
      { label: 'QUY CÁCH', value: 'Túi 100g' },
      { label: 'THÀNH PHẦN', value: '100% GABA Oolong Mae Salong' },
      { label: 'HƯƠNG', value: 'Hoa cỏ núi cao' },
      { label: 'HẬU VỊ', value: 'Êm ngọt thanh' },
      { label: 'THU HOẠCH', value: 'Vụ xuân' },
    ],
    sections: [brewGuides],
    order: 9,
    seo: productSeo('Thanh Hoan — GABA Oolong 100g', 'Danh trà Thanh Hoan GABA Oolong Mae Salong, thu hoạch vụ xuân.', 'sachet'),
  },
  {
    name: 'Đông Phương Mỹ Nhân',
    slug: 'dong-phuong-my-nhan',
    sku: 'TWT-DT-OB75',
    category: 'danh-tra',
    brewMethods: ['pha-nong', 'u-lanh'],
    price: 380000,
    subtitle: 'ORIENTAL BEAUTY',
    sizeLabel: '75g',
    badge: '东方美人',
    cardNote: 'Cao độ 1.200m • Lên men cao',
    mobileCardNote: 'Cao độ 1.200m',
    mobileShortDescription: 'Búp trà ngấm sương đượm vị mật ong tự nhiên, sắc nước hổ phách.',
    shortDescription:
      'Được tinh tuyển từ những búp trà ngấm sương đượm vị mật ong tự nhiên và trái cây chín mọng, sắc nước hổ phách.',
    images: [photo('gift', 'Danh trà Đông Phương Mỹ Nhân'), photo('bud'), photo('cup')],
    keyMessage: sachetKeyMessage,
    specs: [
      { label: 'QUY CÁCH', value: 'Hộp 75g' },
      { label: 'THÀNH PHẦN', value: '100% Oriental Beauty' },
      { label: 'CAO ĐỘ', value: '1.200m' },
      { label: 'LÊN MEN', value: 'Cao' },
    ],
    sections: [brewGuides],
    order: 10,
    seo: productSeo('Đông Phương Mỹ Nhân 75g', 'Danh trà Đông Phương Mỹ Nhân — vị mật ong, trái chín, sắc nước hổ phách.', 'gift'),
  },
  {
    name: 'Bạch Trà Sương Mai',
    slug: 'bach-tra-suong-mai',
    sku: 'TWT-DT-BACHTRA',
    category: 'danh-tra',
    brewMethods: ['pha-nong', 'u-lanh', 'pha-ngay'],
    price: 650000,
    subtitle: 'THE ARTISAN GIFT SET',
    sizeLabel: 'Gift',
    badge: '白茶',
    cardNote: 'Hộp quà giới hạn • Mạ vàng',
    mobileCardNote: 'Hộp quà giới hạn',
    mobileShortDescription: 'Hộp quà thủ công bọc giấy mỹ thuật, chi tiết mạ vàng, hương sương mai tinh khiết.',
    shortDescription:
      'Hộp quà tặng thủ công bọc giấy mỹ thuật cùng chi tiết mạ vàng, gói trọn hương vị sương mai tinh khiết.',
    images: [photo('bottle', 'Bạch Trà Sương Mai'), photo('gift'), photo('bud')],
    keyMessage: sachetKeyMessage,
    specs: [
      { label: 'QUY CÁCH', value: 'Hộp quà giới hạn' },
      { label: 'THÀNH PHẦN', value: '100% bạch trà Mae Salong' },
      { label: 'HOÀN THIỆN', value: 'Giấy mỹ thuật, chi tiết mạ vàng' },
    ],
    sections: [brewGuides],
    order: 11,
    seo: productSeo('Bạch Trà Sương Mai — hộp quà', 'Hộp quà Bạch Trà Sương Mai thủ công, chi tiết mạ vàng.', 'bottle'),
  },
];

// ---------- articles ----------
const articleSeo = (title: string, excerpt: string, share: keyof typeof IMG) =>
  seo(`${title} | Tea Journal`, excerpt, 'trà Mae Salong, Tea Journal, TOP WELL TEA', share);

export const articles = [
  {
    title: 'Mae Salong: nơi lá trà bắt đầu',
    slug: 'mae-salong-noi-la-tra-bat-dau',
    category: 'cau-chuyen-tra',
    featured: true,
    excerpt:
      'Hành trình đến vùng cao nguyên phía bắc Thái Lan — nơi khí hậu, thổ nhưỡng và bàn tay người làm trà cùng tạo nên hương vị đặc trưng của TOP WELL TEA.',
    mobileExcerpt: 'Hành trình đến vùng cao nguyên phía bắc Thái Lan.',
    cover: photo('hills'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-10-07',
    readingTime: '5 phút đọc',
    tags: [{ label: 'Mae Salong' }, { label: 'Nguồn trà' }, { label: 'Câu chuyện trà' }],
    content: [
      p('Nằm trên cao nguyên phía bắc Thái Lan, Mae Salong là một trong những vùng trà đặc biệt nhất Đông Nam Á. Khí hậu mát lành quanh năm, sương mù buổi sớm và độ cao lý tưởng tạo nên những lá trà giàu hương và hậu vị sâu.'),
      h('Thổ nhưỡng làm nên hương vị'),
      p('Đất đỏ bazan giàu khoáng chất cùng biên độ nhiệt ngày - đêm lớn khiến cây trà phát triển chậm, tích lũy nhiều hợp chất thơm. Đây là lý do trà Mae Salong có vị mềm, cân bằng và hậu ngọt kéo dài.'),
      quote('“Một lá trà ngon bắt đầu từ nơi nó lớn lên — không phải từ nhà máy.”'),
      h('Bàn tay người làm trà'),
      p('Mỗi mùa, người làm trà hái những búp non vào sáng sớm khi sương còn đọng. Quá trình làm héo, vò và sấy được kiểm soát tỉ mỉ để giữ trọn hương tự nhiên.'),
      blockImage(IMG.bud, ALT.bud),
      p('Tại TOP WELL TEA, chúng tôi chọn lọc từng mẻ trà theo tiêu chí hương - vị - hậu vị trước khi đưa vào hai dòng sản phẩm: gói trà 8g và nắp pha trà tức thì.'),
      h('Vì sao chọn trà Mae Salong'),
      ul(
        'Nguồn nguyên liệu tự nhiên, không hương liệu nhân tạo',
        'Hương thơm tinh tế, hậu vị ngọt sâu',
        'Chọn lọc theo mùa, kiểm soát chất lượng từng mẻ',
      ),
    ],
    seo: articleSeo(
      'Mae Salong: nơi lá trà bắt đầu',
      'Khám phá vùng trà Mae Salong — khí hậu, thổ nhưỡng và bàn tay người làm trà tạo nên hương vị TOP WELL TEA.',
      'hills',
    ),
  },
  {
    title: 'GABA Tea là gì?',
    slug: 'gaba-tea-la-gi',
    category: 'kien-thuc',
    excerpt: 'Hiểu về loại trà giàu axit amin tự nhiên và lợi ích thư giãn.',
    cover: photo('bud'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-10-02',
    readingTime: '4 phút đọc',
    tags: [{ label: 'GABA' }, { label: 'Kiến thức' }],
    content: [
      p('GABA (gamma-aminobutyric acid) là một axit amin tự nhiên. Trà GABA được tạo ra khi lá trà tươi được ủ trong môi trường giàu nitơ, giúp hàm lượng GABA tăng lên đáng kể so với trà thông thường.'),
      h('Hương vị đặc trưng'),
      p('Trà GABA có hương thảo mộc dịu, vị mềm và hậu ngọt sâu — dễ uống cả khi pha nóng lẫn ủ lạnh.'),
      h('Thưởng thức thế nào cho trọn vẹn'),
      ul('Pha nóng ở 90–95°C trong 2–3 phút', 'Ủ lạnh 4–6 giờ trong tủ mát', 'Dùng vào buổi chiều hoặc tối để thư giãn'),
    ],
    seo: articleSeo('GABA Tea là gì?', 'Tìm hiểu trà GABA: axit amin tự nhiên, hương vị và cách thưởng thức.', 'bud'),
  },
  {
    title: 'Pha nóng đúng cách',
    slug: 'pha-nong-dung-cach',
    category: 'hot-brew',
    excerpt: 'Nhiệt độ và thời gian lý tưởng cho từng loại trà.',
    cover: photo('cup'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-09-28',
    readingTime: '3 phút đọc',
    tags: [{ label: 'Hot Brew' }, { label: 'Hướng dẫn' }],
    content: [
      p('Nhiệt độ nước quyết định phần lớn hương vị của một tách trà. Nước quá nóng làm trà đắng chát, nước chưa đủ nóng khiến hương chưa kịp mở.'),
      h('Nhiệt độ gợi ý'),
      ul('Trà GABA, Oolong: 90–95°C', 'Bạch trà: 80–85°C', 'Oriental Beauty: 85–90°C'),
      p('Với gói trà 8g, dùng 200ml nước và ủ 2–3 phút. Có thể pha lại 2–3 lần, mỗi lần tăng thêm 30 giây.'),
    ],
    seo: articleSeo('Pha nóng đúng cách', 'Nhiệt độ và thời gian lý tưởng để pha nóng từng loại trà.', 'cup'),
  },
  {
    title: 'Vì sao nên ủ lạnh',
    slug: 'vi-sao-nen-u-lanh',
    category: 'cold-brew',
    excerpt: 'Phương pháp giữ trọn vị ngọt thanh và hương tươi mát.',
    cover: photo('iced'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-09-24',
    readingTime: '3 phút đọc',
    tags: [{ label: 'Cold Brew' }],
    content: [
      p('Ủ lạnh là cách chiết xuất chậm ở nhiệt độ thấp, giúp trà ít chát hơn và giữ trọn vị ngọt thanh tự nhiên.'),
      h('Cách ủ lạnh với gói trà 8g'),
      ul('1 gói trà với 300ml nước lạnh', 'Ủ trong tủ mát 4–6 giờ', 'Lấy gói trà ra và thưởng thức cùng đá'),
      p('Trà ủ lạnh có thể bảo quản trong tủ mát đến 24 giờ.'),
    ],
    seo: articleSeo('Vì sao nên ủ lạnh', 'Ủ lạnh giúp trà giữ trọn vị ngọt thanh và hương tươi mát.', 'iced'),
  },
  {
    title: 'Trà pha ngay cho ngày bận',
    slug: 'tra-pha-ngay-cho-ngay-ban',
    category: 'instant-tea',
    excerpt: 'Khi tiện lợi không phải đánh đổi chất lượng.',
    cover: photo('bottle'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-09-20',
    readingTime: '3 phút đọc',
    tags: [{ label: 'Instant Tea' }],
    content: [
      p('Nắp pha trà tức thì chứa bột trà cô đặc ngay trong nắp chai. Chỉ cần vặn, giải phóng, lắc và thưởng thức.'),
      h('Bốn bước đơn giản'),
      ul('Vặn nắp để kích hoạt khoang chứa', 'Bột trà giải phóng xuống nước', 'Lắc đều 5–10 giây', 'Mở nắp và thưởng thức'),
    ],
    seo: articleSeo('Trà pha ngay cho ngày bận', 'Nắp pha trà tức thì — tiện lợi mà không đánh đổi chất lượng.', 'bottle'),
  },
  {
    title: 'Một ngày ở đồi trà',
    slug: 'mot-ngay-o-doi-tra',
    category: 'cau-chuyen-tra',
    excerpt: 'Theo chân người hái trà từ sáng sớm tinh mơ.',
    cover: photo('hills'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-09-15',
    readingTime: '4 phút đọc',
    tags: [{ label: 'Mae Salong' }, { label: 'Câu chuyện trà' }],
    content: [
      p('Năm giờ sáng, đồi trà Mae Salong còn chìm trong sương. Những người hái trà đã bắt đầu một ngày làm việc khi búp non còn đọng hơi lạnh của đêm.'),
      h('Nhịp làm việc của đồi trà'),
      p('Chỉ một tôm hai lá được chọn. Mỗi giỏ trà được đưa về xưởng trong vòng vài giờ để làm héo, giữ trọn hương tự nhiên.'),
      quote('“Trà ngon là kết quả của sự kiên nhẫn.”'),
    ],
    seo: articleSeo('Một ngày ở đồi trà', 'Theo chân người hái trà Mae Salong từ sáng sớm tinh mơ.', 'hills'),
  },
  {
    title: 'Bảo quản trà tại nhà',
    slug: 'bao-quan-tra-tai-nha',
    category: 'kien-thuc',
    excerpt: 'Những nguyên tắc nhỏ giúp trà luôn tươi ngon.',
    cover: photo('bud'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-09-10',
    readingTime: '2 phút đọc',
    tags: [{ label: 'Kiến thức' }],
    content: [
      p('Trà rất dễ hút ẩm và hấp thụ mùi. Bảo quản đúng cách giúp giữ hương vị lâu hơn.'),
      ul('Đóng kín sau khi mở', 'Tránh ánh nắng trực tiếp', 'Để xa nguồn mùi mạnh như gia vị, cà phê', 'Dùng hết trong 3 tháng sau khi mở'),
    ],
    seo: articleSeo('Bảo quản trà tại nhà', 'Nguyên tắc bảo quản giúp trà luôn tươi ngon.', 'bud'),
  },
  {
    title: 'Nghệ thuật pha Oolong',
    slug: 'nghe-thuat-pha-oolong',
    category: 'hot-brew',
    excerpt: 'Nhiệt độ và thời gian lý tưởng cho trà Oolong.',
    cover: photo('cup'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-09-05',
    readingTime: '4 phút đọc',
    tags: [{ label: 'Oolong' }, { label: 'Hot Brew' }],
    content: [
      p('Oolong nằm giữa trà xanh và trà đen, nên cần nhiệt độ cao hơn trà xanh để mở trọn hương hoa và mật.'),
      h('Gợi ý pha'),
      ul('Nước 90–95°C', 'Tráng ấm trước khi pha', 'Ủ 2–3 phút, pha lại 3–4 lần'),
    ],
    seo: articleSeo('Nghệ thuật pha Oolong', 'Cách pha trà Oolong đúng nhiệt độ và thời gian.', 'cup'),
  },
  {
    title: 'Oolong đến từ đâu?',
    slug: 'oolong-den-tu-dau',
    category: 'cau-chuyen-tra',
    excerpt: 'Hành trình của giống trà Oolong tại Mae Salong.',
    cover: photo('hills'),
    author: 'TOP WELL TEA',
    publishedDate: '2026-09-01',
    readingTime: '4 phút đọc',
    tags: [{ label: 'Oolong' }, { label: 'Mae Salong' }],
    content: [
      p('Giống trà Oolong được đưa đến Mae Salong từ nhiều thập kỷ trước và nhanh chóng thích nghi với khí hậu cao nguyên mát lành.'),
      p('Ngày nay, Oolong Mae Salong được biết đến với hương hoa thanh, vị tròn và hậu ngọt — nền tảng cho các dòng sản phẩm của TOP WELL TEA.'),
    ],
    seo: articleSeo('Oolong đến từ đâu?', 'Hành trình của giống trà Oolong tại cao nguyên Mae Salong.', 'hills'),
  },
];

// ---------- shared sections ----------
const newsletter = (withDescription: boolean) => ({
  __component: 'sections.newsletter',
  eyebrow: 'TEA JOURNAL',
  title: 'Nhận câu chuyện trà mới nhất',
  description: withDescription ? 'Đăng ký để nhận bài viết và ưu đãi từ TOP WELL TEA.' : '',
  emailPlaceholder: 'Email của bạn',
  buttonLabel: 'ĐĂNG KÝ NHẬN TIN',
  successMessage: 'Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi câu chuyện trà mới nhất đến hộp thư của bạn.',
  errorMessage: 'Email chưa hợp lệ hoặc đã có lỗi xảy ra. Vui lòng thử lại.',
});

const banner = (
  eyebrow: string,
  title: string,
  description: string,
  key: keyof typeof IMG,
  size = 'default',
  mobile: { mobileTitle?: string; mobileDescription?: string; hideDescriptionOnMobile?: boolean } = {},
) => ({
  __component: 'sections.page-banner',
  eyebrow,
  title,
  description,
  image: photo(key),
  size,
  ...mobile,
});

// ---------- single types ----------
export const singles: Record<string, any> = {
  global: {
    siteName: 'TOP WELL TEA',
    siteUrl: 'http://localhost:3010',
    logo: img('brand/logo-mark.png', 'Biểu tượng TOP WELL TEA — lá trà và đường chân trời Mae Salong'),
    logoText: 'TOP WELL TEA',
    tagline: 'WELLNESS FROM MAE SALONG',
    description: 'Mang tinh thần thưởng trà vào nhịp sống hiện đại — pha nóng, ủ lạnh, hoặc pha ngay.',
    hotline: '1900 0000',
    email: 'hello@topwelltea.com',
    address: 'Mae Salong, Chiang Rai, Thailand',
    socials: [
      { platform: 'Instagram', url: 'https://www.instagram.com/topwelltea', icon: ICON('instagram') },
      { platform: 'Facebook', url: 'https://www.facebook.com/topwelltea', icon: ICON('facebook') },
      { platform: 'YouTube', url: 'https://www.youtube.com/@topwelltea', icon: ICON('youtube') },
      { platform: 'TikTok', url: 'https://www.tiktok.com/@topwelltea', icon: ICON('tiktok') },
    ],
    favicon: file('brand/logo-mark.png'),
    defaultSeo: seo(
      'TOP WELL TEA — Wellness from Mae Salong',
      'TOP WELL TEA mang trà Mae Salong vào nhịp sống hiện đại: gói trà 8g pha nóng & ủ lạnh, nắp pha trà tức thì và các set quà tặng.',
      'TOP WELL TEA, trà Mae Salong, trà GABA, oolong, trà ủ lạnh, nắp pha trà',
      'hills',
    ),
  },
  header: {
    leftNav: [
      { label: 'Về chúng tôi', url: '/ve-chung-toi' },
      { label: 'Cửa hàng', url: '/cua-hang' },
    ],
    rightNav: [
      { label: 'Blog', url: '/blog' },
      { label: 'Liên hệ', url: '/lien-he' },
    ],
    searchLabel: 'Tìm kiếm',
    cartLabel: 'Giỏ hàng',
    menuLabel: 'Mở menu',
    closeLabel: 'Đóng menu',
    drawerLinksTitle: 'DÒNG SẢN PHẨM',
    drawerLinks: [
      { label: 'Gói trà 8g', url: '/cua-hang?loai=goi-tra-8g' },
      { label: 'Nắp pha trà tức thì', url: '/cua-hang?loai=nap-pha-tra' },
      { label: 'Combo / Set trải nghiệm', url: '/cua-hang?loai=combo' },
    ],
    drawerCta: { label: 'MUA TRÀ NGAY', url: '/cua-hang', variant: 'light' },
    skipLinkLabel: 'Bỏ qua đến nội dung chính',
  },
  footer: {
    description: 'Mang tinh thần thưởng trà vào nhịp sống hiện đại — pha nóng, ủ lạnh, hoặc pha ngay.',
    columns: [
      {
        title: 'CỬA HÀNG',
        links: [
          { label: 'Gói trà 8g', url: '/cua-hang?loai=goi-tra-8g' },
          { label: 'Nắp pha trà tức thì', url: '/cua-hang?loai=nap-pha-tra' },
          { label: 'Combo / Set trải nghiệm', url: '/cua-hang?loai=combo', mobileLabel: 'Combo / Set' },
          { label: 'Tất cả sản phẩm', url: '/cua-hang', hideOnMobile: true },
        ],
      },
      {
        title: 'KHÁM PHÁ',
        links: [
          { label: 'Về chúng tôi', url: '/ve-chung-toi' },
          { label: 'Nguồn trà Mae Salong', url: '/ve-chung-toi#nguon-tra', hideOnMobile: true },
          { label: 'Tea Journal', url: '/blog' },
          { label: 'Hợp tác & phân phối', url: '/lien-he#hop-tac' },
        ],
      },
      {
        title: 'LIÊN HỆ',
        links: [
          { label: 'Hotline: 1900 0000', url: 'tel:19000000' },
          { label: 'hello@topwelltea.com', url: 'mailto:hello@topwelltea.com' },
          { label: 'Mae Salong, Chiang Rai', url: 'https://maps.google.com/?q=Mae+Salong,+Chiang+Rai', openInNewTab: true },
        ],
      },
    ],
    copyright: '© {year} TOP WELL TEA. All rights reserved.',
  },
  'icon-set': Object.fromEntries(
    [
      ['menu', 'menu'], ['close', 'close'], ['search', 'search'], ['bag', 'bag'], ['user', 'user'],
      ['arrowRight', 'arrow-right'], ['chevronRight', 'chevron-right'], ['chevronDown', 'chevron-down'],
      ['plus', 'plus'], ['minus', 'minus'], ['star', 'star'], ['heart', 'heart'], ['filter', 'filter'],
      ['leaf', 'leaf'], ['flame', 'flame'], ['droplet', 'droplet'], ['bottle', 'bottle'], ['play', 'play'],
      ['location', 'location'], ['phone', 'phone'], ['mail', 'mail'], ['check', 'check'],
    ].map(([key, name]) => [key, ICON(name)]),
  ),
  'site-settings': {
    currencySuffix: '₫',
    shippingFee: 30000,
    freeShippingThreshold: 500000,
    orderPrefix: 'TWT',
    productCardTagSeparator: '·',
    cartAddedMessage: 'Đã thêm vào giỏ hàng',
    cartToastCountTemplate: 'Giỏ hàng có {count} sản phẩm',
    cartToastViewCartLabel: 'XEM GIỎ HÀNG',
    cartToastCheckoutLabel: 'THANH TOÁN',
    cartToastCloseLabel: 'Đóng thông báo',
    cartCountLabel: 'sản phẩm trong giỏ',
    loadingLabel: 'Đang xử lý…',
    genericError: 'Có lỗi xảy ra, vui lòng thử lại.',
    freeLabel: 'Miễn phí',
    decreaseLabel: 'Giảm số lượng',
    increaseLabel: 'Tăng số lượng',
    removeLabel: 'Xoá',
    clearLabel: 'Xoá từ khoá',
    mainNavLabel: 'Điều hướng chính',
    secondaryNavLabel: 'Điều hướng phụ',
    filterProductsLabel: 'Lọc sản phẩm',
    filterArticlesLabel: 'Lọc bài viết theo chuyên mục',
    breadcrumbLabel: 'Đường dẫn',
    emailFromName: 'TOP WELL TEA',
    orderEmailSubject: 'Xác nhận đơn hàng #{code} — TOP WELL TEA',
    orderEmailBody:
      'Xin chào {name},\n\nCảm ơn bạn đã đặt hàng tại TOP WELL TEA. Đơn hàng #{code} đã được tiếp nhận.\n\n{items}\n\nTạm tính: {subtotal}\nPhí vận chuyển: {shipping}\nTổng cộng: {total}\nThanh toán: {payment}\nGiao đến: {address}\n\n{paymentNote}\n\nTheo dõi đơn hàng: {trackingUrl}\n\nTrân trọng,\nTOP WELL TEA',
    shopOrderEmailSubject: 'Đơn hàng mới #{code} — {total}',
    contactEmailSubject: 'Lời nhắn mới từ website: {topic}',
    bankTransferMethodCode: 'bank-transfer',
    bankTransferTitle: 'Quét mã QR để chuyển khoản',
    // bankQr: upload the shop's own payment QR in the admin (never seeded with a sample).
    bankTransferNote:
      'Nội dung chuyển khoản: {code}. TOP WELL TEA sẽ xác nhận đơn hàng sau khi kiểm tra được thanh toán.',
  },

  'home-page': {
    title: 'Trang chủ',
    seo: seo(
      'TOP WELL TEA — Trà cho nhịp sống hiện đại',
      'Khởi nguồn từ cao nguyên Mae Salong — gói trà 8g pha nóng & ủ lạnh, nắp pha trà tức thì và danh trà đặc tuyển.',
      'TOP WELL TEA, trà Mae Salong, trà GABA, trà oolong, trà ủ lạnh',
      'leavesDark',
    ),
    sections: [
      {
        __component: 'home.hero-slider',
        autoplaySeconds: 3,
        slides: [
          {
            eyebrow: 'WELLNESS FROM MAE SALONG',
            title: 'Trà cho nhịp sống\nhiện đại',
            description: 'Khởi nguồn từ cao nguyên Mae Salong — một cách thưởng trà hiện đại, tinh tế và trọn vẹn.',
            mobileTitle: 'Trà cho nhịp sống hiện đại',
            mobileDescription: 'Khởi nguồn từ cao nguyên Mae Salong — một cách thưởng trà mới.',
            ctaLabel: 'KHÁM PHÁ SẢN PHẨM',
            ctaUrl: '/cua-hang',
            image: photo('leavesDark'),
          },
          {
            eyebrow: 'GÓI TRÀ 8G',
            title: 'Một gói trà,\nhai nghi thức',
            description: 'Pha nóng để cảm nhận hương thơm trọn vẹn, hoặc ủ lạnh cho ngày dài sảng khoái.',
            mobileTitle: 'Một gói trà, hai nghi thức',
            mobileDescription: 'Pha nóng cảm nhận hương thơm, ủ lạnh cho ngày sảng khoái.',
            ctaLabel: 'KHÁM PHÁ SẢN PHẨM',
            ctaUrl: '/cua-hang?loai=goi-tra-8g',
            image: photo('hills'),
          },
          {
            eyebrow: 'NẮP PHA TRÀ TỨC THÌ',
            title: 'Pha trà chỉ\ntrong vài giây',
            description: 'Vặn — giải phóng — lắc — thưởng thức. Ly trà tươi ngon cho ngày bận rộn.',
            mobileTitle: 'Pha trà trong vài giây',
            mobileDescription: 'Vặn — lắc — thưởng thức. Trà tươi cho ngày bận rộn.',
            ctaLabel: 'KHÁM PHÁ SẢN PHẨM',
            ctaUrl: '/cua-hang?loai=nap-pha-tra',
            image: photo('cozy'),
          },
        ],
      },
      {
        __component: 'sections.split-story',
        eyebrow: 'CÂU CHUYỆN THƯƠNG HIỆU',
        showEyebrowLine: true,
        title: 'Hiện đại hoá trải nghiệm thưởng trà',
        mobileTitle: 'Thưởng trà hiện đại',
        body: 'TOP WELL TEA ra đời từ niềm tin rằng thưởng trà có thể vừa tiện lợi, vừa giữ trọn tinh thần truyền thống. Hai dòng sản phẩm — gói trà 8g và nắp pha trà tức thì — được thiết kế cho nhịp sống hôm nay, nhưng vẫn trân trọng từng khoảnh khắc.',
        link: { label: 'TÌM HIỂU THÊM', url: '/ve-chung-toi' },
        mobileBody:
          'TOP WELL TEA ra đời từ niềm tin: thưởng trà có thể vừa tiện lợi, vừa giữ trọn tinh thần truyền thống. Gói trà 8g và nắp pha trà tức thì — cho nhịp sống hôm nay.',
        image: photo('cozy'),
        imagePosition: 'right',
        layout: 'inset',
        theme: 'cream',
        titleSize: 'medium',
      },
      {
        __component: 'home.philosophy',
        eyebrow: 'TRIẾT LÝ THƯƠNG HIỆU',
        mobileEyebrow: 'TRIẾT LÝ',
        mobileStatement: 'Hiện đại nhưng không quá công nghệ. Cao cấp nhưng không xa cách.',
        statement:
          'Hiện đại nhưng không quá công nghệ. Cao cấp nhưng không xa cách. Có chất trà nhưng không cổ điển.',
        pillars: [
          { number: '01', title: 'Hiện đại', description: 'Trải nghiệm uống trà tái định nghĩa cho nhịp sống hôm nay.', mobileDescription: 'Trải nghiệm uống trà cho nhịp sống hôm nay.' },
          { number: '02', title: 'Cao cấp', description: 'Nguyên liệu chọn lọc, trình bày như một lifestyle product.', mobileDescription: 'Nguyên liệu chọn lọc, trình bày tinh tế.' },
          { number: '03', title: 'Tinh giản', description: 'Thiết kế sạch, nhiều khoảng thở — để trà là trung tâm.', mobileDescription: 'Thiết kế sạch, nhiều khoảng thở.' },
        ],
      },
      {
        __component: 'sections.split-story',
        eyebrow: 'NGUỒN TRÀ',
        showEyebrowLine: true,
        title: 'Mae Salong',
        body: 'Nằm trên cao nguyên phía bắc Thái Lan, Mae Salong là vùng trà nổi tiếng với khí hậu mát lành và thổ nhưỡng đặc trưng. Từng lá trà được chọn lọc kỹ lưỡng — nền tảng cho hương vị tinh tế của TOP WELL TEA.',
        link: { label: 'TÌM HIỂU CÂU CHUYỆN', url: '/blog/mae-salong-noi-la-tra-bat-dau' },
        mobileBody:
          'Cao nguyên phía bắc Thái Lan, khí hậu mát lành và thổ nhưỡng đặc trưng — nơi từng lá trà được chọn lọc kỹ lưỡng cho hương vị tinh tế của TOP WELL TEA.',
        image: photo('hills'),
        imagePosition: 'left',
        layout: 'full-bleed',
        theme: 'navy',
        titleSize: 'large',
      },
      {
        __component: 'home.process',
        eyebrow: 'THE PROCESS',
        title: 'Từ lá trà đến tách trà',
        description:
          'Bốn giai đoạn tinh tuyển định hình nên một phẩm trà thượng hạng — kết hợp phương thức thủ công truyền thống và chuẩn mực thưởng ngoạn tao nhã.',
        mobileDescription: 'Bốn giai đoạn tinh tuyển định hình nên một phẩm trà thượng hạng.',
        stages: [
          {
            label: '01 — NGUỒN TRÀ',
            title: 'Đất trời dung dưỡng',
            description: 'Chọn lựa từ những cây trà phát triển chậm trên sườn đồi thoai thoải, hấp thụ khoáng chất và mạch nước tinh khiết.',
            mobileDescription: 'Cây trà phát triển chậm trên sườn đồi, hấp thụ khoáng chất và mạch nước tinh khiết.',
            image: photo('hills'),
          },
          {
            label: '02 — TUYỂN CHỌN',
            title: 'Hái tay tinh tế',
            description: 'Hái búp trà nguyên vẹn vào thời khắc ban mai khi sương chưa tan, giữ trọn cấu trúc hương thơm tự nhiên.',
            mobileDescription: 'Hái búp trà nguyên vẹn khi sương chưa tan, giữ trọn cấu trúc hương thơm.',
            image: photo('bud'),
          },
          {
            label: '03 — CHẾ BIẾN',
            title: 'Lên men chuẩn xác',
            description: 'Kiểm soát nhiệt độ, độ ẩm và thời gian sao ủ để đánh thức nốt hương mật ong, hoa cỏ ẩn sâu trong lá.',
            mobileDescription: 'Kiểm soát nhiệt độ và thời gian sao ủ để đánh thức nốt hương ẩn sâu.',
            image: photo('cup'),
          },
          {
            label: '04 — THƯỞNG TRÀ',
            title: 'Trọn vẹn khoảnh khắc',
            description: 'Rót ra tách gốm ấm nóng, cảm nhận làn hương lan toả, lắng đọng tâm trí và đón năng lượng thanh lành.',
            mobileDescription: 'Rót ra tách gốm ấm, lắng đọng tâm trí và đón năng lượng thanh lành.',
            image: photo('cozy'),
          },
        ],
      },
      {
        __component: 'home.featured-products',
        eyebrow: 'DANH TRÀ ĐẶC TUYỂN',
        title: 'Sản phẩm nổi bật',
        description:
          'Những phẩm trà tiêu biểu kết tinh từ thổ nhưỡng sương sớm Mae Salong và nghệ thuật sao ủ thủ công, đưa bạn đến miền an nhiên thuần khiết.',
        products: [product('thanh-hoan'), product('dong-phuong-my-nhan'), product('bach-tra-suong-mai')],
        cardLinkLabel: 'KHÁM PHÁ',
        mobileDescription: 'Những phẩm trà tiêu biểu kết tinh từ thổ nhưỡng sương sớm Mae Salong.',
        mobileSeeAllLabel: 'XEM TẤT CẢ DANH TRÀ',
        seeAllLabel: 'XEM TẤT CẢ DANH TRÀ TOP WELL TEA',
        seeAllUrl: '/cua-hang',
      },
      {
        __component: 'sections.cta-band',
        eyebrow: 'BREW YOUR WAY',
        title: 'Bắt đầu hành trình thưởng trà của bạn',
        description: 'Khám phá bộ sưu tập trà Mae Salong — hoặc liên hệ để hợp tác & phân phối.',
        mobileDescription: 'Khám phá bộ sưu tập trà Mae Salong — hoặc liên hệ hợp tác & phân phối.',
        buttons: [
          { label: 'MUA TRÀ NGAY', url: '/cua-hang', variant: 'light' },
          { label: 'LIÊN HỆ HỢP TÁC', url: '/lien-he#hop-tac', variant: 'outline-light' },
        ],
        theme: 'navy',
      },
    ],
  },

  'about-page': {
    title: 'Về chúng tôi',
    seo: seo(
      'Về chúng tôi — TOP WELL TEA',
      'TOP WELL TEA ra đời từ niềm tin rằng thưởng trà có thể vừa hiện đại, vừa giữ trọn tinh thần truyền thống — bắt đầu từ vùng trà Mae Salong.',
      'về TOP WELL TEA, câu chuyện thương hiệu, trà Mae Salong',
      'cozy',
    ),
    sections: [
      banner(
        'VỀ CHÚNG TÔI',
        'Wellness from Mae Salong',
        'TOP WELL TEA ra đời từ niềm tin rằng thưởng trà có thể vừa hiện đại, vừa giữ trọn tinh thần truyền thống — bắt đầu từ một vùng trà đặc biệt phía bắc Thái Lan.',
        'cozy',
        'large',
        {
          mobileTitle: 'Wellness',
          mobileDescription: 'Trà wellness từ cao nguyên Mae Salong — hiện đại mà vẫn giữ tinh thần truyền thống.',
        },
      ),
      { __component: 'sections.image-band', image: photo('hills') },
      {
        __component: 'sections.split-story',
        eyebrow: 'CÂU CHUYỆN',
        showEyebrowLine: false,
        title: 'Từ truyền thống đến hiện đại',
        mobileTitle: 'Từ truyền thống',
        body: 'Chúng tôi bắt đầu với câu hỏi: làm sao để một tách trà ngon trở nên dễ dàng hơn với nhịp sống hôm nay? Câu trả lời là sự kết hợp giữa nguyên liệu chuẩn mực và trải nghiệm tối giản.',
        mobileBody: 'Làm sao để một tách trà ngon trở nên dễ dàng hơn với nhịp sống hôm nay? Câu trả lời là nguyên liệu chuẩn mực và trải nghiệm tối giản.',
        image: photo('cozy'),
        imagePosition: 'left',
        layout: 'full-bleed',
        theme: 'white',
        titleSize: 'medium',
      },
      {
        __component: 'sections.split-story',
        eyebrow: 'NGUỒN TRÀ',
        showEyebrowLine: false,
        title: 'Mae Salong',
        body: 'Vùng cao nguyên với khí hậu mát lành quanh năm, nơi cho ra những lá trà giàu hương và hậu vị. Đây là trái tim của mọi sản phẩm TOP WELL TEA.',
        mobileBody: 'Vùng cao nguyên khí hậu mát lành — nơi cho những lá trà giàu hương và hậu vị, trái tim của mọi sản phẩm.',
        image: photo('bud'),
        imagePosition: 'right',
        layout: 'full-bleed',
        theme: 'white',
        titleSize: 'medium',
        anchorId: 'nguon-tra',
      },
      {
        __component: 'sections.split-story',
        eyebrow: 'NGUYÊN LIỆU',
        showEyebrowLine: false,
        title: 'Cách chúng tôi chọn lọc',
        mobileTitle: 'Chúng tôi chọn lọc',
        body: 'Mỗi mẻ trà được tuyển chọn theo mùa, kiểm tra hương - vị - hậu vị trước khi đến tay bạn. Không chất bảo quản, không hương liệu nhân tạo.',
        mobileBody: 'Mỗi mẻ trà được tuyển theo mùa, kiểm tra hương - vị - hậu vị. Không chất bảo quản, không hương liệu nhân tạo.',
        image: photo('leavesDark'),
        imagePosition: 'left',
        layout: 'full-bleed',
        theme: 'white',
        titleSize: 'medium',
      },
      {
        __component: 'sections.quote-band',
        quote: '“Mang trà vào một cách sống hiện đại hơn — nhưng không bao giờ đánh mất tinh thần thưởng trà.”',
        mobileQuote: '“Mang trà vào một cách sống hiện đại hơn — nhưng không đánh mất tinh thần thưởng trà.”',
        author: '— TOP WELL TEA',
      },
      {
        __component: 'sections.cta-band',
        title: 'Khám phá bộ sưu tập',
        buttons: [{ label: 'XEM SẢN PHẨM', url: '/cua-hang', variant: 'primary' }],
        theme: 'white',
      },
    ],
  },

  'shop-page': {
    title: 'Cửa hàng',
    seo: seo(
      'Cửa hàng — Bộ sưu tập trà TOP WELL TEA',
      'Gói trà 8g pha nóng & ủ lạnh, nắp pha trà tức thì và combo quà tặng — chọn cách thưởng trà của riêng bạn.',
      'mua trà, gói trà 8g, nắp pha trà tức thì, combo trà, TOP WELL TEA',
      'hills',
    ),
    sections: [
      banner(
        'CỬA HÀNG',
        'Bộ sưu tập trà',
        'Gói trà 8g pha nóng & ủ lạnh, nắp pha trà tức thì — chọn cách thưởng trà của riêng bạn.',
        'hills',
        'default',
        { mobileDescription: 'Pha nóng · Ủ lạnh · Pha ngay — chọn cách thưởng trà của bạn.' },
      ),
      {
        __component: 'shop.product-grid',
        filters: [
          { label: 'TẤT CẢ', kind: 'all' },
          { label: 'GÓI TRÀ 8G', kind: 'category', slug: 'goi-tra-8g' },
          { label: 'PHA NÓNG', kind: 'brew', slug: 'pha-nong' },
          { label: 'Ủ LẠNH', kind: 'brew', slug: 'u-lanh' },
          { label: 'PHA NGAY', kind: 'brew', slug: 'pha-ngay' },
        ],
        emptyText: 'Chưa có sản phẩm phù hợp với bộ lọc này.',
      },
    ],
  },

  'blog-page': {
    title: 'Blog',
    seo: seo(
      'Tea Journal — Blog TOP WELL TEA',
      'Câu chuyện trà, kiến thức pha chế và cảm hứng cho một lối sống chậm hơn.',
      'blog trà, kiến thức trà, cách pha trà, Mae Salong',
      'leavesDark',
    ),
    sections: [
      banner('BLOG', 'Tea Journal', 'Câu chuyện trà, kiến thức pha chế và cảm hứng cho một lối sống chậm hơn.', 'leavesDark', 'default', {
        mobileDescription: 'Câu chuyện trà, kiến thức pha chế & cảm hứng sống chậm.',
      }),
      {
        __component: 'blog.article-listing',
        allLabel: 'TẤT CẢ',
        featuredSuffix: 'NỔI BẬT',
        featuredLinkLabel: 'ĐỌC BÀI VIẾT',
        readMoreLabel: 'ĐỌC TIẾP',
        emptyText: 'Chưa có bài viết trong chuyên mục này.',
      },
      newsletter(true),
    ],
  },

  'contact-page': {
    title: 'Liên hệ',
    seo: seo(
      'Liên hệ — TOP WELL TEA',
      'Câu hỏi về sản phẩm, đơn hàng, hay hợp tác & phân phối — TOP WELL TEA luôn sẵn sàng.',
      'liên hệ TOP WELL TEA, hợp tác phân phối trà, đại lý trà',
      'cup',
    ),
    sections: [
      banner(
        'LIÊN HỆ',
        'Kết nối với chúng tôi',
        'Câu hỏi về sản phẩm, đơn hàng, hay hợp tác & phân phối — chúng tôi luôn sẵn sàng.',
        'cup',
        'default',
        { mobileTitle: 'Kết nối', mobileDescription: 'Câu hỏi về sản phẩm, đơn hàng hay hợp tác — chúng tôi luôn sẵn sàng.' },
      ),
      {
        __component: 'contact.contact-panel',
        infoTitle: 'Thông tin liên hệ',
        items: [
          { icon: ICON('phone'), label: 'HOTLINE', value: '1900 0000', url: 'tel:19000000' },
          { icon: ICON('mail'), label: 'EMAIL', value: 'hello@topwelltea.com', url: 'mailto:hello@topwelltea.com' },
          {
            icon: ICON('location'),
            label: 'ĐỊA CHỈ',
            value: 'Mae Salong, Chiang Rai, Thailand',
            url: 'https://maps.google.com/?q=Mae+Salong,+Chiang+Rai',
          },
        ],
        showSocials: true,
        formTitle: 'Gửi lời nhắn',
        nameField: { label: 'HỌ VÀ TÊN', placeholder: 'Nguyễn Văn A' },
        emailField: { label: 'EMAIL', placeholder: 'email@example.com' },
        topicField: {
          label: 'CHỦ ĐỀ',
          placeholder: 'Sản phẩm · Đơn hàng · Đại lý · Phân phối · Hợp tác · Quà tặng DN · Khác',
          mobilePlaceholder: 'Sản phẩm · Đơn hàng · Đại lý · Khác',
        },
        topics: ['Sản phẩm', 'Đơn hàng', 'Đại lý', 'Phân phối', 'Hợp tác', 'Quà tặng DN', 'Khác'].map((label) => ({ label })),
        messageField: { label: 'NỘI DUNG', placeholder: 'Nhập nội dung lời nhắn...' },
        submitLabel: 'GỬI LỜI NHẮN',
        successMessage: 'Cảm ơn bạn! Lời nhắn đã được gửi, chúng tôi sẽ phản hồi sớm nhất.',
        errorMessage: 'Không thể gửi lời nhắn. Vui lòng kiểm tra thông tin và thử lại.',
      },
      {
        __component: 'sections.card-grid',
        eyebrow: 'HỢP TÁC & PHÂN PHỐI',
        title: 'Cùng phát triển với TOP WELL TEA',
        mobileTitle: 'Cùng phát triển',
        theme: 'light',
        anchorId: 'hop-tac',
        cards: [
          { title: 'Đại lý', description: 'Trở thành đại lý phân phối sản phẩm tại khu vực của bạn.', mobileDescription: 'Trở thành đại lý tại khu vực của bạn.' },
          { title: 'Nhà phân phối', description: 'Hợp tác phân phối quy mô lớn, chính sách riêng.', mobileDescription: 'Hợp tác phân phối quy mô lớn.' },
          { title: 'F&B', description: 'Giải pháp trà cho quán & nhà hàng.' },
          { title: 'Doanh nghiệp', description: 'Quà tặng & hợp tác thương hiệu.' },
        ],
      },
    ],
  },

  'cart-page': {
    title: 'Giỏ hàng',
    seo: { ...seo('Giỏ hàng — TOP WELL TEA', 'Giỏ hàng của bạn tại TOP WELL TEA.', 'giỏ hàng'), noIndex: true },
    sections: [
      banner('GIỎ HÀNG', 'Giỏ hàng của bạn', '', 'leavesDark'),
      {
        __component: 'commerce.cart',
        productColumnLabel: 'SẢN PHẨM',
        totalColumnLabel: 'THÀNH TIỀN',
        unitPriceLabel: 'Đơn giá',
        continueLabel: 'TIẾP TỤC MUA SẮM',
        continueUrl: '/cua-hang',
        summaryTitle: 'Tóm tắt đơn hàng',
        subtotalLabel: 'Tạm tính',
        shippingLabel: 'Phí vận chuyển',
        totalLabel: 'TỔNG CỘNG',
        checkoutLabel: 'TIẾN HÀNH THANH TOÁN',
        checkoutUrl: '/thanh-toan',
        freeShippingNote: 'Miễn phí ship cho đơn từ 500.000₫.',
        freeLabel: 'Miễn phí',
        emptyTitle: 'Giỏ hàng đang trống',
        emptyText: 'Khám phá bộ sưu tập trà Mae Salong và chọn cách thưởng trà của riêng bạn.',
        emptyButton: { label: 'XEM SẢN PHẨM', url: '/cua-hang', variant: 'primary' },
      },
    ],
  },

  'checkout-page': {
    title: 'Thanh toán',
    seo: { ...seo('Thanh toán — TOP WELL TEA', 'Hoàn tất đơn hàng tại TOP WELL TEA.', 'thanh toán'), noIndex: true },
    sections: [
      banner('GIỎ HÀNG · THANH TOÁN', 'Thanh toán', '', 'leavesDark'),
      {
        __component: 'commerce.checkout',
        contactTitle: 'Thông tin liên hệ',
        emailField: { label: 'EMAIL', placeholder: 'email@example.com' },
        phoneField: { label: 'SỐ ĐIỆN THOẠI', placeholder: '09xx xxx xxx' },
        shippingTitle: 'Địa chỉ giao hàng',
        nameField: { label: 'HỌ VÀ TÊN', placeholder: 'Nguyễn Văn A' },
        addressField: { label: 'ĐỊA CHỈ', placeholder: 'Số nhà, tên đường' },
        provinceField: { label: 'TỈNH / THÀNH PHỐ', placeholder: 'Chọn tỉnh/thành' },
        districtField: { label: 'QUẬN / HUYỆN', placeholder: 'Chọn quận/huyện' },
        noteField: { label: 'GHI CHÚ (TUỲ CHỌN)', placeholder: 'Ghi chú cho đơn hàng', hideOnMobile: true },
        paymentTitle: 'Phương thức thanh toán',
        paymentMethods: [
          { code: 'cod', title: 'Thanh toán khi nhận hàng (COD)', shortTitle: 'COD khi nhận hàng', mobileTitle: 'COD khi nhận hàng', description: 'Trả tiền mặt khi nhận sản phẩm' },
          { code: 'bank-transfer', title: 'Chuyển khoản ngân hàng', shortTitle: 'Chuyển khoản', description: 'Chuyển khoản trước khi giao', hideDescriptionOnMobile: true },
        ],
        summaryTitle: 'Đơn hàng',
        quantityLabel: 'SL',
        subtotalLabel: 'Tạm tính',
        shippingLabel: 'Phí vận chuyển',
        totalLabel: 'TỔNG CỘNG',
        submitLabel: 'ĐẶT HÀNG',
        termsNote: 'Bằng việc đặt hàng, bạn đồng ý với điều khoản của TOP WELL TEA.',
        emptyText: 'Giỏ hàng đang trống — hãy chọn sản phẩm trước khi thanh toán.',
        emptyButton: { label: 'XEM SẢN PHẨM', url: '/cua-hang', variant: 'primary' },
        errorMessage: 'Không thể đặt hàng. Vui lòng kiểm tra thông tin và thử lại.',
        successUrl: '/dat-hang-thanh-cong',
      },
    ],
  },

  'thank-you-page': {
    title: 'Đặt hàng thành công',
    seo: { ...seo('Đặt hàng thành công — TOP WELL TEA', 'Cảm ơn bạn đã đặt hàng tại TOP WELL TEA.', 'đặt hàng'), noIndex: true },
    sections: [
      {
        __component: 'commerce.order-success',
        icon: ICON('check'),
        eyebrow: 'ĐẶT HÀNG THÀNH CÔNG',
        title: 'Cảm ơn bạn!',
        description:
          'Đơn hàng của bạn đã được tiếp nhận. Chúng tôi sẽ gửi email xác nhận và liên hệ giao hàng trong thời gian sớm nhất.',
        mobileDescription: 'Đơn hàng của bạn đã được tiếp nhận. Chúng tôi sẽ gửi email xác nhận và liên hệ giao hàng sớm.',
        orderCodeLabel: 'MÃ ĐƠN HÀNG',
        mobileOrderCodeLabel: 'MÃ ĐƠN',
        totalLabel: 'TỔNG CỘNG',
        paymentLabel: 'THANH TOÁN',
        emailLabel: 'EMAIL',
        buttons: [
          { label: 'VỀ TRANG CHỦ', url: '/', variant: 'primary' },
          { label: 'TIẾP TỤC MUA SẮM', url: '/cua-hang', variant: 'secondary' },
          { label: 'THEO DÕI ĐƠN HÀNG', url: '/tra-cuu-don-hang', variant: 'ghost' },
        ],
      },
    ],
  },

  'order-tracking-page': {
    title: 'Tra cứu đơn hàng',
    seo: seo(
      'Tra cứu đơn hàng — TOP WELL TEA',
      'Nhập mã đơn và email để kiểm tra tình trạng đơn hàng TOP WELL TEA của bạn.',
      'tra cứu đơn hàng, theo dõi đơn hàng',
      'iced',
    ),
    sections: [
      banner('HỖ TRỢ', 'Tra cứu đơn hàng', 'Nhập mã đơn và email để kiểm tra tình trạng đơn hàng của bạn.', 'iced', 'default', {
        hideDescriptionOnMobile: true,
      }),
      {
        __component: 'commerce.order-lookup',
        codeField: { label: 'MÃ ĐƠN HÀNG', placeholder: 'VD: TWT-2026-0001', mobilePlaceholder: 'TWT-2026-0001' },
        contactField: { label: 'EMAIL / SỐ ĐIỆN THOẠI', mobileLabel: 'EMAIL / SĐT', placeholder: 'email@example.com' },
        submitLabel: 'TRA CỨU',
        notFoundMessage: 'Không tìm thấy đơn hàng. Vui lòng kiểm tra mã đơn và email/số điện thoại.',
        resultTitle: 'Đơn hàng #{code}',
        mobileResultTitle: '#{code}',
        itemsTitle: 'Sản phẩm',
        deliveryTitle: 'Giao hàng',
        recipientLabel: 'NGƯỜI NHẬN',
        addressLabel: 'ĐỊA CHỈ',
        carrierLabel: 'ĐƠN VỊ',
        paymentLabel: 'THANH TOÁN',
        totalLabel: 'TỔNG CỘNG',
        quantityLabel: 'SL',
        expectedLabel: 'Dự kiến',
        placedLabel: 'Đã đặt',
        confirmedLabel: 'Đã xác nhận',
        shippingLabel: 'Đang giao',
        completedLabel: 'Hoàn tất',
        cancelledLabel: 'Đã huỷ',
      },
    ],
  },

  'search-page': {
    title: 'Tìm kiếm',
    seo: { ...seo('Tìm kiếm — TOP WELL TEA', 'Tìm sản phẩm và bài viết tại TOP WELL TEA.', 'tìm kiếm'), noIndex: true },
    sections: [
      {
        __component: 'commerce.search-results',
        eyebrow: 'KẾT QUẢ TÌM KIẾM',
        titleTemplate: 'Kết quả cho “{query}”',
        mobileTitleTemplate: '“{query}”',
        emptyTitle: 'Tìm kiếm sản phẩm & bài viết',
        placeholder: 'Tìm trà, bài viết…',
        image: photo('bud'),
        allLabel: 'TẤT CẢ',
        productsLabel: 'SẢN PHẨM',
        articlesLabel: 'BÀI VIẾT',
        countTemplate: '{count} KẾT QUẢ',
        productsHeading: 'Sản phẩm ({count})',
        articlesHeading: 'Bài viết ({count})',
        noResultsText: 'Không tìm thấy kết quả phù hợp. Hãy thử từ khoá khác như “oolong”, “GABA” hoặc “ủ lạnh”.',
        readMoreLabel: 'ĐỌC TIẾP',
      },
    ],
  },

  'not-found-page': {
    title: 'Không tìm thấy trang',
    seo: { ...seo('Không tìm thấy trang — TOP WELL TEA', 'Trang bạn tìm không tồn tại.', '404'), noIndex: true },
    sections: [
      {
        __component: 'system.not-found',
        code: '404',
        eyebrow: 'KHÔNG TÌM THẤY TRANG',
        title: 'Ôi, trang này đã lạc mất',
        description:
          'Có thể đường dẫn đã thay đổi hoặc không còn tồn tại. Hãy quay lại trang chủ hoặc khám phá bộ sưu tập trà của chúng tôi.',
        mobileDescription: 'Đường dẫn có thể đã thay đổi. Quay lại trang chủ hoặc khám phá sản phẩm nhé.',
        buttons: [
          { label: 'VỀ TRANG CHỦ', url: '/', variant: 'primary' },
          { label: 'XEM SẢN PHẨM', url: '/cua-hang', variant: 'secondary' },
        ],
        suggestionsLabel: 'CÓ THỂ BẠN CẦN:',
        suggestions: [
          { label: 'Cửa hàng', url: '/cua-hang' },
          { label: 'Về chúng tôi', url: '/ve-chung-toi' },
          { label: 'Blog', url: '/blog' },
          { label: 'Liên hệ', url: '/lien-he' },
        ],
      },
    ],
  },

  'product-page': {
    breadcrumbLabel: 'CỬA HÀNG',
    breadcrumbUrl: '/cua-hang',
    addToCartLabel: 'THÊM VÀO GIỎ',
    addedLabel: 'ĐÃ THÊM VÀO GIỎ',
    relatedTitle: 'Sản phẩm liên quan',
    relatedCount: 4,
    sections: [],
  },

  'article-page': {
    relatedTitle: 'Bài viết liên quan',
    relatedCount: 3,
    readMoreLabel: 'ĐỌC TIẾP',
    sections: [newsletter(false)],
  },
};

// Demo order so the tracking page can be tried right away (TWT-2026-0001 / email@example.com).
export const demoOrders = [
  {
    code: 'TWT-2026-0001',
    orderStatus: 'shipping',
    customerName: 'Nguyễn Văn A',
    email: 'email@example.com',
    phone: '0900000000',
    address: '12 Lê Lợi',
    province: 'TP.HCM',
    district: 'Q.1',
    note: '',
    paymentMethod: 'cod',
    items: [
      { slug: 'gaba-tea', name: 'GABA Tea 8g', category: 'GÓI TRÀ 8G', price: 145000, quantity: 2, lineTotal: 290000 },
      { slug: 'instant-oolong', name: 'Instant · Oolong', category: 'NẮP PHA TRÀ', price: 189000, quantity: 1, lineTotal: 189000 },
    ],
    subtotal: 479000,
    shippingFee: 30000,
    total: 509000,
    carrier: 'Giao nhanh 24h',
    estimatedDelivery: '2026-10-09',
    history: [
      { status: 'pending', at: '2026-10-07T02:12:00.000Z' },
      { status: 'confirmed', at: '2026-10-07T03:30:00.000Z' },
      { status: 'shipping', at: '2026-10-08T01:00:00.000Z' },
    ],
  },
];
