import CategoriesGrid from "@/components/home/CategoriesGrid";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import FeaturesBar from "@/components/home/FeaturesBar";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/shared/Footer";
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
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
