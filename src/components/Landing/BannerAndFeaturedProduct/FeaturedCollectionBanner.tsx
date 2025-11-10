"use client";

import React from "react";
import { collections } from "./collectionsData";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

interface FeaturedCollectionBannerProps {
  section: "left" | "right";
}

export default function FeaturedCollectionBanner({
  section,
}: FeaturedCollectionBannerProps) {
  const collection = collections[0];

  // Render Left Section (Titolo + Immagini)
  if (section === "left") {
    return <LeftSection collection={collection} />;
  }

  // Render Right Section (Descrizione + CTA)
  if (section === "right") {
    return <RightSection collection={collection} />;
  }

  return null;
}
