import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  Users,
  Shield,
  ArrowRight,
  MapPin,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
} from 'lucide-react';

interface VisaRequirement {
  title: string;
  items: string[];
}

interface VisaType {
  name: string;
  duration: string;
  validity: string;
  description: string;
  icon: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export const TouristVisa = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    travelDate: '',
    message: '',
  });

  const visaTypes: VisaType[] = [
    {
      name: 'Single Entry Tourist Visa',
      duration: '30-90 days',
      validity: '3-6 months',
      description: 'Perfect for short vacation trips and single country visits',
      icon: '🎫',
    },
    {
      name: 'Multiple Entry Tourist Visa',
      duration: '30-90 days per visit',
      validity: '1-5 years',
      description: 'Ideal for frequent travelers and business tourists',
      icon: '🎟️',
    },
    {
      name: 'Transit Visa',
      duration: '24-72 hours',
      validity: 'Single transit',
      description: 'For layovers and connecting flights through a country',
      icon: '✈️',
    },
    {
      name: 'Group Tourist Visa',
      duration: '15-30 days',
      validity: '3 months',
      description: 'Special visa for organized tour groups',
      icon: '👥',
    },
  ];

  const popularDestinations = [
    { name: 'United Kingdom', flag: '🇬🇧', processing: '15-20 days' },
    { name: 'United States', flag: '🇺🇸', processing: '30-60 days' },
    { name: 'Canada', flag: '🇨🇦', processing: '20-30 days' },
    { name: 'Australia', flag: '🇦🇺', processing: '15-30 days' },
    { name: 'Schengen (Europe)', flag: '🇪🇺', processing: '15-30 days' },
    { name: 'Dubai (UAE)', flag: '🇦🇪', processing: '3-5 days' },
    { name: 'Singapore', flag: '🇸🇬', processing: '3-5 days' },
    { name: 'New Zealand', flag: '🇳🇿', processing: '20-30 days' },
  ];

  const requirements: VisaRequirement[] = [
    {
      title: 'Basic Documents',
      items: [
        'Valid passport (minimum 6 months validity)',
        'Completed visa application form',
        'Recent passport-size photographs',
        'Copy of previous visas (if any)',
        'Travel itinerary or flight bookings',
      ],
    },
    {
      title: 'Financial Documents',
      items: [
        'Bank statements (last 6 months)',
        'Income tax returns',
        'Salary slips or employment letter',
        'Proof of funds for travel expenses',
        'Sponsorship letter (if applicable)',
      ],
    },
    {
      title: 'Supporting Documents',
      items: [
        'Hotel bookings or accommodation proof',
        'Travel insurance certificate',
        'Cover letter explaining purpose of visit',
        'Leave approval letter from employer',
        'Proof of ties to home country',
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Free consultation to understand your travel plans and visa requirements',
    },
    {
      step: 2,
      title: 'Document Checklist',
      description: 'Receive a personalized checklist of required documents for your destination',
    },
    {
      step: 3,
      title: 'Application Preparation',
      description: 'Our experts help you prepare and review all documents and forms',
    },
    {
      step: 4,
      title: 'Visa Application Submission',
      description: 'We submit your application and track its progress with the embassy',
    },
    {
      step: 5,
      title: 'Interview Preparation',
      description: 'Mock interviews and guidance for visa interview (if required)',
    },
    {
      step: 6,
      title: 'Visa Approval & Collection',
      description: 'Receive your visa and pre-departure briefing',
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: '98% Success Rate',
      description: 'Industry-leading approval rate with meticulous documentation',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Quick Processing',
      description: 'Expedited visa processing with fast-track options available',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Guidance',
      description: 'Experienced visa consultants with in-depth country knowledge',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Complete Support',
      description: 'End-to-end assistance from application to visa stamping',
    },
  ];

  const faqs: FAQ[] = [
    {
      question: 'How long does tourist visa processing take?',
      answer: 'Processing times vary by country, typically ranging from 3-60 days. UAE visas can be processed in 3-5 days, while US tourist visas may take 30-60 days. We provide expedited services where available.',
    },
    {
      question: 'What is the validity of a tourist visa?',
      answer: 'Tourist visa validity depends on the destination country. Single-entry visas are typically valid for 3-6 months, while multiple-entry visas can be valid for 1-5 years. The duration of stay per visit is usually 30-90 days.',
    },
    {
      question: 'Can I extend my tourist visa while abroad?',
      answer: 'Extension possibilities vary by country. Some countries like the US allow visa extensions under specific circumstances, while others require you to leave and reapply. We advise checking extension rules before travel.',
    },
    {
      question: 'What if my tourist visa application is rejected?',
      answer: 'We provide complete analysis of rejection reasons and guidance for reapplication. Our high success rate means rejections are rare, but we offer full support for resubmission with strengthened documentation.',
    },
    {
      question: 'Do I need travel insurance for tourist visa?',
      answer: 'Many countries, especially Schengen nations, require travel insurance as a mandatory document. We can help you obtain appropriate travel insurance that meets embassy requirements.',
    },
    {
      question: 'How much bank balance is required for tourist visa?',
      answer: 'Required bank balance varies by destination and length of stay. Generally, you should show sufficient funds to cover your entire trip (₹50,000-₹2,00,000 per person). We provide country-specific guidance.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-turquoise to-turquoise-dark rounded-full flex items-center justify-center shadow-xl">
                <Plane className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-heading leading-tight"
            >
              Tourist Visa{' '}
              <span className="bg-gradient-to-r from-turquoise to-turquoise-dark bg-clip-text text-transparent">
                Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-body-text mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Expert visa assistance for your dream vacation destinations worldwide
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <a
                href="#consultation"
                className="group px-8 py-5 bg-turquoise text-white rounded-full font-semibold hover:bg-turquoise-dark transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#visa-types"
                className="px-8 py-5 bg-white text-turquoise border-2 border-turquoise rounded-full font-semibold hover:bg-turquoise hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Visa Types
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-turquoise/10 to-ghost-green rounded-2xl flex items-center justify-center text-turquoise">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-heading mb-2">{benefit.title}</h3>
                <p className="text-sm text-body-text">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Popular Tourist Destinations
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              We process tourist visas for all major destinations worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-5xl mb-4 text-center">{destination.flag}</div>
                <h3 className="text-lg font-bold text-heading mb-2 text-center">
                  {destination.name}
                </h3>
                <div className="flex items-center justify-center text-sm text-body-text">
                  <Clock className="w-4 h-4 mr-2 text-turquoise" />
                  {destination.processing}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="visa-types" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Types of Tourist Visas
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Choose the right visa type based on your travel plans
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {visaTypes.map((visa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-gradient-to-br from-ghost-green to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="text-5xl mb-4">{visa.icon}</div>
                <h3 className="text-2xl font-bold text-heading mb-3">{visa.name}</h3>
                <p className="text-body-text mb-4">{visa.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-turquoise" />
                    <span className="font-semibold text-heading">Duration:</span>
                    <span className="ml-2 text-body-text">{visa.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-turquoise" />
                    <span className="font-semibold text-heading">Validity:</span>
                    <span className="ml-2 text-body-text">{visa.validity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Document Requirements
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              General documents required for tourist visa applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-white rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-heading mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-turquoise" />
                  {req.title}
                </h3>
                <ul className="space-y-3">
                  {req.items.map((item, i) => (
                    <li key={i} className="flex items-start text-body-text">
                      <CheckCircle className="w-5 h-5 mr-3 text-turquoise flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-body-text bg-white/70 backdrop-blur-sm rounded-xl p-4 max-w-3xl mx-auto">
              <strong>Note:</strong> Document requirements vary by country and individual circumstances.
              Contact us for a personalized checklist for your specific destination.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Our Visa Process
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Simple 6-step process to get your tourist visa approved
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start mb-12 last:mb-0"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-turquoise to-turquoise-dark text-white rounded-full flex items-center justify-center font-bold text-2xl mr-6 shadow-xl">
                  {step.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-heading mb-2">{step.title}</h3>
                  <p className="text-body-text leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Get answers to common tourist visa queries
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-ghost-green transition-colors"
                >
                  <span className="text-lg font-semibold text-heading pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-6 h-6 text-turquoise flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-turquoise flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-8 py-6 bg-ghost-green/30 border-t border-gray-200">
                    <p className="text-body-text leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Start Your Visa Application
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Fill out the form below and our visa experts will contact you within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-ghost-green to-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Destination Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select country</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Schengen">Schengen (Europe)</option>
                    <option value="Dubai">Dubai (UAE)</option>
                    <option value="Singapore">Singapore</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                  Expected Travel Date
                </label>
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                  Additional Information
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your travel plans, visa type needed, or any specific questions..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-5 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Request Free Consultation
              </button>

              <p className="text-sm text-body-text text-center">
                By submitting this form, you agree to our terms and privacy policy
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-turquoise to-turquoise-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Plan Your Dream Vacation?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contact our visa experts today and get your tourist visa processed hassle-free
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-3 px-8 py-4 bg-white text-turquoise rounded-full font-semibold hover:bg-ghost-green transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:visa@hnstudyabroad.com"
                className="flex items-center space-x-3 px-8 py-4 bg-white text-turquoise rounded-full font-semibold hover:bg-ghost-green transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <Mail className="w-5 h-5" />
                <span>visa@hnstudyabroad.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
