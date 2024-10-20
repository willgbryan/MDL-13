import BettingResults from "@/components/betting-results";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import Analytics from "@/components/model-analytics";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      {/* <Hero /> */}
      <BettingResults />
      {/* <Pricing />
      <CTA /> */}
    </main>
  );
}
