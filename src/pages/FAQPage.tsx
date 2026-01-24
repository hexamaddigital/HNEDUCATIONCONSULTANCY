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
    answer: 'Entry requirements vary by course and university but generally include academic transcripts, proof of English language proficiency (IELTS, TOEFL, or equivalent), a personal statement, and references.'
  },
  {
    country: 'United Kingdom',
    question: 'What English language tests are accepted by UK universities?',
    answer: 'Most UK universities accept IELTS, TOEFL, PTE Academic, and Duolingo English Test (accepted by many institutions). Required scores depend on the course and university.'
  },
  {
    country: 'United Kingdom',
    question: 'How long are UK degree programs?',
    answer: 'Undergraduate degrees usually take 3 years (4 years in Scotland), master’s degrees typically take 1 year, and PhD programs last 3–4 years.'
  },
  {
    country: 'United Kingdom',
    question: 'What is the cost of studying in the UK for international students?',
    answer: 'Tuition fees range from £10,000–£38,000 per year, depending on the course and university. Living costs average £9,000–£15,000 per year, depending on location.'
  },
  {
    country: 'United Kingdom',
    question: 'Are scholarships available for international students in the UK?',
    answer: 'Yes. Popular scholarships include Chevening Scholarships, Commonwealth Scholarships, university-specific awards, and merit-based or need-based funding options.'
  },
  {
    country: 'United Kingdom',
    question: 'Can international students work while studying in the UK?',
    answer: 'Yes. International students can work up to 20 hours per week during term time and full-time during holidays, subject to visa conditions.'
  },
   {
    country: 'United Kingdom',
    question: 'What is the UK Student Visa process?',
    answer: 'Students must have a Confirmation of Acceptance for Studies (CAS), meet financial requirements, prove English proficiency, and apply online for a UK Student Visa.'
  },
   {
    country: 'United Kingdom',
    question: 'Can international students stay and work in the UK after graduation?',
    answer: 'Yes. International students can work up to 20 hours per week during term time and full-time during holidays, subject to visa conditions.'
  },
   {
    country: 'United Kingdom',
    question: 'Is the UK safe for international students?',
    answer: 'Yes. The UK is considered a safe and welcoming destination with strong student support services, healthcare access (NHS), and multicultural communities..'
  },

  {
    country: 'United States',
    question: 'Why should international students choose the USA for higher education?',
    answer: 'The USA offers a wide range of academic programs, world-leading universities, cutting-edge research opportunities, flexible curricula, and strong global career prospects.'
  },
  {
    country: 'United States',
    question: 'What English language tests are accepted by US universities?',
    answer: 'Most US universities accept IELTS, TOEFL, PTE Academic, and Duolingo English Test. Score requirements depend on the university and program.'
  },
  {
    country: 'United States',
    question: 'How long are degree programs in the USA?',
    answer: 'Undergraduate degrees usually take 4 years, master’s degrees 1–2 years, and PhD programs typically 4–6 years.'
  },
  {
    country: 'United States',
    question: 'What is the cost of studying in the USA for international students?',
    answer: 'Tuition fees range from USD 15,000–55,000 per year, depending on the institution and program. Living expenses generally range from USD 10,000–20,000 per year.'
  },
  {
    country: 'United States',
    question: 'Are scholarships available for international students in the USA?',
    answer: 'Yes. Scholarships include merit-based, need-based, athletic, and university-specific awards, as well as assistantships and fellowships for graduate students'
  },
  {
    country: 'United States',
    question: 'Can international students work while studying in the USA?',
    answer: 'Yes. F-1 students can work up to 20 hours per week on-campus during the academic term and full-time during breaks. Off-campus work requires authorization (CPT or OPT)'
  },
  {
    country: 'United States',
    question: 'What is the US student visa process?',
    answer: 'Students must receive an I-20 from a SEVP-approved institution, pay the SEVIS fee, complete the DS-160, attend a visa interview, and apply for an F-1 Student Visa.'
  },
  {
    country: 'United States',
    question: 'Can international students stay and work in the USA after graduation?',
    answer: 'Yes. Students can apply for Optional Practical Training (OPT) for up to 12 months, with a 24-month extension available for eligible STEM graduates.'
  },
  {
    country: 'United States',
    question: 'Is the USA safe for international students?',
    answer: 'Yes. US universities provide strong campus security, student support services, and international student offices to ensure safety and well-being.'
  },
  {
    country: 'United States',
    question: 'What are the entry requirements to study in the USA?',
    answer: 'Requirements vary by institution and program but typically include academic transcripts, English language proficiency, standardized test scores (SAT/ACT for undergraduate, GRE/GMAT for graduate programs), a statement of purpose, and letters of recommendation.'
  },
    // ===================== CANADA FAQs =====================
  {
    country: 'Canada',
    question: 'Why should international students choose Canada for higher education?',
    answer: 'Canada offers high-quality education, globally recognized degrees, affordable tuition compared to other top destinations, a multicultural environment, and excellent post-study work opportunities.'
  },
  {
    country: 'Canada',
    question: 'What are the entry requirements to study in Canada?',
    answer: 'Requirements vary by institution and program but generally include academic transcripts, proof of English or French language proficiency (IELTS, TOEFL, PTE, or TEF), a statement of purpose, and letters of recommendation.'
  },
  {
    country: 'Canada',
    question: 'What English or French language tests are accepted by Canadian institutions?',
    answer: 'Most Canadian institutions accept IELTS, TOEFL, PTE Academic, Duolingo English Test, and for French-taught programs, TEF or TCF.'
  },
  {
    country: 'Canada',
    question: 'How long are degree programs in Canada?',
    answer: 'Undergraduate degrees usually take 3–4 years, postgraduate diplomas 1–2 years, master’s degrees 1–2 years, and PhD programs 3–5 years.'
  },
  {
    country: 'Canada',
    question: 'What is the cost of studying in Canada for international students?',
    answer: 'Tuition fees typically range from CAD 15,000–40,000 per year depending on the program and institution. Living expenses average CAD 10,000–15,000 per year.'
  },
  {
    country: 'Canada',
    question: 'Are scholarships available for international students in Canada?',
    answer: 'Yes. Canada offers government-funded scholarships, institutional scholarships, entrance awards, and merit-based or need-based financial aid.'
  },
  {
    country: 'Canada',
    question: 'Can international students work while studying in Canada?',
    answer: 'Yes. Students can work up to 20 hours per week during academic sessions and full-time during scheduled breaks with a valid study permit.'
  },
  {
    country: 'Canada',
    question: 'What is the Canada Study Permit process?',
    answer: 'Students must receive a Letter of Acceptance (LOA) from a Designated Learning Institution (DLI), show proof of funds, meet language requirements, and apply online for a Canada Study Permit.'
  },
  {
    country: 'Canada',
    question: 'Can international students work in Canada after graduation?',
    answer: 'Yes. Graduates can apply for the Post-Graduation Work Permit (PGWP), which allows them to work in Canada for up to 3 years depending on program length.'
  },
  {
    country: 'Canada',
    question: 'Is Canada safe for international students?',
    answer: 'Yes. Canada is one of the safest countries in the world, known for its welcoming culture, strong student support services, and high quality of life.'
  },

  // ===================== AUSTRALIA FAQs =====================
  {
    country: 'Australia',
    question: 'Why should international students choose Australia for higher education?',
    answer: 'Australia offers globally recognized universities, high-quality education, strong research opportunities, an excellent student lifestyle, and attractive post-study work options.'
  },
  {
    country: 'Australia',
    question: 'What are the entry requirements to study in Australia?',
    answer: 'Requirements vary by institution and program but generally include academic transcripts, English language proficiency (IELTS, TOEFL, PTE, or Duolingo), a statement of purpose, and relevant work experience for some courses.'
  },
  {
    country: 'Australia',
    question: 'What English language tests are accepted by Australian institutions?',
    answer: 'Australian universities accept IELTS, TOEFL iBT, PTE Academic, Cambridge English (CAE), and Duolingo English Test at many institutions.'
  },
  {
    country: 'Australia',
    question: 'How long are degree programs in Australia?',
    answer: 'Bachelor’s degrees take 3–4 years, master’s degrees 1–2 years, and doctoral programs usually take 3–4 years.'
  },
  {
    country: 'Australia',
    question: 'What is the cost of studying in Australia for international students?',
    answer: 'Tuition fees range from AUD 20,000–45,000 per year depending on course and institution. Living expenses average AUD 21,000–25,000 per year.'
  },
  {
    country: 'Australia',
    question: 'Are scholarships available for international students in Australia?',
    answer: 'Yes. Scholarships include Australia Awards, Destination Australia, university-specific scholarships, and merit-based financial aid.'
  },
  {
    country: 'Australia',
    question: 'Can international students work while studying in Australia?',
    answer: 'Yes. Students can work up to 48 hours per fortnight during study periods and unlimited hours during scheduled breaks, as per visa rules.'
  },
  {
    country: 'Australia',
    question: 'What is the Australian Student Visa process?',
    answer: 'Students must obtain a Confirmation of Enrolment (CoE), show proof of funds, meet English requirements, purchase Overseas Student Health Cover (OSHC), and apply for Student Visa Subclass 500.'
  },
  {
    country: 'Australia',
    question: 'Can international students work in Australia after graduation?',
    answer: 'Yes. Graduates may apply for the Temporary Graduate Visa (Subclass 485), allowing post-study work from 2 to 4 years depending on qualification and location.'
  },
  {
    country: 'Australia',
    question: 'Is Australia safe for international students?',
    answer: 'Yes. Australia is a safe and welcoming country with strong student support services, multicultural communities, and a high quality of life.'
  },
  // ===================== GERMANY FAQs =====================
  {
    country: 'Germany',
    question: 'Why should international students choose Germany for higher education?',
    answer: 'Germany offers high-quality education, globally recognized degrees, low or no tuition fees at public universities, strong research opportunities, and excellent career prospects in Europe.'
  },
  {
    country: 'Germany',
    question: 'What are the entry requirements to study in Germany?',
    answer: 'Requirements vary by university and program but generally include academic transcripts, proof of previous qualifications, language proficiency (German or English), and recognized school or university certificates.'
  },
  {
    country: 'Germany',
    question: 'What language proficiency tests are accepted in Germany?',
    answer: 'For English-taught programs, IELTS or TOEFL are accepted. For German-taught programs, TestDaF, DSH, or Goethe-Zertifikat are commonly required.'
  },
  {
    country: 'Germany',
    question: 'How long are degree programs in Germany?',
    answer: 'Bachelor’s degrees usually take 3–4 years, master’s degrees 1–2 years, and PhD programs 3–5 years.'
  },
  {
    country: 'Germany',
    question: 'What is the cost of studying in Germany for international students?',
    answer: 'Most public universities charge no tuition fees except a semester contribution of €250–350. Private universities may charge €10,000–30,000 per year. Living costs average €10,000–12,000 per year.'
  },
  {
    country: 'Germany',
    question: 'Are scholarships available for international students in Germany?',
    answer: 'Yes. Scholarships are offered by DAAD, German foundations, universities, and government-funded programs.'
  },
  {
    country: 'Germany',
    question: 'Can international students work while studying in Germany?',
    answer: 'Yes. Students can work 120 full days or 240 half days per year without requiring a separate work permit.'
  },
  {
    country: 'Germany',
    question: 'What is the German Student Visa process?',
    answer: 'Students need a university admission letter, proof of financial resources through a blocked account, health insurance, and must apply for a German National Student Visa.'
  },
  {
    country: 'Germany',
    question: 'Can international students stay and work in Germany after graduation?',
    answer: 'Yes. Graduates can stay up to 18 months to find employment related to their field and later apply for a work permit or EU Blue Card.'
  },
  {
    country: 'Germany',
    question: 'Is Germany safe for international students?',
    answer: 'Yes. Germany is a safe and student-friendly country with excellent public transport, healthcare, and strong international student support services.'
  },

  // ===================== FRANCE FAQs =====================
  {
    country: 'France',
    question: 'Why should international students choose France for higher education?',
    answer: 'France offers high-quality education, globally recognized degrees, affordable tuition at public universities, rich cultural experience, and strong career opportunities in Europe.'
  },
  {
    country: 'France',
    question: 'What are the entry requirements to study in France?',
    answer: 'Entry requirements vary by institution and program but generally include academic transcripts, language proficiency (French or English), a statement of purpose, and letters of recommendation for some programs.'
  },
  {
    country: 'France',
    question: 'What language tests are accepted by French institutions?',
    answer: 'For French-taught programs, DELF, DALF, or TCF are accepted. For English-taught programs, IELTS, TOEFL, or PTE Academic are commonly accepted.'
  },
  {
    country: 'France',
    question: 'How long are degree programs in France?',
    answer: 'Bachelor’s degrees take 3 years, master’s degrees 2 years, and PhD programs usually take 3–4 years.'
  },
  {
    country: 'France',
    question: 'What is the cost of studying in France for international students?',
    answer: 'Public universities charge around €2,770 per year for bachelor’s and €3,770 per year for master’s programs. Living costs average €10,000–12,000 per year.'
  },
  {
    country: 'France',
    question: 'Are scholarships available for international students in France?',
    answer: 'Yes. Popular options include Eiffel Excellence Scholarships, Campus France scholarships, and university-specific funding.'
  },
  {
    country: 'France',
    question: 'Can international students work while studying in France?',
    answer: 'Yes. International students can work up to 964 hours per year, which is approximately 20 hours per week.'
  },
  {
    country: 'France',
    question: 'What is the France Student Visa process?',
    answer: 'Students must apply through Campus France, receive an admission letter, show proof of funds, obtain health insurance, and apply for a Long-Stay Student Visa (VLS-TS).'
  },
  {
    country: 'France',
    question: 'Can international students stay and work in France after graduation?',
    answer: 'Yes. Graduates can apply for a Temporary Residence Permit to seek employment and later convert it into a work visa if employed.'
  },
  {
    country: 'France',
    question: 'Is France safe for international students?',
    answer: 'Yes. France is a safe and welcoming country with excellent healthcare, public transport, and student support services.'
  },

  // ===================== NETHERLANDS FAQs =====================
  {
    country: 'Netherlands',
    question: 'Why should international students choose the Netherlands for higher education?',
    answer: 'The Netherlands offers high-quality education, internationally recognized degrees, many English-taught programs, innovative teaching methods, and a multicultural environment.'
  },
  {
    country: 'Netherlands',
    question: 'What are the entry requirements to study in the Netherlands?',
    answer: 'Requirements vary by institution and program but typically include academic transcripts, English language proficiency, a motivation letter, and letters of recommendation for some courses.'
  },
  {
    country: 'Netherlands',
    question: 'What English language tests are accepted by Dutch universities?',
    answer: 'Most universities accept IELTS, TOEFL iBT, PTE Academic, and Cambridge English qualifications (CAE or CPE).'
  },
  {
    country: 'Netherlands',
    question: 'How long are degree programs in the Netherlands?',
    answer: 'Bachelor’s degrees usually take 3 years, master’s degrees 1–2 years, and PhD programs typically take 4 years.'
  },
  {
    country: 'Netherlands',
    question: 'What is the cost of studying in the Netherlands for international students?',
    answer: 'Tuition fees range from €6,000–15,000 per year for EU/EEA students and €8,000–25,000 per year for non-EU students. Living costs average €10,000–12,000 per year.'
  },
  {
    country: 'Netherlands',
    question: 'Are scholarships available for international students in the Netherlands?',
    answer: 'Yes. Scholarships include the Holland Scholarship, Orange Knowledge Programme, Erasmus+, and university-specific awards.'
  },
  {
    country: 'Netherlands',
    question: 'Can international students work while studying in the Netherlands?',
    answer: 'Yes. Non-EU students can work up to 16 hours per week during the academic year or full-time during summer with a work permit from the employer.'
  },
  {
    country: 'Netherlands',
    question: 'What is the Netherlands Student Visa process?',
    answer: 'Students must receive an admission offer, after which the university usually applies for the MVV and residence permit. Proof of funds and health insurance are required.'
  },
  {
    country: 'Netherlands',
    question: 'Can international students stay and work in the Netherlands after graduation?',
    answer: 'Yes. Graduates can apply for the Orientation Year (Search Year) Visa, allowing them to stay for up to 1 year to find employment.'
  },
  {
    country: 'Netherlands',
    question: 'Is the Netherlands safe for international students?',
    answer: 'Yes. The Netherlands is a safe and student-friendly country with excellent public transport, healthcare, and international student support services.'
  },

  // ===================== SWITZERLAND FAQs =====================
  {
    country: 'Switzerland',
    question: 'Why should international students choose Switzerland for higher education?',
    answer: 'Switzerland offers high-quality education, globally recognized degrees, strong research and innovation, and a high standard of living in a safe and multicultural environment.'
  },
  {
    country: 'Switzerland',
    question: 'What are the entry requirements to study in Switzerland?',
    answer: 'Entry requirements vary by institution and program but generally include academic transcripts, language proficiency (English, German, French, or Italian), a motivation letter, and relevant qualifications.'
  },
  {
    country: 'Switzerland',
    question: 'What language tests are accepted by Swiss universities?',
    answer: 'Universities accept IELTS or TOEFL for English-taught programs and TestDaF, DELF/DALF, or equivalent for German or French-taught programs.'
  },
  {
    country: 'Switzerland',
    question: 'How long are degree programs in Switzerland?',
    answer: 'Bachelor’s degrees typically take 3 years, master’s degrees 1–2 years, and PhD programs usually take 3–4 years.'
  },
  {
    country: 'Switzerland',
    question: 'What is the cost of studying in Switzerland for international students?',
    answer: 'Public universities charge CHF 1,000–4,000 per year, while private institutions may charge CHF 20,000–40,000 per year. Living costs average CHF 15,000–25,000 per year.'
  },
  {
    country: 'Switzerland',
    question: 'Are scholarships available for international students in Switzerland?',
    answer: 'Yes. Scholarships include Swiss Government Excellence Scholarships, university-specific awards, and private funding options.'
  },
  {
    country: 'Switzerland',
    question: 'Can international students work while studying in Switzerland?',
    answer: 'Yes. Students can work up to 15 hours per week during semesters and full-time during holidays after completing six months of study.'
  },
  {
    country: 'Switzerland',
    question: 'What is the Switzerland Student Visa process?',
    answer: 'Students must receive a university admission letter, show proof of financial means, obtain health insurance, and apply for a Swiss National Student Visa.'
  },
  {
    country: 'Switzerland',
    question: 'Can international students stay and work in Switzerland after graduation?',
    answer: 'Yes. Graduates may stay for up to 6 months to seek employment related to their field of study, subject to regulations.'
  },
  {
    country: 'Switzerland',
    question: 'Is Switzerland safe for international students?',
    answer: 'Yes. Switzerland is one of the safest countries in the world with excellent public services, healthcare, and student support systems.'
  },
