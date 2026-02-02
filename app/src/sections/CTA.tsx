import { ArrowRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

export function CTA() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-12 lg:p-20 ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Content */}
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Start creating for free
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
              Ready to create stunning mockups?
            </h2>

            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Join 100,000+ designers using MockupStudio to bring their packaging designs to life.
              No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 rounded-xl px-8 py-6 text-lg font-semibold transition-transform hover:scale-105 shadow-xl"
              >
                Get started for free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-semibold"
              >
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
