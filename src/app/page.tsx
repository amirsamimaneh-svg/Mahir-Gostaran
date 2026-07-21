import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Results from "@/components/Results";
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
      <Results />
      <WhyMahir />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
