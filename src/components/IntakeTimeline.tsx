import { motion } from 'framer-motion';
import {
  BookOpen,
  FileText,
  Target,
  Award,
  Building2,
  FileCheck,
  Plane,
  Calendar,
  CreditCard,
  ClipboardCheck,
  Search,
  DollarSign,
  Users,
  MessageSquare,
  UserCheck
} from 'lucide-react';

interface TimelineStep {
  icon: React.ElementType;
  title: string;
  period: string;
  color: string;
  note?: string;
}

interface IntakeTimelineProps {
  country: 'UK' | 'USA' | 'Canada' | 'Australia' | 'Germany' | 'France' | 'Netherlands' | 'Switzerland' | 'Sweden' | 'Spain' | 'Italy' | 'Finland' | 'Russia' | 'Malta' | 'Ireland' | 'New Zealand' | 'Dubai';
  intake: string;
}

const timelineData = {
  UK: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to UK', period: '', color: 'bg-green-100 border-green-400' },
    ],
    January: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to UK', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  USA: {
    Fall: [
      { icon: Users, title: 'Consulting with expert', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: BookOpen, title: 'IELTS/TOEFL/SAT/GMAT/', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'University selection', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: FileCheck, title: 'Apply to university', period: '', color: 'bg-indigo-100 border-indigo-300' },
      { icon: ClipboardCheck, title: 'Arranging required documents', period: '', color: 'bg-pink-100 border-pink-300' },
      { icon: Award, title: 'University acceptance letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arranging funds', period: '', color: 'bg-green-100 border-green-300' },
      { icon: FileText, title: 'Apply for the I 20', period: '', color: 'bg-teal-100 border-teal-300' },
      { icon: Building2, title: 'Visa application', period: '', color: 'bg-cyan-100 border-cyan-300' },
      { icon: MessageSquare, title: 'USA visa interview process', period: '', color: 'bg-sky-100 border-sky-300' },
      { icon: UserCheck, title: 'Received F1 visa', period: '', color: 'bg-emerald-100 border-emerald-300' },
    ],
  },
  Canada: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Canada', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Australia: {
    February: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Australia', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Germany: {
    October: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Germany', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  France: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to France', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Netherlands: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Netherlands', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Switzerland: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Switzerland', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Sweden: {
    'August/September': [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Sweden', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Spain: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Spain', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Italy: {
    'September/October': [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Italy', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Finland: {
    'August/September': [
      { icon: BookOpen, title: 'IELTS', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: Award, title: 'Receive Offer Letter from University', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Required Documents for Finland Student Visa', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Finland', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Russia: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Russia', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Malta: {
    October: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Malta', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Ireland: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Ireland', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  'New Zealand': {
    February: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300', note: 'Start at least 6 months prior to course start date' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to New Zealand', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
  Dubai: {
    September: [
      { icon: BookOpen, title: 'IELTS/TOEFL/PTE', period: '', color: 'bg-orange-100 border-orange-300' },
      { icon: Search, title: 'Choose University and Course', period: '', color: 'bg-blue-100 border-blue-300' },
      { icon: FileCheck, title: 'Apply to University', period: '', color: 'bg-purple-100 border-purple-300' },
      { icon: Award, title: 'Receive Offer Letter', period: '', color: 'bg-yellow-100 border-yellow-300' },
      { icon: DollarSign, title: 'Arrange Finances and Visa Documents', period: '', color: 'bg-green-100 border-green-300' },
      { icon: Building2, title: 'Apply for Visa', period: '', color: 'bg-green-100 border-green-400' },
      { icon: Plane, title: 'Fly to Dubai', period: '', color: 'bg-green-100 border-green-400' },
    ],
  },
};

export const IntakeTimeline = ({ country, intake }: IntakeTimelineProps) => {
  const timeline = timelineData[country]?.[intake as keyof typeof timelineData[typeof country]];

  if (!timeline) return null;

  return (
    <div className="relative py-8">
      <h3 className="text-3xl font-bold text-heading mb-12 md:mb-16 text-center">
        Intake Roadmap for {country}
      </h3>

      <div className="max-w-6xl mx-auto mt-12 md:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {timeline.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className={`w-20 h-20 rounded-full ${step.color} border-2 flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-10 h-10 text-heading" />
              </div>
              <h4 className="text-sm font-bold text-heading text-center mb-2">
                {step.title}
              </h4>
              {step.note && (
                <p className="text-xs text-gray-600 text-center italic px-2">
                  {step.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-12"
      >
        {country === 'USA' && (
          <div className="mb-6 p-4 bg-turquoise/10 border-l-4 border-turquoise rounded-r-lg">
            <p className="text-body-text font-medium">
              Note: Few universities have an intake every month
            </p>
          </div>
        )}
        {country === 'Ireland' && (
          <div className="mb-6 p-4 bg-turquoise/10 border-l-4 border-turquoise rounded-r-lg">
            <p className="text-body-text font-medium">
              Due to the high volume of Visa applications, we recommend applying 8 to 12 weeks prior to the course start date.
            </p>
          </div>
        )}
        <p className="text-sm text-body-text italic mb-4">
          Timeline may vary based on individual circumstances and university requirements
        </p>
      </motion.div>
    </div>
  );
};