// ===================== SWEDEN FAQs =====================
{
  country: 'Sweden',
  question: 'Why should international students choose Sweden for higher education?',
  answer: 'Sweden offers high-quality education, globally ranked universities, innovative teaching methods, a strong focus on research and sustainability, and a welcoming international environment.'
},
{
  country: 'Sweden',
  question: 'What are the entry requirements to study in Sweden?',
  answer: 'Entry requirements vary by university and program but generally include academic transcripts, proof of English language proficiency, a statement of purpose, and letters of recommendation for some programs.'
},
{
  country: 'Sweden',
  question: 'What English language tests are accepted by Swedish universities?',
  answer: 'Most Swedish universities accept IELTS, TOEFL iBT, PTE Academic, and Cambridge English (CAE/CPE).'
},
{
  country: 'Sweden',
  question: 'How long are degree programs in Sweden?',
  answer: 'Bachelor’s degrees usually take 3 years, master’s degrees 1–2 years, and PhD programs typically 4 years.'
},
{
  country: 'Sweden',
  question: 'What is the cost of studying in Sweden for international students?',
  answer: 'Tuition fees for non-EU/EEA students range from SEK 80,000–200,000 per year depending on the program. Living costs average SEK 96,000–120,000 per year.'
},
{
  country: 'Sweden',
  question: 'Are scholarships available for international students in Sweden?',
  answer: 'Yes. Scholarships include Swedish Institute Scholarships, university-specific scholarships, and other government-funded financial support programs.'
},
{
  country: 'Sweden',
  question: 'Can international students work while studying in Sweden?',
  answer: 'Yes. There is no official limit on working hours, but students must ensure work does not affect their full-time studies.'
},
{
  country: 'Sweden',
  question: 'What is the Sweden Student Visa process?',
  answer: 'Students must have an admission offer, proof of sufficient funds, health insurance, and apply for a Residence Permit for Studies through the Swedish Migration Agency.'
},
{
  country: 'Sweden',
  question: 'Can international students stay and work in Sweden after graduation?',
  answer: 'Yes. Graduates can apply for a 12-month residence permit to seek employment or start a business in Sweden.'
},
{
  country: 'Sweden',
  question: 'Is Sweden safe for international students?',
  answer: 'Yes. Sweden is a safe, student-friendly country with excellent healthcare, public transport, and strong international student support services.'
},

