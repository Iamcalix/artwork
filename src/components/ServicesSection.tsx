import React from 'react';
import { PaletteIcon, UserIcon, BuildingIcon, HomeIcon } from './icons/Icons';
import { SERVICES } from '@/data/siteData';
import WhatsAppButton from './WhatsAppButton';

const iconMap: { [key: string]: React.FC<{ className?: string; size?: number }> } = {
  palette: PaletteIcon,
  user: UserIcon,
  building: BuildingIcon,
  home: HomeIcon,
};

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 font-medium tracking-widest uppercase mb-2">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Art Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From original gallery pieces to custom commissions, Doctor Pencil brings 
            your vision to life on canvas.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={index}
                className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-amber-50 transition-all duration-300 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-amber-100 group-hover:bg-amber-500 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <IconComponent
                    className="text-amber-600 group-hover:text-white transition-colors duration-300"
                    size={32}
                  />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to bring your vision to life? Let's discuss your project.
          </p>
          <WhatsAppButton
            variant="cta"
            text="Start Your Commission"
            message="Hello Doctor Pencil! I would like to discuss a custom art commission."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
