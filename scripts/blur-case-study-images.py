"""
Legacy helper — do not scrub Calicap CRM case-study screenshots.

Product captures are supplied already cleaned. Copy source files into
public/images/case-studies/ as-is; do not re-run pixelation on them.
"""

from pathlib import Path

print(
    "Skipped: CRM case-study images are used as provided. "
    f"See {(Path(__file__).resolve().parents[1] / 'public' / 'images' / 'case-studies')}."
)
