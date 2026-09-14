import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} · Build what's next.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(145deg, #141414 0%, #1c1c1c 55%, #2a2a2a 100%)",
          color: "#f5f5f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#9a9a9a",
            fontWeight: 300,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 200,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Build what&apos;s next.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#bdbdbd",
              fontWeight: 300,
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Digital products · custom software · AI in the workflow
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
