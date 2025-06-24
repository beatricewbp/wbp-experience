import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import CarDetails from './components/CarDetails';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingQuoteButton from './components/FloatingQuoteButton';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <CarDetails />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
      <FloatingQuoteButton />
    </div>
  );
}

export default App;