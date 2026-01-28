import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Users } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    destination: 'UK - University of Manchester',
    quote: 'HN Study Abroad made my dream of studying at Manchester a reality. Their guidance through the entire process was exceptional.',
    course: 'MSc Computer Science',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    destination: 'Canada - University of Toronto',
    quote: 'The visa assistance and documentation support were flawless. I received my study permit without any hassle.',
    course: 'MBA',
  },
  {
    id: 3,
    name: 'Sneha Patel',
    destination: 'Australia - University of Melbourne',
    quote: 'From application to arrival, every step was handled professionally. Highly recommend for anyone planning to study abroad.',
    course: 'Bachelor of Engineering',
  },
  {
    id: 4,
    name: 'Arjun Singh',
    destination: 'USA - Columbia University',
    quote: 'The team helped me secure admission and a scholarship. Their expertise in US admissions is unmatched.',
    course: 'MS Data Science',
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      if (newDirection > 0) {
        return (prev + 1) % testimonials.length;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  return (
    <div className="bg-gradient-to-br from-ghost-green to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            Hear from students who achieved their dreams of studying abroad with our guidance
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mx-4">
                  <Quote className="w-12 h-12 text-turquoise mb-6" />
                  <p className="text-xl md:text-2xl text-body-text mb-8 italic leading-relaxed">
                    "{testimonials[current].quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    {/* User Icon instead of image */}
                    <div className="w-16 h-16 rounded-full bg-turquoise flex items-center justify-center">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-heading">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-turquoise font-medium">
                        {testimonials[current].course}
                      </p>
                      <p className="text-sm text-body-text">
                        {testimonials[current].destination}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-turquoise hover:text-white transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-turquoise hover:text-white transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'w-8 bg-turquoise' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
