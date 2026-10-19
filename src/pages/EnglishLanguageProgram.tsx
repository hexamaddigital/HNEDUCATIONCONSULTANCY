import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Globe2,
  GraduationCap,
  Headphones,
  Laptop,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Star,
  Trophy,
  UsersRound,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProgramCard {
  name: string;
  price: string;
  tone: string;
  icon: LucideIcon;
  mark?: string;
}

interface PracticeCard {
  name: string;
  classes: string;
  tests: string;
  price: string;
  tone: string;
  icon: LucideIcon;
}

interface SupportFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const programs: ProgramCard[] = [
  { name: 'IELTS', price: '₹10,000', tone: 'bg-[#F51C3E]', icon: Globe2 },
  { name: 'IELTS PLUS', price: '₹25,000', tone: 'bg-[#6B36B7]', icon: GraduationCap },
  { name: 'GERMAN', price: '₹15,000', tone: 'bg-[#F6B91A]', icon: Globe2 },
  { name: 'FRENCH', price: '₹15,000', tone: 'bg-[#1684C5]', icon: Globe2 },
  { name: 'GRE / GMAT / SAT', price: '₹30,000', tone: 'bg-[#159EA4]', icon: GraduationCap },
  { name: 'DEVELINGO', price: '₹10,000', tone: 'bg-[#35C6A6]', icon: PlayCircle },
  { name: 'PTE', price: '₹10,000', tone: 'bg-[#8252B9]', icon: ClipboardCheck },
  { name: 'TOEFL', price: '₹10,000', tone: 'bg-[#0B6588]', icon: ShieldCheck },
];

const supportFeatures: SupportFeature[] = [
  { title: 'Study Material', description: '(Updated & Latest)', icon: BookOpen },
  { title: 'Class Recording', description: '(Lifetime Access)', icon: Video },
  { title: 'Experienced', description: 'Faculty', icon: ClipboardCheck },
  { title: 'Personal', description: 'Guidance & Support', icon: Headphones },
  { title: 'Flexible', description: 'Learning Mode', icon: Laptop },
];

const practicePrograms: PracticeCard[] = [
  { name: 'IELTS', classes: '25 Classes', tests: '+ 2 Mock Test', price: '₹10,000', tone: 'bg-[#F51C3E]', icon: Globe2 },
  { name: 'GRE', classes: '50 Classes', tests: '+ 10 Mock Test', price: '₹30,000', tone: 'bg-[#1684C5]', icon: GraduationCap },
  { name: 'GMAT', classes: '50 Classes', tests: '+ 6 Mock Test', price: '₹30,000', tone: 'bg-[#1B9B61]', icon: Check },
  { name: 'SAT', classes: '34 Classes', tests: '+ 5 Mock Test', price: '₹25,000', tone: 'bg-[#8D4FBA]', icon: Star },
  { name: 'TOEFL', classes: '15 Classes', tests: '+ 1 Mock Test', price: '₹10,000', tone: 'bg-[#1684C5]', icon: ShieldCheck },
  { name: 'PTE', classes: '20 Classes', tests: '+ 1 Mock Test', price: '₹10,000', tone: 'bg-[#159EA4]', icon: ClipboardCheck },
  { name: 'GERMAN LANGUAGE', classes: '45 Classes', tests: '+ 3 Mock Test', price: '₹25,000', tone: 'bg-[#D79B18]', icon: Globe2 },
  { name: 'DEVELINGO', classes: '12 Classes', tests: '+ 2 Mock Test', price: '₹10,000', tone: 'bg-[#35A968]', icon: PlayCircle },
  { name: 'FRENCH (A1 LEVEL)', classes: '45 Classes', tests: '+ 3 Mock Test', price: '₹25,000', tone: 'bg-[#8650B7]', icon: Globe2 },
  { name: 'JAPANESE LANGUAGE', classes: '55 Classes', tests: '+ 5 Mock Test', price: '₹20,000', tone: 'bg-[#E84E91]', icon: Globe2 },
  { name: 'DMAT', classes: 'Class 10', tests: '+ 2 Mock Test', price: '₹20,000', tone: 'bg-[#1EAEC0]', icon: Trophy },
];

const sectionLabel = 'mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#13866D]';

