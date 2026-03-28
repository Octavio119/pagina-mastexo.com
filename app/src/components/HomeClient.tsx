"use client";

import { useState } from "react";
import WovenLightHeroClient from "@/components/WovenLightHeroClient";
import RadarServices from "@/components/RadarServices";
import TrustSection from "@/components/TrustSection";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ContactModal } from "@/components/ui/contact-modal";

export default function HomeClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const openModal = (category = "") => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  return (
    <>
      <StickyHeader onOpenModal={() => openModal()} />
      <WovenLightHeroClient onOpenModal={openModal} />
      <RadarServices onOpenModal={openModal} />
      <TrustSection onOpenModal={() => openModal()} />
      <ProcessSection onOpenModal={() => openModal()} />
      <BenefitsSection onOpenModal={() => openModal()} />
      <Footer />
      <WhatsAppButton />
      <ContactModal
        isOpen={modalOpen}
        category={selectedCategory || "General"}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
