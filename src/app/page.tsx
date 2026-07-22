import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Guarantee from "@/components/Guarantee";
import WhyMahir from "@/components/WhyMahir";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Problem />
      <Solution />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Guarantee />
      <WhyMahir />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
