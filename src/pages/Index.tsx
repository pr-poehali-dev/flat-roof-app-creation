import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConsultantSection from "@/components/ConsultantSection";
import ContentSections from "@/components/ContentSections";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-[#E8EAF0] font-golos">
      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroSection scrollTo={scrollTo} />
      <ConsultantSection />
      <ContentSections />
    </div>
  );
}
