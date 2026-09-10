"""Privacy scrub for Calicap India case-study screenshots."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ASSETS = Path(
    r"C:\Users\dpgol\.cursor\projects\c-Users-dpgol-OneDrive-Desktop-Cursor-2-Calicon\assets"
)
OUT = Path(__file__).resolve().parents[1] / "public" / "images" / "case-studies"

FILES = {
    "crm-dashboard.png": "c__Users_dpgol_AppData_Roaming_Cursor_User_workspaceStorage_e86df5c1ee3ab5a22ca389e63f98bd78_images_image-287bbe28-138b-4a99-a445-22d5aa4e662c.png",
    "crm-deals.png": "c__Users_dpgol_AppData_Roaming_Cursor_User_workspaceStorage_e86df5c1ee3ab5a22ca389e63f98bd78_images_image-af95bacc-2630-4940-9aab-df0493b5e843.png",
    "crm-workflow.png": "c__Users_dpgol_AppData_Roaming_Cursor_User_workspaceStorage_e86df5c1ee3ab5a22ca389e63f98bd78_images_image-221e5bd9-1f7b-496f-859f-bfa2cdf0a810.png",
}

# Prefer over-redacting people / money / partners. Keep chrome + generic labels.
REGION_MAP = {
    "crm-dashboard.png": [
        (0.10, 0.04, 0.325, 0.49),
        (0.325, 0.08, 0.535, 0.49),
        (0.535, 0.08, 0.755, 0.49),
        (0.755, 0.04, 0.995, 0.49),
        (0.325, 0.51, 0.535, 0.97),
        (0.535, 0.55, 0.755, 0.93),
    ],
    "crm-deals.png": [
        # Full metrics strip under column titles
        (0.10, 0.08, 0.92, 0.32),
        # Card stacks
        (0.10, 0.28, 0.31, 0.995),
        (0.31, 0.28, 0.51, 0.995),
        (0.51, 0.28, 0.71, 0.995),
        (0.71, 0.28, 0.91, 0.995),
    ],
    "crm-workflow.png": [
        (0.08, 0.0, 0.48, 0.14),
        (0.80, 0.0, 0.96, 0.16),
        (0.14, 0.36, 0.58, 0.54),
        (0.10, 0.52, 0.55, 0.76),
    ],
}


def scrub_region(base: Image.Image, box: tuple[int, int, int, int]) -> None:
    crop = base.crop(box)
    # Pixelate until glyphs are unreadable, then soft-frost.
    factor = 14
    tiny = crop.resize(
        (max(1, crop.width // factor), max(1, crop.height // factor)),
        Image.Resampling.BILINEAR,
    )
    scrubbed = tiny.resize(crop.size, Image.Resampling.NEAREST).filter(
        ImageFilter.GaussianBlur(radius=6)
    )
    frost = Image.new("RGBA", scrubbed.size, (245, 245, 248, 110))
    scrubbed = scrubbed.convert("RGBA")
    scrubbed = Image.alpha_composite(scrubbed, frost)

    mask = Image.new("L", scrubbed.size, 0)
    draw = ImageDraw.Draw(mask)
    pad = max(6, min(scrubbed.size) // 18)
    draw.rounded_rectangle(
        [0, 0, scrubbed.size[0] - 1, scrubbed.size[1] - 1],
        radius=pad,
        fill=255,
    )
    base.paste(scrubbed, (box[0], box[1]), mask)


def scrub_image(im: Image.Image, regions) -> Image.Image:
    w, h = im.size
    base = im.convert("RGBA")
    for x0f, y0f, x1f, y1f in regions:
        box = (int(x0f * w), int(y0f * h), int(x1f * w), int(y1f * h))
        scrub_region(base, box)
    return base.convert("RGB")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for out_name, src_name in FILES.items():
        result = scrub_image(Image.open(ASSETS / src_name), REGION_MAP[out_name])
        dest = OUT / out_name
        result.save(dest, "PNG", optimize=True)
        print(f"wrote {dest} {result.size}")


if __name__ == "__main__":
    main()
