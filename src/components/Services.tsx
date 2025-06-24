import React from 'react';
import { Anchor, Plane, Car, ArrowRight, Star } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      id: 'porsche',
      icon: Car,
      title: 'Porsche 718 Boxster',
      subtitle: 'Experiência de Condução Premium',
      description: 'Dirija o icônico Porsche 718 pelas ruas de São Paulo. Performance pura e luxo incomparável.',
      image: 'https://images-porsche.imgix.net/-/media/4428A38B229F48BAA764DA9183E325B3_92819A20B02C4E24A519258CFE8CA93C_BX22I3BOX0001-718-boxster-mosaic?w=900&q=85&crop=faces%2Centropy%2Cedges&auto=format',
      features: ['300 CV de potência', 'Transmissão automática', 'Interior em Alcântara', 'Suporte 24/7'],
      gradient: 'from-gray-600/20 to-black/40'
    },
    {
      id: 'yacht',
      icon: Anchor,
      title: 'Lancha Coral 29 pés',
      subtitle: 'Passeios no Litoral Norte de SP',
      description: 'Explore as águas cristalinas do Litoral Norte paulista com nossa lancha Coral 29 pés totalmente equipada.',
      image: 'https://paratytoursfiles.s3.amazonaws.com/images/61f532bae4825f00087a7461/large.jpg?1643459257',
      features: ['Estrutura completa para 9 pessoas', 'Capitão profissional', 'Equipamentos de segurança', 'Churrasco incluso'],
      gradient: 'from-blue-600/20 to-cyan-500/20'
    },
    {
      id: 'helicopter',
      icon: Plane,
      title: 'Helicópteros Premium',
      subtitle: 'Robson 66, Esquilo ou Agusta',
      description: 'Voe com estilo em nossos helicópteros de luxo com piloto profissional. Passeios e deslocamentos executivos.',
      image: 'https://images.unsplash.com/photo-1579118559062-39e94a22dbb8?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      features: ['Piloto profissional', 'Múltiplos modelos', 'Voos panorâmicos', 'Transfers executivos'],
      gradient: 'from-purple-600/20 to-indigo-500/20'
    }
  ];

  const openQuoteForm = () => {
    // Trigger the floating quote button modal
    const event = new CustomEvent('openQuoteModal');
    window.dispatchEvent(event);
  };

  return (
    <section id="services" className="py-20 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossas <span className="text-gray-400">Experiências</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Descubra o luxo em terra, mar e ar. Experiências premium que superam expectativas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-3xl bg-black/40 border border-white/20 hover:border-gray-400/50 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-md"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className={`absolute top-4 left-4 p-3 rounded-xl bg-gradient-to-r ${service.gradient} backdrop-blur-sm border border-white/20`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-gray-400" />
                      <span className="text-white/80 text-sm font-medium">Experiência Premium</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-gray-400 text-sm font-medium mb-3">{service.subtitle}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-white/60 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-4 border-t border-white/20">
                    <button
                      onClick={openQuoteForm}
                      className="group/btn bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <span>Solicite sua cotação agora!</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;