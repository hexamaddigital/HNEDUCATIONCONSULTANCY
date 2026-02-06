import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  country: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

/* 🔹 Normalized Country Keys */
const COUNTRY_KEY_MAP: Record<string, string> = {
  'United States': 'USA',
  'United Kingdom': 'UK',
};

const UNIVERSITY_LIST_LINKS: Record<string, string> = {
  USA: 'https://drive.google.com/uc?export=download&id=1e6ZhIIPdf9sBA2Gi1CucT8H9VBGDclnB',
  UK: 'https://drive.google.com/uc?export=download&id=1e6ZhIIPdf9sBA2Gi1CucT8H9VBGDclnB',
  Canada: 'https://drive.google.com/uc?export=download&id=12uo1nRKoSttYBLNcr9LBNctoARdJGPwY',
  Australia: 'https://drive.google.com/uc?export=download&id=1mMPWBcOwkBKsNh4rf7ktcJft3sVDSN5C',
};

export const BrochureDownloadModal = ({ isOpen, onClose, country }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const key = COUNTRY_KEY_MAP[country] || country;
  const downloadLink =
    UNIVERSITY_LIST_LINKS[key] || 'https://drive.google.com';

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitted(true);

      await supabase.from('brochure_downloads').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        country,
      });

      window.open(downloadLink, '_blank');

      setTimeout(() => {
        reset();
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      alert('Something went wrong. Please try again.');
      setSubmitted(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-md w-full shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-turquoise to-turquoise-dark p-6 text-white flex justify-between">
              <h2 className="text-xl font-bold">University List – {country}</h2>
              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input
                    {...register('name', { required: true })}
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-lg"
                  />

                  <input
                    type="email"
                    {...register('email', {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg"
                  />

                  <input
                    type="tel"
                    {...register('phone', {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                    })}
                    placeholder="Phone Number"
                    className="w-full border p-3 rounded-lg"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-turquoise text-white rounded-lg flex justify-center gap-2"
                  >
                    <Download /> Download PDF
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto w-14 h-14 text-green-600" />
                  <p className="mt-4 font-semibold">
                    Your download is starting…
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
