import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  User,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  Briefcase,
  Plus,
  CheckCircle,
  Clock,
  FileText,
  Plane,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface StudentProfile {
  full_name: string;
  phone_number: string;
  preferred_country: string;
  highest_qualification: string;
  field_of_interest: string;
}

interface Application {
  id: string;
  country: string;
  university: string;
  course: string;
  intake: string;
  status: string;
  created_at: string;
}

interface ProfileFormData {
  fullName: string;
  phoneNumber: string;
  preferredCountry: string;
  highestQualification: string;
  fieldOfInterest: string;
}

interface ApplicationFormData {
  country: string;
  university: string;
  course: string;
  intake: string;
}

const statusSteps = [
  { key: 'applied', label: 'Applied', icon: FileText },
  { key: 'offer', label: 'Offer Received', icon: CheckCircle },
  { key: 'visa', label: 'Visa Processing', icon: Clock },
  { key: 'departure', label: 'Ready to Depart', icon: Plane },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>();

  const {
    register: registerApplication,
    handleSubmit: handleApplicationSubmit,
    reset: resetApplicationForm,
    formState: { errors: applicationErrors },
  } = useForm<ApplicationFormData>();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from('students')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileData) {
      setProfile(profileData);
      setValue('fullName', profileData.full_name);
      setValue('phoneNumber', profileData.phone_number || '');
      setValue('preferredCountry', profileData.preferred_country || '');
      setValue('highestQualification', profileData.highest_qualification || '');
      setValue('fieldOfInterest', profileData.field_of_interest || '');
    }

    const { data: applicationsData } = await supabase
      .from('applications')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (applicationsData) {
      setApplications(applicationsData);
    }

    setLoading(false);
  };

  const onUpdateProfile = async (data: ProfileFormData) => {
    if (!user) return;

    const { error } = await supabase
      .from('students')
      .update({
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        preferred_country: data.preferredCountry,
        highest_qualification: data.highestQualification,
        field_of_interest: data.fieldOfInterest,
      })
      .eq('id', user.id);

    if (!error) {
      alert('Profile updated successfully!');
      fetchData();
    }
  };

  const onCreateApplication = async (data: ApplicationFormData) => {
    if (!user) return;

    const { error } = await supabase.from('applications').insert({
      student_id: user.id,
      country: data.country,
      university: data.university,
      course: data.course,
      intake: data.intake,
      status: 'applied',
    });

    if (!error) {
      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-form-notification`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'application',
            data: {
              studentName: profile?.full_name || 'Unknown',
              email: user.email || 'N/A',
              country: data.country,
              university: data.university,
              course: data.course,
              intake: data.intake,
            },
          }),
        });

        const result = await response.json();
        if (result.whatsappUrls) {
          result.whatsappUrls.forEach((url: string) => {
            window.open(url, '_blank');
          });
        }
      } catch (emailError) {
        console.error('Notification failed:', emailError);
      }

      setShowApplicationForm(false);
      resetApplicationForm();
      fetchData();
    }
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-green">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-12 bg-ghost-green">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-center w-20 h-20 bg-turquoise rounded-full mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">{profile?.full_name}</h2>
                <p className="text-body-text text-center mb-6">{user?.email}</p>

                <form onSubmit={handleProfileSubmit(onUpdateProfile)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Full Name
                    </label>
                    <input
                      {...registerProfile('fullName', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                    />
                    {profileErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{profileErrors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Phone Number
                    </label>
                    <input
                      {...registerProfile('phoneNumber')}
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Preferred Country
                    </label>
                    <select
                      {...registerProfile('preferredCountry')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                    >
                      <option value="">Select Country</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                       <option value="Germany">Germany</option>
                      <option value=">Dubai">Dubai</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Finland">Finland</option>
                      <option value="Spain">Spain</option>
                      <option value="Malta">Malta</option>
                      <option value="Russia">Russia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Highest Qualification
                    </label>
                    <select
                      {...registerProfile('highestQualification')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
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
                      {...registerProfile('fieldOfInterest')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                    >
                      <option value="">Select Field</option>
                      <option value="Technology">Technology & IT</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Business">Business & Management</option>
                      <option value="Healthcare">Healthcare & Medicine</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-colors"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">My Applications</h2>
                  <button
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                    className="flex items-center px-4 py-2 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Application
                  </button>
                </div>

                {showApplicationForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleApplicationSubmit(onCreateApplication)}
                    className="mb-6 p-6 bg-ghost-green rounded-xl space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-heading mb-2">
                        Country
                      </label>
                      <select
                        {...registerApplication('country', { required: 'Country is required' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      >
                        <option value="">Select Country</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                       <option value="Germany">Germany</option>
                      <option value=">Dubai">Dubai</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Finland">Finland</option>
                      <option value="Spain">Spain</option>
                      <option value="Malta">Malta</option>
                      <option value="Russia">Russia</option>
                      </select>
                      {applicationErrors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {applicationErrors.country.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-heading mb-2">
                        University
                      </label>
                      <input
                        {...registerApplication('university', {
                          required: 'University is required',
                        })}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                        placeholder="e.g., University of London"
                      />
                      {applicationErrors.university && (
                        <p className="text-red-500 text-sm mt-1">
                          {applicationErrors.university.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-heading mb-2">
                        Course
                      </label>
                      <input
                        {...registerApplication('course', { required: 'Course is required' })}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                        placeholder="e.g., MSc Data Science"
                      />
                      {applicationErrors.course && (
                        <p className="text-red-500 text-sm mt-1">
                          {applicationErrors.course.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-heading mb-2">
                        Intake
                      </label>
                      <input
                        {...registerApplication('intake', { required: 'Intake is required' })}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                        placeholder="e.g., September 2025"
                      />
                      {applicationErrors.intake && (
                        <p className="text-red-500 text-sm mt-1">
                          {applicationErrors.intake.message}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-colors"
                      >
                        Submit Application
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowApplicationForm(false)}
                        className="px-6 py-3 border-2 border-turquoise text-turquoise rounded-lg font-semibold hover:bg-turquoise hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-body-text">No applications yet. Start your journey now!</p>
                    </div>
                  ) : (
                    applications.map((application) => (
                      <motion.div
                        key={application.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="border-2 border-turquoise/20 rounded-xl p-6 hover:border-turquoise/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{application.course}</h3>
                            <p className="text-body-text">{application.university}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-body-text">
                              <span className="flex items-center">
                                <Globe className="w-4 h-4 mr-1" />
                                {application.country}
                              </span>
                              <span className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {application.intake}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <div className="flex justify-between">
                            {statusSteps.map((step, index) => {
                              const currentIndex = getStatusIndex(application.status);
                              const isCompleted = index <= currentIndex;
                              const IconComponent = step.icon;

                              return (
                                <div key={step.key} className="flex flex-col items-center flex-1">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      isCompleted
                                        ? 'bg-turquoise text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                                  >
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <p
                                    className={`text-xs mt-2 text-center ${
                                      isCompleted ? 'text-turquoise font-semibold' : 'text-gray-400'
                                    }`}
                                  >
                                    {step.label}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                            <div
                              className="h-full bg-turquoise transition-all"
                              style={{
                                width: `${(getStatusIndex(application.status) / (statusSteps.length - 1)) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
