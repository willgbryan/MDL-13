import Analytics from "@/components/analytics";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      {/* <Hero /> */}
      <Analytics />
      {/* <Pricing />
      <CTA /> */}
    </main>
  );
}
