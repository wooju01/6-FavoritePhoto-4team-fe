import LadingCTASection from "@/components/landings/LandingCTASection";
import LadingHeroSection from "@/components/landings/LandingHeroSection";
import LandingNotificationFeatureSection from "@/components/landings/LandingNotificationFeatureSection";
import LadingPointTradeSection from "@/components/landings/LandingPointTradeSection";
import LandingRandomPointBoxSection from "@/components/landings/LandingRandomPointBoxSection";
import Navbar from "@/components/layout/Header";

export default function RandingPage() {
  return (
    <div className="fixed z-[9999] left-0 top-0 w-full h-screen overflow-y-auto bg-my-black">
      <div>
        <Navbar />
        <LadingHeroSection />
        <LadingPointTradeSection />
        <LandingNotificationFeatureSection />
        <LandingRandomPointBoxSection />
        <LadingCTASection />
      </div>
    </div>
  );
}
