import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.tagline;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0d0b0a",
          padding: 72,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 72,
            width: 88,
            height: 88,
            borderRadius: 999,
            border: "3px solid #d98b45",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#d98b45",
              display: "flex",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d98b45",
            display: "flex",
          }}
        >
          Eternal Order | Sanatan Dharma
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 68,
            lineHeight: 1.05,
            color: "#f5ece0",
            maxWidth: 940,
            display: "flex",
          }}
        >
          A Way of Life, not a Religion.
        </div>
      </div>
    ),
    size,
  );
}
