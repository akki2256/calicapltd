"""Convert official Calicon logo JPEG (white bg) to transparent PNG."""
from PIL import Image
import os

src = r"C:\Users\dpgol\.cursor\projects\c-Users-dpgol-OneDrive-Desktop-Cursor-2-Calicon\assets\c__Users_dpgol_AppData_Roaming_Cursor_User_workspaceStorage_e86df5c1ee3ab5a22ca389e63f98bd78_images_Calicon_minimalist_logo_design_2K_20260920145421.jpeg_20260920150053-e402d12e-49d3-4d25-9e6a-7be4becf3a5d.jpg"
out_dir = r"c:\Users\dpgol\OneDrive\Desktop\Cursor 2\Calicon\public\brand"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        mx = max(r, g, b)
        mn = min(r, g, b)
        # Near-white / light gray background (desaturated and bright)
        if mx >= 235 and (mx - mn) <= 18:
            pixels[x, y] = (r, g, b, 0)
        elif mx >= 220 and (mx - mn) <= 12:
            alpha = int(255 * (1 - (mx - 220) / 35))
            pixels[x, y] = (r, g, b, max(0, min(255, alpha)))

bbox = img.getbbox()
if bbox:
    pad = 8
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(w, r + pad)
    b = min(h, b + pad)
    img = img.crop((l, t, r, b))

master_path = os.path.join(out_dir, "calicon-logo.png")
img.save(master_path, "PNG", optimize=True)

header = img.copy()
header.thumbnail((512, 512), Image.Resampling.LANCZOS)
header_path = os.path.join(out_dir, "calicon-logo-512.png")
header.save(header_path, "PNG", optimize=True)

print("master", img.size, master_path)
print("header", header.size, header_path)
print("alpha sample corner:", img.getpixel((0, 0)))
center = (img.size[0] // 2, img.size[1] // 2)
print("alpha sample center:", img.getpixel(center))
