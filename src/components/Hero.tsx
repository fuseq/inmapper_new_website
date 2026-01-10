import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// Compass directions for animation
const directions = [0, 45, 90, 135, 180, 225, 270, 315, 360];

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
  const [compassRotation, setCompassRotation] = useState(0);
  
  // Memoize floating logos to prevent re-generation on re-render
  const floatingLogos = useMemo(() => generateFloatingLogos(25), []);

  // Animate compass needle
  useEffect(() => {
    if (isMapVisible) return;
    
    const interval = setInterval(() => {
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      setCompassRotation(randomDirection);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isMapVisible]);

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
                        className="absolute inset-0 z-10 bg-white"
                      >
                        {/* Compass Animation */}
                        <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-5%' }}>
                          <svg viewBox="0 0 300 300" className="w-[85%] h-[85%]" preserveAspectRatio="xMidYMid meet">
                            <defs>
                              {/* Gradient for outer ring */}
                              <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f8fafc" />
                                <stop offset="100%" stopColor="#e2e8f0" />
                              </linearGradient>
                              {/* Shadow filter */}
                              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15"/>
                              </filter>
                              {/* Inner shadow */}
                              <filter id="innerShadow">
                                <feOffset dx="0" dy="2"/>
                                <feGaussianBlur stdDeviation="2" result="offset-blur"/>
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                                <feFlood floodColor="#000" floodOpacity="0.1" result="color"/>
                                <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                                <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
                              </filter>
                            </defs>

                            {/* Outer compass ring */}
                            <circle cx="150" cy="150" r="140" fill="url(#compassGradient)" filter="url(#shadow)" />
                            
                            {/* Compass dial background */}
                            <circle cx="150" cy="150" r="125" fill="#ffffff" filter="url(#innerShadow)" />

                            {/* Degree markings */}
                            {[...Array(72)].map((_, i) => {
                              const angle = (i * 5) * Math.PI / 180;
                              const isMajor = i % 6 === 0; // Every 30 degrees
                              const r1 = isMajor ? 105 : 115;
                              const r2 = 120;
                              return (
                                <line
                                  key={i}
                                  x1={150 + r1 * Math.sin(angle)}
                                  y1={150 - r1 * Math.cos(angle)}
                                  x2={150 + r2 * Math.sin(angle)}
                                  y2={150 - r2 * Math.cos(angle)}
                                  stroke={isMajor ? "#94a3b8" : "#cbd5e1"}
                                  strokeWidth={isMajor ? 2 : 1}
                                />
                              );
                            })}

                            {/* Cardinal directions - positioned outside the markings */}
                            <text x="150" y="22" textAnchor="middle" className="font-bold" fontSize="16" fill="#F47B48">K</text>
                            <text x="278" y="154" textAnchor="middle" className="font-bold" fontSize="14" fill="#64748b">D</text>
                            <text x="150" y="286" textAnchor="middle" className="font-bold" fontSize="14" fill="#64748b">G</text>
                            <text x="22" y="154" textAnchor="middle" className="font-bold" fontSize="14" fill="#64748b">B</text>

                            {/* Intercardinal directions - in the gray outer ring */}
                            <text x="243" y="61" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#94a3b8">KD</text>
                            <text x="243" y="243" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#94a3b8">GD</text>
                            <text x="57" y="243" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#94a3b8">GB</text>
                            <text x="57" y="61" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#94a3b8">KB</text>

                            {/* Inner decorative circles */}
                            <circle cx="150" cy="150" r="90" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                            <circle cx="150" cy="150" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />

                            {/* Rotating needle group */}
                            <motion.g
                              animate={{ rotate: compassRotation }}
                              transition={{ duration: 1, ease: "easeInOut" }}
                              style={{ transformOrigin: "150px 150px" }}
                            >
                              {/* North pointer (orange) */}
                              <path
                                d="M 150 60 L 160 130 L 150 120 L 140 130 Z"
                                fill="#F47B48"
                              />
                              {/* South pointer (gray) */}
                              <path
                                d="M 150 240 L 160 170 L 150 180 L 140 170 Z"
                                fill="#94a3b8"
                              />
                            </motion.g>

                            {/* Center logo circle background */}
                            <circle cx="150" cy="150" r="35" fill="white" filter="url(#shadow)" />
                            <circle cx="150" cy="150" r="32" fill="#fff7f3" />

                            {/* Center logo */}
                            <image
                              href="/logos/inmapper.png"
                              x="125"
                              y="125"
                              width="50"
                              height="50"
                              preserveAspectRatio="xMidYMid meet"
                            />
                          </svg>
                        </div>

                        {/* Button Section */}
                        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-center">
                          <motion.button
                            onClick={() => setIsMapVisible(true)}
                            className="flex items-center gap-2 px-8 py-3.5 bg-primary-500 text-white text-base font-semibold rounded-full shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Play className="w-5 h-5" />
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

              {/* Decorative elements around phone */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-300 rounded-full blur-2xl opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </div>

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
