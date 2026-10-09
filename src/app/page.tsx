import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Work } from "@/components/sections/work";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Journey />
      <Work />
      <Skills />
      <Contact />
    </main>
  );
}
