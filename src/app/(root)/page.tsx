import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <>
      <div className="relative z-[1] bg-zinc-950 overflow-x-hidden">
        <AnnouncementBar />
        <Navbar />
        <main className="overflow-x-hidden">
          <Landing />
        </main>
      </div>
    </>
  );
}