// ===================== SPAIN FAQs =====================
{
  country: 'Spain',
  question: 'Why should international students choose Spain for higher education?',
  answer: 'Spain offers high-quality education, affordable tuition fees, globally recognized degrees, a rich cultural experience, and a wide range of English- and Spanish-taught programs.'
},
{
  country: 'Spain',
  question: 'What are the entry requirements to study in Spain?',
  answer: 'Requirements vary by institution and program but generally include academic transcripts, proof of language proficiency (Spanish or English), a statement of purpose, and entrance exams for some programs.'
},
{
  country: 'Spain',
  question: 'What language tests are accepted by Spanish universities?',
  answer: 'For Spanish-taught programs, universities accept DELE or SIELE. For English-taught programs, IELTS, TOEFL, or PTE Academic are accepted.'
},
{
  country: 'Spain',
  question: 'How long are degree programs in Spain?',
  answer: 'Bachelor’s degrees typically take 4 years, master’s degrees 1–2 years, and PhD programs usually 3–4 years.'
},
{
  country: 'Spain',
  question: 'What is the cost of studying in Spain for international students?',
  answer: 'Public university tuition fees range from €750–3,500 per year, while private universities may charge €5,000–20,000 per year. Living costs average €8,000–12,000 per year.'
},
{
  country: 'Spain',
  question: 'Are scholarships available for international students in Spain?',
  answer: 'Yes. Scholarships include Spanish Government (MAEC-AECID) Scholarships, Erasmus+, and university-specific funding options.'
},
{
  country: 'Spain',
  question: 'Can international students work while studying in Spain?',
  answer: 'Yes. International students can work up to 30 hours per week with proper authorization, provided work does not interfere with studies.'
},
{
  country: 'Spain',
  question: 'What is the Spain Student Visa process?',
  answer: 'Students must have an admission letter, proof of financial means, health insurance, and apply for a Long-Term Student Visa through the Spanish embassy or consulate.'
},
{
  country: 'Spain',
  question: 'Can international students stay and work in Spain after graduation?',
  answer: 'Yes. Graduates can apply for a post-study residence permit to seek employment or start a business in Spain.'
},
{
  country: 'Spain',
  question: 'Is Spain safe for international students?',
  answer: 'Yes. Spain is generally safe and welcoming, with good healthcare, strong student support services, and a high quality of life.'
},

