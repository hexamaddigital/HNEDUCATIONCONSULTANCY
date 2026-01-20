import { motion } from 'framer-motion';
import { Database, Brain, Shield, Briefcase, Wrench, Heart, TrendingUp, Laptop, Users, Building, Pill, Video, Hotel } from 'lucide-react';
import { FAQ } from '../components/FAQ';

interface Course {
  icon: React.ElementType;
  name: string;
  description: string;
  averageSalary: string;
  duration: string;
  topCountries: string[];
  skills: string[];
}

const courses: Course[] = [
  {
    icon: Laptop,
    name: 'Information Technology',
    description:
      'Master IT infrastructure, systems administration, and network management for modern enterprises.',
    averageSalary: '$75,000 - $110,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'],
    skills: ['Network Management', 'Cloud Computing', 'System Administration', 'IT Security', 'DevOps'],
  },
  {
    icon: Briefcase,
    name: 'Business and Management',
    description:
      'Build leadership skills and business acumen to drive organizational success and innovation.',
    averageSalary: '$90,000 - $140,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Canada', 'France', 'Spain', 'Switzerland'],
    skills: ['Leadership', 'Strategy', 'Finance', 'Marketing', 'Operations'],
  },
  {
    icon: Wrench,
    name: 'Engineering',
    description:
      'Apply scientific principles to design, develop, and optimize systems across various engineering disciplines.',
    averageSalary: '$75,000 - $110,000',
    duration: '1-2 years',
    topCountries: ['USA', 'Germany', 'Canada', 'UK', 'Switzerland', 'Sweden'],
    skills: ['Problem Solving', 'CAD', 'Project Management', 'Research', 'Innovation'],
  },
  {
    icon: Database,
    name: 'Computer Science and Data Science',
    description:
      'Master programming, algorithms, and data analysis to build innovative software and extract insights from data.',
    averageSalary: '$95,000 - $130,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'],
    skills: ['Python', 'Java', 'Machine Learning', 'Statistics', 'Algorithms', 'SQL'],
  },
  {
    icon: Users,
    name: 'Psychology and Social Work',
    description:
      'Understand human behavior and provide support services to individuals and communities in need.',
    averageSalary: '$50,000 - $75,000',
    duration: '2-3 years',
    topCountries: ['USA', 'UK', 'Canada', 'Australia', 'Netherlands', 'Sweden'],
    skills: ['Counseling', 'Assessment', 'Case Management', 'Empathy', 'Communication'],
  },
  {
    icon: Building,
    name: 'Architecture and Construction',
    description:
      'Design sustainable buildings and manage construction projects with innovative architectural solutions.',
    averageSalary: '$70,000 - $100,000',
    duration: '2-3 years',
    topCountries: ['USA', 'UK', 'Australia', 'Canada', 'Germany', 'Netherlands'],
    skills: ['CAD', 'Design', 'Project Management', 'Sustainability', '3D Modeling'],
  },
  {
    icon: Heart,
    name: 'Nursing and Health',
    description:
      'Provide compassionate care and medical expertise in high-demand healthcare roles globally.',
    averageSalary: '$70,000 - $105,000',
    duration: '2-4 years',
    topCountries: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'],
    skills: ['Patient Care', 'Clinical Skills', 'Medical Knowledge', 'Communication', 'Empathy'],
  },
  {
    icon: Hotel,
    name: 'Hospitality and Tourism',
    description:
      'Lead hospitality operations and create exceptional guest experiences in hotels, restaurants, and tourism.',
    averageSalary: '$45,000 - $75,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Switzerland', 'Australia', 'Spain', 'France'],
    skills: ['Customer Service', 'Management', 'Event Planning', 'Marketing', 'Operations'],
  },
  {
    icon: Pill,
    name: 'Pharmacy',
    description:
      'Dispense medications and provide pharmaceutical care to improve patient health outcomes.',
    averageSalary: '$85,000 - $125,000',
    duration: '3-4 years',
    topCountries: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'],
    skills: ['Pharmacology', 'Patient Counseling', 'Drug Interactions', 'Healthcare', 'Clinical Knowledge'],
  },
  {
    icon: Video,
    name: 'Media and Communication',
    description:
      'Create compelling content and strategic communications for digital media, journalism, and public relations.',
    averageSalary: '$50,000 - $85,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Canada', 'Australia', 'Netherlands', 'Sweden'],
    skills: ['Content Creation', 'Digital Marketing', 'Journalism', 'Social Media', 'Video Production'],
  },
  {
    icon: Brain,
    name: 'Artificial Intelligence & Machine Learning',
    description:
      'Develop intelligent systems and algorithms that can learn and make decisions autonomously.',
    averageSalary: '$100,000 - $150,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Canada', 'Germany', 'Switzerland', 'Sweden'],
    skills: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch', 'Computer Vision'],
  },
  {
    icon: Shield,
    name: 'Cyber Security',
    description:
      'Protect organizations from cyber threats and learn ethical hacking, network security, and risk management.',
    averageSalary: '$85,000 - $125,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Australia', 'Canada', 'Netherlands', 'Finland'],
    skills: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Risk Assessment', 'Penetration Testing'],
  },
  {
    icon: TrendingUp,
    name: 'Business Analytics',
    description:
      'Transform business data into actionable insights using statistical analysis and data visualization.',
    averageSalary: '$80,000 - $115,000',
    duration: '1-2 years',
    topCountries: ['USA', 'UK', 'Canada', 'Australia', 'France', 'Netherlands'],
    skills: ['Data Visualization', 'SQL', 'Tableau', 'Business Intelligence', 'Analytics'],
  },
];

export const TrendingCourses = () => {
  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Sweden', 'Finland', 'Spain'];

  const getCoursesForCountry = (country: string) => {
    return courses.filter((course) => course.topCountries.includes(country));
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trending Courses by Country</h1>
            <p className="text-xl text-body-text">
              Explore high-demand programs with excellent career prospects globally
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {countries.map((country, countryIndex) => {
              const countryCourses = getCoursesForCountry(country);
              return (
                <motion.div
                  key={country}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: countryIndex * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-turquoise/20 overflow-hidden hover:border-turquoise/50 transition-all"
                >
                  <div className="bg-gradient-to-br from-turquoise to-turquoise-dark p-4 md:p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{country}</h2>
                  </div>
                  <div className="p-4 md:p-6">
                    <ul className="space-y-2">
                      {countryCourses.map((course) => {
                        const Icon = course.icon;
                        return (
                          <li
                            key={course.name}
                            className="flex items-center gap-3 text-heading font-medium text-sm md:text-base py-2 px-3 rounded-lg hover:bg-ghost-green transition-colors"
                          >
                            <Icon className="w-5 h-5 text-turquoise flex-shrink-0" />
                            <span>{course.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
};
