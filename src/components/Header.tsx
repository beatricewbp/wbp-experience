import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const openQuoteForm = () => {
    // Trigger the floating quote button modal
    const event = new CustomEvent('openQuoteModal');
    window.dispatchEvent(event);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="https://i.postimg.cc/dLs1yBwz/Captura-de-Tela-2025-06-18-s-4-09-44-PM.png" 
              alt="WBP Experience Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white/90 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-white/90 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              Experiências
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-white/90 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              O que dizem?
            </button>
            <button
              onClick={openQuoteForm}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Reservar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-green-400 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black border-b border-white/10 shadow-lg">
            <nav className="flex flex-col space-y-4 p-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white/90 hover:text-green-400 transition-colors duration-300 text-left font-medium"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-white/90 hover:text-green-400 transition-colors duration-300 text-left font-medium"
              >
                Experiências
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-white/90 hover:text-green-400 transition-colors duration-300 text-left font-medium"
              >
                O que dizem?
              </button>
              <button
                onClick={openQuoteForm}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 w-full text-left font-medium"
              >
                Reservar
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;