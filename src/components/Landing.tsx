"use client";

import { HeroCategoriesCarousel } from "./Landing/Categories/HeroCategoriesCarousel";

const Landing = () => {
  return (
    <section className="relative bg-zinc-950 font-jost min-h-screen flex flex-col items-center justify-center py-20">
      <div className="relative w-full">
        <HeroCategoriesCarousel />
      </div>
    </section>
  );
};

export default Landing;
