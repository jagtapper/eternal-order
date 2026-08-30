export const site = {
  name: "Eternal Order | Sanatan Dharma",
  shortName: "Eternal Order",
  subtitle: "Sanatan Dharma",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Eternal Order | Sanatan Dharma",
  tagline: "A Way of Life, not a Religion.",
  description:
    "Sanatan dharma as eternal order: a philosophy and way of life. The fourfold inner instrument, the four yugas, the four aims, the caste system as division of labor, and pancha mahabhuta beside panchamrita.",
} as const;

export const nav = [
  { href: "/education", label: "Education" },
  { href: "/videos", label: "Shorts" },
  { href: "/digests", label: "Digests" },
  { href: "/ideas", label: "Ideas" },
  { href: "/about", label: "About" },
] as const;

export const purusharthas = [
  {
    slug: "dharma",
    title: "Dharma",
    sanskrit: "धर्म",
    kicker: "How you hold the line",
    body: "The restraint that keeps the other three aims from wrecking you. Duty, yes, but also the grain of things: what can be done without lying to yourself.",
    image: "/images/dharma-svadharma.jpg",
    alt: "A solitary oil lamp burning in a carved stone alcove",
  },
  {
    slug: "artha",
    title: "Artha",
    sanskrit: "अर्थ",
    kicker: "The means to stand",
    body: "Livelihood, property, skill, a surplus you can share. The old thought never treated wealth as a sin. It treated unbound appetite as disorder.",
    image: "/images/dharma-rashtra.jpg",
    alt: "An empty stone assembly hall with a bar of dawn light",
  },
  {
    slug: "kama",
    title: "Kama",
    sanskrit: "काम",
    kicker: "Desire with a house around it",
    body: "Love, beauty, children, the ordinary hunger to be close to someone. Not a guilty leftover. A legitimate aim, provided it does not eat the other three.",
    image: "/images/dharma-kula.jpg",
    alt: "Two ancestral doorways opening onto a dusk courtyard",
  },
  {
    slug: "moksha",
    title: "Moksha",
    sanskrit: "मोक्ष",
    kicker: "The room that keeps the rest honest",
    body: "Release. The reminder that even a well-run life is not the last word. Without this, dharma becomes policing, artha becomes hoarding, kama becomes appetite with a speech.",
    image: "/images/dharma-sanatana.jpg",
    alt: "A dark archive corridor of manuscripts ending in saffron light",
  },
] as const;

export const yugas = [
  {
    slug: "satya",
    title: "Satya Yuga",
    also: "Krita",
    sanskrit: "सत्य युग",
    kicker: "Dharma on four legs",
    body: "The age of truth. Memory is whole. Speech, act, and inner life still match. Also called Krita: what is done is complete.",
    image: "/images/yuga-satya.jpg",
    alt: "Four gold lamp flames burning evenly in a dark stone courtyard",
  },
  {
    slug: "treta",
    title: "Treta Yuga",
    also: "Three",
    sanskrit: "त्रेता युग",
    kicker: "Dharma on three legs",
    body: "A third of the fullness is gone. Ritual and kingship have to carry what once lived unforced. Traditional placement of the Ramayana.",
    image: "/images/yuga-treta.jpg",
    alt: "Three ritual fire altars receding in a stone hall at dusk",
  },
  {
    slug: "dvapara",
    title: "Dvapara Yuga",
    also: "Two",
    sanskrit: "द्वापर युग",
    kicker: "Dharma on two legs",
    body: "Certainty thins. Kin, law, and desire collide. Traditional placement of the Mahabharata. Memory still works, but it has to be argued for.",
    image: "/images/yuga-dvapara.jpg",
    alt: "Two facing stone seats across a cracked floor with scattered dice",
  },
  {
    slug: "kali",
    title: "Kali Yuga",
    also: "The thin age",
    sanskrit: "कलि युग",
    kicker: "Dharma on one leg",
    body: "The store is noisy and short. Forgetting is the weather. Remembering who we are becomes a practice, not a default. That is why a journal like this exists.",
    image: "/images/yuga-kali.jpg",
    alt: "A single thin saffron wick burning in a vast dark warehouse",
  },
] as const;

export const varnas = [
  {
    slug: "brahmana",
    title: "Brahmana",
    sanskrit: "ब्राह्मण",
    kicker: "Learning and counsel",
    body: "Study, teaching, and advice that can tell power no. In the division of labor this is the knowledge function. Skill and conduct could move a person toward it.",
    image: "/images/varna-brahmana.jpg",
    alt: "A study desk of palm-leaf manuscripts and a saffron lamp",
  },
  {
    slug: "kshatriya",
    title: "Kshatriya",
    sanskrit: "क्षत्रिय",
    kicker: "Protection and public duty",
    body: "The security function: force with a limit, so a household can sleep and a market can open. Recognition and service, not only birth, were how standing was supposed to move.",
    image: "/images/varna-kshatriya.jpg",
    alt: "A sheathed sword and shield on a stone bench in an empty guard room",
  },
  {
    slug: "vaishya",
    title: "Vaishya",
    sanskrit: "वैश्य",
    kicker: "Production and trade",
    body: "Grain, cattle, craft-wealth, commerce. The surplus function. A people that cannot make and trade cannot feed its other work.",
    image: "/images/varna-vaishya.jpg",
    alt: "Brass scales, grain sacks, and coins on a merchant counter",
  },
  {
    slug: "shudra",
    title: "Shudra",
    sanskrit: "शूद्र",
    kicker: "Craft, service, making",
    body: "The making function: build, mend, serve, keep the ordinary day possible. Not leftover labor. The rest of the system cannot eat without it.",
    image: "/images/varna-shudra.jpg",
    alt: "A potter's wheel with wet clay in a dark workshop",
  },
] as const;

