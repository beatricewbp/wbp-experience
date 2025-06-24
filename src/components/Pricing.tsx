import React from 'react';
import { Check, Star, Crown, Zap, Users, Calendar, Award } from 'lucide-react';

const Pricing: React.FC = () => {
  const packages = [
    {
      name: 'Essencial',
      icon: Star,
      description: 'Perfeito para aventuras de fim de semana',
      features: [
        'Período de aluguel de 24 horas',
        'Seguro abrangente',
        'Entrega e coleta gratuitas (16km)',
        '320 km incluídos',
        'Suporte básico'
      ],
      popular: false,
      gradient: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Premium',
      icon: Crown,
      description: 'Escolha mais popular',
      features: [
        'Descontos para múltiplos dias (3+ dias)',
        'Seguro abrangente',
        'Entrega e coleta gratuitas (40km)',
        'Quilometragem ilimitada',
        'Suporte prioritário 24/7',
        'Detalhamento profissional'
      ],
      popular: true,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Luxo',
      icon: Zap,
      description: 'Experiência de luxo supremo',
      features: [
        'Tarifas semanais (7+ dias)',
        'Pacote de seguro premium',
        'Entrega e coleta gratuitas (80km)',
        'Quilometragem ilimitada',
        'Serviço de concierge',
        'Detalhamento profissional',
        'Preparação para track day',
        'Tratamento VIP'
      ],
      popular: false,
      gradient: 'from-gray-700 to-gray-800'
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-black/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pacotes de <span className="text-gray-400">Experiência</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Escolha o pacote perfeito para sua experiência premium. Serviço personalizado e momentos inesquecíveis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="h-full bg-black/40 border border-white/20 rounded-3xl p-8 hover:border-gray-400/50 transition-all duration-500 group-hover:transform group-hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-md">
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${pkg.gradient} mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-white/70 mb-6">{pkg.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={scrollToContact}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 mb-4 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-green-500 hover:to-green-600'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-green-500 hover:border-green-500 backdrop-blur-sm'
                    } transform hover:scale-105`}
                  >
                    Falar com Especialista
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="relative max-w-5xl mx-auto">
            {/* Background glow effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-white/5 via-gray-500/10 to-white/5 rounded-3xl blur-3xl animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-black/80 border-2 border-gray-400/30 rounded-3xl p-12 backdrop-blur-lg shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-6 left-6">
                <Award className="h-8 w-8 text-gray-300 animate-pulse" />
              </div>
              <div className="absolute top-6 right-6">
                <Award className="h-8 w-8 text-gray-300 animate-pulse" />
              </div>
              
              {/* Main content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-gray-600/30 to-gray-700/30 rounded-full border border-gray-400/30">
                    <Users className="h-10 w-10 text-gray-300" />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-full border border-gray-400/30">
                    <Calendar className="h-10 w-10 text-gray-300" />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-full border border-gray-400/30">
                    <Crown className="h-10 w-10 text-gray-300" />
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400 mb-6">
                  Precisa de um Pacote Personalizado?
                </h3>
                
                <div className="max-w-3xl mx-auto mb-8">
                  <p className="text-xl text-white/90 mb-4 leading-relaxed">
                    Aluguéis de longo prazo, eventos corporativos, ocasiões especiais - criamos soluções sob medida para suas necessidades únicas.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center justify-center space-x-2 bg-gray-800/40 rounded-lg p-3 border border-gray-400/20">
                      <Users className="h-5 w-5 text-gray-300" />
                      <span className="text-white/80 text-sm">Eventos Corporativos</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 bg-gray-800/40 rounded-lg p-3 border border-gray-400/20">
                      <Calendar className="h-5 w-5 text-gray-300" />
                      <span className="text-white/80 text-sm">Longo Prazo</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 bg-gray-800/40 rounded-lg p-3 border border-gray-400/20">
                      <Crown className="h-5 w-5 text-gray-300" />
                      <span className="text-white/80 text-sm">Ocasiões Especiais</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={scrollToContact}
                    className="group bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl flex items-center space-x-3"
                  >
                    <span>Falar com Especialista</span>
                    <Award className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                </div>

                {/* Additional emphasis text */}
                <div className="mt-8 p-4 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-xl border border-gray-400/20">
                  <p className="text-gray-200 text-sm font-medium">
                    Atendimento VIP • Soluções Exclusivas • Experiências Únicas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;