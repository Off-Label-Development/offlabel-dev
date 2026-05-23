import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Approach } from "@/components/approach";
import { Services } from "@/components/services";
import { Connect } from "@/components/connect";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Approach />
        <Services />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