// ===================== ITALY FAQs =====================
{
  country: 'Italy',
  question: 'Why should international students choose Italy for higher education?',
  answer: 'Italy offers high-quality education, internationally recognized degrees, affordable tuition at public universities, rich cultural heritage, and many English- and Italian-taught programs.'
},
{
  country: 'Italy',
  question: 'What are the entry requirements to study in Italy?',
  answer: 'Requirements vary by institution and program but generally include academic transcripts, proof of language proficiency, a statement of purpose, and entrance exams for some courses.'
},
{
  country: 'Italy',
  question: 'What language tests are accepted by Italian universities?',
  answer: 'For English-taught programs, IELTS, TOEFL, or PTE Academic are accepted. For Italian-taught programs, CILS, CELI, or PLIDA are required.'
},
{
  country: 'Italy',
  question: 'How long are degree programs in Italy?',
  answer: 'Bachelor’s degrees typically take 3 years, master’s degrees 2 years, and PhD programs usually 3–4 years.'
},
{
  country: 'Italy',
  question: 'What is the cost of studying in Italy for international students?',
  answer: 'Public university tuition fees range from €900–4,000 per year depending on income and institution. Living costs average €8,000–12,000 per year.'
},
{
  country: 'Italy',
  question: 'Are scholarships available for international students in Italy?',
  answer: 'Yes. Scholarships include Italian Government Scholarships (MAECI), DSU regional scholarships, and university-specific funding.'
},
{
  country: 'Italy',
  question: 'Can international students work while studying in Italy?',
  answer: 'Yes. International students can work up to 20 hours per week during the academic year and full-time during holidays.'
},
{
  country: 'Italy',
  question: 'What is the Italy Student Visa process?',
  answer: 'Students must have a university admission letter, proof of financial means, accommodation details, health insurance, and apply for a Type D Student Visa.'
},
{
  country: 'Italy',
  question: 'Can international students stay and work in Italy after graduation?',
  answer: 'Yes. Graduates can apply for a post-study residence permit and later convert it into a work permit.'
},
{
  country: 'Italy',
  question: 'Is Italy safe for international students?',
  answer: 'Yes. Italy is safe and student-friendly, offering excellent healthcare, public transport, and international student support services.'
},

