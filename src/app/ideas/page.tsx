import { IndexFrame } from "@/components/content/IndexFrame";
import { getAll } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideas",
  description:
    "Deeper churn: memory, the four functions, and unity without erasure.",
};

export default function IdeasPage() {
  return (
    <IndexFrame
      title="Ideas"
      lede="Deeper churn. Depth and breadth, not word count."
      pieces={getAll("idea")}
    />
  );
}
