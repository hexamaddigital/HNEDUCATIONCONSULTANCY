import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Award, Globe } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 5000,
    suffix: '+',
    label: 'Students Served',
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    value: 500,
    suffix: '+',
    label: 'Partner Universities',
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: 95,
    suffix: '%',
    label: 'Visa Success Rate',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: 25,
    suffix: '+',
    label: 'Countries',
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={counterRef} className="text-5xl md:text-6xl font-bold text-turquoise">
      {count}
      {suffix}
    </div>
  );
};

export const CounterStats = () => {
  return (
    <div className="bg-heading py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4 text-turquoise">
                {stat.icon}
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-white mt-3 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
