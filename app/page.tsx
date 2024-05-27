import Hero from "@/components/Hero";
import FilterDeBecas from "@/components/FilterDeBecas";
import BottomInfoBanner from "@/components/BottomInfoBanner";
import LogoSlider from "@/components/LogoSlider";
import Footer from "@/components/Footer";
import ActiveBecasModal from "@/components/ui/ActiveBecasModal";

export default function Home() {
  return (
    <>
      <main className="bg-[#EEEEEE]">
        <ActiveBecasModal />
        <Hero />
        <FilterDeBecas />
        <BottomInfoBanner />
        <LogoSlider />
        <Footer />
      </main>
    </>
  );
}
