import Navbar from './components/Navbar';
import ElectricGrid from './components/ElectricGrid';
import VisualEffects from './components/VisualEffects';
import Hero from './components/Hero';
import About from './components/About';
import Founder from './components/Founder';
import Projects from './components/Projects';
import TechnicalVisitsGallery from './components/TechnicalVisitsGallery';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <ElectricGrid />
      <VisualEffects />
      <main className="relative">
        <Hero />
        <About />
        <Founder />
        <Projects />
        <TechnicalVisitsGallery />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
