import { Search, Upload, Download, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  {
    icon: Search,
    title: 'Choose a template',
    description: 'Browse 50,000+ mockups and find the perfect match for your product.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Upload,
    title: 'Upload your design',
    description: 'Drag and drop your artwork onto the mockup with our smart editor.',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: Download,
    title: 'Download & share',
    description: 'Export in high resolution and share your stunning mockup anywhere.',
    color: 'bg-blue-100 text-blue-600',
  },
];

const features = [
  '50,000+ premium mockups',
  '4K resolution exports',
  'Smart object editing',
  'Batch processing',
];

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="tools" className="py-20 bg-[#FAF5FF]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Create stunning mockups in 3 easy steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our intuitive platform makes it easy to create professional mockups in minutes
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-200 to-transparent" />
              )}

              <div className="text-center">
                <div
                  className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <step.icon className="w-10 h-10" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div
          className={`bg-white rounded-3xl p-8 lg:p-12 shadow-lg ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Everything you need for perfect mockups
              </h3>
              <p className="text-gray-600 mb-6">
                Our platform provides all the tools you need to create stunning product mockups
                that will impress your clients and elevate your brand.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center">
                <img
                  src="/images/3d-modeling-card.jpg"
                  alt="Mockup Editor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
