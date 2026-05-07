import { Phone } from 'lucide-react';

export const CallNowButton = () => {
  const phoneNumber = '919860667552';

  return (
    <a
      href={`tel:+${phoneNumber}`}
      className="fixed bottom-24 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-pulse hover:animate-none"
      aria-label="Call us now"
    >
      <Phone className="w-6 h-6" />
      <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Call Now
      </span>
    </a>
  );
};
