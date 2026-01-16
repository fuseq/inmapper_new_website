import React, { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Plane, Ship, ShoppingBag } from 'lucide-react';

const demos = [
  {
    id: 1,
    name: 'Zorlu Center',
    url: 'https://inmapper.com/zorlucenter/web/',
    location: 'İstanbul',
    type: 'AVM',
    icon: ShoppingBag,
    color: 'from-orange-400 to-orange-600',
    logo: 'https://inmapper.com/www/inmapper/ref_zorlucenter.png'
  },
  {
    id: 2,
    name: 'Tema World',
    url: 'https://inmapper.com/temaworld/',
    location: 'İstanbul',
    type: 'AVM',
    icon: ShoppingBag,
    color: 'from-purple-400 to-purple-600',
    logo: 'https://inmapper.com/www/inmapper/ref_temaworld.png'
  },
  {
    id: 3,
    name: 'IFM AVM',
    url: 'https://inmapper.com/ifmavm/web/?src=web&lang=tr',
    location: 'İstanbul',
    type: 'AVM',
    icon: ShoppingBag,
    color: 'from-pink-400 to-pink-600',
    logo: 'https://inmapper.com/www/inmapper/ref_ifm.png'
  },
  {
    id: 4,
    name: 'İstanbul Havalimanı',
    url: 'https://inmapper.com/istanbul-airport/',
    location: 'İstanbul',
    type: 'Havalimanı',
    icon: Plane,
    color: 'from-blue-400 to-blue-600',
    logo: 'https://inmapper.com/www/inmapper/ref_isg.png'
  },
  {
    id: 5,
    name: 'İstanbul Cevahir',
    url: 'https://inmapper.com/istanbulcevahir/',
    location: 'İstanbul',
    type: 'AVM',
    icon: ShoppingBag,
    color: 'from-emerald-400 to-emerald-600',
    logo: 'https://inmapper.com/www/inmapper/ref_cevahir.png'
  },
  {
    id: 6,
    name: 'Capitol AVM',
    url: 'https://inmapper.com/capitol/',
    location: 'İstanbul',
    type: 'AVM',
    icon: ShoppingBag,
    color: 'from-amber-400 to-amber-600',
    logo: 'https://inmapper.com/www/inmapper/ref_capitol.png'
  },
  {
    id: 7,
    name: 'Galataport',
    url: 'https://inmapper.com/galataport/',
    location: 'İstanbul',
    type: 'Liman',
    icon: Ship,
    color: 'from-cyan-400 to-cyan-600',
    logo: 'https://inmapper.com/www/inmapper/ref_galataport.png'
  }
];

const MapShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideSpacing, setSlideSpacing] = useState(350);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth;
      // Show logos on mobile and tablet (< 1024px)
      setIsMobile(width < 1024);
      if (width < 768) {
        setSlideSpacing(140);
      } else if (width < 1024) {
        setSlideSpacing(200);
      } else {
        setSlideSpacing(350);
      }
    };
    
    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

  const openFullScreen = (url: string) => {
    window.open(url, '_blank');
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % demos.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + demos.length) % demos.length);
  };

  const getSlidePosition = (index: number) => {
    const diff = index - activeIndex;
    const totalSlides = demos.length;
    
    let normalizedDiff = diff;
    if (diff > totalSlides / 2) normalizedDiff = diff - totalSlides;
    if (diff < -totalSlides / 2) normalizedDiff = diff + totalSlides;
    
    return normalizedDiff;
  };

  return (
    <section id="map-showcase" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 px-6">
          <div className="inline-flex items-center bg-primary-500/20 text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-primary-500/30">
            <MapPin className="h-4 w-4 mr-2" />
            Canlı Projeler
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Haritalarımızı <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Keşfedin</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Türkiye'nin önde gelen mekanlarında aktif olarak kullanılan interaktif haritalarımız
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[320px] md:h-[380px] lg:h-[650px] flex items-center justify-center">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Slides */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1500px' }}>
            {demos.map((demo, index) => {
              const position = getSlidePosition(index);
              const isActive = position === 0;
              const IconComponent = demo.icon;
              
              const translateX = position * slideSpacing;
              const translateZ = isActive ? 0 : (isMobile ? -150 : -250);
              const scale = isActive ? 1 : (isMobile ? 0.8 : 0.75);
              // On mobile/tablet, only show active and +/- 1 positions
              const maxVisiblePosition = isMobile ? 1 : 2;
              const opacity = Math.abs(position) > maxVisiblePosition ? 0 : isActive ? 1 : 0.5;
              const zIndex = isActive ? 30 : 20 - Math.abs(position);
              
              return (
                <div
                  key={demo.id}
                  onClick={() => !isActive && goToSlide(index)}
                  className={`absolute transition-all duration-500 ease-out ${!isActive ? 'cursor-pointer' : ''}`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className={`relative rounded-2xl overflow-hidden bg-gray-800/80 backdrop-blur-sm border ${isActive ? 'border-primary-500/50 shadow-2xl shadow-primary-500/20' : 'border-gray-700/50'} transition-all duration-500`}>
                    {/* Mobile: Logo Card, Desktop: Map iframe */}
                    {isMobile ? (
                      <div 
                        className="relative cursor-pointer w-[200px] md:w-[280px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          openFullScreen(demo.url);
                        }}
                      >
                        {/* Logo Card */}
                        <div className={`h-[180px] md:h-[220px] bg-gradient-to-br ${demo.color} flex items-center justify-center p-6`}>
                          <div className="w-36 h-24 md:w-48 md:h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg p-4">
                            <img 
                              src={demo.logo} 
                              alt={demo.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        
                        {/* Mobile/Tablet Info Bar */}
                        <div className="p-3 md:p-4 bg-gradient-to-r from-gray-800/95 to-gray-900/95">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs md:text-sm text-gray-400">
                              <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              {demo.location}
                            </div>
                            <div className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-gradient-to-br ${demo.color} text-white`}>
                              {demo.type}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Desktop/Tablet: Map iframe */}
                        <div 
                          className="relative cursor-pointer w-[500px] lg:w-[800px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            openFullScreen(demo.url);
                          }}
                        >
                          <iframe
                            src={demo.url}
                            title={demo.name}
                            className="w-full h-[380px] lg:h-[480px] border-0 pointer-events-none"
                            allow="geolocation"
                          />
                          {/* Click overlay */}
                          <div className="absolute inset-0 z-10"></div>
                        </div>
                        
                        {/* Desktop Info Bar */}
                        <div className="relative z-30 p-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-t border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center shadow-lg`}>
                                <IconComponent className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h3 className={`font-semibold ${isActive ? 'text-white text-lg' : 'text-gray-300 text-base'} transition-all duration-300`}>
                                  {demo.name}
                                </h3>
                                <div className="flex items-center text-sm text-gray-400">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {demo.location}
                                </div>
                              </div>
                            </div>
                            <div className={`px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-br ${demo.color} text-white shadow-lg`}>
                              {demo.type}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {demos.map((demo, index) => (
            <button
              key={demo.id}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapShowcase;

