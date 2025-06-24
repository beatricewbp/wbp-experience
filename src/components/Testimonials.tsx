import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Eduardo Silva',
      role: 'Empresário',
      experience: 'Porsche 718 Cayman',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Experiência absolutamente incrível! O Porsche 718 superou todas as minhas expectativas.',
      date: 'Dezembro 2024'
    },
    {
      id: 2,
      name: 'Marina Oliveira',
      role: 'Arquiteta',
      experience: 'Lancha Coral 29 pés',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      testimonial: 'O passeio de lancha pelo Litoral Norte foi simplesmente perfeito! A embarcação estava impecável.',
      date: 'Novembro 2024'
    },
    {
      id: 3,
      name: 'Roberto Mendes',
      role: 'Diretor Comercial',
      experience: 'Helicóptero Esquilo',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Voar de helicóptero sobre São Paulo foi uma experiência única! O piloto foi extremamente profissional.',
      date: 'Outubro 2024'
    },
    {
      id: 4,
      name: 'Ana Paula Costa',
      role: 'Médica',
      experience: 'Experiência Combinada',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Fiz a experiência combinada: helicóptero, lancha e Porsche no mesmo dia. Foi incrível!',
      date: 'Setembro 2024'
    },
    {
      id: 5,
      name: 'Felipe Rodrigues',
      role: 'Advogado',
      experience: 'Porsche 718 Cayman',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Como entusiasta de carros esportivos, posso dizer que a experiência foi excepcional.',
      date: 'Agosto 2024'
    },
    {
      id: 6,
      name: 'Juliana Santos',
      role: 'Empresária',
      experience: 'Lancha Coral 29 pés',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Organizei um evento corporativo na lancha e foi um sucesso absoluto!',
      date: 'Julho 2024'
    }
  ];

  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * testimonialsPerSlide;
    return testimonials.slice(startIndex, startIndex + testimonialsPerSlide);
  };

  const openQuoteForm = () => {
    // Trigger the floating quote button modal
    const event = new CustomEvent('openQuoteModal');
    window.dispatchEvent(event);
  };

  return (
    <section id="testimonials" className="py-20 bg-black/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O que Nossos <span className="text-gray-400">Clientes Dizem</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experiências reais de clientes que viveram momentos únicos conosco em terra, mar e ar.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-300 backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-300 backdrop-blur-sm border border-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <div className="absolute top-4 right-4 z-10">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Testimonials Grid */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-6 px-4">
                    {testimonials
                      .slice(slideIndex * testimonialsPerSlide, (slideIndex + 1) * testimonialsPerSlide)
                      .map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="group bg-black/40 border border-white/20 rounded-2xl p-6 hover:border-gray-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-md"
                        >
                          <div className="flex items-start space-x-4 mb-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-400 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-lg truncate">
                                {testimonial.name}
                              </h4>
                              <p className="text-gray-400 text-sm truncate">
                                {testimonial.role}
                              </p>
                              <div className="flex space-x-1 mt-1">
                                {renderStars(testimonial.rating)}
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <Quote className="h-6 w-6 text-gray-400 mb-2" />
                            <p className="text-white/90 text-sm leading-relaxed italic">
                              "{testimonial.testimonial}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/20">
                            <span className="text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full text-xs">
                              {testimonial.experience}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {testimonial.date}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-green-400 w-8'
                    : 'bg-gray-600 hover:bg-green-500'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-white/60 text-sm">
              {currentSlide + 1} de {totalSlides}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-600/20 to-black/40 border border-gray-500/30 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-md">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {renderStars(5)}
              </div>
              <span className="text-white font-semibold">4.9/5</span>
              <span className="text-gray-400">• 150+ avaliações</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Seja o Próximo a Viver Esta Experiência</h3>
            <p className="text-white/70 mb-6">
              Junte-se aos nossos clientes satisfeitos e descubra por que somos referência em experiências premium.
            </p>
            <button
              onClick={openQuoteForm}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
            >
              Solicite sua cotação agora!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;