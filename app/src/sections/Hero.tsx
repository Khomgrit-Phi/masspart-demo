import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FeatureCardProps {
  title: string;
  image: string;
  bgColor: string;
  arrowColor: string;
  delay: number;
  isVisible: boolean;
}

function FeatureCard({ title, image, bgColor, arrowColor, delay, isVisible }: FeatureCardProps) {
  return (
    <a
      href="#"
      className={`group relative block rounded-3xl overflow-hidden ${bgColor} card-hover ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight max-w-[120px]">
            {title}
          </h3>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-45 ${arrowColor}`}
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 relative min-h-[180px]">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </a>
  );
}

export function Hero() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="relative min-h-screen pt-[72px] bg-[#FAF5FF] bg-grid-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20" ref={ref}>
        {/* Hero Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
          >
            All about packaging mockups{' '}
            <span className="inline-block animate-pulse">👀</span>
            <br />
            and dieline templates at{' '}
            <span className="text-gradient">MockupStudio</span>
          </h1>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            title="Mockup Generator"
            image="/images/mockup-generator-card.jpg"
            bgColor="bg-purple-100"
            arrowColor="bg-white text-gray-900"
            delay={300}
            isVisible={isVisible}
          />
          <FeatureCard
            title="3D Modeling Software"
            image="/images/3d-modeling-card.jpg"
            bgColor="bg-teal-100"
            arrowColor="bg-gray-900 text-white"
            delay={400}
            isVisible={isVisible}
          />
          <FeatureCard
            title="Dieline Template Maker"
            image="/images/dieline-card.jpg"
            bgColor="bg-blue-100"
            arrowColor="bg-white text-gray-900"
            delay={500}
            isVisible={isVisible}
          />
        </div>

        {/* AI Design Banner */}
        <div
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-50 via-white to-purple-50 border border-gray-100 ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left - Image */}
            <div className="relative">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow mb-6"
              >
                Explore more
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/ai-design-banner.jpg"
                  alt="AI Packaging Design"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                AI packaging design
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Describe your dream packaging, hit Generate, and watch AI bring it to life in seconds.
              </p>
              <div className="relative">
                <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <input
                    type="text"
                    placeholder="Create packaging for an ice cream brand."
                    className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                  />
                  <button className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
