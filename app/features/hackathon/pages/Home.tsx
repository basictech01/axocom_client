/**
 * Home - editorial UKIS composition.
 * Section components live in ~/features/hackathon/components/home.
 */
import {
  HomeHero,
  HomePartners,
  HomePrizes,
  HomeWhatIs,
  HomeJourney,
  HomeParticipants,
  HomeLeadership,
  HomeOrgSections,
  HomeFeaturedProblems,
  HomeContrastCta,
  HomeSpeakers,
  HomeHiringPartners,
  HomeFinalCta,
  HomeCommunity,
} from "~/features/hackathon/components/home";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomePartners />
      <HomePrizes />
      <HomeLeadership />
      <HomeWhatIs />
      <HomeJourney />
      <HomeParticipants />
      <HomeSpeakers />
      <HomeHiringPartners />
      <HomeFeaturedProblems />
      <HomeOrgSections />
      <HomeContrastCta />
      <HomeFinalCta />
      <HomeCommunity />
    </div>
  );
}
