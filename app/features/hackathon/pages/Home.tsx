/**
 * Home — editorial UKIS composition.
 * Section components live in ~/features/hackathon/components/home.
 */
import {
  HomeHero,
  HomePartners,
  HomeWhatIs,
  HomeDomains,
  HomeJourney,
  HomeParticipants,
  HomeFeaturedProblems,
  HomeContrastCta,
  HomeSpeakers,
  HomeFinalCta,
  HomeCommunity,
} from "~/features/hackathon/components/home";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomePartners />
      <HomeWhatIs />
      <HomeDomains />
      <HomeJourney />
      <HomeParticipants />
      <HomeFeaturedProblems />
      <HomeContrastCta />
      <HomeSpeakers />
      <HomeFinalCta />
      <HomeCommunity />
    </div>
  );
}