export const EnglishLanguageProgram = () => {
  return (
    <div className="overflow-hidden bg-[#F7FCFC] text-[#082A4A]">
      <section className="relative bg-gradient-to-br from-[#DDF5FC] via-[#F4FCFD] to-white pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="absolute -bottom-12 left-1/2 h-24 w-[120%] -translate-x-1/2 rounded-[50%] bg-[#F7FCFC]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#1F5D79]">Your global education partner</p>
              <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[0.94] tracking-[-0.04em] text-[#082A4A] sm:text-6xl lg:text-[4.6rem]">
                English Language <span className="text-[#078050]">Program</span>
              </h1>
              <p className="mt-6 max-w-md font-serif text-2xl italic leading-tight text-[#153E62] sm:text-3xl">
                Build Your Language Skills
                <br />
                Achieve Your Global Goals
              </p>
              <a
                href="#programs"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#078050] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(7,128,80,0.2)] hover:-translate-y-0.5 hover:bg-[#05643E]"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-[#A6D9D2]">
                {[
                  { label: 'Learn', sublabel: 'Globally', icon: Globe2 },
                  { label: 'Expert', sublabel: 'Guidance', icon: GraduationCap },
                  { label: 'Better', sublabel: 'Opportunities', icon: Star },
                ].map(({ label, sublabel, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2 px-3 first:pl-0 sm:gap-3 sm:px-5">
                    <Icon className="h-6 w-6 flex-shrink-0 text-[#0B6382]" />
                    <span className="text-[10px] font-bold uppercase leading-tight text-[#174565] sm:text-xs">
                      {label}
                      <br />
                      {sublabel}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mx-auto h-[360px] w-full max-w-[620px] overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#9EDCF5] via-[#D8F2F3] to-[#D2B487] shadow-[0_24px_50px_rgba(8,76,108,0.14)] sm:h-[470px]"
            >
              <img
                src="/files_2293935-2026-10-16T13-51-10-241Z-image.png"
                alt="English language program visual"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-[#F7FCFC] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className={sectionLabel}><span className="h-1 w-6 bg-[#13866D]" /> Our language programs</div>
            <h2 className="font-serif text-4xl leading-tight text-[#082A4A] sm:text-5xl">Choose Your Program</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#315672]">We offer a wide range of language and exam preparation programs<br className="hidden sm:block" /> to help you achieve your global dreams.</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <motion.div key={program.name} whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-[#B8DDE2] bg-white shadow-[0_8px_20px_rgba(31,91,112,0.08)]">
                    <div className={`${program.tone} flex items-center gap-3 px-4 py-3 text-white`}>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/90"><Icon className="h-5 w-5" /></span>
                      <span className="text-sm font-bold tracking-wide">{program.name}</span>
                    </div>
                    <div className="px-4 py-4 text-center text-xl font-bold text-[#103B5B]">{program.price}</div>
                  </motion.div>
                );
              })}
              <div className="flex items-center gap-3 rounded-2xl border border-[#B8DDE2] bg-[#EAF8FA] px-4 py-4 shadow-[0_8px_20px_rgba(31,91,112,0.05)]">
                <ClipboardCheck className="h-9 w-9 flex-shrink-0 text-[#0B7282]" />
                <span className="text-xs font-bold uppercase leading-relaxed text-[#194D69]">The official exam fees<br />as applicable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-20">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-[#D7EEE8] bg-[#F0FBF8] px-5 py-8 shadow-[0_10px_28px_rgba(27,103,99,0.06)] md:px-8 md:py-10">
            <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr] lg:gap-0">
              <div className="border-b border-[#B8DDD7] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                <div className={sectionLabel}><span className="h-1 w-6 bg-[#13866D]" /> What we provide</div>
                <h2 className="max-w-xs font-serif text-3xl leading-tight text-[#082A4A] sm:text-4xl">Complete Support<br />for Your Learning Journey</h2>
              </div>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
                {supportFeatures.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="flex flex-col items-center text-center lg:border-r lg:border-[#B8DDD7] lg:px-4 last:border-0">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#087648] text-white shadow-md"><Icon className="h-7 w-7" /></span>
                    <span className="mt-3 text-xs font-bold leading-tight text-[#164E62]">{title}<br />{description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#073C68] to-[#062E55] py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[250px_1fr] lg:gap-8">
            <div>
              <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#88D2BE]"><span className="h-1 w-6 bg-[#53D0A0]" /> Classes & Mock Test Details</div>
              <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">Practice Today,<br />Perform Tomorrow</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {practicePrograms.map(({ name, classes, tests, price, tone, icon: Icon }) => (
                <div key={name} className="overflow-hidden rounded-xl border border-white/40 bg-white text-[#123C5C] shadow-lg">
                  <div className={`${tone} flex items-center gap-2 px-3 py-2 text-xs font-bold text-white`}><Icon className="h-5 w-5" /> {name}</div>
                  <div className="px-3 py-2 text-center text-xs font-medium leading-relaxed"><div>{classes}</div><div>{tests}</div><strong className="text-base text-[#092F52]">{price}</strong></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
