import { motion } from 'framer-motion';

export const EnglishLanguageProgram = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-heading text-center leading-tight mb-10"
          >
            WHAT WE PROVIDE
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src="/WhatsApp_Image_2026-10-14_at_12.28.45_PM.jpeg"
              alt="English Language Program"
              className="block w-full max-h-[900px] object-contain object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
