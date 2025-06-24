import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: 'https://images-porsche.imgix.net/-/media/0F5FDF13928B49A6BF8791A7775066B8_88D121C3DC654FA7990FB59EE19CE77A_BX23I3AOX0001-718-boxster-mosaic?w=1500&q=85&crop=faces%2Centropy%2Cedges&auto=format',
      alt: 'Porsche 718 Boxster',
      title: 'Terra'
    },
    {
      src: 'https://marinaimperial.com.br/wp-content/uploads/2021/06/lancha-hard-top.jpg',
      alt: 'Lancha Hard Top',
      title: 'Mar'
    },
    {
      src: 'https://images.unsplash.com/photo-1579118559062-39e94a22dbb8?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Helicóptero Premium',
      title: 'Ar'
    }
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openQuoteForm = () => {
    // Trigger the floating quote button modal
    const event = new CustomEvent('openQuoteModal');
    window.dispatchEvent(event);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images with Rotation */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
      </div>

      {/* Image Indicators */}
      <div className="absolute top-8 right-8 z-20 flex space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-sm border ${
              index === currentImageIndex
                ? 'bg-white/20 text-white border-white/40'
                : 'bg-black/30 text-white/60 border-white/20'
            }`}
          >
            {image.title}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-20 right-8 z-20 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white/60 rounded-full transition-all duration-75 ease-linear"
          style={{
            width: `${((Date.now() % 4000) / 4000) * 100}%`,
            animation: 'progress 4s linear infinite'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-white">Experiências</span>
                <span className="block text-gray-400">Premium</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto">
                Terra, mar e ar. Descubra o luxo em suas mais diversas formas com nossas experiências exclusivas.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-white/90">Experiência Premium</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-white/90">Totalmente Segurado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-white/90">Suporte 24/7</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openQuoteForm}
                className="group bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Reserve Sua Experiência</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 hover:border-green-500 transition-all duration-300 backdrop-blur-sm"
              >
                Explorar Experiências
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;