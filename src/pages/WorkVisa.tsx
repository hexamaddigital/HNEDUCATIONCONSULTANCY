import { motion } from 'framer-motion';

interface WorkVisaSection {
  title: string;
  image: string;
  imageAlt: string;
  details: string[];
}

const workVisaSections: WorkVisaSection[] = [
  {
    title: 'Work In Dubai Nursing',
    image: '/WhatsApp_Image_2026-10-14_at_11.41.31_AM.jpeg',
    imageAlt: 'Work in Dubai nursing',
    details: [
      '2 years Work visa',
      'Direct Job Opportunities',
      'Position: Care Giver',
      'Eligibility: GNM & B.Sc. Nursing Candidates',
    ],
  },
  {
    title: 'Work In Mauritius',
    image: '/WhatsApp_Image_2026-10-14_at_11.44.08_AM.jpeg',
    imageAlt: 'Work in Mauritius',
    details: ['Direct Work Visa', 'Popular Fields:', 'Hospitality Management', 'Business Management'],
  },
  {
    title: 'Work In Dubai',
    image: '/WhatsApp_Image_2026-10-14_at_11.52.28_AM.jpeg',
    imageAlt: 'Work in Dubai',
    details: [
      '2 years work visa',
      'Direct Job Opportunities',
      'Popular Fields In Dubai:',
      'Health Care Management',
      'Hospitality Management',
      'Supply Chain Management & Logistics',
      'Business Management',
      'Date Science & Artificial Intelligence',
      'Cyber Security',
      'Digital Marketing',
    ],
  },
];

export const WorkVisa = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {workVisaSections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-14 py-12 md:py-16 ${
                index > 0 ? 'border-t border-turquoise/20' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="block w-full max-h-[620px] object-contain object-center"
                />
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <h2 className="text-3xl md:text-4xl font-bold text-heading mb-8">{section.title}</h2>
                <div className="space-y-4 text-lg text-body-text leading-relaxed">
                  {section.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
