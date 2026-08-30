import { IndexFrame } from "@/components/content/IndexFrame";
import { getAll } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Digests",
  description:
    "Short briefings on primary texts, plus a weekly cohesion watch: the pulse of what is holding a people together.",
};

export default function DigestsPage() {
  return (
    <IndexFrame
      title="Research Digests"
      lede="What the source said, and a weekly pulse of what is holding a people together, or inviting it to split."
      pieces={getAll("digest")}
    />
  );
}
