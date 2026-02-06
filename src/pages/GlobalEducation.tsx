import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  CalendarDays,
  Building2,
  X,
  CheckCircle,
  Download,
  Phone,
  DollarSign,
  Home,
  MapPin,
} from 'lucide-react';
import { BrochureDownloadModal } from '../components/BrochureDownloadModal';
import { COUNTRIES, CountryData } from '../constants/countries';

export const GlobalEducation = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg')] bg-cover bg-center opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-heading">
              Study Abroad{' '}
              <span className="bg-gradient-to-r from-turquoise to-turquoise-dark bg-clip-text text-transparent">
                Destinations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-body-text">
              Explore world-class education opportunities across top study destinations
            </p>
          </motion.div>
        </div>
      </section>

      {/* COUNTRY CARDS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {COUNTRIES.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCountry(country)}
                className="cursor-pointer"
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-heading via-heading/70 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold text-white mb-6">
                      {country.name}
                    </h3>
                    <button className="px-6 py-3 bg-turquoise text-white rounded-full">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 pt-24"
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-6 border-b flex justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedCountry.flag}</span>
                  <h2 className="text-3xl font-bold">{selectedCountry.name}</h2>
                </div>
                <button onClick={() => setSelectedCountry(null)}>
                  <X />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* WHY STUDY */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="text-turquoise" /> Why Study Here?
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedCountry.whyStudy.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle className="text-turquoise" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* UNIVERSITIES */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Building2 className="text-turquoise" /> Universities
                  </h3>

                  <button
                    onClick={() => setShowBrochureModal(true)}
                    className="w-full py-3 border-2 border-turquoise text-turquoise rounded-xl hover:bg-turquoise hover:text-white transition"
                  >
                    <Download className="inline mr-2" />
                    Download Complete University List
                  </button>
                </div>

                {/* FEES */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-xl">
                    <h3 className="font-bold flex items-center gap-2">
                      <DollarSign className="text-turquoise" /> Tuition Fees
                    </h3>
                    <p>{selectedCountry.tuitionFees}</p>
                  </div>
                  <div className="p-6 border rounded-xl">
                    <h3 className="font-bold flex items-center gap-2">
                      <Home className="text-turquoise" /> Living Cost
                    </h3>
                    <p>{selectedCountry.livingCost}</p>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="block text-center py-4 border-2 border-turquoise text-turquoise rounded-xl hover:bg-turquoise hover:text-white"
                >
                  <Phone className="inline mr-2" />
                  Book Free Counselling
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BROCHURE MODAL */}
      {selectedCountry && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          country={selectedCountry.name}
        />
      )}
    </>
  );
};
