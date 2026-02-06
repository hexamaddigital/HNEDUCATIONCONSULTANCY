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

/* 🔹 Country → University List PDF (Google Drive) - Preview links (reliable, no virus warning) */
const UNIVERSITY_LIST_LINKS: Record<string, string> = {
  USA:        'https://drive.google.com/drive/folders/1ggMKAFeBTKyb-29HelCoKvdc4JDu9bAk',
  UK:         'https://drive.google.com/file/d/1yxdllveL51VZZvd67z_fgG_uK19fTKb8/view?usp=drive_link',
  Canada:     'https://drive.google.com/file/d/12uo1nRKoSttYBLNcr9LBNctoARdJGPwY/view?usp=drive_link',
  Australia:  'https://drive.google.com/file/d/1mMPWBcOwkBKsNh4rf7ktcJft3sVDSN5C/view?usp=drive_link',
  Germany:    'https://drive.google.com/file/d/1L7qBNzqTskPdg2Odg5hE6lrPcdFI1H43/view?usp=drive_link',
  France:     'https://drive.google.com/file/d/15ztOz8rCXxbu6jALiA8-ZxsA3TX9uD3x/view?usp=drive_link',
  Netherlands:'https://drive.google.com/file/d/1cSrxH7VtxRiztHdzJEl5_35CpjEDwVgH/view?usp=drive_link',
  Switzerland:'https://drive.google.com/file/d/1uvO5m26usMCbr-TuuPs277xKxVo-fZwo/view?usp=drive_link',
  Sweden:     'https://drive.google.com/file/d/10pcw-fnDxsifswrQ5vaNPIw8IiXEbEk4/view?usp=drive_link',
  'New Zealand': 'https://drive.google.com/file/d/1iXog-K3WqYRkkBTMeNoaqtHL11GuEpL7/view?usp=drive_link',
  Dubai:      'https://drive.google.com/file/d/1D5YTqyPKvbU79KZPabnCduumyq3bdgsP/view?usp=drive_link',
  Ireland:    'https://drive.google.com/file/d/1eFvPqPVYDxICZ9pdMa1Y6B2MFjC6wucP/view?usp=drive_link',
  Spain:      'https://drive.google.com/file/d/1HQTrVBWfgjOg5k6uc9XbtrzBMqp3PayT/view?usp=drive_link',
  Italy:      'https://drive.google.com/file/d/14YYT2Rj4iwxTeXO1cwxITSMvu10SzztK/view?usp=drive_link',
  Finland:    'https://drive.google.com/file/d/1stVI6zXDc37ZIwRv3WyulXV-qRBX_GMH/view?usp=drive_link',
  Russia:     'https://drive.google.com/file/d/199383S743gkY1GAHbng2meZdGjNNrriv/view?usp=drive_link',
  Malta:      'https://drive.google.com/file/d/1a2K7Ljve6gW66-il2u05E8jk6CKXA4Ia/view?usp=drive_link',
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