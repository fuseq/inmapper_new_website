import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, MapPin, Users, Clock, Shield, Smartphone, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const solutionData = {
  airport: {
    title: 'Havaalanı Çözümleri',
    subtitle: 'Yolcu deneyimini üst seviyeye taşıyın',
    description: 'Havaalanlarında yolcuların terminal içinde rahatça gezinmesini, kapılarını zamanında bulmasını ve stressiz bir seyahat deneyimi yaşamasını sağlayın.',
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    blogContent: `
      <h3>Havaalanı İç Mekan Navigasyonu Nasıl Çalışır?</h3>
      <p>Modern havaalanları, yüz binlerce metrekarelik alana yayılan devasa komplekslerdir. Yolcular için doğru kapıyı bulmak, güvenlik kontrolünden geçmek ve uçuşa yetişmek stresli bir deneyim olabilir. inMapper'ın havaalanı çözümü, bu karmaşık ortamda kusursuz bir navigasyon deneyimi sunar.</p>
      
      <h3>Entegrasyon Süreci</h3>
      <p>Havaalanı entegrasyonu üç ana aşamadan oluşur. İlk olarak, terminal binalarının detaylı CAD çizimleri veya mimari planları sisteme yüklenir. Ardından, Bluetooth Low Energy (BLE) beacon'ları veya WiFi erişim noktaları stratejik konumlara yerleştirilir. Son olarak, havaalanının mevcut uçuş bilgi sistemleri (FIDS) ile API entegrasyonu sağlanarak gerçek zamanlı kapı değişiklikleri ve uçuş bilgileri haritaya yansıtılır.</p>
      
      <h3>Konum Belirleme Teknolojisi</h3>
      <p>inMapper, hibrit bir konum belirleme yaklaşımı kullanır. BLE beacon'ları 1-3 metre hassasiyetle konum tespiti sağlarken, WiFi fingerprinting teknolojisi bu doğruluğu destekler. Sensör füzyonu algoritmaları, akıllı telefonların ivmeölçer ve pusula verilerini de dahil ederek yürüyüş yönünü ve hızını hesaplar. Bu sayede yolcular, adım adım navigasyon ile kapılarına ulaşır.</p>
      
      <h3>Öne Çıkan Özellikler</h3>
      <p>Sistem, sadece navigasyonla sınırlı kalmaz. Güvenlik kontrol noktalarındaki tahmini bekleme süreleri, en yakın lounge ve restoran önerileri, duty-free mağaza kampanyaları ve bagaj bandı bildirimleri gibi ek özellikler sunar. Tüm bu veriler, havaalanı operasyon merkezi tarafından yönetilen merkezi bir panelden güncellenir.</p>
    `,
    carouselImages: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
      'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&q=80',
      'https://images.unsplash.com/photo-1583418007992-a8e33a92e7ad?w=800&q=80',
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&q=80'
    ],
    features: [
      { icon: MapPin, title: 'Kapı Bulma', description: 'Yolcuları en kısa yoldan doğru kapıya yönlendirin.' },
      { icon: Clock, title: 'Bekleme Süresi Tahmini', description: 'Güvenlik ve pasaport kontrolü bekleme sürelerini gösterin.' },
      { icon: Users, title: 'Kalabalık Analizi', description: 'Terminal içi yoğunluk haritası ile alternatif rotalar önerin.' },
      { icon: Smartphone, title: 'Mobil Entegrasyon', description: 'Havaalanı uygulamasıyla tam entegrasyon sağlayın.' },
    ],
    benefits: [
      'Yolcu memnuniyetinde %40 artış',
      'Kaçırılan uçuşlarda %25 azalma',
      'Terminal içi harcamalarda %15 artış',
      'Personel verimliliğinde %30 iyileşme'
    ],
    useCases: [
      {
        title: 'Gate Navigasyonu',
        description: 'Yolcular check-in sonrası telefonlarından kapılarına en hızlı rotayı görebilir.',
        image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=600&q=80'
      },
      {
        title: 'Lounge & Mağaza Bulma',
        description: 'VIP lounge, restoran ve duty-free mağazalara kolay erişim.',
        image: 'https://images.unsplash.com/photo-1583418007992-a8e33a92e7ad?w=600&q=80'
      },
      {
        title: 'Bagaj Takibi',
        description: 'Yolcular bagajlarının hangi bantta olduğunu gerçek zamanlı takip edebilir.',
        image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&q=80'
      }
    ]
  },
  mall: {
    title: 'AVM Çözümleri',
    subtitle: 'Alışveriş deneyimini dönüştürün',
    description: 'Müşterilerinizi aradıkları mağazalara, kampanyalara ve hizmetlere kolayca yönlendirin. Ziyaretçi analitiği ile değerli içgörüler elde edin.',
    heroImage: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
    blogContent: `
      <h3>AVM'lerde Dijital Dönüşüm</h3>
      <p>Alışveriş merkezleri, perakende sektörünün kalbi olmaya devam ediyor. Ancak online alışverişin yükselişiyle birlikte, fiziksel mağazaların sunduğu deneyimi zenginleştirmek kritik önem kazandı. inMapper'ın AVM çözümü, müşterilere kişiselleştirilmiş bir alışveriş deneyimi sunarken, AVM yönetimine değerli veri analitiği sağlar.</p>
      
      <h3>Kurulum ve Yapılandırma</h3>
      <p>AVM entegrasyonu, mevcut WiFi altyapısı üzerine kurulabilir veya BLE beacon ağı ile desteklenebilir. Harita oluşturma sürecinde, her katın detaylı planı çıkarılır, mağaza sınırları belirlenir ve POI (Point of Interest) noktaları işaretlenir. Mağaza bilgileri, çalışma saatleri ve kampanyalar için AVM'nin mevcut CMS sistemiyle entegrasyon sağlanır.</p>
      
      <h3>Müşteri Yolculuğu Analizi</h3>
      <p>Sistem, anonim olarak müşteri hareketlerini izler ve ısı haritaları oluşturur. Hangi koridorların daha yoğun olduğu, müşterilerin ortalama kalış süresi, mağaza vitrinlerinin çekiciliği gibi metrikler raporlanır. Bu veriler, kira sözleşmelerinde ve mağaza yerleşim kararlarında objektif bir dayanak sağlar.</p>
      
      <h3>Konum Bazlı Pazarlama</h3>
      <p>inMapper'ın push notification altyapısı, müşteriler belirli bir mağazaya yaklaştığında otomatik kampanya bildirimleri gönderebilir. Opt-in bazlı bu sistem, müşteri gizliliğine saygı gösterirken dönüşüm oranlarını artırır. Otopark modülü ise müşterilerin araçlarını kolayca bulmasını sağlar.</p>
    `,
    carouselImages: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=800&q=80',
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80'
    ],
    features: [
      { icon: MapPin, title: 'Mağaza Bulma', description: 'Yüzlerce mağaza arasında aradığınızı saniyeler içinde bulun.' },
      { icon: BarChart3, title: 'Ziyaretçi Analitiği', description: 'Hangi alanların daha çok ziyaret edildiğini analiz edin.' },
      { icon: Shield, title: 'Promosyon Bildirimleri', description: 'Konum bazlı kampanya bildirimleri gönderin.' },
      { icon: Users, title: 'Otopark Yönlendirme', description: 'Müşterileri araçlarına en kısa yoldan yönlendirin.' },
    ],
    benefits: [
      'Müşteri memnuniyetinde %35 artış',
      'Ortalama ziyaret süresinde %20 artış',
      'Kampanya dönüşüm oranlarında %45 artış',
      'Müşteri şikayetlerinde %50 azalma'
    ],
    useCases: [
      {
        title: 'İnteraktif AVM Haritası',
        description: 'Tüm katları ve mağazaları gösteren 3D interaktif harita.',
        image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=600&q=80'
      },
      {
        title: 'Akıllı Park Sistemi',
        description: 'Boş park yerlerini gösterin ve araç konumunu kaydedin.',
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80'
      },
      {
        title: 'Kampanya Hedefleme',
        description: 'Müşterilere yakınlarındaki mağaza kampanyalarını gösterin.',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80'
      }
    ]
  },
  fair: {
    title: 'Fuar & Etkinlik Çözümleri',
    subtitle: 'Etkinlik deneyimini zenginleştirin',
    description: 'Fuarlarda, kongrelerde ve büyük etkinliklerde ziyaretçilerin stantları, konferans salonlarını ve hizmet noktalarını kolayca bulmasını sağlayın.',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    blogContent: `
      <h3>Fuar ve Etkinliklerde Navigasyon</h3>
      <p>Büyük fuarlar ve kongreler, binlerce ziyaretçi ve yüzlerce katılımcıyı bir araya getirir. Bu kaotik ortamda ziyaretçilerin ilgilerini çeken stantları bulması, konferans programını takip etmesi ve networking fırsatlarını değerlendirmesi zor olabilir. inMapper, etkinlik deneyimini baştan sona optimize eder.</p>
      
      <h3>Hızlı Kurulum Avantajı</h3>
      <p>Fuar ve etkinlikler geçici yapılar olduğundan, inMapper'ın taşınabilir beacon çözümü ideal bir seçenektir. Manyetik tabanlı beacon'lar, kurulum öncesi saatler içinde yerleştirilebilir ve etkinlik sonunda kolayca toplanabilir. Harita güncellemeleri bulut tabanlı yönetim panelinden anlık olarak yapılabilir.</p>
      
      <h3>Katılımcı ve Stant Sahibi Perspektifi</h3>
      <p>Ziyaretçiler, QR kod tarayarak veya etkinlik uygulamasını indirerek sisteme erişir. İlgi alanlarına göre stant önerileri alır, konferans programını kişiselleştirir ve networking etkinliklerinin yerini öğrenir. Stant sahipleri ise kendi mini-analizlerine erişerek, stantlarını kaç kişinin ziyaret ettiğini, ortalama kalış süresini ve yoğun saatleri görüntüleyebilir.</p>
      
      <h3>Lead Generation Entegrasyonu</h3>
      <p>inMapper, popüler CRM sistemleriyle entegre olarak stant ziyaretlerini otomatik olarak lead olarak kaydedebilir. Badge tarama sistemiyle birleştirildiğinde, satış ekipleri için değerli bir veri kaynağı oluşturur.</p>
    `,
    carouselImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80'
    ],
    features: [
      { icon: MapPin, title: 'Stant Bulma', description: 'Ziyaretçileri ilgilendikleri stantlara yönlendirin.' },
      { icon: Clock, title: 'Etkinlik Programı', description: 'Konferans ve sunumların yerlerini ve saatlerini gösterin.' },
      { icon: Users, title: 'Networking Noktaları', description: 'Toplantı alanları ve networking noktalarını belirleyin.' },
      { icon: BarChart3, title: 'Ziyaretçi İstatistikleri', description: 'Stant ziyaret sayıları ve yoğunluk analizleri.' },
    ],
    benefits: [
      'Ziyaretçi etkileşiminde %50 artış',
      'Stant keşfedilebilirliğinde %60 artış',
      'Etkinlik memnuniyetinde %40 artış',
      'Organizatör için değerli veri analitiği'
    ],
    useCases: [
      {
        title: 'Dijital Fuar Rehberi',
        description: 'Tüm stantları, etkinlikleri ve hizmetleri gösteren interaktif rehber.',
        image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80'
      },
      {
        title: 'Konferans Navigasyonu',
        description: 'Konferans salonu ve workshop alanlarına kolay yönlendirme.',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80'
      },
      {
        title: 'Lead Takibi',
        description: 'Stant sahipleri için ziyaretçi etkileşim analizi.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80'
      }
    ]
  },
  hospital: {
    title: 'Hastane Çözümleri',
    subtitle: 'Sağlık hizmetlerini kolaylaştırın',
    description: 'Hastalar, ziyaretçiler ve personelin geniş hastane komplekslerinde kaybolmadan doğru bölüme ulaşmasını sağlayın. Ekipman takibi ile verimliliği artırın.',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
    blogContent: `
      <h3>Sağlık Sektöründe İç Mekan Navigasyonu</h3>
      <p>Hastaneler, stresli anların yaşandığı yerlerdir. Hastalar ve yakınları için doğru polikliniği, laboratuvarı veya hasta odasını bulmak, zaten zor bir durumu daha da karmaşık hale getirebilir. inMapper'ın hastane çözümü, hem hasta deneyimini iyileştirir hem de operasyonel verimliliği artırır.</p>
      
      <h3>HBYS Entegrasyonu</h3>
      <p>inMapper, Hastane Bilgi Yönetim Sistemi (HBYS) ile entegre çalışır. Hasta randevusu oluşturulduğunda, otomatik olarak ilgili polikliniğe navigasyon bilgisi hasta uygulamasına gönderilir. Randevu saati yaklaştığında hatırlatma bildirimi ile birlikte adım adım yol tarifi sunulur.</p>
      
      <h3>Varlık Takip Sistemi (RTLS)</h3>
      <p>Hastanelerde kritik ekipmanların (tekerlekli sandalye, infüzyon pompası, defibrilatör vb.) anlık konumunu bilmek hayati önem taşır. inMapper'ın RTLS modülü, Bluetooth etiketli ekipmanların gerçek zamanlı takibini sağlar. Hemşireler, en yakın müsait ekipmanı saniyeler içinde bulabilir.</p>
      
      <h3>Acil Durum Senaryoları</h3>
      <p>Yangın, deprem veya diğer acil durumlarda, sistem otomatik olarak en yakın çıkışa yönlendirme moduna geçer. Engelli bireyler için asansör durumu ve alternatif rotalar gösterilir. Acil durum ekipleri, hasta ve personel konumlarını merkezi panelden takip edebilir.</p>
      
      <h3>Hijyen ve Gizlilik</h3>
      <p>Hastane ortamında beacon'lar antibakteriyel kaplama ile korunur. Hasta konum verileri KVKK uyumlu şekilde işlenir, sadece yetkilendirilmiş personel erişebilir ve belirli süre sonunda otomatik olarak anonimleştirilir.</p>
    `,
    carouselImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80'
    ],
    features: [
      { icon: MapPin, title: 'Poliklinik Yönlendirme', description: 'Hastaları doğru poliklinik ve laboratuvara yönlendirin.' },
      { icon: Shield, title: 'Ekipman Takibi', description: 'Tıbbi cihaz ve ekipmanların gerçek zamanlı konumunu takip edin.' },
      { icon: Users, title: 'Personel Optimizasyonu', description: 'Hemşire ve doktor konumlarını optimize edin.' },
      { icon: Clock, title: 'Acil Durum Yönetimi', description: 'Acil durumlarda en hızlı tahliye rotalarını gösterin.' },
    ],
    benefits: [
      'Hasta bekleme süresinde %30 azalma',
      'Ekipman arama süresinde %70 azalma',
      'Hasta memnuniyetinde %45 artış',
      'Operasyonel maliyetlerde %25 tasarruf'
    ],
    useCases: [
      {
        title: 'Hasta Navigasyonu',
        description: 'Hastalar randevu aldıkları bölüme adım adım yönlendirilir.',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80'
      },
      {
        title: 'Ziyaretçi Rehberi',
        description: 'Hasta yakınları kolayca ilgili servisi bulabilir.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80'
      },
      {
        title: 'Asset Tracking',
        description: 'Tekerlekli sandalye, sedye ve tıbbi cihazların anlık takibi.',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80'
      }
    ]
  }
};

const SolutionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = solutionData[slug as keyof typeof solutionData];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!solution) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % solution.carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [solution]);

  const nextImage = () => {
    if (!solution) return;
    setCurrentImageIndex((prev) => (prev + 1) % solution.carouselImages.length);
  };

  const prevImage = () => {
    if (!solution) return;
    setCurrentImageIndex((prev) => (prev - 1 + solution.carouselImages.length) % solution.carouselImages.length);
  };

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sayfa Bulunamadı</h1>
          <Link to="/" className="text-primary-500 hover:text-primary-600">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="absolute inset-0 h-[450px]">
          <img 
            src={solution.heroImage} 
            alt={solution.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"></div>
        </div>
        
        <div className="relative px-8 sm:px-16 lg:px-24 xl:px-32 py-28">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            {solution.title}
          </h1>
          <p className="text-lg sm:text-xl text-primary-400 font-medium mb-4">
            {solution.subtitle}
          </p>
          <p className="text-base text-gray-300 max-w-xl">
            {solution.description}
          </p>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16 bg-white">
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content - Left */}
            <div 
              className="pl-4 sm:pl-8 lg:pl-12 blog-content [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-8 [&>h3]:mb-4 [&>h3:first-child]:mt-0 [&>p]:text-gray-600 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-base"
              dangerouslySetInnerHTML={{ __html: solution.blogContent }}
            />
            
            {/* Image Carousel - Right */}
            <div className="flex justify-center items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-[650px]">
                {/* Images */}
                <div className="relative h-[450px] lg:h-[600px]">
                  {solution.carouselImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${solution.title} - ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {solution.carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Temel Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {solution.title} için özel olarak tasarlanmış özellikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solution.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="inline-flex p-4 bg-primary-100 text-primary-600 rounded-xl mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Kazanımlar
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              inMapper ile elde edeceğiniz somut faydalar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {solution.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <CheckCircle className="h-6 w-6 text-white mr-4 flex-shrink-0" />
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Kullanım Senaryoları
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gerçek dünya uygulamaları
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solution.useCases.map((useCase, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600">
                    {useCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Projenizi Birlikte Değerlendirelim
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Uzman ekibimiz ihtiyaçlarınızı analiz edip size özel çözüm sunmak için hazır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
            >
              İletişime Geç
            </Link>
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-primary-500 hover:text-primary-500 transition-colors"
            >
              Tüm Çözümler
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionDetail;
