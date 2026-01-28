import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { COUNTRY_NAMES } from '../constants/countries';

export const Footer = () => {
  return (
    <footer className="bg-heading text-white font-primary text-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo & About */}
          <div>
            <div className="mb-4 flex items-center gap-4">
              <img
                src="/hn_study.png"
                alt="HN Study Abroad Consultancy"
                className="h-16 w-auto object-contain"
              />

              <img
                src="/british_council_logo.png"
                alt="Partner Logo"
                className="h-14 w-auto object-contain opacity-90"
              />
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner for overseas education with end-to-end support
              for students aspiring to study abroad.
            </p>

            <div className="flex space-x-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-300 hover:text-turquoise transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/about-us', label: 'About Us' },
                { to: '/global-education', label: 'Global Education' },
                { to: '/student-support', label: 'Student Support' },
                { to: '/trending-courses', label: 'Trending Courses' },
                { to: '/loan-assistance', label: 'Loan Assistance' },
                { to: '/work-abroad', label: 'Work Abroad' },
                { to: '/blog', label: 'Blog' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-turquoise transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Study Destinations</h4>
            <ul className="space-y-2">
              {COUNTRY_NAMES.map((country) => (
                <li key={country} className="text-gray-300">
                  {country}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">

              <li className="flex items-start gap-2">
                <MapPin className="w-6 h-6 text-turquoise mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  <strong>Palghar Branch:</strong><br />
                  Shop No 06, Sunshine Developers, Near Tulshi Pushp,
                  Palghar, Thane – 401404
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-turquoise" />
                <span className="text-gray-300">
                  <strong>Contact:</strong> +91 9860667552
                </span>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="w-6 h-6 text-turquoise mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  <strong>Nallasopara Branch:</strong><br />
                  301, Poonam Palace, Near Star Hospital,
                  NSP (W) – 401203
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-turquoise" />
                <span className="text-gray-300">
                  <strong>Contact:</strong> +91 7709476192
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-turquoise" />
                <span className="text-gray-300">
                  info@hnstudyabroad.com
                </span>
              </li>

            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} HN Study Abroad Consultancy Pvt. Ltd.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
