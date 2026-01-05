import FeaturesBar from "@/components/home/FeaturesBar";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/shared/Navbar";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturesBar />
      </main>
    </div>
  );
}
