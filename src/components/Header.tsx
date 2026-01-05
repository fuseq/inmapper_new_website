import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logos/inmapper.png" 
              alt="inMapper Logo" 
              className="h-9 w-9 object-contain"
            />
            <div className="ml-2 flex items-baseline">
              <span className="text-xl font-bold text-primary-500">in</span>
              <span className="text-xl font-bold" style={{ color: '#808080' }}>Mapper</span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex space-x-8">
            {isHomePage ? (
              <>
                <button onClick={() => scrollToSection('solutions')} className="text-gray-700 hover:text-primary-500 transition-colors">Çözümler</button>
                <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-primary-500 transition-colors">Özellikler</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-primary-500 transition-colors">Hakkımızda</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary-500 transition-colors">İletişim</button>
              </>
            ) : (
              <>
                <Link to="/#solutions" className="text-gray-700 hover:text-primary-500 transition-colors">Çözümler</Link>
                <Link to="/#features" className="text-gray-700 hover:text-primary-500 transition-colors">Özellikler</Link>
                <Link to="/#about" className="text-gray-700 hover:text-primary-500 transition-colors">Hakkımızda</Link>
                <Link to="/#contact" className="text-gray-700 hover:text-primary-500 transition-colors">İletişim</Link>
              </>
            )}
          </nav>

          {/* CTA Button - Right Side */}
          <div className="hidden md:flex">
            <Link 
              to={isHomePage ? '#contact' : '/#contact'}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection('contact');
                }
              }}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Demo Talep Et
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isHomePage ? (
                <>
                  <button
                    onClick={() => { scrollToSection('solutions'); toggleMenu(); }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    Çözümler
                  </button>
                  <button
                    onClick={() => { scrollToSection('features'); toggleMenu(); }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    Özellikler
                  </button>
                  <button
                    onClick={() => { scrollToSection('about'); toggleMenu(); }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    Hakkımızda
                  </button>
                  <button
                    onClick={() => { scrollToSection('contact'); toggleMenu(); }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    İletişim
                  </button>
                </>
              ) : (
                <>
                  <Link to="/#solutions" className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors" onClick={toggleMenu}>Çözümler</Link>
                  <Link to="/#features" className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors" onClick={toggleMenu}>Özellikler</Link>
                  <Link to="/#about" className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors" onClick={toggleMenu}>Hakkımızda</Link>
                  <Link to="/#contact" className="block px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors" onClick={toggleMenu}>İletişim</Link>
                </>
              )}
              <Link 
                to={isHomePage ? '#contact' : '/#contact'}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    scrollToSection('contact');
                  }
                  toggleMenu();
                }}
                className="block w-full mt-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-center font-medium"
              >
                Demo Talep Et
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
