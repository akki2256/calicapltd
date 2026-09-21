"""Retint official mark to Canvas steel palette and emit favicon sizes.

Geometry is unchanged. Blues/silvers are remapped onto the live Canvas tokens:
  accent #8aabbc · mid #c5d4dc · highlight #f5f5f3 · graphite #0c0d10
"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(r"c:\Users\dpgol\OneDrive\Desktop\Cursor 2\Calicon")
SRC = ROOT / "public" / "brand" / "calicon-logo.png"
BRAND = ROOT / "public" / "brand"
APP = ROOT / "src" / "app"
PUBLIC = ROOT / "public"

# Canvas theme stops (luminance 0 → 1)
TRACE = [
    (0.00, (42, 52, 60)),
    (0.22, (74, 98, 112)),
    (0.48, (109, 138, 154)),
    (0.66, (138, 171, 188)),  # --color-accent
    (0.82, (176, 201, 212)),  # --color-link-hover
    (0.92, (197, 212, 220)),  # --color-gradient-mid
    (1.00, (245, 245, 243)),  # --color-text-strong
]

METAL = [
    (0.00, (58, 62, 68)),
    (0.45, (138, 146, 152)),
    (0.75, (197, 204, 210)),
    (1.00, (232, 232, 230)),
]


def lerp_stop(stops: list[tuple[float, tuple[int, int, int]]], t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]
        t1, c1 = stops[i + 1]
        if t <= t1:
            u = 0.0 if t1 == t0 else (t - t0) / (t1 - t0)
            return (
                int(c0[0] + (c1[0] - c0[0]) * u),
                int(c0[1] + (c1[1] - c0[1]) * u),
                int(c0[2] + (c1[2] - c0[2]) * u),
            )
    return stops[-1][1]


def remint(img: Image.Image) -> Image.Image:
    src = img.convert("RGBA")
    out = Image.new("RGBA", src.size)
    sp = src.load()
    op = out.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = sp[x, y]
            if a == 0:
                op[x, y] = (0, 0, 0, 0)
                continue
            mx = max(r, g, b)
            mn = min(r, g, b)
            sat = 0.0 if mx == 0 else (mx - mn) / mx
            ylin = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0
            # Preserve highlight punch of the circuit nodes
            t = ylin ** 0.92
            if sat < 0.14 and abs(r - g) < 22:
                nr, ng, nb = lerp_stop(METAL, t)
            else:
                nr, ng, nb = lerp_stop(TRACE, t)
            op[x, y] = (nr, ng, nb, a)
    return out


def square_pad(img: Image.Image, pad_ratio: float = 0.08) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    cropped = img.crop(bbox)
    w, h = cropped.size
    side = max(w, h)
    pad = int(side * pad_ratio)
    canvas = Image.new("RGBA", (side + pad * 2, side + pad * 2), (0, 0, 0, 0))
    canvas.paste(cropped, ((side - w) // 2 + pad, (side - h) // 2 + pad), cropped)
    return canvas


def brighten_mark(img: Image.Image) -> Image.Image:
    """Lift midtones so the C remains readable at 16–32px."""
    src = img.convert("RGBA")
    out = Image.new("RGBA", src.size)
    sp = src.load()
    op = out.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = sp[x, y]
            if a < 12:
                op[x, y] = (0, 0, 0, 0)
                continue
            # Pull toward Canvas highlight while keeping steel hue
            nr = min(255, int(r * 0.35 + 197 * 0.35 + 245 * 0.30))
            ng = min(255, int(g * 0.35 + 212 * 0.35 + 245 * 0.30))
            nb = min(255, int(b * 0.35 + 220 * 0.35 + 243 * 0.30))
            op[x, y] = (nr, ng, nb, 255)
    return out


def tile(img: Image.Image, size: int, bg: tuple[int, int, int, int] = (12, 13, 16, 255)) -> Image.Image:
    """Opaque Canvas-surface tile with the mark inset."""
    mark = img.copy()
    inset = max(2, round(size * 0.12))
    inner = size - inset * 2
    mark.thumbnail((inner, inner), Image.Resampling.LANCZOS)
    sq = Image.new("RGBA", (size, size), bg)
    x = (size - mark.size[0]) // 2
    y = (size - mark.size[1]) // 2
    sq.paste(mark, (x, y), mark)
    return sq.convert("RGBA")


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print("wrote", path, img.size)


def main() -> None:
    original = Image.open(SRC)
    canvas = remint(original)

    master = BRAND / "calicon-logo-canvas.png"
    canvas.save(master, "PNG", optimize=True)
    print("master", canvas.size, master)

    compact = canvas.copy()
    compact.thumbnail((512, 512), Image.Resampling.LANCZOS)
    compact_path = BRAND / "calicon-logo-canvas-512.png"
    compact.save(compact_path, "PNG", optimize=True)
    print("compact", compact.size, compact_path)

    mark = brighten_mark(square_pad(canvas, pad_ratio=0.04))
    icon_32 = tile(mark, 32)
    icon_48 = tile(mark, 48)
    icon_180 = tile(mark, 180)
    icon_512 = tile(mark, 512)

    save_png(icon_48, APP / "icon.png")
    save_png(icon_180, APP / "apple-icon.png")
    save_png(icon_32, PUBLIC / "favicon-32.png")
    save_png(icon_512, PUBLIC / "brand" / "calicon-favicon-512.png")

    ico_16 = tile(mark, 16)
    ico_path = PUBLIC / "favicon.ico"
    app_ico = APP / "favicon.ico"
    icon_32.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32)])
    icon_32.save(app_ico, format="ICO", sizes=[(16, 16), (32, 32)])
    print("wrote", ico_path)
    print("wrote", app_ico)
    _ = ico_16


if __name__ == "__main__":
    main()
