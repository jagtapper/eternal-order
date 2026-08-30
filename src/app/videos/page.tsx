import { IndexFrame } from "@/components/content/IndexFrame";
import { getAll } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shorts",
  description: "Short notes on artha, attention, the yugas, and the inner instrument.",
};

export default function VideosPage() {
  return (
    <IndexFrame
      title="Shorts"
      lede="Short notes. Read once, then sit with it."
      pieces={getAll("video")}
    />
  );
}
