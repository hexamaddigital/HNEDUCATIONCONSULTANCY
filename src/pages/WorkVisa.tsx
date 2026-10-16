import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Globe2,
  Megaphone,
  Network,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
    image: '/images/work-visa/image.png',
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

const detailIcons: LucideIcon[] = [
  Globe2,
  Briefcase,
  UserRound,
  UsersRound,
  Building2,
  Network,
  BarChart3,
  ShieldCheck,
  Megaphone,
];

export const WorkVisa = () => {
  return (
    <main className="bg-[#E4F7F9] pt-28 pb-20 md:pt-36">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
          {workVisaSections.map((section, sectionIndex) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: sectionIndex * 0.05 }}
              className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-9 lg:gap-10"
            >
              <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-[#CDE9ED] bg-white p-3 shadow-[0_18px_45px_rgba(7,85,104,0.10)] sm:min-h-[560px] md:min-h-[620px] md:p-4">
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="h-full max-h-[700px] w-full object-contain object-center"
                />
              </div>

              <div className="flex min-h-[420px] flex-col justify-center rounded-3xl border border-[#CDE9ED] bg-white p-7 shadow-[0_18px_45px_rgba(7,85,104,0.10)] sm:p-10 md:min-h-[620px] md:p-12">
                <div className="mb-8 inline-flex w-fit rounded-full bg-[#E4F6F8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#087D89]">
                  Career Opportunity
                </div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-[#075568] sm:text-4xl lg:text-[2.65rem]">
                  {section.title}
                </h2>
                <div className="mb-9 space-y-3">
                  {section.details.map((detail, detailIndex) => {
                    const DetailIcon = detailIcons[detailIndex % detailIcons.length];
                    const isHighlight = detail.startsWith('Eligibility:');

                    return (
                      <div
                        key={detail}
                        className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 text-base leading-relaxed sm:text-lg ${
                          isHighlight
                            ? 'bg-[#E4F6F8] font-medium text-[#075568]'
                            : 'text-[#244B59]'
                        }`}
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E4F6F8] text-[#087D89]">
                          <DetailIcon className="h-5 w-5" strokeWidth={2.2} />
                        </span>
                        <span>{detail}</span>
                      </div>
                    );
                  })}
                </div>
                <a
                  href="/contact"
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-[#087D89] px-7 py-4 text-base font-semibold text-white shadow-[0_10px_24px_rgba(8,125,137,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#075568] hover:shadow-[0_14px_28px_rgba(8,125,137,0.28)]"
                >
                  <span>Get Free Guidance</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
};
