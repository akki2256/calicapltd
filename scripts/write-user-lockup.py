"""Assemble Calicon lockup/mark SVGs from the user-provided path data file."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
APP = ROOT / "src" / "app"
PATH_FILE = ROOT / "scripts" / "calicon-official-path.d.txt"

# Canvas steel
GRADIENT = """  <defs>
    <linearGradient id="calicon-steel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5f5f3"/>
      <stop offset="45%" stop-color="#c5d4dc"/>
      <stop offset="100%" stop-color="#8aabbc"/>
    </linearGradient>
  </defs>"""


def main() -> None:
    d = PATH_FILE.read_text(encoding="utf-8").strip()
    if not d.startswith("M "):
        raise SystemExit(f"Invalid path data in {PATH_FILE}")

    # User source viewBox is 0 0 1400 781 with large empty margins.
    # Crop to the inked lockup so CSS height sizing keeps the mark readable.
    lockup_vb = "120 270 1160 250"
    mark_vb = "115 270 250 250"

    lockup = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{lockup_vb}" fill="none" role="img" aria-label="Calicon">
  <title>Calicon</title>
{GRADIENT}
  <path fill="url(#calicon-steel)" fill-rule="evenodd" d="{d}"/>
</svg>
'''
    mark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{mark_vb}" fill="none" role="img" aria-label="Calicon">
  <title>Calicon</title>
{GRADIENT}
  <path fill="url(#calicon-steel)" fill-rule="evenodd" d="{d}"/>
</svg>
'''
    (BRAND / "calicon-lockup.svg").write_text(lockup, encoding="utf-8")
    (BRAND / "calicon-mark.svg").write_text(mark, encoding="utf-8")
    (APP / "icon.svg").write_text(mark, encoding="utf-8")
    print("wrote lockup/mark/icon.svg")
    print(f"lockup aspect {1160/250:.4f}")
    print(f"path chars {len(d)}")


if __name__ == "__main__":
    main()

