import React, { useEffect } from 'react';
import { Artwork } from '@/types/artwork';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import WhatsAppButton from './WhatsAppButton';

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasNext, hasPrev, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !artwork) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Navigation Arrows */}
      {hasPrev && onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeftIcon size={32} />
        </button>
      )}
      {hasNext && onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRightIcon size={32} />
        </button>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <CloseIcon size={24} />
      </button>

      {/* Modal Content */}
      <div className="relative z-10 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full">
            <img
              src={artwork.image_url}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {artwork.is_featured && (
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                  Featured
                </span>
              )}
              {artwork.is_sold && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  Sold
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-10 flex flex-col">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-sm font-medium rounded-full mb-4">
                {artwork.category}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {artwork.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {artwork.description || 'A beautiful original acrylic painting by Doctor Pencil, capturing the essence of African artistry and contemporary expression.'}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Medium</p>
                  <p className="font-medium text-gray-900">{artwork.medium}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                  <p className="font-medium text-gray-900">{artwork.dimensions}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Year</p>
                  <p className="font-medium text-gray-900">{artwork.year_created || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className={`font-medium ${artwork.is_sold ? 'text-red-600' : artwork.is_available ? 'text-green-600' : 'text-amber-600'}`}>
                    {artwork.is_sold ? 'Sold' : artwork.is_available ? 'Available' : 'Reserved'}
                  </p>
                </div>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-3xl font-bold text-amber-600">
                    {formatPrice(artwork.price)}
                  </p>
                </div>
                {!artwork.is_sold && (
                  <span className="px-4 py-2 bg-green-50 text-green-600 text-sm font-medium rounded-full">
                    Free Shipping Available
                  </span>
                )}
              </div>
              {!artwork.is_sold && artwork.is_available && (
                <WhatsAppButton
                  variant="cta"
                  text="Inquire About This Piece"
                  message={`Hello Doctor Pencil! I am interested in purchasing "${artwork.title}" (${formatPrice(artwork.price)}). Is it still available?`}
                  className="w-full justify-center"
                />
              )}
              {artwork.is_sold && (
                <WhatsAppButton
                  variant="cta"
                  text="Request Similar Artwork"
                  message={`Hello Doctor Pencil! I saw "${artwork.title}" which is sold. Could you create a similar piece for me?`}
                  className="w-full justify-center bg-gray-500 hover:bg-gray-600"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
