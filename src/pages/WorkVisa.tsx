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
        <div className="max-w-6xl mx-auto space-y-12">
          {workVisaSections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="overflow-hidden rounded-3xl bg-white shadow-xl"
            >
              <img
                src={section.image}
                alt={section.imageAlt}
                className="block w-full max-h-[760px] object-contain bg-white"
              />
              <div className="p-8 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-heading mb-6">{section.title}</h1>
                <div className="space-y-3 text-lg text-body-text">
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
