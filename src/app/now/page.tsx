import { IndexFrame } from "@/components/content/IndexFrame";
import { getAll } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Michigan now",
  description:
    "What is live for Sanatanis in Michigan this week. Short notes, not a membership feed.",
};

export default function NowPage() {
  return (
    <IndexFrame
      title="Michigan now"
      lede="What is live for Sanatanis in Michigan this week. A private chat is not the same as a public constituency."
      pieces={getAll("now")}
    />
  );
}
