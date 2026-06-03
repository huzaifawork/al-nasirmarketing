import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import MediaStrip from "@/components/MediaStrip";
import Clients from "@/components/Clients";
import Presence from "@/components/Presence";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const fallbackImages = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559828456-11f8b5a03e68?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541888041530-9ba170ba6279?q=80&w=2072&auto=format&fit=crop",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1120]">
      <Hero />
      <AboutUs />
      <Services />
      <MediaStrip fallbackImages={fallbackImages} speed={30} />
      <Clients />
      <Presence />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
