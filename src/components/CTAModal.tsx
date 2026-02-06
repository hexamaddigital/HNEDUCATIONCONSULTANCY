import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CTAModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBrochureClick = async () => {
    try {
      const response = await fetch('/brochures/sample-brochure.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'hn_educational_consultancy_main_brouchure copy.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsOpen(false);
    } catch (error) {
      console.error('Error downloading brochure:', error);
      setIsOpen(false);
    }
  };

  const handleCounsellingClick = () => {
    setIsOpen(false);
    navigate('/contact');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          <div className="bg-gradient-to-r from-turquoise to-turquoise-dark p-6 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Start Your Journey!</h2>
            <p className="text-white/90">Choose how we can help you today</p>
          </div>

          <div className="p-6 space-y-4">
            <button
              onClick={handleBrochureClick}
              className="w-full bg-white border-2 border-turquoise text-turquoise rounded-xl p-6 hover:bg-turquoise hover:text-white transition-all hover:scale-105 group"
            >
              <div className="flex items-center justify-center space-x-3">
                <Download className="w-6 h-6" />
                <div className="text-left">
                  <h3 className="font-bold text-lg">Download Brochure</h3>
                  <p className="text-sm opacity-75 group-hover:opacity-100">
                    Get detailed information about our services
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={handleCounsellingClick}
              className="w-full bg-turquoise text-white rounded-xl p-6 hover:bg-turquoise-dark transition-all hover:scale-105 group"
            >
              <div className="flex items-center justify-center space-x-3">
                <UserCheck className="w-6 h-6" />
                <div className="text-left">
                  <h3 className="font-bold text-lg">Free Counselling</h3>
                  <p className="text-sm opacity-90 group-hover:opacity-100">
                    Talk to our expert counsellors for free
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="px-6 pb-6">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-gray-500 hover:text-gray-700 text-sm py-2"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
