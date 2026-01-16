import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { T } from '../contexts/TranslationContext';

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
              <T>Kurumsal müşteriler için iç mekan konumlandırma ve konum zekası çözümlerinin lider sağlayıcısı.</T>
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
            <h4 className="font-semibold mb-4 text-white"><T>Ürünler</T></h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Indoor SDK</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Analitik Platform</T></a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Beacon Yönetimi</T></a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><T>API Servisleri</T></a></li>
            </ul>
          </div>

          {/* Çözümler */}
          <div>
            <h4 className="font-semibold mb-4 text-white"><T>Çözümler</T></h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cozumler/airport" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Havaalanı</T></Link></li>
              <li><Link to="/cozumler/mall" className="text-gray-400 hover:text-primary-400 transition-colors">AVM</Link></li>
              <li><Link to="/cozumler/fair" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Fuar</T></Link></li>
              <li><Link to="/cozumler/hospital" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Hastane</T></Link></li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="font-semibold mb-4 text-white"><T>Şirket</T></h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Hakkımızda</T></a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Kariyer</T></a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><T>Basın</T></a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><T>İş Ortakları</T></a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 inMapper. <T>Tüm hakları saklıdır.</T>
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors"><T>Gizlilik Politikası</T></a>
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors"><T>Kullanım Şartları</T></a>
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors"><T>Çerez Politikası</T></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
