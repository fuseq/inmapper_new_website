import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, QrCode, Globe, Smartphone, Monitor, TabletSmartphone, MonitorSmartphone, WifiOff } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Hızlı Dijitalleştirme',
    subtitle: 'Mevcut kat planlarınızı alıyor ve günler içinde interaktif haritalara dönüştürüyoruz.',
    visual: 'digitize'
  },
  {
    id: 2,
    title: 'Altyapı Gerektirmez',
    subtitle: 'Mekanınızda Beacon, Wi-Fi veya herhangi bir donanım kurulumuna gerek yok.',
    visual: 'noinfra'
  },
  {
    id: 3,
    title: 'QR Kod ile Anında Erişim',
    subtitle: 'Uygulama indirmeye gerek yok! QR kodu tarayın, anında navigasyona başlayın.',
    visual: 'qr'
  },
  {
    id: 4,
    title: 'Web Tabanlı, Her Yerde Çalışır',
    subtitle: 'Tarayıcı olan her cihazda çalışır. Mobil, tablet, masaüstü ve kiosk ekranlarında sorunsuz deneyim.',
    visual: 'platforms'
  }
];

const DemoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Digitize Visual - Floor plan icon
  const renderDigitizeVisual = () => (
    <div className="relative flex items-center justify-center">
      <div className="w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center shadow-2xl">
        <svg className="h-28 w-28 md:h-44 md:w-44 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer walls */}
          <rect x="10" y="10" width="80" height="80" strokeWidth="3" />
          
          {/* Horizontal dividers */}
          <line x1="10" y1="40" x2="60" y2="40" />
          <line x1="40" y1="70" x2="90" y2="70" />
          
          {/* Vertical dividers */}
          <line x1="40" y1="10" x2="40" y2="40" />
          <line x1="60" y1="40" x2="60" y2="70" />
          <line x1="40" y1="70" x2="40" y2="90" />
          
          {/* Doors (gaps in walls) */}
          <line x1="48" y1="40" x2="48" y2="48" strokeWidth="1.5" />
          <line x1="60" y1="52" x2="68" y2="52" strokeWidth="1.5" />
          <line x1="25" y1="40" x2="25" y2="48" strokeWidth="1.5" />
          
          {/* Room labels - small squares representing furniture/fixtures */}
          <rect x="15" y="15" width="8" height="8" fill="currentColor" opacity="0.3" />
          <rect x="50" y="15" width="12" height="8" fill="currentColor" opacity="0.3" />
          <rect x="70" y="45" width="10" height="10" fill="currentColor" opacity="0.3" />
          <rect x="15" y="75" width="8" height="8" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
    </div>
  );

  // No Infrastructure Visual - No beacon/wifi needed
  const renderNoInfraVisual = () => (
    <div className="relative flex items-center justify-center">
      <div className="w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center shadow-2xl relative">
        <svg className="h-28 w-28 md:h-44 md:w-44 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* WiFi symbol */}
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
          {/* Strike through line */}
          <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" className="text-red-300" stroke="currentColor" />
        </svg>
      </div>
    </div>
  );

  // QR Visual - Rounded square style
  const renderQRVisual = () => (
    <div className="relative flex items-center justify-center">
      <div className="w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center shadow-2xl">
        <QrCode className="h-28 w-28 md:h-44 md:w-44 text-white" strokeWidth={1.5} />
      </div>
    </div>
  );

  // Platforms Visual - Web based, works everywhere
  const renderPlatformsVisual = () => (
    <div className="relative flex flex-col items-center justify-center">
      {/* Central Globe */}
      <div className="relative mb-4 md:mb-8">
        <div className="w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl">
          <Globe className="h-14 w-14 md:h-24 md:w-24 text-white" strokeWidth={1.5} />
        </div>
      </div>
      
      {/* Platform icons */}
      <div className="flex items-center justify-center gap-3 md:gap-8">
        {/* Mobile */}
        <div className="flex flex-col items-center group">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Smartphone className="h-5 w-5 md:h-8 md:w-8 text-primary-500" />
          </div>
          <span className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">Mobil</span>
        </div>
        
        {/* Tablet */}
        <div className="flex flex-col items-center group">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <TabletSmartphone className="h-5 w-5 md:h-8 md:w-8 text-primary-500" />
          </div>
          <span className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">Tablet</span>
        </div>
        
        {/* Desktop */}
        <div className="flex flex-col items-center group">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Monitor className="h-5 w-5 md:h-8 md:w-8 text-primary-500" />
          </div>
          <span className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">Masaüstü</span>
        </div>
        
        {/* Kiosk */}
        <div className="flex flex-col items-center group">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="h-5 w-5 md:h-8 md:w-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="14" rx="2" />
              <line x1="12" y1="16" x2="12" y2="20" />
              <line x1="8" y1="20" x2="16" y2="20" />
              <circle cx="12" cy="8" r="2" />
              <path d="M12 10v2" />
            </svg>
          </div>
          <span className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">Kiosk</span>
        </div>
      </div>
      
    </div>
  );

  const renderVisual = () => {
    switch (slides[currentSlide].visual) {
      case 'digitize':
        return renderDigitizeVisual();
      case 'noinfra':
        return renderNoInfraVisual();
      case 'qr':
        return renderQRVisual();
      case 'platforms':
        return renderPlatformsVisual();
      default:
        return renderQRVisual();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/10 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/10 rounded-full"></div>
      <div className="absolute top-1/3 left-20 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
      <div className="absolute top-20 right-40 w-3 h-3 bg-white/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative min-h-[450px] md:min-h-[520px]">
            {/* Slide content */}
            <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:p-12">
              {/* Left content */}
              <div className="flex-1 flex items-center lg:items-end text-center lg:text-left mb-6 lg:mb-0 lg:pr-8 lg:pl-12">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
              </div>

              {/* Right visual */}
              <div className="flex-1 flex justify-center items-center min-h-[250px] md:min-h-[380px]">
                {renderVisual()}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center space-x-3 py-6 bg-gray-50">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-primary-500'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSlider;
