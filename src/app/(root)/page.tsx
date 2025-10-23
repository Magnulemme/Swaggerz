import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-light-100)] text-[var(--color-dark-900)] max-w-[100vw] overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />
      <main className="">
        <HeroSection />
      </main>
    </div>
  );
}
