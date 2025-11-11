// DEVELOPMENT MODE: Showing only Categories section
import { HeroCategories } from "./Landing/Categories/HeroCategories";

const Landing = () => {
  return (
    <section className="relative bg-zinc-950 font-jost min-h-screen flex items-center justify-center py-20">
      {/* Only Categories Section for Development */}
      <div className="relative w-full">
        <HeroCategories />
      </div>
    </section>
  );
};

export default Landing;
