import React, { useState, useEffect } from 'react';
import { Calculator, X, Send, User, Mail, Phone } from 'lucide-react';

const FloatingQuoteButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    window.addEventListener('openQuoteModal', handleOpenModal);
    return () => window.removeEventListener('openQuoteModal', handleOpenModal);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Open WhatsApp with the new link
    window.open('https://wa.me/5511950645140?text=Quero%20reservar%20minha%20experi%C3%AAncia', '_blank');
    
    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '' });
    setIsModalOpen(false);
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.phone.trim();

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 flex items-center space-x-3 animate-pulse hover:animate-none"
        >
          <Calculator className="h-6 w-6" />
          <span className="font-bold text-sm hidden sm:block">Orçamento Agora</span>
          <span className="font-bold text-xs sm:hidden">ORÇAMENTO</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-600 rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full mb-4">
                <Calculator className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Orçamento Rápido</h2>
              <p className="text-gray-400 text-sm">
                Preencha seus dados e receba uma cotação personalizada via WhatsApp
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Seu melhor e-mail"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Seu telefone/WhatsApp"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isFormValid
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg'
                    : 'bg-gray-700 cursor-not-allowed opacity-50'
                }`}
              >
                <Send className="h-5 w-5" />
                <span>Enviar</span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                Seus dados estão seguros e serão usados apenas para contato
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingQuoteButton;