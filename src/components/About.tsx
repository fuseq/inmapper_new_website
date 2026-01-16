import React from 'react';
import { Award, Globe, Users2, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Globe, value: '50+', label: 'Ülke' },
  { icon: Users2, value: '1M+', label: 'Günlük Kullanıcı' },
  { icon: Award, value: '%99.9', label: 'Çalışma Süresi' },
  { icon: TrendingUp, value: '15x', label: 'Ortalama ROI' }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                İç Mekan Konum Zekasının
                <span className="text-primary-500 block">Geleceğine Öncülük Ediyoruz</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                On yılı aşkın süredir iç mekan konumlandırma teknolojisine öncülük ediyor, 
                dünya genelindeki kuruluşların daha akıllı ve daha bağlantılı alanlar yaratmasına yardımcı oluyoruz.
              </p>
            </div>

            <div className="space-y-4 text-left pl-4 md:pl-8 lg:pl-0">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">İnovasyon Öncelikli</h4>
                  <p className="text-gray-600">Son teknoloji algoritmalar ve sürekli Ar-Ge yatırımı bizi her zaman önde tutuyor.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ölçeklenebilir Çözümler</h4>
                  <p className="text-gray-600">Tek binadan kurumsal dağıtımlara kadar çözümlerimiz sorunsuz şekilde ölçeklenir.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Uzman Destek</h4>
                  <p className="text-gray-600">Özel destek ekibimiz ve profesyonel hizmetlerimiz başarılı uygulamaları garanti eder.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">Küresel Varlık</h4>
                  <div className="text-sm text-green-600 font-medium flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Canlı
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Türkiye</span>
                    </div>
                    <span className="text-xs text-gray-600">150+ lokasyon</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Avrupa</span>
                    </div>
                    <span className="text-xs text-gray-600">180+ lokasyon</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Orta Doğu</span>
                    </div>
                    <span className="text-xs text-gray-600">120+ lokasyon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