// ===================== FINLAND FAQs =====================
{
  country: 'Finland',
  question: 'Why should international students choose Finland for higher education?',
  answer: 'Finland offers globally recognized education, innovative teaching methods, strong research focus, and an excellent quality of life in a safe environment.'
},
{
  country: 'Finland',
  question: 'What are the entry requirements to study in Finland?',
  answer: 'Requirements vary by institution and program but usually include academic transcripts, proof of English proficiency, a motivation letter, and entrance exams or interviews.'
},
{
  country: 'Finland',
  question: 'What English language tests are accepted by Finnish universities?',
  answer: 'Most Finnish universities accept IELTS, TOEFL iBT, PTE Academic, Cambridge English (CAE/CPE), and Duolingo English Test.'
},
{
  country: 'Finland',
  question: 'How long are degree programs in Finland?',
  answer: 'Bachelor’s degrees take 3–4 years, master’s degrees 1–2 years, and PhD programs typically 4 years.'
},
{
  country: 'Finland',
  question: 'What is the cost of studying in Finland for international students?',
  answer: 'Tuition fees for non-EU/EEA students range from €6,000–18,000 per year. Living costs average €8,000–11,000 per year.'
},
{
  country: 'Finland',
  question: 'Are scholarships available for international students in Finland?',
  answer: 'Yes. Finland offers university-specific tuition fee waivers, Finnish Government scholarships, and merit-based financial aid.'
},
{
  country: 'Finland',
  question: 'Can international students work while studying in Finland?',
  answer: 'Yes. Students can work up to 30 hours per week on average during the academic term.'
},
{
  country: 'Finland',
  question: 'What is the Finland Student Residence Permit process?',
  answer: 'Students must have an admission offer, proof of sufficient funds, health insurance, and apply through the Finnish Immigration Service.'
},
{
  country: 'Finland',
  question: 'Can international students stay and work in Finland after graduation?',
  answer: 'Yes. Graduates can apply for a 2-year residence permit to seek employment or start a business.'
},
{
  country: 'Finland',
  question: 'Is Finland safe for international students?',
  answer: 'Yes. Finland is one of the safest countries in the world, with excellent healthcare, transport, and student support services.'
},
// ===================== RUSSIA FAQs =====================
{
  country: 'Russia',
  question: 'Why should international students choose Russia for higher education?',
  answer: 'Russia offers high-quality education, globally recognized degrees, affordable tuition fees, strong programs in medicine, engineering, and science, and a diverse cultural experience.'
},
{
  country: 'Russia',
  question: 'What are the entry requirements to study in Russia?',
  answer: 'Entry requirements vary by university and program but generally include academic certificates, transcripts, a valid passport, and medical documents. Entrance exams may apply for some courses.'
},
{
  country: 'Russia',
  question: 'What language tests are accepted by Russian universities?',
  answer: 'Many programs are taught in Russian, requiring language preparation. For English-taught programs, universities may accept IELTS or TOEFL, though requirements vary.'
},
{
  country: 'Russia',
  question: 'How long are degree programs in Russia?',
  answer: 'Bachelor’s degrees usually take 4 years, master’s degrees 2 years, medical degrees 6 years, and PhD programs typically take 3–4 years.'
},
{
  country: 'Russia',
  question: 'What is the cost of studying in Russia for international students?',
  answer: 'Tuition fees generally range from USD 2,000–8,000 per year, depending on the program and university. Living costs average USD 3,000–6,000 per year.'
},
{
  country: 'Russia',
  question: 'Are scholarships available for international students in Russia?',
  answer: 'Yes. The Russian Government Scholarship (State-Funded Quota) covers tuition fees and provides a monthly stipend for eligible international students.'
},
{
  country: 'Russia',
  question: 'Can international students work while studying in Russia?',
  answer: 'Yes. International students can work part-time during studies, but a work permit is required unless working at the university.'
},
{
  country: 'Russia',
  question: 'What is the Russia Student Visa process?',
  answer: 'Students must receive an official invitation from a Russian university, provide medical certificates, and apply for a Russian Student Visa through the embassy or consulate.'
},
{
  country: 'Russia',
  question: 'Can international students stay and work in Russia after graduation?',
  answer: 'Yes. Graduates can apply for a work visa if they secure employment with a Russian employer.'
},
{
  country: 'Russia',
  question: 'Is Russia safe for international students?',
  answer: 'Yes. Major student cities have strong security and international student support services, though students should follow local laws and safety guidelines.'
},

