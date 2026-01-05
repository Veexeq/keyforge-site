import Hero from "@/components/home/Hero";
import Navbar from "@/components/shared/Navbar";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
