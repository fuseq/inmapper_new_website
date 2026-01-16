import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { T } from '../contexts/TranslationContext';

// Generate random floating logos data
const generateFloatingLogos = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    size: 25 + Math.random() * 35,
    duration: 20 + Math.random() * 20,
    delay: Math.random() * 15,
    opacity: 0.08 + Math.random() * 0.12,
  }));
};

const FloatingLogo = ({ 
  initialX, 
  size, 
  duration, 
  delay,
  opacity 
}: { 
  initialX: number; 
  size: number; 
  duration: number; 
  delay: number;
  opacity: number;
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${initialX}%`,
        width: size,
        height: size,
      }}
      initial={{ 
        y: '100vh',
        opacity: 0,
        rotate: 0,
      }}
      animate={{ 
        y: '-100vh',
        opacity: [0, opacity, opacity, 0],
        rotate: 360,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <img
        src="/logos/inmapper.png"
        alt=""
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [scrollAnimationData, setScrollAnimationData] = useState<object | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Memoize floating logos to prevent re-generation on re-render
  const floatingLogos = useMemo(() => generateFloatingLogos(25), []);

  // Load Lottie animations
  useEffect(() => {
    fetch('/animations/direction-finder.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(err => console.log('Animation not loaded:', err));
    
    fetch('/animations/mouse-scrolling.json')
      .then(response => response.json())
      .then(data => setScrollAnimationData(data))
      .catch(err => console.log('Scroll animation not loaded:', err));
  }, []);

  // Hide scroll indicator when scrolling, show when at top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-gray-50 pt-28 lg:pt-32 pb-16 lg:pb-8 overflow-hidden">
      {/* Floating Logos Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingLogos.map((logo) => (
          <FloatingLogo
            key={logo.id}
            initialX={logo.initialX}
            size={logo.size}
            duration={logo.duration}
            delay={logo.delay}
            opacity={logo.opacity}
          />
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="w-full mx-auto px-4 lg:px-8 xl:px-12 2xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8 xl:gap-12 max-w-[1600px] mx-auto">
          {/* Content - Left Side */}
          <div className="w-full lg:w-[55%] flex-shrink-0 py-6 space-y-5 text-center lg:text-left items-center lg:items-start flex flex-col">
            
            {/* Big Typography - Like PostAIPilot */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h1 className="font-antonio text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-900 tracking-tight">
                İÇERİDEKİ
              </h1>
              <h1 className="font-antonio text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-primary-500 tracking-tight">
                YOL GÖSTERİCİNİZ
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mt-2">
                En son konumlandırma teknolojisiyle iç mekanlarınızı dönüştürün. 
                Ziyaretçilerinize kusursuz navigasyon deneyimi sunun.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button 
                onClick={() => {
                  const element = document.getElementById('map-showcase');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-base bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Canlı Örnekler
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 text-base border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-primary-500 hover:text-primary-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Nasıl Çalışır?
              </button>
            </motion.div>

            <motion.div 
              className="flex items-center justify-center lg:justify-start space-x-5 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-gray-900">%99.9</div>
                <div className="text-xs text-gray-600">Doğruluk</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-gray-900">500+</div>
                <div className="text-xs text-gray-600">Kurulum</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-gray-900">50M+</div>
                <div className="text-xs text-gray-600">Kullanıcı</div>
              </div>
            </motion.div>
          </div>

          {/* Phone Frame with Map - Right Side */}
          <motion.div 
            className="w-full lg:w-[35%] max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Phone Frame */}
            <div className="relative mx-auto">
              {/* Phone outer frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20"></div>
                
                {/* Phone screen */}
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19' }}>
                  
                  {/* Map - Always rendered in background for preloading */}
                  <div className="absolute inset-0">
                    <iframe
                      src="https://inmapper.com/demo/office/"
                      title="inMapper - Demo Office"
                      className="w-full h-full border-0"
                      allow="geolocation"
                    />
                  </div>

                  {/* Cover overlay - hides map until clicked */}
                  <AnimatePresence>
                    {!isMapVisible && (
                      <motion.div
                        key="cover"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-10 bg-white flex flex-col"
                      >
                        {/* Top Headline */}
                        <motion.div 
                          className="pt-10 px-4 text-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                            Kaybolmayın,
                          </h3>
                          <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                              Keşfedin!
                            </span>
                          </h3>
                        </motion.div>

                        {/* Direction Finder Lottie Animation */}
                        <div className="flex-1 flex items-center justify-center px-4">
                          {animationData ? (
                            <Lottie
                              animationData={animationData}
                              loop={true}
                              autoplay={true}
                              className="w-full h-full"
                            />
                          ) : (
                            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                          )}
                        </div>

                        {/* Button Section - Moved up */}
                        <div className="pb-12 flex flex-col items-center justify-center">
                          <motion.button
                            onClick={() => setIsMapVisible(true)}
                            className="flex items-center gap-3 px-10 py-4 bg-primary-500 text-white text-lg font-bold rounded-full shadow-xl hover:bg-primary-600 hover:shadow-2xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Play className="w-6 h-6" fill="currentColor" />
                            Haritayı Keşfet
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            }}
          >
            {scrollAnimationData && (
              <Lottie
                animationData={scrollAnimationData}
                loop={true}
                autoplay={true}
                className="w-16 h-16"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={() => setIsVideoModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="h-8 w-8 md:h-10 md:w-10" />
            </button>

            {/* Video Container */}
            <motion.div 
              className="w-[95vw] h-[85vh] max-w-[1600px]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src="https://www.youtube.com/embed/FqUsDiXYI9A?autoplay=1&rel=0"
                title="inMapper - Nasıl Çalışır?"
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
