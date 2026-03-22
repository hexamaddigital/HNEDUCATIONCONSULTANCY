import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, CheckCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadCaptureFormData {
  name: string;
  phone: string;
  email: string;
  preferredCountry: string;
}

const POPULAR_COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Ireland',
  'New Zealand',
  'Dubai',
  'Switzerland',
  'Netherlands',
  'Sweden',
  'Other',
];

export const LeadCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [source, setSource] = useState<'timer' | 'exit_intent'>('timer');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadCaptureFormData>();

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('leadCaptureShown');

    if (hasSeenModal) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      setSource('timer');
      sessionStorage.setItem('leadCaptureShown', 'true');
    }, 60000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSeenModal) {
        setIsOpen(true);
        setSource('exit_intent');
        sessionStorage.setItem('leadCaptureShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const onSubmit = async (data: LeadCaptureFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('lead_captures').insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        preferred_country: data.preferredCountry,
        source: source,
      });

      if (!error) {
        setIsSuccess(true);
        reset();

        fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-to-jotform`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.preferredCountry,
            formType: 'Lead Capture - Free Counseling',
          }),
        }).catch(err => console.error('JotForm submission error:', err));

        setTimeout(() => {
          setIsSuccess(false);
          setIsOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-turquoise via-turquoise-dark to-turquoise p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

              <div className="relative z-10">
                <button
                  onClick={handleClose}
                  className="absolute top-0 right-0 text-white/90 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={28} />
                </button>

                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-12 h-12" />
                </div>

                <h2 className="text-3xl font-bold text-center mb-3">
                  Start Your Study Abroad Journey!
                </h2>
                <p className="text-center text-white/95 text-lg">
                  Get FREE expert counseling from our experienced advisors
                </p>
              </div>
            </div>

            <div className="p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                  <p className="text-body-text text-lg">
                    Our counselor will contact you within 24 hours to guide you through your study abroad journey.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise transition-all"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9+\-\s()]+$/,
                          message: 'Invalid phone number',
                        },
                      })}
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise transition-all"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise transition-all"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Preferred Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('preferredCountry', { required: 'Please select a country' })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise transition-all bg-white"
                    >
                      <option value="">Select a country</option>
                      {POPULAR_COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.preferredCountry && (
                      <p className="text-red-500 text-sm mt-1">{errors.preferredCountry.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Get Free Counseling'
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    We respect your privacy. Your information is safe with us.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