// ===================== MALTA FAQs =====================
{
  country: 'Malta',
  question: 'Why should international students choose Malta for higher education?',
  answer: 'Malta offers high-quality education, English-taught programs, internationally recognized qualifications, a Mediterranean lifestyle, and affordable tuition compared to other European countries.'
},
{
  country: 'Malta',
  question: 'What are the entry requirements to study in Malta?',
  answer: 'Entry requirements vary by institution and program but generally include academic transcripts, proof of English language proficiency, a statement of purpose, and a valid passport.'
},
{
  country: 'Malta',
  question: 'What English language tests are accepted by Maltese institutions?',
  answer: 'Most institutions accept IELTS, TOEFL, PTE Academic, Cambridge English, and Duolingo English Test (accepted by many colleges).'
},
{
  country: 'Malta',
  question: 'How long are degree and diploma programs in Malta?',
  answer: 'Diploma programs typically take 1–2 years, bachelor’s degrees 3–4 years, and master’s degrees 1–2 years.'
},
{
  country: 'Malta',
  question: 'What is the cost of studying in Malta for international students?',
  answer: 'Tuition fees generally range from €6,000–15,000 per year, depending on the course and institution. Living costs average €7,000–10,000 per year.'
},
{
  country: 'Malta',
  question: 'Are scholarships available for international students in Malta?',
  answer: 'Yes. Scholarships and fee reductions are offered by institutions, the Malta Government, and EU-funded programs such as Erasmus+.'
},
{
  country: 'Malta',
  question: 'Can international students work while studying in Malta?',
  answer: 'Yes. Students can work up to 20 hours per week during term time after completing 90 days of study.'
},
{
  country: 'Malta',
  question: 'What is the Malta Student Visa process?',
  answer: 'Students must have an admission letter, proof of sufficient funds, accommodation details, health insurance, and apply for a Malta Student Residence Permit.'
},
{
  country: 'Malta',
  question: 'Can international students stay and work in Malta after graduation?',
  answer: 'Yes. Graduates may stay and work in Malta if they secure employment and convert their student permit into a work permit.'
},
{
  country: 'Malta',
  question: 'Is Malta safe for international students?',
  answer: 'Yes. Malta is considered one of the safest countries in Europe, offering a welcoming environment and strong student support services.'
},

