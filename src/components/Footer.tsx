import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo and Description */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/logos/inmapper.png" 
                alt="inMapper Logo" 
                className="h-9 w-9 object-contain"
              />
              <div className="ml-2 flex items-baseline">
                <span className="text-xl font-bold text-primary-400">in</span>
                <span className="text-xl font-bold" style={{ color: '#808080' }}>Mapper</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Kurumsal müşteriler için iç mekan konumlandırma ve konum zekası çözümlerinin lider sağlayıcısı.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Ürünler */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Ürünler</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Indoor SDK</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Analitik Platform</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Beacon Yönetimi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">API Servisleri</a></li>
            </ul>
          </div>

          {/* Çözümler */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Çözümler</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cozumler/airport" className="text-gray-400 hover:text-primary-400 transition-colors">Havaalanı</Link></li>
              <li><Link to="/cozumler/mall" className="text-gray-400 hover:text-primary-400 transition-colors">AVM</Link></li>
              <li><Link to="/cozumler/fair" className="text-gray-400 hover:text-primary-400 transition-colors">Fuar</Link></li>
              <li><Link to="/cozumler/hospital" className="text-gray-400 hover:text-primary-400 transition-colors">Hastane</Link></li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Şirket</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-primary-400 transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Kariyer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Basın</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">İş Ortakları</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 inMapper. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">Gizlilik Politikası</a>
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">Kullanım Şartları</a>
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
