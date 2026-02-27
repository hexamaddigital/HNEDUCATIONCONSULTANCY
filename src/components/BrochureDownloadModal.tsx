import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface UniversityListModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
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
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isOpen]);

  const handleClose = () => {
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
              <div className="bg-white rounded-xl">
                <iframe
                  id="JotFormIFrame-260572269858067"
                  title="Brochure Download Form"
                  onLoad={() => window.parent.scrollTo(0,0)}
                  allow="geolocation; microphone; camera; fullscreen"
                  src="https://form.jotform.com/260572269858067"
                  frameBorder="0"
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    height: '500px',
                    border: 'none',
                  }}
                  scrolling="no"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};