import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Connector } from "@/components/sections/Connector";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { AiApproach } from "@/components/sections/AiApproach";
import { FlagshipProject } from "@/components/sections/FlagshipProject";
import { Built } from "@/components/sections/Built";
import { OffTheClock } from "@/components/sections/OffTheClock";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="video"
        href="/hero/pingpong-loop.mp4"
        type="video/mp4"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="video"
        href="/hero/chrome-loop-mobile.mp4"
        type="video/mp4"
        media="(max-width: 768px)"
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Connector />
        <Timeline />
        <Skills />
        <Certifications />
        <AiApproach />
        <FlagshipProject />
        <Built />
        <OffTheClock />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
