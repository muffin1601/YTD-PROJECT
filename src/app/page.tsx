import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
// import Marquee from "@/components/ui/Marquee";
import ProjectGrid from "@/components/sections/ProjectGrid";
import Process from "@/components/sections/Process";
// import Manifesto from "@/components/sections/Manifesto";
// import Reach from "@/components/sections/Reach";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import About from "@/components/sections/About";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectGrid />
      <Process />
      <About />
      <Reviews />
      
      <Contact />
      <Footer />
    </main>
  );
}
