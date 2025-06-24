import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="https://i.postimg.cc/dLs1yBwz/Captura-de-Tela-2025-06-18-s-4-09-44-PM.png" 
                alt="WBP Experience Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Experiências premium em terra, mar e ar. Luxo, performance e serviço excepcional combinados.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-600 hover:text-white text-gray-400 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-600 hover:text-white text-gray-400 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-600 hover:text-white text-gray-400 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Links Rápidos</h3>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block text-gray-400 hover:text-gray-400 transition-colors duration-300"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block text-gray-400 hover:text-gray-400 transition-colors duration-300"
              >
                Experiências
              </button>
              <button
                onClick={() => scrollToSection('details')}
                className="block text-gray-400 hover:text-gray-400 transition-colors duration-300"
              >
                Detalhes
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block text-gray-400 hover:text-gray-400 transition-colors duration-300"
              >
                Preços
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block text-gray-400 hover:text-gray-400 transition-colors duration-300"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-gray-400 hover:text-gray-400 transition-colors duration-300"
              >
                Contato
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Experiências</h3>
            <div className="space-y-3">
              <p className="text-gray-400">Porsche 718 Boxster</p>
              <p className="text-gray-400">Lancha Coral 29 pés</p>
              <p className="text-gray-400">Helicópteros Premium</p>
              <p className="text-gray-400">Experiências Combinadas</p>
              <p className="text-gray-400">Eventos Corporativos</p>
              <p className="text-gray-400">Serviço de Concierge</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Informações de Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">São Paulo, SP</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-gray-400">info@wbp.experience</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-gray-600/20 to-gray-800/20 border border-gray-500/30 rounded-lg">
              <p className="text-gray-300 font-semibold text-sm mb-1">Suporte 24/7</p>
              <p className="text-gray-400 text-xs">Sempre aqui quando você precisar</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} WBP.EXPERIENCE. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-gray-400 transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-400 transition-colors duration-300">
                Termos de Serviço
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-400 transition-colors duration-300">
                Política de Seguro
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;