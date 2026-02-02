import { useState } from 'react';
import './App.css';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { MockupShowcase } from './sections/MockupShowcase';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonials } from './sections/Testimonials';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import { MockupViewer3D } from './sections/MockupViewer3D';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'mockup-3d'>('home');

  // Handle navigation
  const navigateToMockup = () => {
    setCurrentPage('mockup-3d');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'mockup-3d') {
    return (
      <div className="min-h-screen bg-gray-50">
        <MockupViewer3D />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF5FF]">
      <Navbar />
      <main>
        <Hero />
        <MockupShowcase onMockupClick={navigateToMockup} />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
