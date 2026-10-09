import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <main id="main" className="container not-found"><p className="eyebrow">404 / AN UNCHARTED CORNER</p><h1>This page hasn’t<br />been built.</h1><p>Let’s get you back to the work.</p><Button asChild><Link href="/"><ArrowLeft aria-hidden="true" />Back to the portfolio</Link></Button></main>;
}
