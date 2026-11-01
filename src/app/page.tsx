import "./redesign.css";
import { RedesignNav } from "@/components/redesign/RedesignNav";
import { RedesignHero } from "@/components/redesign/RedesignHero";
import { IntroSection } from "@/components/redesign/IntroSection";
import { CaseStudyFeature } from "@/components/redesign/CaseStudyFeature";
import { RecordGallery } from "@/components/redesign/RecordGallery";
import { ReelBand } from "@/components/redesign/ReelBand";
import { SystemsGrid } from "@/components/redesign/SystemsGrid";
import { BuildsList } from "@/components/redesign/BuildsList";
import { CredentialsList } from "@/components/redesign/CredentialsList";
import { OffClockSection } from "@/components/redesign/OffClockSection";
import { ContactFooter } from "@/components/redesign/ContactFooter";

export default function Home() {
  return (
    <>
      <RedesignNav />
      <main>
        <RedesignHero />
        <IntroSection />
        <CaseStudyFeature />
        <RecordGallery />
        <ReelBand />
        <SystemsGrid />
        <BuildsList />
        <CredentialsList />
        <OffClockSection />
        <ContactFooter />
      </main>
    </>
  );
}
