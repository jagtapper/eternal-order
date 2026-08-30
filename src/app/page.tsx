import { Closing } from "@/components/home/Closing";
import { DharmaAspects } from "@/components/home/DharmaAspects";
import { DigitalElements } from "@/components/home/DigitalElements";
import { Epics } from "@/components/home/Epics";
import { FeaturedFilm } from "@/components/home/FeaturedFilm";
import { FourVarnas } from "@/components/home/FourVarnas";
import { Hero } from "@/components/home/Hero";
import { InnerInstrument } from "@/components/home/InnerInstrument";
import { UnityLesson } from "@/components/home/UnityLesson";
import { Yugas } from "@/components/home/Yugas";
import { getAllArticles, getFeatured } from "@/lib/content";
import { getNowNotes, getSpotlights } from "@/lib/now";

export const dynamic = "force-dynamic";

export default function Home() {
  const featured = getFeatured();
  const articles = getAllArticles();
  const newest =
    articles.find((item) => item.kind !== "now") ?? featured;
  const notes = getNowNotes();
  const spotlights = getSpotlights();

  return (
    <>
      <Hero newest={newest!} notes={notes} spotlights={spotlights} />
      <FourVarnas />
      <DharmaAspects />
      <Yugas />
      <Epics />
      <UnityLesson />
      <DigitalElements />
      <FeaturedFilm piece={featured} />
      <InnerInstrument />
      <Closing />
    </>
  );
}
