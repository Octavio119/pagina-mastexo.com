"use client";

import dynamic from "next/dynamic";

const WovenLightHero = dynamic(
  () => import("@/components/ui/woven-light-hero").then((m) => ({ default: m.WovenLightHero })),
  { ssr: false }
);

interface Props {
  onOpenModal: (category?: string) => void;
}

export default function WovenLightHeroClient({ onOpenModal }: Props) {
  return <WovenLightHero onOpenModal={onOpenModal} />;
}
