"use client";

import React, { useState } from "react";
import { collections } from "./collectionsData";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

interface FeaturedCollectionBannerProps {
  section: "left" | "right";
}

export default function FeaturedCollectionBanner({
  section,
}: FeaturedCollectionBannerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const collection = collections[selectedIndex];

  const scrollPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? collections.length - 1 : prev - 1
    );
  };

  const scrollNext = () => {
    setSelectedIndex((prev) =>
      prev === collections.length - 1 ? 0 : prev + 1
    );
  };

  // Render Left Section (Titolo + Immagini)
  if (section === "left") {
    return <LeftSection collection={collection} />;
  }

  // Render Right Section (Descrizione + CTA)
  if (section === "right") {
    return (
      <RightSection
        collection={collection}
        onPrevious={scrollPrev}
        onNext={scrollNext}
      />
    );
  }

  return null;
}
