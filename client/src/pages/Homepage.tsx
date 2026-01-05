import CategoriesGrid from "@/components/home/CategoriesGrid";
import FeaturedCollection from "@/components/home/FeaturedCollection";
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
        <CategoriesGrid />
        <FeaturedCollection />
      </main>
    </div>
  );
}
