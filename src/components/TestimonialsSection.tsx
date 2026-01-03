import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from './icons/Icons';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Interior Designer',
    location: 'London, UK',
    content: 'Doctor Pencil\'s artwork transformed my client\'s living space completely. The vibrant colors and emotional depth of the pieces created exactly the atmosphere we were looking for. Truly exceptional work.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Okonkwo',
    role: 'Hotel Manager',
    location: 'Lagos, Nigeria',
    content: 'We commissioned a series of paintings for our hotel lobby, and the result exceeded all expectations. Our guests constantly compliment the artwork. Doctor Pencil understood our vision perfectly.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Maria Santos',
    role: 'Art Collector',
    location: 'São Paulo, Brazil',
    content: 'I\'ve collected art from around the world, and Doctor Pencil\'s pieces stand out for their authenticity and emotional resonance. The African landscapes bring such warmth to my collection.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Corporate Executive',
    location: 'Singapore',
    content: 'The custom portrait Doctor Pencil created for our family is absolutely stunning. The attention to detail and the way he captured each person\'s personality is remarkable.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Amina Hassan',
    role: 'Homeowner',
    location: 'Dubai, UAE',
    content: 'Working with Doctor Pencil was a wonderful experience. The communication was excellent, and the final piece arrived beautifully packaged. It\'s now the centerpiece of our home.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 font-medium tracking-widest uppercase mb-2">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Collectors Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from art lovers around the world who have transformed their spaces 
            with Doctor Pencil's original creations.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6" />
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            {/* Quote Mark */}
            <div className="absolute -top-6 left-8 text-8xl text-amber-200 font-serif leading-none">
              "
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="text-amber-400 fill-amber-400"
                    size={20}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
                {currentTestimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg font-bold text-gray-900">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-gray-500">
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-amber-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-600">50+</p>
            <p className="text-gray-600 mt-1">Happy Collectors</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-600">15+</p>
            <p className="text-gray-600 mt-1">Countries Reached</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-600">100%</p>
            <p className="text-gray-600 mt-1">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-600">5.0</p>
            <p className="text-gray-600 mt-1">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
