import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, CalendarDays, Building2, X, CheckCircle, Download, Phone, DollarSign, Home, MapPin } from 'lucide-react';
import { BrochureDownloadModal } from '../components/BrochureDownloadModal';
import { COUNTRIES, CountryData } from '../constants/countries';

export const GlobalEducation = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-heading">
              Study Abroad <span className="bg-gradient-to-r from-turquoise to-turquoise-dark bg-clip-text text-transparent">Destinations</span>
            </h1>
            <p className="text-xl md:text-2xl text-body-text leading-relaxed">
              Explore world-class education opportunities across top study destinations
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {COUNTRIES.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCountry(country)}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-heading via-heading/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold text-white mb-6">
                      {country.name}
                    </h3>
                    <button className="px-6 py-3 bg-turquoise text-white rounded-full font-medium hover:bg-turquoise-dark transition-colors duration-300 group-hover:scale-105 transform">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 pt-24"
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white z-50 p-6 pb-8 border-b border-gray-200 flex items-center justify-between rounded-t-3xl shadow-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-5xl">{selectedCountry.flag}</span>
                  <h2 className="text-3xl font-bold text-heading">
                    {selectedCountry.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 text-turquoise mr-3" />
                    <h3 className="text-2xl font-bold text-heading">Why Study Here?</h3>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedCountry.whyStudy.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-turquoise mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-body-text">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Building2 className="w-6 h-6 text-turquoise mr-3" />
                    <h3 className="text-2xl font-bold text-heading">Top Universities</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {selectedCountry.topUniversities.map((uni, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-ghost-green to-white rounded-xl p-4 border border-turquoise/20 hover:border-turquoise/40 transition-colors"
                      >
                        <p className="text-body-text font-medium">{uni}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowBrochureModal(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-turquoise text-turquoise rounded-xl font-medium hover:bg-turquoise hover:text-white transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Complete Universities List</span>
                  </button>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <CalendarDays className="w-6 h-6 text-turquoise mr-3" />
                    <h3 className="text-xl font-bold text-heading">Intakes</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedCountry.intakes.map((intake, index) => (
                      <li key={index} className="flex items-center text-body-text">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-3"></span>
                        {intake}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedCountry.roadmap && (
                  <div>
                    <div className="flex items-center mb-6">
                      <MapPin className="w-6 h-6 text-turquoise mr-3" />
                      <h3 className="text-2xl font-bold text-heading">Application Roadmap</h3>
                    </div>
                    {selectedCountry.ageRestriction && (
                      <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-amber-800">
                              Important Note: {selectedCountry.ageRestriction}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="relative">
                      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-turquoise via-turquoise to-turquoise-dark" />
                      <div className="space-y-6">
                        {selectedCountry.roadmap.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex items-start"
                          >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-turquoise to-turquoise-dark rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                              {index + 1}
                            </div>
                            <div className="ml-6 flex-grow bg-gradient-to-br from-ghost-green to-white rounded-xl p-4 border border-turquoise/20 hover:border-turquoise/40 transition-all duration-300 hover:shadow-md">
                              <p className="text-body-text font-medium text-lg">{step}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-turquoise/10 to-white rounded-xl p-6 border border-turquoise/20">
                    <div className="flex items-center mb-3">
                      <DollarSign className="w-6 h-6 text-turquoise mr-2" />
                      <h3 className="text-xl font-bold text-heading">Tuition Fees</h3>
                    </div>
                    <p className="text-body-text text-lg font-medium">{selectedCountry.tuitionFees}</p>
                  </div>

                  <div className="bg-gradient-to-br from-turquoise/10 to-white rounded-xl p-6 border border-turquoise/20">
                    <div className="flex items-center mb-3">
                      <Home className="w-6 h-6 text-turquoise mr-2" />
                      <h3 className="text-xl font-bold text-heading">Living Cost</h3>
                    </div>
                    <p className="text-body-text text-lg font-medium">{selectedCountry.livingCost}</p>
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowBrochureModal(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Brochure</span>
                  </button>
                  <a
                    href="/contact"
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border-2 border-turquoise text-turquoise rounded-xl font-semibold hover:bg-turquoise hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Book Free Counselling</span>
                  </a>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="w-full px-8 py-4 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCountry && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          country={selectedCountry.name}
          brochureUrl="/brochures/sample-brochure.pdf"
        />
      )}
    </>
  );
};
