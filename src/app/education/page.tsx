import { IndexFrame } from "@/components/content/IndexFrame";
import { getAll } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
  description:
    "The inner instrument, the four yugas, the four aims, the caste system, pancha mahabhuta and panchamrita, the epics.",
};

export default function EducationPage() {
  return (
    <IndexFrame
      title="Education"
      lede="A way of life, walked in pieces: how the mind is built, four ages, four aims, how a society divided its labor, two rows of fives, then the stories."
      pieces={getAll("education")}
    />
  );
}
