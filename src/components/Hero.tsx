import React, { useState } from 'react';
import { ArrowRight, Play, Maximize2, X } from 'lucide-react';

const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openFullScreen = () => {
    window.open('https://inmapper.com/demo/office/', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-gray-50 pt-16 overflow-hidden">
      {/* Logo Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -inset-[50%] opacity-[0.03]"
          style={{
            transform: 'rotate(-15deg)',
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'url(/logos/inmapper.png)',
              backgroundSize: '60px 60px',
              backgroundRepeat: 'repeat',
            }}
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="w-full mx-auto px-4 lg:px-8 xl:px-12 2xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 2xl:gap-16 2xl:max-w-[1600px] 2xl:mx-auto">
          {/* Content - Left Side */}
          <div className="w-full lg:w-[500px] xl:w-[550px] flex-shrink-0 py-8 space-y-5 text-center lg:text-left items-center lg:items-start flex flex-col">
            <img 
              src="/logos/inmapper.png" 
              alt="inMapper Logo" 
              className="h-48 w-48 md:h-72 md:w-72 object-contain"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              İç Mekan Navigasyonu
              <span className="text-primary-500 block">Yeniden Tanımlandı</span>
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              En son konumlandırma teknolojisiyle iç mekanlarınızı dönüştürün. 
              Ziyaretçilerinize, müşterilerinize ve çalışanlarınıza kusursuz navigasyon deneyimi sunun.
            </p>

            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <button 
                onClick={() => {
                  const element = document.getElementById('map-showcase');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center px-20 md:px-24 py-4 text-lg bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Canlı Örnekler
                <ArrowRight className="ml-3 h-6 w-6" />
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center justify-center px-20 md:px-24 py-4 text-lg border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-primary-500 hover:text-primary-500 transition-all duration-200"
              >
                <Play className="mr-3 h-6 w-6" />
                Nasıl Çalışır?
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-4">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">%99.9</div>
                <div className="text-xs text-gray-600">Doğruluk</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">500+</div>
                <div className="text-xs text-gray-600">Kurulum</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">50M+</div>
                <div className="text-xs text-gray-600">Kullanıcı</div>
              </div>
            </div>
          </div>

          {/* Interactive Map - Right Side */}
          <div className="w-full lg:flex-1 2xl:max-w-[1000px] relative">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-1 shadow-2xl">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg relative">
                <iframe
                  src="https://inmapper.com/demo/office/"
                  title="inMapper - Demo Office"
                  className="w-full h-[750px] md:h-[600px] lg:h-[800px] border-0"
                  allow="geolocation"
                />
                {/* Full Screen Button */}
                <button
                  onClick={openFullScreen}
                  className="absolute top-3 left-3 lg:top-auto lg:bottom-8 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-lg shadow-lg hover:bg-white hover:text-primary-500 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                >
                  <Maximize2 className="h-4 w-4" />
                  Tam Ekran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={() => setIsVideoModalOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="h-8 w-8 md:h-10 md:w-10" />
          </button>

          {/* Video Container */}
          <div 
            className="w-[95vw] h-[85vh] max-w-[1600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/FqUsDiXYI9A?autoplay=1&rel=0"
              title="inMapper - Nasıl Çalışır?"
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
