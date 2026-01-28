import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle, Award, Users, Globe } from 'lucide-react';

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
    description: 'Strong university networks across 17+ destinations',
  },
];

export const About = () => {
  return (
    <>
      {/* HERO SECTION */}
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

      {/* OUR STORY SECTION */}
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
                <p className="text-lg text-body-text leading-relaxed mb-6 text-justify">
                  <strong className="text-heading">HN Study Abroad Consultancy Pvt. Ltd. was founded by two individuals who have personally experienced the journey of studying abroad.</strong>
                </p>

                <p className="text-lg text-body-text leading-relaxed mb-6 text-justify">
                  Having studied overseas ourselves, we understand that the process involves much more than university applications. From choosing the right course and institution to managing documentation, finances, and adapting to a new country, we have faced the same challenges that many students encounter today.
                </p>

                <p className="text-lg text-body-text leading-relaxed mb-6 text-justify">
                  Our own experiences made us aware of the gaps students often face: unclear guidance, overwhelming procedures, and a lack of personalized support. These firsthand challenges became the foundation for creating HN Study Abroad Consultancy Pvt. Ltd., a platform built to guide students with practical, experience-based advice.
                </p>

                <p className="text-lg text-body-text leading-relaxed text-justify">
                  As founders, we are directly involved in counseling and supporting students, ensuring each case is handled with care and attention. We focus on providing accurate information, structured assistance, and honest guidance throughout the study abroad process, including admissions, visa support, and pre-departure preparation.
                  HN Study Abroad Consultancy Pvt. Ltd. reflects our understanding of the study abroad journey from a student's point of view, helping aspiring students move forward with confidence and clarity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MEET OUR FOUNDERS SECTION */}
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
            <p className="text-lg text-body-text max-w-2xl mx-auto text-justify">
              Visionary leaders dedicated to empowering students globally
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Founder 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark h-64 flex items-center justify-center p-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="/niyoj_sir.jpeg"
                    alt="NIYOJ SANKHE - Co-Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-justify">NIYOJ SANKHE</h3>
                <p className="text-turquoise font-semibold mb-4 text-justify">Co-Founder & Director</p>
                <p className="text-body-text leading-relaxed mb-4 text-justify">
                  I hold a bachelor's degree in business administration (BBA – Honours) from Kingston Business School, where I graduated with First Class Honours. I further completed my Master of Business Administration (MBA) from the University of Westminster, earning a Merit degree. Having personally studied abroad, I understand the academic, cultural, and practical challenges students face while pursuing education overseas.
                </p>
                <p className="text-body-text leading-relaxed text-justify">
                  My own journey has given me firsthand insight into the complexities of course selection, university applications, and adapting to a new education system. At HN Study Abroad Consultancy Pvt. Ltd., I am actively involved in counseling students and guiding them through each step of the study abroad process, ensuring they receive clear information, honest advice, and personalized support based on real experience.
                </p>
              </div>
            </motion.div>

            {/* Founder 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark h-64 flex items-center justify-center p-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="/himanshu_sir.jpeg"
                    alt="Himanshu Dhande - Co-Founder & Director"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-justify">Himanshu Dhande</h3>
                <p className="text-turquoise font-semibold mb-4 text-justify">Co-Founder & Director</p>
                <p className="text-body-text leading-relaxed mb-4 text-justify">
                 I am a Mumbai-born professional with international academic exposure, having studied in London and explored diverse global education environments. My own journey as an international student has given me firsthand experience of the academic, cultural, and practical challenges students face when pursuing higher education overseas.
                </p>
                <p className="text-body-text leading-relaxed text-justify">
                 I completed my Bachelor’s degree in Computer Science Engineering from the University of Mumbai and pursued a Master’s degree in Digital Marketing from Roehampton University, London. Studying abroad allowed me to deeply understand university selection, application processes, visa requirements, and adapting to a new education system and culture.
At HN Study Abroad Consultancy Pvt. Ltd., I am actively involved in guiding students through every stage of their study abroad journey—from course and country selection to university applications and pre-departure preparation. My approach is rooted in transparency, ethical counseling, and personalized guidance, ensuring students make informed decisions based on real international experience rather than assumptions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
            {/* CAREERS / APPLY NOW SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
               Passionate About Guiding Students Beyond Borders?
              </h2>
              <p className="text-lg text-body-text max-w-2xl mx-auto">
                If you feel counselling is more than just a job, you’re in the right place.
Join HN Study Abroad and make a lasting difference in students’ lives.
              </p>
            </div>

            <div className="bg-gradient-to-br from-ghost-green to-white rounded-2xl shadow-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Apply Now
              </h3>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-turquoise"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-turquoise"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-turquoise"
                    required
                  />
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="Eg. MBA, BBA, BA, MSc"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-turquoise"
                    required
                  />
                </div>

                {/* Resume Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-turquoise"
                   
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-turquoise px-10 py-3 text-white font-semibold hover:bg-turquoise-dark transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
};
