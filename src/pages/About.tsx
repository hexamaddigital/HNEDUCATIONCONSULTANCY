import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle, Award, Users, Globe, TrendingUp } from 'lucide-react';
import { FAQ } from '../components/FAQ';

const values = [
  {
    icon: CheckCircle,
    title: 'Transparent Guidance',
    description: 'Honest advice with complete transparency in our processes and fee structure.',
  },
  {
    icon: Award,
    title: 'Certified Counsellors',
    description: 'Team of experienced and certified education counsellors with deep industry knowledge.',
  },
  {
    icon: Users,
    title: 'Student-Centric Approach',
    description: 'Every decision is made with the student\'s best interests and future goals in mind.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Strong partnerships with 300+ universities across 15 study destinations.',
  },
];

const stats = [
  {
    icon: Users,
    value: '2000+',
    label: 'Students Guided',
  },
  {
    icon: Globe,
    value: '15+',
    label: 'Countries',
  },
  {
    icon: Award,
    value: '300+',
    label: 'Partner Universities',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Success Rate',
  },
];


export const About = () => {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-body-text">
              Empowering students to achieve their global education dreams
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
              <div className="bg-gradient-to-br from-ghost-green to-white rounded-2xl p-8 md:p-12 shadow-lg">
                <p className="text-lg text-body-text leading-relaxed mb-6">
                  <strong className="text-heading">HN Study Abroad Consultancy Pvt. Ltd. was founded by two individuals who have personally experienced the journey of studying abroad.</strong>
                </p>
                
<p className="text-lg text-body-text leading-relaxed">Having studied overseas ourselves, we understand that the process involves much more than university applications. From choosing the right course and institution to managing documentation, finances, and adapting to a new country, we have faced the same challenges that many students encounter today.

Our own experiences made us aware of the gaps students often face unclear guidance, overwhelming procedures, and a lack of personalized support. These firsthand challenges became the foundation for creating HN Study Abroad Consultancy Pvt. Ltd., a platform built to guide students with practical, experience-based advice.
                </p>
                <p className="text-lg text-body-text leading-relaxed">
                  As founders, we are directly involved in counseling and supporting students, ensuring each case is handled with care and attention. We focus on providing accurate information, structured assistance, and honest guidance throughout the study abroad process, including admissions, visa support, and pre-departure preparation.

HN Study Abroad Consultancy Pvt. Ltd. reflects our understanding of the study abroad journey from a student's point of view helping aspiring students move forward with confidence and clarity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-ghost-green">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founders</h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Visionary leaders dedicated to empowering students globally
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Users className="w-16 h-16 text-turquoise" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">NIYOJ SANKHE</h3>
                <p className="text-turquoise font-semibold mb-4">Co-Founder & CEO</p>
                <p className="text-body-text leading-relaxed mb-4">
                  I hold a bachelor’s degree in business administration (BBA – Honours) from Kingston Business School, where I graduated with First Class Honours. I further completed my Master of Business Administration (MBA) from the University of Westminster, earning a Merit degree.
Having personally studied abroad, I understand the academic, cultural, and practical challenges students face while pursuing education overseas.
                </p>
                <p className="text-body-text leading-relaxed">
                  My own journey has given me firsthand insight into the complexities of course selection, university applications, and adapting to a new education system.
At HN Study Abroad Consultancy Pvt. Ltd., I am actively involved in counseling students and guiding them through each step of the study abroad process, ensuring they receive clear information, honest advice, and personalized support based on real experience.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <Users className="w-16 h-16 text-turquoise" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Founder Name 2</h3>
                <p className="text-turquoise font-semibold mb-4">Co-Founder & Director</p>
                <p className="text-body-text leading-relaxed mb-4">
                  A visionary leader with extensive knowledge of global education trends, our second founder brings strategic direction and innovation to our consultancy. Their dedication to student success has shaped our ethical and transparent approach.
                </p>
                <p className="text-body-text leading-relaxed">
                  With a strong background in educational counselling and business development, they ensure every student receives personalized guidance and support throughout their study abroad journey.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 shadow-lg border-2 border-turquoise/20"
              >
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-body-text leading-relaxed">
                 Our vision is to create global education and career opportunities for students worldwide.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 shadow-lg border-2 border-turquoise/20"
              >
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-body-text leading-relaxed">
                  Our mission is simple — transparent, ethical, and experience-driven guidance.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-ghost-green">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              We stand out through our commitment to excellence and student success
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-body-text">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Numbers that reflect our commitment to student success
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-ghost-green to-white rounded-xl p-6 text-center shadow-lg"
              >
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-turquoise mb-2">{stat.value}</h3>
                <p className="text-body-text font-medium">{stat.label}</p>
              </motion.div>
            ))}
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
                Ready to Begin Your Journey?
              </h2>
              <p className="text-xl text-body-text mb-8">
                Let us help you achieve your international education goals
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105"
              >
                Get Started Today
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
};
