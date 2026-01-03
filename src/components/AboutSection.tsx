import React from 'react';
import { ARTIST_BIO, ARTIST_IMAGE } from '@/data/siteData';
import { MapPinIcon } from './icons/Icons';
import WhatsAppButton from './WhatsAppButton';

const AboutSection: React.FC = () => {
  const stats = [
    { value: '100+', label: 'Original Works' },
    { value: '50+', label: 'Happy Collectors' },
    { value: '15+', label: 'Countries Shipped' },
    { value: '10+', label: 'Years Experience' },
  ];

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={ARTIST_IMAGE}
                alt="Doctor Pencil in studio"
                className="w-full rounded-2xl shadow-2xl"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPinIcon className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Based in</p>
                    <p className="text-amber-600 font-bold">Tanzania, East Africa</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Creating art inspired by the beauty of African landscapes and culture.
                </p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-amber-100 rounded-full opacity-50 blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-100 rounded-full opacity-50 blur-3xl" />
          </div>

          {/* Content Side */}
          <div>
            <p className="text-amber-600 font-medium tracking-widest uppercase mb-2">
              About the Artist
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {ARTIST_BIO.name}
            </h2>
            <p className="text-xl text-gray-500 mb-6">{ARTIST_BIO.tagline}</p>

            <div className="prose prose-lg text-gray-600 mb-8">
              {ARTIST_BIO.bio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Philosophy Quote */}
            <blockquote className="relative bg-amber-50 rounded-xl p-6 mb-8">
              <div className="absolute -top-3 left-6 text-6xl text-amber-300 font-serif">"</div>
              <p className="text-gray-700 italic text-lg leading-relaxed pl-6">
                {ARTIST_BIO.philosophy}
              </p>
              <footer className="mt-4 pl-6">
                <cite className="text-amber-600 font-semibold not-italic">
                  — {ARTIST_BIO.name}
                </cite>
              </footer>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-amber-600">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <WhatsAppButton
              variant="cta"
              text="Connect with Doctor Pencil"
              message="Hello Doctor Pencil! I would love to learn more about your art and creative process."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
