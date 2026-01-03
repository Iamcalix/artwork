import React from 'react';
import WhatsAppButton from './WhatsAppButton';
import { GALLERY_HERO } from '@/data/siteData';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={GALLERY_HERO}
          alt="Art gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Whether you're looking for an original piece or a custom commission, 
            Doctor Pencil is here to bring your vision to life. Let's create 
            something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <WhatsAppButton
              variant="cta"
              text="Start a Conversation"
              message="Hello Doctor Pencil! I'm interested in your artwork and would love to discuss options."
            />
            <a
              href="#gallery"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Browse Gallery
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-l from-amber-500 to-transparent" />
      </div>
    </section>
  );
};

export default CTASection;
