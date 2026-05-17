import { Hero } from '@/components/Hero';
import {
  ActiveRecall,
  AlphabetShowcase,
  DailyPractice,
  FeaturesGrid,
  FooterCTA,
  MistakeRepetition,
  WhyWriting,
} from '@/sections/landing';

export function LandingPage() {
  return (
    <>
      <Hero />
      <WhyWriting />
      <ActiveRecall />
      <AlphabetShowcase />
      <FeaturesGrid />
      <DailyPractice />
      <MistakeRepetition />
      <FooterCTA />
    </>
  );
}
