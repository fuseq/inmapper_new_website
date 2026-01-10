import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Stethoscope, 
  GraduationCap, 
  Trophy,
  Calendar,
  Plane,
  Landmark,
  Building2,
  Store,
  TreePine,
  Mountain,
  Factory,
  ArrowRight
} from 'lucide-react';

const industries = [
  {
    icon: ShoppingBag,
    title: 'AVM & Perakende',
    slug: 'mall',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80'
  },
  {
    icon: Stethoscope,
    title: 'Hastane & Sağlık',
    slug: 'hospital',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80'
  },
  {
    icon: GraduationCap,
    title: 'Üniversite & Eğitim',
    slug: null,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80'
  },
  {
    icon: Trophy,
    title: 'Spor Tesisleri',
    slug: null,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80'
  },
  {
    icon: Calendar,
    title: 'Fuar & Etkinlik',
    slug: 'fair',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
  },
  {
    icon: Plane,
    title: 'Ulaşım Merkezleri',
    slug: 'airport',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'
  },
  {
    icon: Landmark,
    title: 'Müze & Kültür',
    slug: null,
    image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80'
  },
  {
    icon: Building2,
    title: 'Kurumsal Ofisler',
    slug: null,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
  },
  {
    icon: Store,
    title: 'Büyük Mağazalar',
    slug: null,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
  },
  {
    icon: TreePine,
    title: 'Rekreasyon Alanları',
    slug: null,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
  },
  {
    icon: Mountain,
    title: 'Doğa & Koruma',
    slug: null,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80'
  },
  {
    icon: Factory,
    title: 'Endüstri & Üretim',
    slug: null,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
  }
];

const Solutions = () => {
  const [selectedIndex, setSelectedIndex] = useState(4);
  const selectedIndustry = industries[selectedIndex];

  return (
    <section id="solutions" className="py-24 bg-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Her Sektöre Özel Çözümler
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left - Image Card (Hidden on Mobile) */}
          <div className="hidden lg:block lg:w-[450px] flex-shrink-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[624px]">
              <img
                src={selectedIndustry.image}
                alt={selectedIndustry.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Learn More Button */}
              {selectedIndustry.slug ? (
                <Link
                  to={`/cozumler/${selectedIndustry.slug}`}
                  className="absolute bottom-8 left-8 inline-flex items-center bg-white/25 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/40 transition-all duration-300 border border-white/40 shadow-lg"
                >
                  <span className="font-semibold text-lg">Daha Fazla</span>
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Link>
              ) : (
                <div className="absolute bottom-8 left-8 inline-flex items-center bg-white/25 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/40 shadow-lg">
                  <span className="font-semibold text-lg">Yakında</span>
                </div>
              )}
            </div>
          </div>

          {/* Right - Industry Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-md md:max-w-none mx-auto lg:mx-0">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                const isSelected = index === selectedIndex;
                
                // On mobile, make cards clickable links if they have a slug
                const CardContent = (
                  <>
                    <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl mb-3 md:mb-4 transition-colors ${
                      isSelected 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-gray-50 text-gray-500'
                    }`}>
                      <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                    </div>
                    <h3 className={`font-bold text-sm md:text-base leading-tight ${
                      isSelected ? 'text-primary-600' : 'text-gray-800'
                    }`}>
                      {industry.title}
                    </h3>
                    {/* Mobile: Show "Yakında" or arrow indicator */}
                    <div className="lg:hidden mt-2">
                      {industry.slug ? (
                        <span className="inline-flex items-center text-xs text-primary-500 font-medium">
                          Keşfet <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">Yakında</span>
                      )}
                    </div>
                  </>
                );
                
                // Mobile with slug: Link to solution page
                // Mobile without slug or Desktop: Button to select
                return industry.slug ? (
                  <Link
                    key={index}
                    to={`/cozumler/${industry.slug}`}
                    onClick={(e) => {
                      // On desktop, prevent navigation and just select
                      if (window.innerWidth >= 1024) {
                        e.preventDefault();
                        setSelectedIndex(index);
                      }
                    }}
                    className={`p-4 md:p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 text-center block ${
                      isSelected 
                        ? 'ring-2 ring-primary-500 shadow-xl lg:scale-[1.02]' 
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}
                  >
                    {CardContent}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`p-4 md:p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 text-center ${
                      isSelected 
                        ? 'ring-2 ring-primary-500 shadow-xl lg:scale-[1.02]' 
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}
                  >
                    {CardContent}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16 text-gray-600">
          <p>
            Sektörünüzü bulamadınız mı? Her iş için özel çözümler üretiyoruz.
            <br />
            Bilgi için <Link to="/#contact" className="text-primary-500 font-semibold hover:underline">bizimle iletişime geçin</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
