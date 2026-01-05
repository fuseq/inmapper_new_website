import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import WhoWeAre from '../components/WhoWeAre';
import DemoSlider from '../components/DemoSlider';
import Solutions from '../components/Solutions';
import MapShowcase from '../components/MapShowcase';
import Features from '../components/Features';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Partners />
      <WhoWeAre />
      <DemoSlider />
      <Solutions />
      <MapShowcase />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;



