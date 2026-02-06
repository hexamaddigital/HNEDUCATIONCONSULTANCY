import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

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

/* 🔹 Country → University List PDF (Google Drive) */
const UNIVERSITY_LIST_LINKS: Record<string, string> = {
  USA: 'https://drive.google.com/uc?export=download&id=1hgTLOxsRFWfwlJsJWKoVfdcvXEqO9Usp',
  UK: 'https://drive.google.com/uc?export=download&id=1e6ZhIIPdf9sBA2Gi1CucT8H9VBGDclnB',
  Canada: 'https://drive.google.com/uc?export=download&id=12uo1nRKoSttYBLNcr9LBNctoARdJGPwY',
  Australia: 'https://drive.google.com/uc?export=download&id=1mMPWBcOwkBKsNh4rf7ktcJft3sVDSN5C',
  Germany: 'https://drive.google.com/uc?export=download&id=1L7qBNzqTskPdg2Odg5hE6lrPcdFI1H43',
  France: 'https://drive.google.com/uc?export=download&id=15ztOz8rCXxbu6jALiA8-ZxsA3TX9uD3x',
  Netherlands: 'https://drive.google.com/uc?export=download&id=1cSrxH7VtxRiztHdzJEl5_35CpjEDwVgH',
  Switzerland: 'https://drive.google.com/uc?export=download&id=1uvO5m26usMCbr-TuuPs277xKxVo-fZwo',
  Sweden: 'https://drive.google.com/uc?export=download&id=10pcw-fnDxsifswrQ5vaNPIw8IiXEbEk4',
  'New Zealand': 'https://drive.google.com/uc?export=download&id=1iXog-K3WqYRkkBTMeNoaqtHL11GuEpL7',
  Dubai: 'https://drive.google.com/uc?export=download&id=1D5YTqyPKvbU79KZPabnCduumyq3bdgsP',
  Ireland: 'https://drive.google.com/uc?export=download&id=1eFvPqPVYDxICZ9pdMa1Y6B2MFjC6wucP',
  Spain: 'https://drive.google.com/uc?export=download&id=1HQTrVBWfgjOg5k6uc9XbtrzBMqp3PayT',
  Italy: 'https://drive.google.com/uc?export=download&id=14YYT2Rj4iwxTeXO1cwxITSMvu10SzztK',
  Finland: 'https://drive.google.com/uc?export=download&id=1stVI6zXDc37ZIwRv3WyulXV-qRBX_GMH',
  Russia: 'https://drive.google.com/uc?export=download&id=199383S743gkY1GAHbng2meZdGjNNrriv',
  Malta: 'https://drive.google.com/uc?export=download&id=1a2K7Ljve6gW66-il2u05E8jk6CKXA4Ia',
};

export const BrochureDownloadModal = ({
  isOpen,
  onClose,
  country,
}: UniversityListModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const universityListLink =
    UNIVERSITY_LIST_LINKS[country] || 'https://drive.google.com';

  const onSubmit = async (formData: FormData) => {
    setIsSubmitted(true);

    await supabase.from('brochure_downloads').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: country,
    });

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-form-notification`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'brochure',
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            country: country,
          },
        }),
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }

    setTimeout(() => {
      window.open(universityListLink, '_blank');
    }, 700);

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
          className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-turquoise to-turquoise-dark p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Download University List</h2>
                <button onClick={handleClose}>
                  <X />
                </button>
              </div>
              <p className="text-sm mt-2">
                Complete university list for {country}
              </p>
            </div>

            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input
                    {...register('name', { required: true })}
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-lg"
                  />
                  <input
                    {...register('email', { required: true })}
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg"
                  />
                  <input
                    {...register('phone', { required: true })}
                    placeholder="Phone"
                    className="w-full border p-3 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-turquoise text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download /> Download University List
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto text-green-600 w-14 h-14" />
                  <p className="mt-4 font-semibold">
                    University list is opening…
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
