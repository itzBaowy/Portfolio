import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Work } from "@/components/sections/work";

export default function Home() {
  return <main id="main"><Hero /><About /><Journey /><Work /></main>;
}
