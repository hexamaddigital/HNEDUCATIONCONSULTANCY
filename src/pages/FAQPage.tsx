import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search } from 'lucide-react';
import { COUNTRY_NAMES } from '../constants/countries';

interface FAQItem {
  question: string;
  answer: string;
  country: string;
}

const countryFAQs: FAQItem[] = [
  {
    country: 'United Kingdom',
    question: 'Why should international students choose the UK for higher education?',
    answer: 'The UK offers world-class universities, globally recognized degrees, high academic standards, shorter course durations, and strong career prospects. Many UK institutions rank among the top universities worldwide.'
  },
  {
    country: 'United Kingdom',
    question: 'What are the entry requirements to study in the UK?',
    answer: 'For UK student visa, you need to show funds for: Full tuition fee for first year + £1,334 per month for 9 months (outside London) or £1,023 per month (outside London). The funds must be held for 28 consecutive days before applying.'
  },
  {
    country: 'United Kingdom',
    question: 'Can I work while studying in the UK?',
    answer: 'Yes, international students can work up to 20 hours per week during term time and full-time during holidays. The graduate route allows you to work for 2 years after completing your degree.'
  },
  {
    country: 'United States',
    question: 'What is the difference between F1 and J1 visa?',
    answer: 'F1 visa is for academic studies at colleges and universities, while J1 visa is for exchange programs. F1 students can work on OPT for up to 3 years (STEM) after graduation, while J1 students may have a 2-year home residency requirement.'
  },
  {
    country: 'United States',
    question: 'Is IELTS mandatory for USA?',
    answer: 'Most universities accept IELTS, TOEFL, PTE, or Duolingo English Test. Some universities waive English proficiency tests if you completed previous education in English medium. Check specific university requirements.'
  },
  {
    country: 'United States',
    question: 'What is OPT and STEM OPT?',
    answer: 'OPT (Optional Practical Training) allows F1 students to work for 12 months after graduation. STEM degree holders can extend this by 24 additional months (total 36 months), making it particularly beneficial for tech and engineering students.'
  },
  {
    country: 'Canada',
    question: 'What is PGWP and how long can I work?',
    answer: 'Post-Graduation Work Permit (PGWP) allows you to work in Canada after graduation. Duration depends on your program length: less than 8 months (no PGWP), 8 months to 2 years (same as program length), more than 2 years (3 years PGWP).'
  },
  {
    country: 'Canada',
    question: 'Can I get PR after studying in Canada?',
    answer: 'Yes, Canada offers multiple PR pathways for international students including Canadian Experience Class (CEC), Provincial Nominee Programs (PNPs), and Quebec Experience Program. Having Canadian work experience significantly improves your chances.'
  },
  {
    country: 'Canada',
    question: 'How much can I earn while studying in Canada?',
    answer: 'International students can work up to 24 hours per week during studies (recently increased from 20 hours). Minimum wage varies by province, ranging from CAD 13-16 per hour. During scheduled breaks, you can work full-time.'
  },
  {
    country: 'Australia',
    question: 'What is GTE and how important is it?',
    answer: 'Genuine Temporary Entrant (GTE) is a crucial requirement for Australian student visa. You need to demonstrate genuine intent to study and return to your home country. A well-written GTE statement addressing your study plans, career goals, and ties to home country is essential.'
  },
  {
    country: 'Australia',
    question: 'How much does it cost to study in Australia?',
    answer: 'Tuition fees range from AUD 20,000 to 45,000 per year depending on the course and university. Living costs are approximately AUD 21,000 per year (as per Australian government requirements). Total annual cost ranges from AUD 41,000 to 66,000.'
  },
  {
    country: 'Australia',
    question: 'Can I bring my spouse to Australia on student visa?',
    answer: 'Yes, you can include your spouse and dependent children in your student visa application. Your spouse can work unlimited hours, and dependent children can attend school. You need to show additional funds for dependents.'
  },
  {
    country: 'Germany',
    question: 'Is it true that education is free in Germany?',
    answer: 'Public universities in Germany charge no tuition fees for most undergraduate and many graduate programs. You only pay a semester contribution of €250-350 which includes public transport. Private universities and some specialized programs may charge tuition.'
  },
  {
    country: 'Germany',
    question: 'Do I need to learn German language?',
    answer: 'Many Masters programs are offered in English, especially in technical fields. However, learning German significantly improves job prospects and daily life. B1-B2 level German is beneficial for job hunting and permanent residency applications.'
  },
  {
    country: 'Germany',
    question: 'What is blocked account for Germany?',
    answer: 'A blocked account (Sperrkonto) is mandatory for German student visa. You need to deposit €11,904 per year (€992 per month) before applying. This amount is gradually released monthly after arrival to cover your living expenses.'
  },
  {
    country: 'France',
    question: 'Can I study in France without IELTS?',
    answer: 'Yes, many French universities accept students without IELTS if they can demonstrate English proficiency through medium of instruction certificates or university interviews. However, having IELTS/TOEFL increases visa approval chances.'
  },
  {
    country: 'France',
    question: 'What is Campus France procedure?',
    answer: 'Campus France is mandatory for Indian students applying to France. It involves creating an account, submitting documents, attending an interview in French or English, and receiving an approval before visa application. The entire process takes 1-2 months.'
  },
  {
    country: 'Netherlands',
    question: 'What is the job market like in Netherlands for international students?',
    answer: 'Netherlands has strong job market, especially in technology, engineering, and business sectors. English is widely used in workplaces. The orientation year gives you 12 months to find employment, and the country has numerous multinational companies.'
  },
  {
    country: 'Netherlands',
    question: 'Is health insurance mandatory in Netherlands?',
    answer: 'Yes, all residents including international students must have Dutch health insurance. Basic coverage costs around €100-120 per month. Some universities offer special student health insurance packages. EU students can use European Health Insurance Card.'
  },
  {
    country: 'Ireland',
    question: 'What is Stamp 1G visa in Ireland?',
    answer: 'Stamp 1G is the post-study work visa in Ireland. It allows you to stay for 2 years after completing a Masters degree or 1 year after Bachelors. During this time, you can work full-time and search for long-term employment leading to residency.'
  },
  {
    country: 'Ireland',
    question: 'Is Ireland expensive for international students?',
    answer: 'Dublin can be expensive with rent averaging €600-1,000 per month. However, other cities like Cork, Galway, and Limerick are more affordable. Total annual living costs range from €10,000-15,000 depending on lifestyle and location.'
  },
  {
    country: 'New Zealand',
    question: 'What are the post-study work visa options in New Zealand?',
    answer: 'New Zealand offers post-study work visa for up to 3 years depending on your qualification level and study location. Bachelor\'s or higher degrees qualify for 3-year open work visa, while diplomas qualify for 1 year. Auckland has some restrictions.'
  },
  {
    country: 'New Zealand',
    question: 'Can I apply for PR after studying in New Zealand?',
    answer: 'Yes, New Zealand has skilled migrant category for PR. Having New Zealand qualification and work experience gives you bonus points. Working in skill shortage occupations or in regions outside Auckland further improves your chances.'
  },
  {
    country: 'Dubai',
    question: 'What are the advantages of studying in Dubai?',
    answer: 'Dubai offers branch campuses of UK and Australian universities at lower costs, tax-free environment, multicultural exposure, and growing job market. You get the same degree as the main campus. No IELTS required for many programs if you have English medium education.'
  },
  {
    country: 'Dubai',
    question: 'Can I get work visa after studying in Dubai?',
    answer: 'Yes, graduates can convert student visa to work visa if they secure employment. Dubai has a growing job market in technology, hospitality, finance, and healthcare sectors. Many students find jobs through university placement cells and internships.'
  },
  {
    country: 'Spain',
    question: 'Do I need to learn Spanish to study in Spain?',
    answer: 'Many Masters programs are taught in English, especially in business and technology. However, learning Spanish enhances job prospects and daily life experience. A1-A2 level is helpful for beginning, while B2+ is beneficial for jobs.'
  },
  {
    country: 'Italy',
    question: 'What is the cost of living in Italy for students?',
    answer: 'Italy is relatively affordable compared to other European countries. Monthly costs range from €700-1,200 depending on the city. Rome and Milan are more expensive, while smaller cities like Padua, Bologna are cheaper. Public transport is affordable and efficient.'
  },
  {
    country: 'Switzerland',
    question: 'Is Switzerland very expensive for international students?',
    answer: 'Yes, Switzerland has high living costs (CHF 1,500-2,000 per month). However, tuition fees at public universities are low (CHF 1,000-2,000 per year). Part-time work earnings (CHF 25-30 per hour) can help offset costs. Quality of life is excellent.'
  },
  {
    country: 'Sweden',
    question: 'Can I work while studying in Sweden?',
    answer: 'Yes, international students can work unlimited hours in Sweden. However, balancing full-time studies and work can be challenging. Part-time jobs typically pay SEK 100-150 per hour. Swedish language skills significantly improve job prospects.'
  },
  {
    country: 'Finland',
    question: 'Are scholarships available for international students in Finland?',
    answer: 'Yes, Finnish universities offer scholarships ranging from 50% to 100% tuition waiver for excellent students. Many scholarships are automatically considered during admission. Additionally, you can apply for Finnish government scholarships and university-specific grants.'
  },
  {
    country: 'Malta',
    question: 'Why choose Malta for higher education?',
    answer: 'Malta offers English-taught programs at affordable costs, EU membership benefits, warm Mediterranean climate, safe environment, and ability to travel to 26 Schengen countries. It\'s ideal for students seeking European education at lower costs than traditional destinations.'
  },
  {
    country: 'Russia',
    question: 'What are the advantages of studying medicine in Russia?',
    answer: 'Russian medical universities are WHO and MCI recognized, offer affordable fees (USD 3,000-8,000 per year), English-medium programs, and high-quality education. MBBS duration is 6 years including internship. Graduates can practice in India after clearing FMGE/NExT exam.'
  },
  {
    country: 'General',
    question: 'What documents are typically required for student visa?',
    answer: 'Common documents include: Valid passport, offer letter from university, financial proof, academic transcripts, English proficiency test scores, SOP, medical certificates, and visa application form. Specific requirements vary by country.'
  },
  {
    country: 'General',
    question: 'How do education loans work for studying abroad?',
    answer: 'Education loans cover tuition fees, living expenses, travel, and insurance. Banks offer both secured (with collateral) and unsecured loans. Interest rates range from 8-15%. Repayment typically starts 6-12 months after course completion. We assist with loan applications and documentation.'
  },
  {
    country: 'General',
    question: 'When should I start my study abroad application?',
    answer: 'Ideally start 10-12 months before your intended intake. This allows time for exam preparation (IELTS/TOEFL/GRE), university applications, offer letters, visa processing, and financial arrangements. Early applications also improve scholarship chances.'
  },
  {
    country: 'General',
    question: 'What is the difference between conditional and unconditional offer?',
    answer: 'Conditional offer means you need to meet certain conditions (like English test scores or completing current degree) before final admission. Unconditional offer means you\'ve met all requirements and have guaranteed admission. Both can be used for visa application with proper documentation.'
  }
];

