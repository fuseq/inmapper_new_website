import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { T } from '../contexts/TranslationContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isHomePage = location.pathname === '/';

  const sections = ['solutions', 'features', 'about', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled for navbar background
      setIsScrolled(window.scrollY > 50);

      if (!isHomePage) return;

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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-8 sm:px-12 lg:px-20">
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logos/inmapper.png" 
              alt="inMapper Logo" 
              className="h-12 w-12 lg:h-14 lg:w-14 object-contain"
            />
            <div className="ml-3 flex items-baseline">
              <span className="text-2xl lg:text-3xl font-bold text-primary-500">in</span>
              <span className="text-2xl lg:text-3xl font-bold" style={{ color: '#808080' }}>Mapper</span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            {isHomePage ? (
              <>
                <button 
                  onClick={() => scrollToSection('solutions')} 
                  className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${
                    activeSection === 'solutions' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : `${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`
                  }`}
                >
                  <T>Çözümler</T>
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${
                    activeSection === 'features' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : `${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`
                  }`}
                >
                  <T>Özellikler</T>
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${
                    activeSection === 'about' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : `${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`
                  }`}
                >
                  <T>Hakkımızda</T>
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${
                    activeSection === 'contact' 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : `${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`
                  }`}
                >
                  <T>İletişim</T>
                </button>
              </>
            ) : (
              <>
                <Link to="/#solutions" className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`}><T>Çözümler</T></Link>
                <Link to="/#features" className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`}><T>Özellikler</T></Link>
                <Link to="/#about" className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`}><T>Hakkımızda</T></Link>
                <Link to="/#contact" className={`px-6 py-3 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'} hover:text-primary-500`}><T>İletişim</T></Link>
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
              className="bg-primary-500 text-white px-8 py-3.5 rounded-full hover:bg-primary-600 transition-all duration-300 text-base lg:text-lg font-semibold shadow-md hover:shadow-lg"
            >
              <T>Demo Talep Et</T>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-primary-500`}
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
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
                    <T>Çözümler</T>
                  </button>
                  <button
                    onClick={() => { scrollToSection('features'); toggleMenu(); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === 'features' 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    <T>Özellikler</T>
                  </button>
                  <button
                    onClick={() => { scrollToSection('about'); toggleMenu(); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === 'about' 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    <T>Hakkımızda</T>
                  </button>
                  <button
                    onClick={() => { scrollToSection('contact'); toggleMenu(); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === 'contact' 
                        ? 'bg-primary-500 text-white' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    <T>İletişim</T>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/#solutions" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}><T>Çözümler</T></Link>
                  <Link to="/#features" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}><T>Özellikler</T></Link>
                  <Link to="/#about" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}><T>Hakkımızda</T></Link>
                  <Link to="/#contact" className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300" onClick={toggleMenu}><T>İletişim</T></Link>
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
                <T>Demo Talep Et</T>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