export const antahkarana = [
  {
    slug: "citta",
    title: "Citta",
    sanskrit: "चित्त",
    kicker: "The store",
    body: "Mind-stuff. Impressions, habits, the sediment of what you have lived. This is the faculty closest to memory. The others work in it and on it.",
    image: "/images/mind-citta.jpg",
    alt: "Gold dust settling in layered sediment in a dark stone basin",
  },
  {
    slug: "manas",
    title: "Manas",
    sanskrit: "मनस्",
    kicker: "The mover",
    body: "The mind that receives the senses, wavers, wants, and compares. It does not decide. It brings the next thing into view.",
    image: "/images/mind-manas.jpg",
    alt: "A dark pool with many crossing ripples going different ways",
  },
  {
    slug: "buddhi",
    title: "Buddhi",
    sanskrit: "बुद्धि",
    kicker: "The judge",
    body: "Discernment. The cut that says this, not that. Without buddhi, memory is only weather and manas never lands.",
    image: "/images/mind-buddhi.jpg",
    alt: "A single sharp blade of saffron light cutting a dark room in two",
  },
  {
    slug: "ahamkara",
    title: "Ahamkara",
    sanskrit: "अहंकार",
    kicker: "The I-maker",
    body: "The sense that a thought, a memory, a duty is mine. Needed to walk a life. Ruinous when it swallows the other three.",
    image: "/images/mind-ahamkara.jpg",
    alt: "A dark bronze hand-mirror standing on a stone floor",
  },
] as const;

export const mahabhuta = [
  {
    slug: "earth",
    title: "Earth",
    sanskrit: "Prthivi",
    role: "Support",
    body: "Solidity, smell, the ground that holds a house.",
    image: "/images/element-earth.jpg",
    alt: "Dark basalt and ochre earth with mineral dust",
  },
  {
    slug: "water",
    title: "Water",
    sanskrit: "Apas",
    role: "Cohesion",
    body: "Flow, binding, what moves without going rigid.",
    image: "/images/element-water.jpg",
    alt: "Black still water with a single gold ripple",
  },
  {
    slug: "fire",
    title: "Fire",
    sanskrit: "Agni",
    role: "Transformation",
    body: "Heat, form, the cook that can also burn.",
    image: "/images/element-fire.jpg",
    alt: "A single small flame rising from dark charcoal",
  },
  {
    slug: "air",
    title: "Air",
    sanskrit: "Vayu",
    role: "Motion",
    body: "Contact, travel, the weather between things.",
    image: "/images/element-air.jpg",
    alt: "A thin veil of smoke folding through near-black space",
  },
  {
    slug: "space",
    title: "Space",
    sanskrit: "Akasa",
    role: "The field",
    body: "Openness, the room in which the rest can happen.",
    image: "/images/element-space.jpg",
    alt: "A near-void field with one distant saffron point of light",
  },
] as const;

export const panchamrita = [
  {
    slug: "curd",
    title: "Curd",
    sanskrit: "Dadhi",
    pairsWith: "Earth",
    body: "Substance that has set.",
    image: "/images/nectar-curd.jpg",
    alt: "A brass bowl of thick curd in saffron lamp light",
  },
  {
    slug: "milk",
    title: "Milk",
    sanskrit: "Ksheera",
    pairsWith: "Water",
    body: "Flow that still nourishes.",
    image: "/images/nectar-milk.jpg",
    alt: "A brass bowl of milk in saffron lamp light",
  },
  {
    slug: "ghee",
    title: "Ghee",
    sanskrit: "Ghrita",
    pairsWith: "Fire",
    body: "What fire has refined.",
    image: "/images/nectar-ghee.jpg",
    alt: "A brass bowl of ghee in saffron lamp light",
  },
  {
    slug: "honey",
    title: "Honey",
    sanskrit: "Madhu",
    pairsWith: "Air",
    body: "Gathered from many flights.",
    image: "/images/nectar-honey.jpg",
    alt: "A brass bowl of honey in saffron lamp light",
  },
  {
    slug: "sugar",
    title: "Sugar",
    sanskrit: "Sharkara",
    pairsWith: "Space",
    body: "What dissolves and fills.",
    image: "/images/nectar-sugar.jpg",
    alt: "A brass dish of sugar crystals in saffron lamp light",
  },
] as const;

export type Kind = "education" | "video" | "digest" | "idea" | "now";

export const kindMeta: Record<
  Kind,
  { label: string; href: string; folder: string; singular: string }
> = {
  education: {
    label: "Education",
    href: "/education",
    folder: "education",
    singular: "Lesson",
  },
  video: {
    label: "Shorts",
    href: "/videos",
    folder: "videos",
    singular: "Short",
  },
  digest: {
    label: "Digests",
    href: "/digests",
    folder: "digests",
    singular: "Digest",
  },
  idea: {
    label: "Ideas",
    href: "/ideas",
    folder: "ideas",
    singular: "Idea",
  },
  now: {
    label: "Michigan now",
    href: "/now",
    folder: "now",
    singular: "Now",
  },
};
