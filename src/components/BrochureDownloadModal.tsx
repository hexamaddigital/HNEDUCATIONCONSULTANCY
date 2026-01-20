import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
  brochureUrl: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export const BrochureDownloadModal = ({ isOpen, onClose, country, brochureUrl }: BrochureDownloadModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log('Form data:', data);
    setIsSubmitted(true);

    setTimeout(async () => {
      try {
        const response = await fetch(brochureUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${country.replace(/\s+/g, '-')}-Study-Abroad-Brochure.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading brochure:', error);
      }
    }, 1000);

    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      onClose();
    }, 2500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-turquoise to-turquoise-dark p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Download Brochure</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-turquoise-light">
                Get detailed information about studying in {country}
              </p>
            </div>

            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-heading mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-heading mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-heading mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9+\-\s()]{10,}$/,
                          message: 'Invalid phone number'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all"
                      placeholder="+91 1234567890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Brochure</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-heading mb-2">Success!</h3>
                  <p className="text-body-text">
                    Your brochure is downloading now...
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
