import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Brand Designer',
    company: 'Studio Nine',
    avatar: 'SC',
    rating: 5,
    quote:
      'MockupStudio has completely transformed our workflow. We can now create stunning packaging mockups in minutes instead of hours. The quality is incredible!',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Creative Director',
    company: 'Pulse Agency',
    avatar: 'MJ',
    rating: 5,
    quote:
      'The AI packaging design feature is a game-changer. It helps us quickly visualize concepts for clients before committing to full production.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Freelance Designer',
    company: 'Self-employed',
    avatar: 'ER',
    rating: 5,
    quote:
      'I have tried many mockup tools, but MockupStudio is by far the best. The variety of templates and the ease of use are unmatched.',
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Loved by designers worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our community of 100,000+ designers has to say
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative bg-gray-50 rounded-3xl p-8 card-hover ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Quote className="w-5 h-5 text-purple-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-8 leading-relaxed">{testimonial.quote}</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          {[
            { value: '100K+', label: 'Active Users' },
            { value: '50K+', label: 'Mockup Templates' },
            { value: '4.9', label: 'Average Rating' },
            { value: '1M+', label: 'Mockups Created' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
