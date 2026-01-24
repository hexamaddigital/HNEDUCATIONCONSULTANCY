import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

/* 🔹 Country → Google Drive brochure links */
const BROCHURE_LINKS: Record<string, string> = {
  India: 'https://drive.google.com/india-link',
  USA: 'https://drive.google.com/usa-link',
  UK: 'https://drive.google.com/uk-link',
  Canada: 'https://drive.google.com/file/d/12uo1nRKoSttYBLNcr9LBNctoARdJGPwY/view?usp=drive_link',
  Australia: 'https://drive.google.com/australia-link',
};

export const BrochureDownloadModal = ({
  isOpen,
  onClose,
  country,
}: BrochureDownloadModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<FormData>();

  const brochureLink =
    BROCHURE_LINKS[country] || 'https://drive.google.com/default-link';

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    setIsSubmitted(true);

    setTimeout(() => {
      window.open(brochureLink, '_blank');
    }, 800);

    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      onClose();
    }, 2200);
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
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Brochure
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold">Success!</h3>
                  <p>Your brochure is opening…</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
