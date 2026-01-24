import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { COUNTRY_NAMES } from '../constants/countries';

export const Footer = () => {
  return (
    <footer className="bg-heading text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img
                src="/logo1jpeg.jpeg"
                alt="HN Study Abroad Consultancy"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Your trusted partner for overseas education with end-to-end support for students aspiring to study abroad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/global-education" className="text-gray-300 hover:text-turquoise transition-colors text-sm">
                  Global Education
                </Link>
              </li>
              <li>
                <Link to="/student-support" className="text-gray-300 hover:text-turquoise transition-colors text-sm">
                  Student Support
                </Link>
              </li>
              <li>
                <Link to="/trending-courses" className="text-gray-300 hover:text-turquoise transition-colors text-sm">
                  Trending Courses
                </Link>
              </li>
              <li>
                <Link to="/loan-assistance" className="text-gray-300 hover:text-turquoise transition-colors text-sm">
                  Loan Assistance
                </Link>
              </li>
              <li>
                <Link to="/work-abroad" className="text-gray-300 hover:text-turquoise transition-colors text-sm">
                  Work Abroad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Study Destinations</h4>
            <ul className="space-y-2">
              {COUNTRY_NAMES.map((country) => (
                <li key={country} className="text-gray-300 text-sm">{country}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-turquoise flex-shrink-0 mt-0.5" />Palghar Branch:
                <span className="text-gray-300 text-sm">
                  Shop No 06 Sunshine Developers Near Tulshi Pusph, Palghar, Thane- 401404, Maharashtra
                </span>
                 
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-turquoise flex-shrink-0" />Palghar Branch Contact No:
                <span className="text-gray-300 text-sm">+91 9860667552</span>
              </li>
                <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-turquoise flex-shrink-0 mt-0.5" />Nallasopara Branch:
                <span className="text-gray-300 text-sm">
                 301,Poonam Palace,Near Star Hospital NSP(W)-401203,Maharashtra
                </span>
              </li>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-turquoise flex-shrink-0" />Nallasopara Branch Contact No:
                <span className="text-gray-300 text-sm">+91 7709476192</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-turquoise flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@hnstudyabroad.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} HN Study Abroad Consultancy Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
