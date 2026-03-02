import { motion } from 'framer-motion';
import { Briefcase, Clock, MapPin, TrendingUp, Award, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface WorkPermit {
  country: string;
  flag: string;
  duration: string;
  details: string[];
  prPathway: string;
}

const workPermits: WorkPermit[] = [
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    duration: '2 Years',
    details: [
      'Graduate Route visa for all degree holders',
      'No sponsorship required',
      'Can work in any role or be self-employed',
      'Can switch to Skilled Worker visa',
    ],
    prPathway: 'Skilled Worker visa after 5 years of legal residence',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    duration: 'Up to 3 Years',
    details: [
      'Post-Graduation Work Permit (PGWP)',
      'Duration based on program length',
      'Open work permit - any employer',
      'Excellent pathway to PR',
    ],
    prPathway: 'Express Entry system - Canadian Experience Class',
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    duration: '2 to 4 Years',
    details: [
      'Temporary Graduate visa (subclass 485)',
      '2 years for Bachelors, 3 years for Masters',
      '4 years for PhD graduates',
      'Regional study provides extra time',
    ],
    prPathway: 'Skilled Independent visa (189) or State Nominated visa (190)',
  },
 
  {
    country: 'Germany',
    flag: '🇩🇪',
    duration: '18 Months',
    details: [
      'Job seeker visa for all graduates',
      'Can work full-time during this period',
      'Switch to EU Blue Card with job offer',
      'No restrictions on job type',
    ],
    prPathway: 'EU Blue Card or permanent residence after 21 months',
  },

];

interface JobOpening {
  id: string;
  title: string;
  salary_min: number;
  salary_max: number;
  location: string;
  qualification: string;
  experience_years: number;
  criteria: string[];
  package_charge: number;
  registration_fee: number;
  image_url: string;
  is_active: boolean;
  display_order: number;
}

const services = [
  {
    icon: Briefcase,
    title: 'Job Search Guidance',
    description: 'Resume building, interview preparation, and connecting with recruitment agencies.',
  },
  {
    icon: Users,
    title: 'Networking Support',
    description: 'Access to alumni networks, professional associations, and industry events.',
  },
  {
    icon: Award,
    title: 'Skill Development',
    description: 'Guidance on certifications and skills to enhance employability in your field.',
  },
  {
    icon: TrendingUp,
    title: 'Career Counseling',
    description: 'One-on-one sessions to plan your career path and set achievable goals.',
  },
];

export const WorkAbroad = () => {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Job openings fetched:', data?.length || 0);
      setJobOpenings(data || []);
    } catch (error) {
      console.error('Error fetching job openings:', error);
    } finally {
      setLoading(false);
    }
  };

  const ukJobs = jobOpenings.filter(job => job.location.includes('UK') || job.location.includes('United Kingdom'));
  const irelandJobs = jobOpenings.filter(job => job.location.includes('Ireland'));

  const handleApplyNow = (job: JobOpening) => {
    navigate('/contact', {
      state: {
        jobTitle: job.title,
        jobLocation: job.location,
        sourcePage: 'work-abroad'
      }
    });
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Work Abroad After Studies</h1>
            <p className="text-xl text-body-text">
              Explore post-study work opportunities and pathways to permanent residency
            </p>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Urgent UK Job Opportunities
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Explore current job openings in the United Kingdom with competitive salaries and comprehensive support
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-turquoise border-r-transparent"></div>
            </div>
          ) : ukJobs.length > 0 ? (
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ukJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-turquoise/20 hover:border-turquoise/50 hover:shadow-2xl transition-all group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={job.image_url}
                      alt={job.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <button
                      onClick={() => handleApplyNow(job)}
                      className="w-full px-6 py-3 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-body-text">No job openings available at the moment. Please check back later.</p>
            </div>
          )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ireland Job Opportunities
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Discover exciting career opportunities in Ireland with excellent work-life balance and growth potential
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-turquoise border-r-transparent"></div>
            </div>
          ) : irelandJobs.length > 0 ? (
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {irelandJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-turquoise/20 hover:border-turquoise/50 hover:shadow-2xl transition-all group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={job.image_url}
                      alt={job.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <button
                      onClick={() => handleApplyNow(job)}
                      className="w-full px-6 py-3 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-body-text">No Ireland job openings available at the moment. Please check back later.</p>
            </div>
          )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Post Study Work Visa Details
            </h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Most study destinations offer work permits after graduation to gain valuable international experience
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-8">
            {workPermits.map((permit, index) => (
              <motion.div
                key={permit.country}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-white to-ghost-green rounded-2xl shadow-xl p-8 border-2 border-turquoise/20 hover:border-turquoise/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <span className="text-5xl mr-4">{permit.flag}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{permit.country}</h3>
                      <div className="flex items-center text-turquoise font-semibold mt-1">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{permit.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-heading mb-3 flex items-center">
                      <Briefcase className="w-5 h-5 text-turquoise mr-2" />
                      Work Permit Details
                    </h4>
                    <ul className="space-y-2">
                      {permit.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-turquoise rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-body-text text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-heading mb-3 flex items-center">
                      <MapPin className="w-5 h-5 text-turquoise mr-2" />
                      Permanent Residency Pathway
                    </h4>
                    <p className="text-body-text bg-white rounded-lg p-4 border border-turquoise/20">
                      {permit.prPathway}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Job Search Support</h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              We help you transition from student to professional with comprehensive career services
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-turquoise/20 hover:border-turquoise/50 hover:shadow-xl transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-body-text">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Planning Your International Career
              </h2>
              <p className="text-xl text-body-text mb-8">
                Book a consultation to understand work opportunities in your chosen destination
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105"
              >
                Schedule Free Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
