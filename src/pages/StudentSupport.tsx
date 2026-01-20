import { motion } from 'framer-motion';
import {
  Target,
  BookOpen,
  Building2,
  FileText,
  FileEdit,
  FileCheck,
  MessageSquare,
  Plane,
  Smartphone,
  Languages,
  Briefcase,
} from 'lucide-react';
import { FAQ } from '../components/FAQ';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Target,
    title: 'Career Counselling',
    description:
      'One-on-one sessions with certified counsellors to understand your goals, assess your profile, and create a personalized study abroad roadmap.',
  },
  {
    icon: BookOpen,
    title: 'Course Selection',
    description:
      'Expert guidance in choosing the right course that aligns with your career aspirations, academic background, and future goals.',
  },
  {
    icon: Building2,
    title: 'University Shortlisting',
    description:
      'Comprehensive research and shortlisting of universities based on rankings, course curriculum, location, fees, and admission requirements.',
  },
  {
    icon: Languages,
    title: 'English Language Counselling',
    description:
      'Professional language coaching to improve your English proficiency, prepare for IELTS/TOEFL/PTE/GRE/GMAT exams, and build confidence for academic success.',
  },
  {
    icon: FileText,
    title: 'Application Assistance',
    description:
      'Complete support in filling out application forms, organizing documents, and ensuring error-free submissions to maximize acceptance chances.',
  },
  {
    icon: FileEdit,
    title: 'SOP & LOR Writing',
    description:
      'Professional assistance in crafting compelling Statements of Purpose and Letters of Recommendation that showcase your unique story.',
  },
  {
    icon: MessageSquare,
    title: 'Interview Preparation',
    description:
      'Mock interview sessions and personalized coaching to help you confidently face visa interviews and university interviews.',
  },
  {
    icon: FileCheck,
    title: 'Visa Documentation & Filing',
    description:
      'Meticulous preparation of visa documents, forms, and applications with expert review to ensure 100% visa success rate.',
  },
  {
    icon: Plane,
    title: 'Pre-Departure Briefing',
    description:
      'Comprehensive guidance on accommodation, travel arrangements, currency exchange, and settling into your new country.',
  },
  {
    icon: Smartphone,
    title: 'SIM Card Assistance',
    description:
      'Help you get connected instantly with international SIM card options, local carrier recommendations, and data plan guidance for your destination country.',
  },
  {
    icon: Briefcase,
    title: 'Post Departure Briefing',
    description:
      'Ongoing support after arrival including guidance on opening bank accounts, part-time work opportunities, and adapting to your new academic environment.',
  },
];

export const StudentSupport = () => {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-heading whitespace-nowrap">
              Comprehensive <span className="bg-gradient-to-r from-turquoise to-turquoise-dark bg-clip-text text-transparent">Student Support</span>
            </h1>
            <p className="text-xl md:text-2xl text-body-text leading-relaxed">
              End-to-end guidance from initial counselling to your departure and beyond
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-turquoise via-turquoise-light to-transparent -translate-x-1/2"></div>

              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative mb-12 md:mb-16 ${
                    index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
                  }`}
                >
                  <div
                    className={`flex ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-start gap-6`}
                  >
                    <div className="flex-shrink-0 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-turquoise to-turquoise-dark rounded-full flex items-center justify-center shadow-xl z-10 relative">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 hidden md:block">
                        <div
                          className={`w-12 h-0.5 bg-turquoise/50 ${
                            index % 2 === 0 ? '-right-12' : '-left-12'
                          }`}
                        ></div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-white to-ghost-green rounded-2xl shadow-lg p-6 md:p-8 border-2 border-turquoise/10 hover:border-turquoise/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                        <h3 className="text-2xl font-bold mb-3 text-heading">
                          {service.title}
                        </h3>
                        <p className="text-body-text leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-ghost-green">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-body-text mb-8">
                Book a free consultation with our expert counsellors today
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105"
              >
                Book Free Counselling
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
};
