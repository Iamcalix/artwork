import React, { useState } from 'react';
import { useCommissions } from '@/hooks/useArtworks';
import { Commission } from '@/types/artwork';
import { CloseIcon } from './icons/Icons';
import WhatsAppButton from './WhatsAppButton';

const CommissionsSection: React.FC = () => {
  const { commissions, loading } = useCommissions();
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  const commissionProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Share your vision, space requirements, and preferences via WhatsApp.',
    },
    {
      step: 2,
      title: 'Concept Development',
      description: 'Receive sketches and color studies tailored to your specifications.',
    },
    {
      step: 3,
      title: 'Creation',
      description: 'Watch your artwork come to life with progress updates throughout.',
    },
    {
      step: 4,
      title: 'Delivery',
      description: 'Receive your finished piece, carefully packaged and shipped worldwide.',
    },
  ];

  if (loading) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-white mb-4">Custom Commissions</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-700" />
                <div className="p-5">
                  <div className="h-6 bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="commissions" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-400 font-medium tracking-widest uppercase mb-2">
            Tailored Creations
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Custom Commissions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From intimate portraits to grand hotel installations, Doctor Pencil creates 
            bespoke artwork that transforms any space into a masterpiece.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6" />
        </div>

        {/* Commission Process */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {commissionProcess.map((item) => (
            <div key={item.step} className="relative">
              <div className="bg-gray-800 rounded-xl p-6 h-full">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
              {item.step < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-amber-500" />
              )}
            </div>
          ))}
        </div>

        {/* Commission Examples */}
        <div className="mb-12">
          <h3 className="font-serif text-2xl font-bold text-white mb-8 text-center">
            Past Commission Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commissions.map((commission) => (
              <div
                key={commission.id}
                onClick={() => setSelectedCommission(commission)}
                className="group relative bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={commission.image_url}
                    alt={commission.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-3 py-1 bg-amber-500/80 text-white text-xs font-medium rounded-full mb-2">
                    {commission.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {commission.title}
                  </h4>
                  {commission.client_type && (
                    <p className="text-gray-400 text-sm mt-1">
                      {commission.client_type}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-10">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Commission Your Masterpiece?
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Whether it's a personal portrait, corporate installation, or hotel décor, 
            let's create something extraordinary together.
          </p>
          <WhatsAppButton
            variant="cta"
            text="Start Your Commission"
            message="Hello Doctor Pencil! I am interested in commissioning a custom artwork. Here are my requirements:"
            className="bg-white text-amber-600 hover:bg-gray-100"
          />
        </div>
      </div>

      {/* Commission Detail Modal */}
      {selectedCommission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setSelectedCommission(null)}
          />
          <div className="relative z-10 max-w-3xl w-full bg-gray-900 rounded-2xl overflow-hidden">
            <button
              onClick={() => setSelectedCommission(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <CloseIcon size={24} />
            </button>
            <img
              src={selectedCommission.image_url}
              alt={selectedCommission.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full mb-4">
                {selectedCommission.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                {selectedCommission.title}
              </h3>
              <p className="text-gray-400 mb-6">
                {selectedCommission.description}
              </p>
              <WhatsAppButton
                variant="cta"
                text="Request Similar Commission"
                message={`Hello Doctor Pencil! I saw your commission work "${selectedCommission.title}" and would like to discuss a similar project.`}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommissionsSection;
