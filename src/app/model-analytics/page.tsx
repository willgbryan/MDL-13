import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import Analytics from "@/components/model-analytics";
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
