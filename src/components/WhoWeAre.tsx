import React from 'react';
import { T } from '../contexts/TranslationContext';

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            <T>Biz Kimiz?</T>
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-20">
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto">
            <T>inMapper, dünya çapında 3000'den fazla müşteri kurulumu ve 500'den fazla mobil ve web uygulamasıyla gelişmiş iç mekan navigasyon ve yol bulma teknolojileri sağlayan global bir firmadır. RTLS pazarında dünya genelindeki önemli oyuncular listesinde yer alıyoruz. İç mekan navigasyon yazılımımızı kullanmanın faydalarını kurulumdan sadece bir ay sonra fark edeceksiniz!</T>
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 group">
            <div className="text-5xl sm:text-6xl font-bold text-primary-500 group-hover:scale-110 transition-transform">
              10+
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              <T>Yıllık iç mekan konumlandırma deneyimi</T>
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="text-5xl sm:text-6xl font-bold text-primary-500 group-hover:scale-110 transition-transform">
              3000+
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              <T>inMapper kurulumu bulunan lokasyon</T>
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="text-5xl sm:text-6xl font-bold text-primary-500 group-hover:scale-110 transition-transform">
              500+
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              <T>inMapper platformu üzerine kurulu uygulama</T>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
