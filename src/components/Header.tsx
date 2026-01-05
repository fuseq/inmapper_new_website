import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isHomePage = location.pathname === '/';

  const sections = ['solutions', 'features', 'about', 'contact'];

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      // If at the top of the page, no section is active
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

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
          <nav className="hidden md:flex space-x-2">
            {isHomePage ? (
              <>
                <button 
                  onClick={() => scrollToSection('solutions')} 
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeSection === 'solutions' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  Çözümler
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeSection === 'features' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  Özellikler
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeSection === 'about' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  Hakkımızda
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeSection === 'contact' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  İletişim
                </button>
              </>
            ) : (
              <>
                <Link to="/#solutions" className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300">Çözümler</Link>
                <Link to="/#features" className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300">Özellikler</Link>
                <Link to="/#about" className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300">Hakkımızda</Link>
                <Link to="/#contact" className="px-4 py-2 rounded-full font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300">İletişim</Link>
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
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === 'solutions' 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    Çözümler
                  </button>
                  <button
                    onClick={() => { scrollToSection('features'); toggleMenu(); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === 'features' 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    Özellikler
                  </button>
                  <button
                    onClick={() => { scrollToSection('about'); toggleMenu(); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === 'about' 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    Hakkımızda
                  </button>
                  <button
                    onClick={() => { scrollToSection('contact'); toggleMenu(); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === 'contact' 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    İletişim
                  </button>
                </>
              ) : (
                <>
                  <Link to="/#solutions" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}>Çözümler</Link>
                  <Link to="/#features" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}>Özellikler</Link>
                  <Link to="/#about" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}>Hakkımızda</Link>
                  <Link to="/#contact" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}>İletişim</Link>
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
