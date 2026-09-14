import EventSlideshow from "~/components/presentation/EventSlideshow";
import { createInaugurationDeck } from "~/features/hackathon/presentation/inauguration";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";

const deck = createInaugurationDeck();

export function meta() {
  return buildHackathonNoIndexMeta(
    "UKIS 2026 Inauguration",
    "The UKIS 2026 inauguration presentation — 15 September 2026, Prof. K.P. Nautiyal Auditorium, GEHU.",
  );
}

export default function HackathonInauguration() {
  return <EventSlideshow deck={deck} />;
}