import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, Download, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UniversityListModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
}

interface BrochureFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

/*
IMPORTANT:
For Google Drive links, use this format for auto download:

https://drive.google.com/uc?export=download&id=FILE_ID

NOT:
https://drive.google.com/file/d/FILE_ID/view
*/

const UNIVERSITY_LIST_LINKS: Record<string, string> = {
  Main: '/brochures/HN_Brouchure.pdf',

  'United States':
    'https://drive.google.com/uc?export=download&id=1sVV-eVLQQ6Z5K02W_lijZKOT8OUGAxge',

  'United Kingdom':
    'https://drive.google.com/uc?export=download&id=1GYgnbPqJQlHX0dEXt_egUekl7dDVvAKZ',

  Canada:
    'https://drive.google.com/uc?export=download&id=12uo1nRKoSttYBLNcr9LBNctoARdJGPwY',

  Australia:
    'https://drive.google.com/uc?export=download&id=1mMPWBcOwkBKsNh4rf7ktcJft3sVDSN5C',

  Germany:
    'https://drive.google.com/uc?export=download&id=1L7qBNzqTskPdg2Odg5hE6lrPcdFI1H43',

  France:
    'https://drive.google.com/uc?export=download&id=15ztOz8rCXxbu6jALiA8-ZxsA3TX9uD3x',

  Netherlands:
    'https://drive.google.com/uc?export=download&id=1cSrxH7VtxRiztHdzJEl5_35CpjEDwVgH',

  Switzerland:
    'https://drive.google.com/uc?export=download&id=1uvO5m26usMCbr-TuuPs277xKxVo-fZwo',

  Sweden:
    'https://drive.google.com/uc?export=download&id=10pcw-fnDxsifswrQ5vaNPIw8IiXEbEk4',

  'New Zealand':
    'https://drive.google.com/uc?export=download&id=1iXog-K3WqYRkkBTMeNoaqtHL11GuEpL7',

  Dubai:
    'https://drive.google.com/uc?export=download&id=1D5YTqyPKvbU79KZPabnCduumyq3bdgsP',

  Ireland:
    'https://drive.google.com/uc?export=download&id=1eFvPqPVYDxICZ9pdMa1Y6B2MFjC6wucP',

  Spain:
    'https://drive.google.com/uc?export=download&id=1HQTrVBWfgjOg5k6uc9XbtrzBMqp3PayT',

  Italy:
    'https://drive.google.com/uc?export=download&id=14YYT2Rj4iwxTeXO1cwxITSMvu10SzztK',

  Finland:
    'https://drive.google.com/uc?export=download&id=1stVI6zXDc37ZIwRv3WyulXV-qRBX_GMH',

  Russia:
    'https://drive.google.com/uc?export=download&id=199383S743gkY1GAHbng2meZdGjNNrriv',

  Malta:
    'https://drive.google.com/uc?export=download&id=1a2K7Ljve6gW66-il2u05E8jk6CKXA4Ia',
};

export const BrochureDownloadModal = ({
  isOpen,
  onClose,
  country,
}: UniversityListModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrochureFormData>();

  const onSubmit = async (data: BrochureFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('brochure_downloads').insert({
        name: data.fullName,
        email: data.email,
        phone: data.phoneNumber,
        country: country,
      });

      if (!error) {
        try {
          const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-to-jotform`;

          console.log('🚀 Sending to JotForm:', {
            name: data.fullName,
            email: data.email,
            phone: data.phoneNumber,
            country: country,
          });

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.fullName,
              email: data.email,
              phone: data.phoneNumber,
              country: country,
              formType: 'Brochure Download',
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            console.error('❌ JotForm submission failed:', result);
            console.error('Response status:', response.status);
          } else {
            console.log('✅ JotForm submission successful:', result);
          }
        } catch (jotformError) {
          console.error('❌ JotForm submission error:', jotformError);
        }

        setIsSuccess(true);
        reset();

        const downloadLink = UNIVERSITY_LIST_LINKS[country];

        if (downloadLink) {
          setTimeout(() => {
            if (downloadLink.startsWith('http')) {
              const anchor = document.createElement('a');
              anchor.href = downloadLink;
              anchor.target = '_blank';
              anchor.rel = 'noopener noreferrer';
              document.body.appendChild(anchor);
              anchor.click();
              document.body.removeChild(anchor);
            } else {
              fetch(downloadLink)
                .then(response => response.blob())
                .then(blob => {
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${country}_Brochure.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                })
                .catch(err => console.error('Download error:', err));
            }
          }, 500);
        }

        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2500);
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
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-turquoise to-turquoise-dark p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {country === 'Main'
                    ? 'Download Our Brochure'
                    : 'Download University List'}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-white hover:opacity-80"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-sm mt-2">
                {country === 'Main'
                  ? 'Get detailed information about our language coaching and study abroad services'
                  : `Complete university list for ${country}`}
              </p>
            </div>

            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Download Started!</h3>
                  <p className="text-body-text">
                    Your download should begin shortly. Check your downloads folder.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('fullName', { required: 'Full name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9+\-\s()]+$/,
                          message: 'Invalid phone number',
                        },
                      })}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Download Now
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};