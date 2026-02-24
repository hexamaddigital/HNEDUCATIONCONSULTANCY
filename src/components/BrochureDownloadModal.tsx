import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { sendWhatsAppNotifications } from '../utils/whatsapp';

interface UniversityListModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const UNIVERSITY_LIST_LINKS: Record<string, string> = {
  Main:            '/brochures/HN_Educational_Consultancy_Main_Brouchure.pdf',
  'United States': 'https://drive.google.com/file/d/1sVV-eVLQQ6Z5K02W_lijZKOT8OUGAxge/view',
  'United Kingdom':'https://drive.google.com/file/d/1GYgnbPqJQlHX0dEXt_egUekl7dDVvAKZ/view',
  Canada:          'https://drive.google.com/file/d/12uo1nRKoSttYBLNcr9LBNctoARdJGPwY/view',
  Australia:       'https://drive.google.com/file/d/1mMPWBcOwkBKsNh4rf7ktcJft3sVDSN5C/view',
  Germany:         'https://drive.google.com/file/d/1L7qBNzqTskPdg2Odg5hE6lrPcdFI1H43/view',
  France:          'https://drive.google.com/file/d/15ztOz8rCXxbu6jALiA8-ZxsA3TX9uD3x/view',
  Netherlands:     'https://drive.google.com/file/d/1cSrxH7VtxRiztHdzJEl5_35CpjEDwVgH/view',
  Switzerland:     'https://drive.google.com/file/d/1uvO5m26usMCbr-TuuPs277xKxVo-fZwo/view',
  Sweden:          'https://drive.google.com/file/d/10pcw-fnDxsifswrQ5vaNPIw8IiXEbEk4/view',
  'New Zealand':   'https://drive.google.com/file/d/1iXog-K3WqYRkkBTMeNoaqtHL11GuEpL7/view',
  Dubai:           'https://drive.google.com/file/d/1D5YTqyPKvbU79KZPabnCduumyq3bdgsP/view',
  Ireland:         'https://drive.google.com/file/d/1eFvPqPVYDxICZ9pdMa1Y6B2MFjC6wucP/view',
  Spain:           'https://drive.google.com/file/d/1HQTrVBWfgjOg5k6uc9XbtrzBMqp3PayT/view',
  Italy:           'https://drive.google.com/file/d/14YYT2Rj4iwxTeXO1cwxITSMvu10SzztK/view',
  Finland:         'https://drive.google.com/file/d/1stVI6zXDc37ZIwRv3WyulXV-qRBX_GMH/view',
  Russia:          'https://drive.google.com/file/d/199383S743gkY1GAHbng2meZdGjNNrriv/view',
  Malta:           'https://drive.google.com/file/d/1a2K7Ljve6gW66-il2u05E8jk6CKXA4Ia/view',
};

export const BrochureDownloadModal = ({
  isOpen,
  onClose,
  country,
}: UniversityListModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const universityListLink =
    UNIVERSITY_LIST_LINKS[country] || 'https://drive.google.com';

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      // 1. Save to Supabase
      const { error } = await supabase.from('brochure_downloads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: country,
      });

      if (error) throw error;

      // 2. Send WhatsApp notifications
      sendWhatsAppNotifications({
        type: 'brochure',
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: country,
        },
      });

      // 3. Wait a moment for WhatsApp windows to open, then download brochure
      setTimeout(() => {
        const isLocalFile = universityListLink.startsWith('/');

        if (isLocalFile) {
          // Use edge function for local files to force download on Safari
          const filename = universityListLink.substring(1); // Remove leading slash
          const downloadUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/download-brochure?filename=${encodeURIComponent(filename)}`;
          window.open(downloadUrl, '_blank', 'noopener,noreferrer');
        } else {
          // For Google Drive links, open directly
          window.open(universityListLink, '_blank', 'noopener,noreferrer');
        }
      }, 500);

      // 4. Show success state briefly
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsLoading(false);
        reset();
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Submission failed:', error);
      setIsLoading(false);
      // Optionally: show error toast/message here
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsLoading(false);
    reset();
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
                  {country === 'Main' ? 'Download Our Brochure' : 'Download University List'}
                </h2>
                <button
                  onClick={handleClose}
                  aria-label="Close modal"
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
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input
                    {...register('name', { required: true })}
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                    disabled={isLoading}
                  />
                  <input
                    {...register('email', { required: true })}
                    placeholder="Email"
                    type="email"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                    disabled={isLoading}
                  />
                  <input
                    {...register('phone', { required: true })}
                    placeholder="Phone"
                    type="tel"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-turquoise text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        {country === 'Main' ? 'Download Brochure' : 'Download University List'}
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto text-green-600 w-14 h-14" />
                  <p className="mt-4 font-semibold text-lg">
                    {country === 'Main' ? 'Brochure opened!' : 'University list opened!'}
                  </p>
                  <p className="mt-2 text-sm text-body-text">
                    Tap the share/download button in the opened tab to save
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