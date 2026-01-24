import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Testimonials } from '../components/Testimonials';
import { CounterStats } from '../components/CounterStats';
import { CountryCarousel } from '../components/CountryCarousel';

interface StudyPathResult {
  countries: string[];
  courses: string[];
  roadmap: string[];
}

export const Home = () => {
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    budget: '',
    qualification: '',
    interest: '',
  });
  const [result, setResult] = useState<StudyPathResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const countries = [];
    const courses = [];
    const roadmap = [
      'Schedule free counselling session',
      'Shortlist universities based on profile',
      'Prepare application documents',
      'Apply to selected universities',
      'Receive offer letters',
      'Apply for student visa',
      'Prepare for departure',
    ];

    if (formData.country) {
      countries.push(formData.country);
    }

    if (formData.interest === 'Engineering') {
      courses.push('Computer Science', 'Mechanical Engineering', 'Electrical Engineering');
    } else if (formData.interest === 'Business') {
      courses.push('MBA', 'Business Analytics', 'Management');
    } else if (formData.interest === 'Healthcare') {
      courses.push('Nursing', 'Public Health', 'Healthcare Management');
    } else if (formData.interest === 'Technology') {
      courses.push('Data Science', 'Artificial Intelligence', 'Cyber Security');
    } else {
      courses.push('Data Science', 'MBA', 'Engineering');
    }

    if (formData.budget === 'High' && !countries.includes('United States')) {
      countries.push('United States', 'United Kingdom');
    } else if (formData.budget === 'Medium') {
      countries.push('Canada', 'Australia');
    } else if (formData.budget === 'Low') {
      countries.push('Germany', 'France');
    }

    setResult({ countries: [...new Set(countries)], courses, roadmap });
    setShowResult(true);
  };

  return (
    <>
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-turquoise/10 via-ghost-green to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-heading leading-tight"
            >
              Unlock Your{' '}
              <span className="bg-gradient-to-r from-turquoise to-turquoise-dark bg-clip-text text-transparent">
                Global Education
              </span>{' '}
              Journey
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link
                to="/contact"
                className="group px-8 py-5 bg-turquoise text-white rounded-full font-semibold hover:bg-turquoise-dark transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/global-education"
                className="px-8 py-5 bg-white text-turquoise border-2 border-turquoise rounded-full font-semibold hover:bg-turquoise hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Global Destinations
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16"
            >
              <p className="text-sm font-semibold text-turquoise mb-4 uppercase tracking-wider">
                Explore Global Destinations
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['UK', 'USA', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Sweden', 'Spain', 'Italy', 'Finland', 'Russia', 'Malta'].map((country, index) => (
                  <motion.div
                    key={country}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.08 }}
                    className="px-5 py-2.5 bg-white/70 backdrop-blur-sm rounded-full shadow-md text-heading font-medium hover:shadow-lg hover:bg-white transition-all duration-300 hover:scale-105"
                  >
                    {country}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CounterStats />

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
              Why Choose HN Study Abroad?
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Your trusted partner for overseas education with end-to-end support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Expert Counselling',
                description: 'Personalized guidance from experienced counselors who understand your aspirations',
                icon: '🎓',
              },
              {
                title: 'University Partnerships',
                description: 'Direct partnerships with 500+ universities across the globe for seamless admissions',
                icon: '🏛️',
              },
              {
                title: 'Visa Success',
                description: '100% visa success rate with meticulous documentation and interview preparation',
                icon: '✈️',
              },
              {
                title: 'Scholarship Support',
                description: 'Access to exclusive scholarships and financial aid opportunities worth millions',
                icon: '💰',
              },
              {
                title: 'Application Management',
                description: 'End-to-end application support from SOP writing to offer letter follow-ups',
                icon: '📝',
              },
              {
                title: 'Pre-Departure Guidance',
                description: 'Complete orientation on accommodation, travel, and life abroad preparation',
                icon: '🌍',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 bg-gradient-to-br from-ghost-green to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-heading mb-3">
                  {feature.title}
                </h3>
                <p className="text-body-text leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CountryCarousel />

      <section className="py-24 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Find Your Perfect Study Path
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Answer a few questions and discover the best countries, courses, and application roadmap tailored for you
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                  Preferred Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Finland">Finland</option>
                  <option value="Russia">Russia</option>
                  <option value="Malta">Malta</option>
                  <option value="Malta">Dubai</option>
                  <option value="Malta">New Zealand</option>
                  <option value="Malta">Ireland</option>
   
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                  Budget Range (Annual)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Budget</option>
                  <option value="Low">Low (&lt; $15,000)</option>
                  <option value="Medium">Medium ($15,000 - $30,000)</option>
                  <option value="High">High (&gt; $30,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                  Highest Qualification
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Qualification</option>
                  
                  <option value="Bachelors">Bachelor's Degree</option>
                  <option value="Masters">Master's Degree</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                  Field of Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Field</option>
                  <option value="Technology">Technology & IT</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business & Management</option>
                  <option value="Healthcare">Healthcare & Medicine</option>
                  <option value="Arts">Arts & Humanities</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-5 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Find My Study Path
              </button>
            </motion.form>

            {showResult && result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-8 bg-white rounded-3xl shadow-2xl p-8 md:p-12"
              >
                <h3 className="text-3xl font-bold text-heading mb-6 flex items-center">
                  <CheckCircle className="w-8 h-8 text-turquoise mr-3" />
                  Your Personalized Study Path
                </h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-semibold text-heading mb-4 flex items-center">
                      <Globe className="w-6 h-6 text-turquoise mr-2" />
                      Recommended Countries
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {result.countries.map((country, index) => (
                        <span
                          key={index}
                          className="px-5 py-3 bg-turquoise/10 text-turquoise rounded-xl font-medium shadow-sm"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-heading mb-4 flex items-center">
                      <BookOpen className="w-6 h-6 text-turquoise mr-2" />
                      Trending Courses
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {result.courses.map((course, index) => (
                        <span
                          key={index}
                          className="px-5 py-3 bg-ghost-green text-heading rounded-xl font-medium shadow-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-heading mb-4 flex items-center">
                      <Award className="w-6 h-6 text-turquoise mr-2" />
                      Application Roadmap
                    </h4>
                    <div className="space-y-4">
                      {result.roadmap.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-turquoise to-turquoise-dark text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-lg">
                            {index + 1}
                          </div>
                          <p className="text-body-text pt-2 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="block w-full px-8 py-5 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
                  >
                    Book Free Counselling Session
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};
