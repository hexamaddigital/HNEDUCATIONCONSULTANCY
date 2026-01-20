import { motion } from 'framer-motion';
import {
  Database, Brain, Shield, Briefcase, Wrench, Heart, TrendingUp, Laptop, Users,
  Building, Pill, Video, Hotel, GraduationCap, Globe, DollarSign, Truck, Flame,
  Target, Megaphone, Scale, BookOpen, ShoppingBag, HeartPulse, Microscope,
  Sparkles, Sprout, Atom, Hammer, Bus, Palette, Beaker, Trophy, Newspaper
} from 'lucide-react';
import { FAQ } from '../components/FAQ';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Course {
  icon: React.ElementType;
  name: string;
  description: string;
  averageSalary: string;
  duration: string;
  skills: string[];
}

interface CountryCourses {
  [countryCode: string]: Course[];
}

const iconMap: { [key: string]: React.ElementType } = {
  Laptop,
  Briefcase,
  Wrench,
  Database,
  Users,
  Building,
  Heart,
  Hotel,
  Pill,
  Video,
  Brain,
  Shield,
  TrendingUp,
  GraduationCap,
  Globe,
  DollarSign,
  Truck,
  Flame,
  Target,
  Megaphone,
  Scale,
  BookOpen,
  ShoppingBag,
  HeartPulse,
  Microscope,
  Sparkles,
  Sprout,
  Atom,
  Hammer,
  Bus,
  Palette,
  Beaker,
  Trophy,
  Newspaper,
};

export const TrendingCourses = () => {
  const [countryCourses, setCountryCourses] = useState<CountryCourses>({});
  const [loading, setLoading] = useState(true);
  const [countries] = useState([
    { code: 'USA', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CAN', name: 'Canada' },
    { code: 'AUS', name: 'Australia' },
    { code: 'ARE', name: 'United Arab Emirates' },
    { code: 'DEU', name: 'Germany' },
    { code: 'FRA', name: 'France' },
    { code: 'ITA', name: 'Italy' },
    { code: 'NLD', name: 'Netherlands' },
    { code: 'CHE', name: 'Switzerland' },
    { code: 'NZL', name: 'New Zealand' },
    { code: 'IRL', name: 'Ireland' },
    { code: 'SWE', name: 'Sweden' },
    { code: 'FIN', name: 'Finland' },
    { code: 'ESP', name: 'Spain' },
  ]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('course_countries')
        .select(`
          country_code,
          country_name,
          display_order,
          trending_courses (
            name,
            description,
            icon_name,
            average_salary,
            duration,
            skills
          )
        `)
        .order('display_order', { ascending: true });

      if (error) throw error;

      const grouped: CountryCourses = {};

      data?.forEach((item: any) => {
        if (!grouped[item.country_code]) {
          grouped[item.country_code] = [];
        }

        const course = item.trending_courses;
        if (course) {
          grouped[item.country_code].push({
            name: course.name,
            description: course.description,
            averageSalary: course.average_salary,
            duration: course.duration,
            skills: course.skills || [],
            icon: iconMap[course.icon_name] || GraduationCap,
          });
        }
      });

      setCountryCourses(grouped);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCoursesForCountry = (countryCode: string) => {
    return countryCourses[countryCode] || [];
  };

  if (loading) {
    return (
      <>
        <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Trending Courses by Country</h1>
              <p className="text-xl text-body-text">Loading courses...</p>
            </div>
          </div>
        </section>
      </>
    );
  }

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
              const courses = getCoursesForCountry(country.code);
              if (courses.length === 0) return null;

              return (
                <motion.div
                  key={country.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: countryIndex * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-turquoise/20 overflow-hidden hover:border-turquoise/50 transition-all"
                >
                  <div className="bg-gradient-to-br from-turquoise to-turquoise-dark p-4 md:p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{country.name}</h2>
                  </div>
                  <div className="p-4 md:p-6">
                    <ul className="space-y-2">
                      {courses.map((course) => {
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