// ===================== DUBAI FAQs =====================
{
  country: 'Dubai',
  question: 'Why should international students choose Dubai for higher education?',
  answer: 'Dubai offers world-class universities, modern infrastructure, a multicultural environment, strong career opportunities, and globally recognized degrees. It is a hub for business, technology, and innovation in the Middle East.'
},
{
  country: 'Dubai',
  question: 'What are the entry requirements to study in Dubai?',
  answer: 'Requirements vary by institution and program but generally include academic transcripts, proof of English proficiency, a personal statement, and letters of recommendation.'
},
{
  country: 'Dubai',
  question: 'What English language tests are accepted by Dubai universities?',
  answer: 'Most universities in Dubai accept IELTS, TOEFL, and PTE Academic. Some institutions may accept alternative tests or waive requirements based on prior education in English.'
},
{
  country: 'Dubai',
  question: 'How long are degree programs in Dubai?',
  answer: 'Undergraduate degrees typically take 3–4 years, master’s degrees 1–2 years, and PhD programs usually 3–5 years.'
},
{
  country: 'Dubai',
  question: 'What is the cost of studying in Dubai for international students?',
  answer: 'Tuition fees generally range from AED 40,000–120,000 per year. Living expenses average AED 30,000–50,000 per year.'
},
{
  country: 'Dubai',
  question: 'Are scholarships available for international students in Dubai?',
  answer: 'Yes. Scholarships are offered by universities, government programs, and private organizations. They may be merit-based, need-based, or program-specific.'
},
{
  country: 'Dubai',
  question: 'Can international students work while studying in Dubai?',
  answer: 'Yes. Students on a student visa can work part-time up to 20 hours per week, depending on visa conditions and institutional regulations.'
},
{
  country: 'Dubai',
  question: 'What is the Dubai Student Visa process?',
  answer: 'Students must receive an acceptance letter from a UAE-recognized institution, show proof of funds, obtain health insurance, and apply for a Student Residence Visa.'
},
{
  country: 'Dubai',
  question: 'Can international students stay and work in Dubai after graduation?',
  answer: 'Yes. Graduates can apply for a post-study work visa or employment visa if they secure a job with a UAE employer.'
},
{
  country: 'Dubai',
  question: 'Is Dubai safe for international students?',
  answer: 'Yes. Dubai is considered very safe, with strict laws, modern healthcare, excellent public services, and a large expat community.'
},

