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


/* ✅ FIXED GOOGLE DRIVE DOWNLOAD LINKS — ALL COUNTRIES */
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

export const BrochureDownloadModal = ({ isOpen, onClose, country }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const downloadUrl = UNIVERSITY_LIST_LINKS[country];

  const onSubmit = async (data: FormData) => {
    setSubmitted(true);

    await supabase.from('brochure_downloads').insert({
      ...data,
      country,
    });

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);

    setTimeout(() => {
      reset();
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="bg-turquoise text-white p-6 flex justify-between">
              <h2 className="text-xl font-bold">Download University List</h2>
              <button onClick={onClose}><X /></button>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input {...register('name', { required: true })} placeholder="Full Name" className="w-full p-3 border rounded" />
                  <input {...register('email', { required: true })} placeholder="Email" className="w-full p-3 border rounded" />
                  <input {...register('phone', { required: true })} placeholder="Phone" className="w-full p-3 border rounded" />

                  <button className="w-full py-3 bg-turquoise text-white rounded flex items-center justify-center gap-2">
                    <Download /> Download Now
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto text-green-600 w-12 h-12" />
                  <p className="mt-3 font-semibold">Your download is starting…</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
