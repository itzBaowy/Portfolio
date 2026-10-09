import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";

export default function Home() {
  return <main id="main"><Hero /><About /><Journey /><section id="work" className="container section"><p className="eyebrow">SELECTED WORK / PROJECT BRIEFS COMING NEXT</p><h2>Ideas into interfaces.</h2></section></main>;
}
