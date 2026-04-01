import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Connector } from "@/components/sections/Connector";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { AiApproach } from "@/components/sections/AiApproach";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Connector />
        <Timeline />
        <Skills />
        <AiApproach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
