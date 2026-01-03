import React from 'react';
import { Artwork } from '@/types/artwork';
import { EyeIcon } from './icons/Icons';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={artwork.image_url}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
              <EyeIcon className="text-gray-800" size={24} />
            </div>
          </div>
        </div>

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
          {!artwork.is_available && !artwork.is_sold && (
            <span className="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
              Reserved
            </span>
          )}
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full">
            {artwork.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
          {artwork.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {artwork.medium} • {artwork.dimensions}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-amber-600">
            {formatPrice(artwork.price)}
          </span>
          {artwork.year_created && (
            <span className="text-sm text-gray-400">
              {artwork.year_created}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
