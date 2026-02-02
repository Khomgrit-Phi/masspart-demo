import { useState } from 'react';
import { Menu, X, ChevronDown, Box } from 'lucide-react';
import { useNavbarScroll } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Mockups', href: '#mockups' },
  { label: 'Dieline Templates', href: '#dielines' },
  { label: 'Tools', href: '#tools' },
  { label: 'Hub', href: '#hub' },
  { label: 'Business', href: '#business' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const isScrolled = useNavbarScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MockupStudio</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">🌐</span>
              English
              <ChevronDown className="w-4 h-4" />
            </button>
            <Button 
              variant="default" 
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 transition-transform hover:scale-[1.02]"
            >
              Log in
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-4 px-4">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl">
                  Log in
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
