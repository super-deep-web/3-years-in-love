import PageWrapper from '@/components/layout/PageWrapper';
import HeroSection from '@/components/sections/HeroSection';
import PetalsBackground from '@/components/ui/PetalsBackground';

export default function HomePage() {
  return (
    <PageWrapper>
      <PetalsBackground />
      <HeroSection />
    </PageWrapper>
  );
}