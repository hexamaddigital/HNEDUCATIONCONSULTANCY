import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TimelineItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-turquoise via-turquoise-light to-transparent" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex items-start space-x-6"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-turquoise to-turquoise-dark rounded-full flex items-center justify-center shadow-lg z-10">
              <item.icon className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1 pt-2">
              <h3 className="text-2xl font-bold text-heading mb-3">
                {item.title}
              </h3>
              <p className="text-body-text leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
