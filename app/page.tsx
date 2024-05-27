import Hero from "@/components/Hero";
import FilterDeBecas from "@/components/FilterDeBecas";
import BottomInfoBanner from "@/components/BottomInfoBanner";
import LogoSlider from "@/components/LogoSlider";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-[#EEEEEE]">
        <Hero />
        <FilterDeBecas />
        <BottomInfoBanner />
        <LogoSlider />
        <Footer />
      </main>
    </>
  );
}
