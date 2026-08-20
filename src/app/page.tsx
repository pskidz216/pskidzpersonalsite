import "./redesign.css";
import { RedesignNav } from "@/components/redesign/RedesignNav";
import { RedesignHero } from "@/components/redesign/RedesignHero";
import { IntroSection } from "@/components/redesign/IntroSection";
import { RecordGallery } from "@/components/redesign/RecordGallery";
import { SeedBanner } from "@/components/redesign/SeedBanner";
import { SystemsGrid } from "@/components/redesign/SystemsGrid";
import { BuildsList } from "@/components/redesign/BuildsList";
import { CredentialsList } from "@/components/redesign/CredentialsList";
import { ContactFooter } from "@/components/redesign/ContactFooter";
import { HowIWorkFlyout } from "@/components/redesign/HowIWorkFlyout";

export default function Home() {
  return (
    <>
      <RedesignNav />
      <main>
        <RedesignHero />
        <IntroSection />
        <RecordGallery />
        <SeedBanner />
        <SystemsGrid />
        <BuildsList />
        <CredentialsList />
        <ContactFooter />
      </main>
      <HowIWorkFlyout />
    </>
  );
}
