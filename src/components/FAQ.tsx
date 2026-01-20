import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Which countries do you offer study visas for?',
    answer: 'We provide comprehensive support for study visas to United Kingdom, United States of America, Canada, Australia, and European countries including Germany, France, and Ireland.',
  },
  {
    question: 'What is CAS?',
    answer: 'CAS (Confirmation of Acceptance for Studies) is an electronic document issued by a UK educational institution once they accept you onto a course. It contains a unique reference number and information about your course, which you need to apply for your UK student visa.',
  },
  {
    question: 'How much bank balance is required for a student visa?',
    answer: 'The required bank balance varies by country. Generally, for UK you need to show funds for tuition + living costs (£1,334/month for 9 months outside London). For Canada, it\'s tuition + CAD 10,000 + travel costs. For USA, you need to show full tuition + living expenses for the first year. We help you calculate the exact amount based on your destination and course.',
  },
  {
    question: 'Do you help with education loans?',
    answer: 'Yes, we provide complete education loan assistance including eligibility assessment, documentation support, connecting with partner banks and NBFCs, and guidance on both collateral and non-collateral loan options.',
  },
  {
    question: 'What is the visa success rate?',
    answer: 'We maintain a 95% visa success rate across all destinations. Our high success rate is due to meticulous documentation, expert guidance, and thorough interview preparation for every student.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-body-text">
            Find answers to common questions about studying abroad
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-left font-semibold text-heading">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-turquoise flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-turquoise flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-ghost-green">
                      <p className="text-body-text">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
