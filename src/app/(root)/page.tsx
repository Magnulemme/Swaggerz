import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <>
      <div className="relative z-[1] bg-zinc-950" style={{ transform: 'translate3d(0, 0, 0)' }}>
        <AnnouncementBar />
        <Navbar />
        <main className="">
          <HeroSection />
        </main>
      </div>
    </>
  );
}