// ===================== IRELAND FAQs =====================
{
  country: 'Ireland',
  question: 'Why should international students choose Ireland for higher education?',
  answer: 'Ireland offers high-quality education, internationally recognized degrees, English-taught programs, a welcoming culture, and excellent career opportunities in Europe and globally.'
},
{
  country: 'Ireland',
  question: 'What are the entry requirements to study in Ireland?',
  answer: 'Entry requirements vary by institution and program but generally include academic transcripts, proof of English proficiency, a personal statement, and letters of recommendation for some programs.'
},
{
  country: 'Ireland',
  question: 'What English language tests are accepted by Irish universities?',
  answer: 'Most universities accept IELTS, TOEFL, PTE Academic, and sometimes Duolingo English Test.'
},
{
  country: 'Ireland',
  question: 'How long are degree programs in Ireland?',
  answer: 'Undergraduate degrees typically take 3–4 years, master’s degrees 1–2 years, and PhD programs usually 3–4 years.'
},
{
  country: 'Ireland',
  question: 'What is the cost of studying in Ireland for international students?',
  answer: 'Tuition fees generally range from €9,000–22,000 per year. Living costs average €10,000–15,000 per year.'
},
{
  country: 'Ireland',
  question: 'Are scholarships available for international students in Ireland?',
  answer: 'Yes. Scholarships include Government of Ireland Scholarships and university-specific merit scholarships.'
},
{
  country: 'Ireland',
  question: 'Can international students work while studying in Ireland?',
  answer: 'Yes. Students can work up to 20 hours per week during term time and full-time during holidays.'
},
{
  country: 'Ireland',
  question: 'What is the Ireland Student Visa process?',
  answer: 'Students must receive an acceptance letter, show proof of funds, have health insurance, and apply for a Long-Term Study Visa or Stamp 2 permission.'
},
{
  country: 'Ireland',
  question: 'Can international students stay and work in Ireland after graduation?',
  answer: 'Yes. Graduates can apply for the Third Level Graduate Scheme, allowing them to stay and work for up to 2 years (3 years for PhD graduates).'
},
{
  country: 'Ireland',
  question: 'Is Ireland safe for international students?',
  answer: 'Yes. Ireland is safe, welcoming, and offers strong student support services and healthcare facilities.'
},

// ===================== NEW ZEALAND FAQs =====================
{
  country: 'New Zealand',
  question: 'Why should international students choose New Zealand for higher education?',
  answer: 'New Zealand offers high-quality education, globally recognized degrees, a safe and friendly environment, a multicultural society, and excellent research and career opportunities.'
},
{
  country: 'New Zealand',
  question: 'What are the entry requirements to study in New Zealand?',
  answer: 'Entry requirements vary by institution and program but generally include academic transcripts, proof of English proficiency, a personal statement, and sometimes references or interviews.'
},
{
  country: 'New Zealand',
  question: 'What English language tests are accepted by New Zealand universities?',
  answer: 'Most universities accept IELTS, TOEFL iBT, PTE Academic, and some also accept Duolingo English Test.'
},
{
  country: 'New Zealand',
  question: 'How long are degree programs in New Zealand?',
  answer: 'Bachelor’s degrees typically take 3 years, honors degrees 1 year, master’s degrees 1–2 years, and PhD programs 3–4 years.'
},
{
  country: 'New Zealand',
  question: 'What is the cost of studying in New Zealand for international students?',
  answer: 'Tuition fees range from NZD 22,000–32,000 per year. Living costs average NZD 15,000–20,000 per year.'
},
{
  country: 'New Zealand',
  question: 'Are scholarships available for international students in New Zealand?',
  answer: 'Yes. Scholarships include New Zealand Scholarships, university-specific scholarships, and government-funded awards.'
},
{
  country: 'New Zealand',
  question: 'Can international students work while studying in New Zealand?',
  answer: 'Yes. Students can work up to 20 hours per week during term time and full-time during holidays.'
},
{
  country: 'New Zealand',
  question: 'What is the New Zealand Student Visa process?',
  answer: 'Students must have an offer of enrollment, show proof of funds, obtain health insurance, and apply for a New Zealand Student Visa.'
},
{
  country: 'New Zealand',
  question: 'Can international students stay and work in New Zealand after graduation?',
  answer: 'Yes. Graduates can apply for a Post-Study Work Visa, allowing them to work for 1–3 years depending on qualification.'
},
{
  country: 'New Zealand',
  question: 'Is New Zealand safe for international students?',
  answer: 'Yes. New Zealand is known for being safe, welcoming, and student-friendly with strong public services and student support.'
},


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
