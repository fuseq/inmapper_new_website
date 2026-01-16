import React from 'react';
import { MapPin, Shield, Zap, Users, BarChart3, Settings } from 'lucide-react';
import { T } from '../contexts/TranslationContext';

const features = [
  {
    icon: MapPin,
    title: 'Hassas İç Mekan Konumlandırma',
    description: 'Gelişmiş sensör füzyonu ve makine öğrenimi algoritmalarıyla metrealtı doğruluk.',
    color: 'orange'
  },
  {
    icon: Shield,
    title: 'Kurumsal Güvenlik',
    description: 'Hassas konum verilerini korumak için banka düzeyinde şifreleme ve gizlilik kontrolleri.',
    color: 'green'
  },
  {
    icon: Zap,
    title: 'Gerçek Zamanlı Performans',
    description: 'Kesintisiz deneyimler için minimum gecikmeyle anlık konum güncellemeleri.',
    color: 'yellow'
  },
  {
    icon: Users,
    title: 'Çoklu Platform SDK',
    description: 'iOS, Android ve web platformlarında kapsamlı API\'lerle kolay entegrasyon.',
    color: 'purple'
  },
  {
    icon: BarChart3,
    title: 'Gelişmiş Analitik',
    description: 'Hareket kalıpları, bekleme süreleri ve alan kullanımı hakkında derinlemesine içgörüler.',
    color: 'teal'
  },
  {
    icon: Settings,
    title: 'Esnek Dağıtım',
    description: 'İhtiyaçlarınıza uygun bulut, yerinde veya hibrit dağıtım seçenekleri.',
    color: 'orange'
  }
];

const colorMap: Record<string, string> = {
  orange: 'bg-primary-100 text-primary-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  purple: 'bg-purple-100 text-purple-600',
  teal: 'bg-teal-100 text-teal-600'
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            <T>Her Kullanım Alanı İçin Güçlü Özellikler</T>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <T>Kapsamlı platformumuz, olağanüstü iç mekan konum deneyimleri oluşturmak için ihtiyacınız olan her şeyi sunar.</T>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
              >
                <div className={`inline-flex p-3 rounded-xl ${colorMap[feature.color]} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
