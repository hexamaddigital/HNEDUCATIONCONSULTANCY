import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrochureDownloadModal } from '../components/BrochureDownloadModal';
import { COUNTRIES, CountryData } from '../constants/countries';

export const GlobalEducation = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Study Abroad{' '}
            <span className="bg-gradient-to-r from-turquoise to-turquoise-dark bg-clip-text text-transparent">
              Destinations
            </span>
          </motion.h1>
          <p className="mt-4 text-xl">
            Explore world-class education opportunities
          </p>
        </div>
      </section>

      {/* COUNTRY GRID */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTRIES.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer"
              >
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {country.name}
                    </h3>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCountry(country);
                        setShowBrochureModal(true);
                      }}
                      className="w-full py-3 bg-turquoise text-white rounded-full hover:bg-turquoise-dark transition"
                    >
                      Download University List
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BROCHURE MODAL */}
      {selectedCountry && (
        <BrochureDownloadModal
          isOpen={showBrochureModal}
          onClose={() => {
            setShowBrochureModal(false);
            setSelectedCountry(null);
          }}
          country={selectedCountry.name}
        />
      )}
    </>
  );
};
