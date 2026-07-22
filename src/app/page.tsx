import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import WhyMahir from "@/components/WhyMahir";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Process />
      <Portfolio />
      <Pricing />
      <WhyMahir />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
