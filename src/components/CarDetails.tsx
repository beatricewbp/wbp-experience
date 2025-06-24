import React from 'react';

const CarDetails: React.FC = () => {
  return (
    <section id="details" className="py-20 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Viva a <span className="text-gray-400">Experiência</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Assista e sinta a emoção de cada uma de nossas experiências!
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-500/20 to-white/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl overflow-hidden">
              <iframe
                className="w-full h-[500px] md:h-[600px]"
                src="https://www.youtube.com/embed/qpyA1sjTzt4?autoplay=1&mute=1"
                title="WBP Experience - Experiências Premium"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;