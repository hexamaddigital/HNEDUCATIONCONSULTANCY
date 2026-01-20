import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COUNTRIES } from '../constants/countries';

export const CountryCarousel = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Explore Global Destinations
          </h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            Choose from top study destinations around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COUNTRIES.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to="/global-education">
                <div className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-heading via-heading/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {country.name}
                    </h3>
                    <p className="text-white/90 mb-4 text-sm">
                      {country.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {country.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-turquoise-light text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-turquoise rounded-full" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center text-turquoise font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2">Explore</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/global-education"
            className="inline-flex items-center px-8 py-4 bg-turquoise text-white rounded-full font-semibold hover:bg-turquoise-dark transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All Destinations
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