export const FAQPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All Countries');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = countryFAQs.filter(faq => {
    const matchesCountry = selectedCountry === 'All Countries' || faq.country === selectedCountry;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-turquoise/5 via-transparent to-ghost-green/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGJjZDQiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaC0ydjJoMnYtMmgydi0yaC0yem0tMiAydi0ySDMydjJoMnptLTItMnYtMmgtMnYyaDJ6bTQtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDJ2LTJoLTJ2Mmgyem0tMi0ydi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-body-text">
              Find answers to common questions about studying abroad, visa processes, and country-specific information
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCountry('All Countries')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCountry === 'All Countries'
                    ? 'bg-turquoise text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Countries
              </button>
              {COUNTRY_NAMES.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCountry === country
                      ? 'bg-turquoise text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {country}
                </button>
              ))}
              <button
                onClick={() => setSelectedCountry('General')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCountry === 'General'
                    ? 'bg-turquoise text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                General
              </button>
            </div>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-start justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <span className="inline-block px-3 py-1 bg-turquoise/10 text-turquoise text-xs font-semibold rounded-full mb-2">
                        {faq.country}
                      </span>
                      <p className="font-semibold text-heading">
                        {faq.question}
                      </p>
                    </div>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-turquoise flex-shrink-0 ml-4 mt-1" />
                    ) : (
                      <Plus className="w-5 h-5 text-turquoise flex-shrink-0 ml-4 mt-1" />
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
                          <p className="text-body-text leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center p-8 bg-gradient-to-br from-turquoise/5 to-ghost-green/30 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-body-text mb-6">
              Our expert counsellors are here to help you with personalized guidance
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};
