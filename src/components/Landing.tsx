"use client";

import { HeroCategories } from "./Landing/Categories/HeroCategories";

const Landing = () => {
  return (
    <section className="relative bg-zinc-950 font-jost min-h-screen flex flex-col items-center justify-center py-20">
      <div className="relative w-full">
        <HeroCategories />
      </div>
    </section>
  );
};

export default Landing;
