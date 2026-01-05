import React from 'react';

const partners = [
  { name: 'İstanbul Cevahir', logo: 'https://inmapper.com/www/inmapper/ref_cevahir.png', width: 'w-32 md:w-40' },
  { name: 'TPASC', logo: 'https://inmapper.com/www/inmapper/ref_tpasc.png', width: 'w-32 md:w-40' },
  { name: 'Capitol', logo: 'https://inmapper.com/www/inmapper/ref_capitol.png', width: 'w-24 md:w-32' },
  { name: 'Teknofest', logo: 'https://inmapper.com/www/inmapper/ref_teknofest.png', width: 'w-32 md:w-40' },
  { name: 'Beymen', logo: 'https://inmapper.com/www/inmapper/ref_beymen.png', width: 'w-32 md:w-40' },
  { name: 'Turkish Cargo', logo: 'https://inmapper.com/www/inmapper/ref_turkishcargo.png', width: 'w-32 md:w-40' },
  { name: 'DHMİ', logo: 'https://inmapper.com/www/inmapper/ref_dhmi.png', width: 'w-32 md:w-40' },
  { name: 'Büyükçekmece', logo: 'https://inmapper.com/www/inmapper/ref_buyukcekmece.png', width: 'w-32 md:w-40' },
  { name: 'Galataport', logo: 'https://inmapper.com/www/inmapper/ref_galataport.png', width: 'w-32 md:w-40' },
  { name: 'Aura', logo: 'https://inmapper.com/www/inmapper/ref_aura.png', width: 'w-32 md:w-40' },
  { name: 'Özyeğin Üniversitesi', logo: 'https://inmapper.com/www/inmapper/ref_ozu_en.png', width: 'w-32 md:w-40' },
  { name: 'İSG', logo: 'https://inmapper.com/www/inmapper/ref_isg.png', width: 'w-32 md:w-40' },
  { name: 'THY', logo: 'https://inmapper.com/www/inmapper/ref_thy.png', width: 'w-32 md:w-40' },
  { name: 'Zorlu Center', logo: 'https://inmapper.com/www/inmapper/ref_zorlucenter.png', width: 'w-32 md:w-40' },
];

const Partners = () => {
  return (
    <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-primary-500 uppercase tracking-wide mb-2">
            Referanslarımız
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            Türkiye'nin Önde Gelen Kuruluşları Bize Güveniyor
          </h3>
        </div>
      </div>
      
      {/* Full width logo slider */}
      <div className="relative w-full">
        <div className="flex items-center animate-scroll" style={{ width: 'fit-content' }}>
          {/* First set of logos */}
          {partners.map((partner, index) => (
            <div
              key={`first-${index}`}
              className={`flex-shrink-0 flex items-center justify-center ${partner.width} h-14 md:h-16 mx-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {partners.map((partner, index) => (
            <div
              key={`second-${index}`}
              className={`flex-shrink-0 flex items-center justify-center ${partner.width} h-14 md:h-16 mx-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
