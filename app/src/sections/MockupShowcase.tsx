import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = ['All', 'Paper Bags', 'Plastic Bags', 'Canvas Bags', 'Pouches', 'Gift Bags', 'Luxury Bags'];

const mockups = [
  { id: 1, title: 'White Shopping Bag', category: 'Paper Bags', image: '/images/tote-bag-base.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
  { id: 2, title: 'Kraft Paper Bag', category: 'Paper Bags', image: '/images/bag-kraft.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
  { id: 3, title: 'Clear Plastic Bag', category: 'Plastic Bags', image: '/images/bag-plastic.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
  { id: 4, title: 'Ziplock Pouch', category: 'Pouches', image: '/images/bag-ziplock.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
  { id: 5, title: 'Canvas Tote', category: 'Canvas Bags', image: '/images/bag-canvas.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
  { id: 6, title: 'Gift Bag', category: 'Gift Bags', image: '/images/bag-gift.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
  { id: 7, title: 'Luxury Black Bag', category: 'Luxury Bags', image: '/images/bag-luxury.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
  { id: 8, title: 'Eco Reusable Bag', category: 'Canvas Bags', image: '/images/bag-reusable.jpg', modelId: '2e70d781b65b4de7aa5c7a294223c1cf' },
];

interface MockupShowcaseProps {
  onMockupClick?: (bagType: string) => void;
}

export function MockupShowcase({ onMockupClick }: MockupShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const filteredMockups =
    activeCategory === 'All'
      ? mockups
      : mockups.filter((m) => m.category === activeCategory);

  return (
    <section id="mockups" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore 50,000+ bag mockup templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect bag mockup for your packaging design
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '100ms' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mockup Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMockups.map((mockup, index) => (
            <div
              key={mockup.id}
              onClick={() => onMockupClick?.(mockup.category)}
              className={`group cursor-pointer ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 card-hover">
                <div className="aspect-[3/4] relative">
                  <img
                    src={mockup.image}
                    alt={mockup.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full mb-2">
                    {mockup.category}
                  </span>
                  <h3 className="text-white font-semibold">{mockup.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '600ms' }}
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
            View all mockups
          </button>
        </div>
      </div>
    </section>
  );
}
