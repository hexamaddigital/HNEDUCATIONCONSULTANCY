import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Globe2,
  MapPin,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CareerDetail {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface WorkVisaOpportunity {
  number: string;
  category: string;
  country: string;
  focus: string;
  visualHighlight: string;
  description: string;
  image: string;
  imageAlt: string;
  details: CareerDetail[];
  highlightLabel?: string;
  highlightValue?: string;
}

const workVisaOpportunities: WorkVisaOpportunity[] = [
  {
    number: '01',
    category: 'Healthcare Careers',
    country: 'Dubai',
    focus: 'Nursing',
    visualHighlight: 'Care Giver | GNM & B.Sc. Nursing',
    description: 'Join the healthcare sector in Dubai and build a rewarding career with global exposure and excellent benefits.',
    image: 'https://images.pexels.com/photos/18341554/pexels-photo-18341554.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: "Dubai skyline at twilight with the Burj Khalifa",
    details: [
      { label: 'Visa Duration', value: '2 Years', icon: CalendarDays },
      { label: 'Position', value: 'Care Giver', icon: UserRound },
      { label: 'Job Opportunities', value: 'Direct', icon: Briefcase },
    ],
    highlightLabel: 'Eligibility',
    highlightValue: 'GNM & B.Sc. Nursing Candidates',
  },
  {
    number: '02',
    category: 'Hospitality & Business',
    country: 'Mauritius',
    focus: '',
    visualHighlight: 'A Beautiful Destination for a Global Career',
    description: 'Experience a unique blend of career growth and island lifestyle with top opportunities in hospitality and business.',
    image: 'https://images.pexels.com/photos/36731905/pexels-photo-36731905.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Mauritius beach with Le Morne Brabant mountain',
    details: [
      { label: 'Visa Type', value: 'Direct Work Visa', icon: ShieldCheck },
      { label: 'Popular Fields', value: 'Hospitality Management · Business Management', icon: Briefcase },
    ],
  },
  {
    number: '03',
    category: 'Diverse Career Fields',
    country: 'Dubai',
    focus: 'Work Visa',
    visualHighlight: 'Multiple Job Opportunities',
    description: "Explore a wide range of career opportunities in one of the world's most dynamic cities.",
    image: 'https://images.pexels.com/photos/19709725/pexels-photo-19709725.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: "Dubai skyline with the Burj Khalifa at sunset",
    details: [
      { label: 'Visa Duration', value: '2 Years', icon: CalendarDays },
      { label: 'Popular Fields', value: 'Healthcare | Hospitality | More', icon: UsersRound },
      { label: 'Job Opportunities', value: 'Direct', icon: Briefcase },
    ],
    highlightLabel: 'Available Fields',
    highlightValue: 'Healthcare Management · Hospitality Management · Supply Chain Management & Logistics · Business Management · Date Science & Artificial Intelligence · Cyber Security · Digital Marketing',
  },
];

const trustIndicators = [
  { label: 'Trusted Guidance', icon: ShieldCheck },
  { label: '100% Genuine Process', icon: CheckCircle2 },
  { label: 'Global Network', icon: Globe2 },
];

export const WorkVisa = () => {
  return (
    <main className="overflow-hidden bg-[#E4F7F9] pb-20 text-[#244B59]">
      <section className="relative bg-gradient-to-br from-[#E4F7F9] via-[#D9F4F8] to-[#BFE9F4] pb-24 pt-12 md:pb-28 md:pt-16">
        <div className="absolute right-[-10%] top-[-20%] h-[550px] w-[550px] rounded-full border-[45px] border-white/35" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="mb-5 inline-flex rounded-full bg-[#C6EEF1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#087D89]">
                Global Career Opportunities
              </div>
              <h1 className="max-w-xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-[#075568] sm:text-6xl lg:text-[4.7rem]">
                Work Visa<br />Opportunities
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#244B59] sm:text-lg">
                Your global career starts here. Explore top work visa opportunities and build a better future abroad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {trustIndicators.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-3 text-xs font-semibold text-[#075568] shadow-[0_8px_20px_rgba(7,85,104,0.08)] backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-[#087D89]" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mx-auto h-[260px] w-full max-w-2xl overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#81D1ED] via-[#BDEAF3] to-[#D6F1EA] sm:h-[340px] lg:h-[380px]"
            >
              <img
                src="/images/work-visa/image copy.png"
                alt="Work visa travel visual"
                className="h-full w-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 pt-10 md:space-y-10 md:pt-12">
        <div className="mx-auto max-w-7xl">
          {workVisaOpportunities.map((opportunity, index) => (
            <motion.article
              key={`${opportunity.country}-${opportunity.category}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="mb-8 grid overflow-hidden rounded-[1.5rem] border border-[#CDE9ED] bg-white shadow-[0_16px_34px_rgba(7,85,104,0.10)] last:mb-0 md:grid-cols-[45%_55%] md:rounded-[1.7rem]"
            >
              <div className="relative min-h-[300px] overflow-hidden sm:min-h-[360px] md:min-h-[390px] md:rounded-r-[5rem] md:[clip-path:ellipse(104%_100%_at_0%_50%)]">
                <img src={opportunity.image} alt={opportunity.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#063E68]/80 via-[#0D5E80]/30 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-7 text-white sm:p-9">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/85">{opportunity.category}</p>
                    <h2 className="mt-4 text-4xl font-bold leading-none sm:text-5xl">{opportunity.country}</h2>
                    {opportunity.focus && <p className="mt-2 text-2xl font-medium">{opportunity.focus}</p>}
                    <p className="mt-3 max-w-xs text-sm font-medium leading-relaxed text-white/90">{opportunity.visualHighlight}</p>
                  </div>
                  <div className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-bold text-[#075568] shadow-lg">
                    <MapPin className="h-4 w-4 text-[#087D89]" /> {opportunity.visualHighlight}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#087D89]">
                  <span className="rounded-full bg-[#E4F6F8] px-3 py-2">{opportunity.number}</span>
                  <span className="rounded-full bg-[#E4F6F8] px-3 py-2">{opportunity.category}</span>
                </div>
                <h3 className="text-3xl font-bold leading-tight text-[#075568] sm:text-4xl">Work in {opportunity.country}{opportunity.focus ? ` – ${opportunity.focus}` : ''}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#244B59] sm:text-base">{opportunity.description}</p>
                <div className="my-7 grid gap-4 border-y border-[#D9EEF0] py-5 sm:grid-cols-2 lg:grid-cols-3">
                  {opportunity.details.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-start gap-3 border-[#D9EEF0] last:border-0 sm:border-r sm:pr-4 lg:last:border-r-0">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E4F6F8] text-[#087D89]"><Icon className="h-4 w-4" /></span>
                      <span className="min-w-0"><span className="block text-[10px] font-medium text-[#6B8993]">{label}</span><strong className="mt-1 block text-sm leading-snug text-[#075568]">{value}</strong></span>
                    </div>
                  ))}
                </div>
                {opportunity.highlightLabel && opportunity.highlightValue && (
                  <div className="mb-7 rounded-xl bg-[#E4F6F8] px-5 py-4 text-sm leading-relaxed text-[#075568]">
                    <span className="font-bold">{opportunity.highlightLabel}:</span>{' '}{opportunity.highlightValue}
                  </div>
                )}
                <a href="/contact" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#087D89] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(8,125,137,0.22)] hover:-translate-y-0.5 hover:bg-[#075568]">
                  Explore Career Details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};
