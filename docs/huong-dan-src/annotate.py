"""Draw numbered red callouts on the admin screenshots (img/raw → img).

Coordinates are boxes (x0, y0, x1, y1) in the 1800-px-wide raw screenshots.
Run: python3 annotate.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).parent
RAW, OUT = HERE / 'img' / 'raw', HERE / 'img'
RED = (239, 68, 68)

BOXES = {
    '01-login': [(1580, 26, 1736, 77), (638, 408, 1162, 457), (638, 508, 1162, 557), (638, 636, 1162, 676)],
    '02-dashboard': [(2, 146, 46, 194), (2, 210, 46, 258), (2, 840, 44, 888)],
    '03-content-manager': [(62, 152, 326, 560), (62, 590, 326, 888), (1555, 70, 1750, 111), (400, 206, 564, 247)],
    '04-page-editor': [(400, 188, 602, 240), (430, 340, 895, 390), (430, 424, 1380, 888), (1446, 340, 1730, 430)],
    '05-sections': [(808, 354, 1000, 404), (400, 423, 1408, 484), (1285, 432, 1320, 474), (1323, 432, 1356, 474), (1356, 430, 1402, 476)],
    '06-section-open': [(400, 503, 1408, 563), (430, 590, 1378, 838)],
    '07-section-fields': [(430, 338, 1380, 525), (762, 548, 1198, 648), (458, 674, 744, 796)],
    '08-image-field': [(590, 431, 764, 475), (913, 290, 1348, 392), (430, 565, 1378, 732), (913, 750, 1378, 888)],
    '09-media-picker': [(445, 165, 545, 220), (1194, 166, 1356, 206), (435, 410, 654, 613), (1276, 802, 1380, 842)],
    '10-add-section': [(426, 547, 1382, 747), (426, 748, 1382, 808), (848, 396, 961, 456)],
    '11-modified': [(430, 339, 896, 391), (1446, 340, 1681, 380), (1446, 389, 1729, 429)],
    '12-mobile-fields': [(430, 222, 895, 320), (913, 25, 1378, 205), (728, 778, 1079, 839)],
    '13-product-list': [(1555, 70, 1750, 111), (430, 336, 1720, 413), (1430, 354, 1536, 394)],
    '14-product-edit': [(430, 314, 895, 391), (913, 314, 1378, 436), (913, 460, 1378, 610), (430, 642, 895, 858), (913, 642, 1216, 742)],
    '15-product-images': [(430, 404, 735, 480), (752, 404, 1217, 559), (430, 788, 1378, 888)],
    '16-product-gallery': [(430, 300, 1378, 606), (1288, 551, 1334, 598), (430, 606, 1378, 665)],
    '17-article-edit': [(430, 246, 895, 322), (430, 392, 895, 543), (913, 392, 1378, 549), (430, 584, 1378, 888)],
    '18-article-content': [(440, 640, 1378, 702), (430, 702, 1378, 888)],
    '19-block-menu': [(441, 641, 615, 693), (441, 697, 717, 886)],
    '20-settings-top': [(913, 314, 1216, 391), (431, 416, 735, 535), (752, 416, 1216, 516, 'right')],
    '21-bank-qr': [(913, 30, 1378, 106), (430, 156, 895, 338), (430, 364, 895, 606)],
    '22-orders': [(470, 352, 632, 396), (648, 352, 832, 396, 'top'), (850, 352, 1052, 396, 'top'), (448, 206, 564, 247)],
    '23-order-edit': [(913, 206, 1378, 326), (430, 352, 1378, 530), (1446, 232, 1729, 273)],
    '24-order-payment': [(430, 311, 1378, 582), (430, 607, 895, 708), (913, 607, 1378, 708)],
    '25-messages': [(486, 352, 640, 396), (1070, 352, 1210, 396, 'top'), (448, 206, 564, 247)],
    '26-header': [(430, 315, 1378, 523), (430, 550, 1378, 758), (430, 785, 1378, 861)],
    '27-footer': [(430, 315, 895, 471), (430, 498, 1378, 767), (430, 793, 895, 888)],
    '28-global': [(430, 314, 1376, 392), (430, 432, 1376, 746), (912, 774, 1376, 846)],
    '29-icons': [(430, 316, 894, 540), (914, 316, 1376, 540)],
    '30-media': [(1647, 27, 1750, 67), (400, 96, 772, 136), (400, 172, 724, 434)],
    '31-media-new': [(1647, 27, 1750, 67), (1506, 120, 1749, 166), (1506, 166, 1749, 210)],
    '33-password': [(157, 475, 1711, 712), (1652, 51, 1750, 92)],
    '34-article-new': [(430, 314, 895, 391), (913, 314, 1378, 436), (1446, 340, 1730, 430)],
}


def font(size):
    for path in ('/System/Library/Fonts/Supplemental/Arial Bold.ttf', '/System/Library/Fonts/Helvetica.ttc'):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def annotate(name, boxes):
    im = Image.open(RAW / f'{name}.jpg').convert('RGB')
    draw = ImageDraw.Draw(im)
    w, h = im.size
    f = font(26)
    for n, box in enumerate(boxes, 1):
        x0, y0, x1, y1 = box[:4]
        where = box[4] if len(box) > 4 else None
        draw.rounded_rectangle((x0 - 3, y0 - 3, x1 + 3, y1 + 3), radius=10, outline=RED, width=5)
        r = 21
        # Keep the badge off the label: above small targets, else just outside the left (or right) edge.
        if where == 'top':
            cx, cy = (x0 + x1) / 2, y0 - r - 8
        elif where == 'right':
            cx, cy = x1 + r + 9, y0 + r
        elif x0 < 12:  # the admin's left icon bar: badge to the right of the icon
            cx, cy = x1 + r + 8, (y0 + y1) / 2
        elif x1 - x0 < 70:
            cx, cy = (x0 + x1) / 2, y0 - r - 8 if y0 - 2 * r - 10 > 0 else y1 + r + 8
        elif x0 - 2 * r - 12 >= 0:
            cx, cy = x0 - r - 9, y0 + r
        elif x1 + 2 * r + 12 <= w:
            cx, cy = x1 + r + 9, y0 + r
        else:
            cx, cy = x0 + r + 4, y0 + r + 4
        cx, cy = min(max(cx, r + 2), w - r - 2), min(max(cy, r + 2), h - r - 2)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=RED, outline='white', width=3)
        draw.text((cx, cy + 1), str(n), fill='white', font=f, anchor='mm')
    im.save(OUT / f'{name}.jpg', 'JPEG', quality=84, optimize=True)


for raw in sorted(RAW.glob('*.jpg')):
    name = raw.stem
    if name in BOXES:
        annotate(name, BOXES[name])
    else:
        Image.open(raw).save(OUT / raw.name, 'JPEG', quality=84, optimize=True)
print('done', len(list(OUT.glob('*.jpg'))))
