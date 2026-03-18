import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import ProjectGrid from "@/components/sections/ProjectGrid";
import Process from "@/components/sections/Process";
// import Manifesto from "@/components/sections/Manifesto";
// import Reach from "@/components/sections/Reach";
import Contact from "@/components/sections/Contact";

import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      <ProjectGrid />

      {/* <Marquee text="PROCESS • PROCESS • " speed={50} reverse={true} /> */}
      
      <Process />

      <About />
      
      {/* <Manifesto />
      
      <Reach /> */}
      
      <Contact />

      <footer style={{ padding: '60px 60px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <img src="/logo.png" alt="NKEY" style={{ height: '100px', opacity: 0.5 }} />
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>
          © {new Date().getFullYear()} YTD ARCHITECTS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}
