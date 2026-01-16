import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Başlamaya Hazır mısınız?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            İç mekan konumlandırma ihtiyaçlarınızı görüşmek ve inMapper'ın alanınızı nasıl dönüştürebileceğini keşfetmek için ekibimizle iletişime geçin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">İletişime Geçin</h3>
              <div className="space-y-6 flex flex-col items-center lg:items-start">
                <div className="flex items-start space-x-4 text-left w-[220px] lg:w-auto">
                  <div className="flex-shrink-0 p-3 bg-primary-100 text-primary-600 rounded-xl">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">E-posta</h4>
                    <p className="text-gray-600">info@inmapper.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 text-left w-[220px] lg:w-auto">
                  <div className="flex-shrink-0 p-3 bg-primary-100 text-primary-600 rounded-xl">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefon</h4>
                    <p className="text-gray-600">+90 (212) 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 text-left w-[220px] lg:w-auto">
                  <div className="flex-shrink-0 p-3 bg-primary-100 text-primary-600 rounded-xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ofis</h4>
                    <p className="text-gray-600">
                      Teknopark İstanbul<br />
                      Pendik, İstanbul 34906
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-semibold mb-4">Demo Planlayın</h4>
              <p className="mb-6 opacity-90">
                Kullanım alanınıza özel kişiselleştirilmiş bir demo ile teknolojimizi çalışırken görün.
              </p>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Demo Rezervasyonu
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="email@sirket.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Şirket
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Şirket adı"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Projeniz hakkında bize bilgi verin..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Mesaj Gönder</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
