import React, { useState, useMemo } from 'react';
import { Artwork, ArtworkCategory } from '@/types/artwork';
import { useArtworks } from '@/hooks/useArtworks';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal';
import { CATEGORIES } from '@/data/siteData';

const GallerySection: React.FC = () => {
  const { artworks, loading, error } = useArtworks();
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory>('All');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [sortBy, setSortBy] = useState<'display_order' | 'price_asc' | 'price_desc' | 'newest'>('display_order');

  const filteredArtworks = useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? artworks
      : artworks.filter((a) => a.category === selectedCategory);

    switch (sortBy) {
      case 'price_asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...filtered].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      default:
        return filtered;
    }
  }, [artworks, selectedCategory, sortBy]);

  const currentIndex = selectedArtwork
    ? filteredArtworks.findIndex((a) => a.id === selectedArtwork.id)
    : -1;

  const handleNext = () => {
    if (currentIndex < filteredArtworks.length - 1) {
      setSelectedArtwork(filteredArtworks[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedArtwork(filteredArtworks[currentIndex - 1]);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-[4/5] bg-gray-200" />
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-8 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">Error loading artworks: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-medium tracking-widest uppercase mb-2">
            Original Works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore the Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each piece is a unique creation, handcrafted with passion and precision. 
            Discover art that speaks to your soul.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as ArtworkCategory)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="display_order">Featured First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No artworks found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Artwork Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < filteredArtworks.length - 1}
        hasPrev={currentIndex > 0}
      />
    </section>
  );
};

export default GallerySection;
