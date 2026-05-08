import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, CheckCircle, X, MessageCircle, ExternalLink, Loader2, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { COUNTRY_NAMES } from '../constants/countries';

interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredCountry: string;
  message: string;
}

type SubmitMethod = 'whatsapp' | 'email';

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

const WHATSAPP_NUMBER = '919860667552';

function buildWhatsAppMessage(data: ContactFormData): string {
  const now = new Date().toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  return (
    `*New Study Abroad Inquiry*\n\n` +
    `*Name:* ${data.fullName}\n` +
    `*Email:* ${data.email}\n` +
    `*Phone:* ${data.phoneNumber}\n` +
    `*Preferred Country:* ${data.preferredCountry || 'Not specified'}\n` +
    `*Message:* ${data.message}\n\n` +
    `*Submitted On:* ${now}\n` +
    `_Sent from HN Study Abroad Website_`
  );
}

function buildMailtoLink(data: ContactFormData): string {
  const now = new Date().toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const subject = encodeURIComponent('New Inquiry from Website – HN Study Abroad');
  const body = encodeURIComponent(
    `New Study Abroad Inquiry\n\n` +
    `Name: ${data.fullName}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phoneNumber}\n` +
    `Preferred Country: ${data.preferredCountry || 'Not specified'}\n` +
    `Message: ${data.message}\n\n` +
    `Submitted On: ${now}\n\n` +
    `Sent from HN Study Abroad Website`
  );

  return `mailto:info@hnstudyabroadpvtltd.com?subject=${subject}&body=${body}`;
}

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingData, setPendingData] = useState<ContactFormData | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useRef(0);
  const submitLock = useRef(false);
  const location = useLocation();
  const jobContext = location.state as { jobTitle?: string; jobLocation?: string; sourcePage?: string } | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({ mode: 'onTouched' });

  const watchedFields = watch();

  useEffect(() => {
    if (jobContext?.jobTitle) {
      setValue('message', `I am interested in applying for the ${jobContext.jobTitle} position in ${jobContext.jobLocation}.`);
    }
  }, [jobContext, setValue]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = ++toastCounter.current;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const saveToDatabase = async (data: ContactFormData) => {
    const { error } = await supabase.from('contact_submissions').insert({
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phoneNumber,
      preferred_country: data.preferredCountry,
      message: data.message,
      source_page: jobContext?.sourcePage || 'contact',
      job_title: jobContext?.jobTitle || null,
    });
    return error;
  };

  const onSubmit = async (data: ContactFormData) => {
    if (submitLock.current) return;
    setPendingData(data);
    setShowModal(true);
  };

  const handleMethodSelect = async (method: SubmitMethod) => {
    if (!pendingData || submitLock.current) return;
    submitLock.current = true;
    setIsSubmitting(true);
    setShowModal(false);

    const dbError = await saveToDatabase(pendingData);

    if (method === 'whatsapp') {
      if (!dbError) {
        const msg = buildWhatsAppMessage(pendingData);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        addToast('success', 'Inquiry saved! WhatsApp is opening...');
        reset();
      } else {
        console.error('DB error:', dbError);
        addToast('error', 'Something went wrong. Please try again.');
      }
    } else {
      if (!dbError) {
        const mailtoLink = buildMailtoLink(pendingData);
        window.location.href = mailtoLink;
        addToast('success', 'Inquiry saved! Your email client is opening...');
        reset();
      } else {
        console.error('DB error:', dbError);
        addToast('error', 'Something went wrong. Please try again.');
      }
    }

    setIsSubmitting(false);
    setPendingData(null);
    setTimeout(() => { submitLock.current = false; }, 3000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 bg-white placeholder:text-gray-400 ${
      hasError
        ? 'border-red-400 focus:ring-red-300 bg-red-50'
        : 'border-gray-200 focus:ring-turquoise focus:border-turquoise hover:border-turquoise/50'
    }`;

  const PALGHAR_MAPS_LINK = 'https://maps.google.com/?q=Shop+No+06+Sunshine+Developers+Near+Tulshi+Pushp+Palghar+Thane+401404+Maharashtra';
  const NALLASOPARA_MAPS_LINK = 'https://maps.google.com/?q=301+Poonam+Palace+Near+Star+Hospital+Nallasopara+West+401203+Maharashtra';

  return (
    <>
      {/* Toast notifications */}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl min-w-[280px] max-w-sm ${
                toast.type === 'success'
                  ? 'bg-white border-l-4 border-turquoise text-heading'
                  : 'bg-white border-l-4 border-red-500 text-heading'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-turquoise flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Submission method modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.45)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="bg-gradient-to-r from-turquoise to-turquoise-dark px-8 py-6 relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Send Your Inquiry</h3>
                    <p className="text-white/80 text-sm mt-0.5">Choose how you'd like to reach us</p>
                  </div>
                </div>
              </div>

              {/* Modal body */}
              <div className="px-8 py-8 space-y-4">
                {/* WhatsApp option */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMethodSelect('whatsapp')}
                  className="w-full flex items-center gap-5 p-5 rounded-2xl border-2 border-green-100 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-all duration-200 group text-left"
                >
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-base">Submit via WhatsApp</p>
                    <p className="text-gray-500 text-sm mt-0.5">Opens WhatsApp with your details pre-filled</p>
                    <p className="text-green-600 text-xs font-semibold mt-1">+91 98606 67552 · Instant response</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-green-500 opacity-60 group-hover:opacity-100 flex-shrink-0" />
                </motion.button>

                {/* Email option */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMethodSelect('email')}
                  className="w-full flex items-center gap-5 p-5 rounded-2xl border-2 border-blue-100 bg-blue-50 hover:border-turquoise hover:bg-ghost-green transition-all duration-200 group text-left"
                >
                  <div className="w-14 h-14 bg-turquoise rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-base">Submit via Email</p>
                    <p className="text-gray-500 text-sm mt-0.5">Opens your email client with details ready</p>
                    <p className="text-turquoise text-xs font-semibold mt-1">info@hnstudyabroadpvtltd.com</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-turquoise opacity-60 group-hover:opacity-100 flex-shrink-0" />
                </motion.button>

                <p className="text-center text-xs text-gray-400 pt-1">
                  Your details are saved securely regardless of method chosen
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-body-text">
              Get in touch with our expert counsellors for personalized guidance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + info section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-body-text mb-8">Fill in your details and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-heading mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('fullName', {
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    type="text"
                    className={inputClass(!!errors.fullName)}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  <AnimatePresence>
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-heading mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    type="email"
                    className={inputClass(!!errors.email)}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-heading mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\-\s()]{7,15}$/,
                        message: 'Please enter a valid phone number',
                      },
                    })}
                    type="tel"
                    className={inputClass(!!errors.phoneNumber)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                  <AnimatePresence>
                    {errors.phoneNumber && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.phoneNumber.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Preferred Country */}
                <div>
                  <label className="block text-sm font-semibold text-heading mb-1.5">
                    Preferred Country
                  </label>
                  <div className="relative">
                    <select
                      {...register('preferredCountry')}
                      className={`${inputClass(false)} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="">Select a country</option>
                      {COUNTRY_NAMES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-heading mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      })}
                      rows={5}
                      className={`${inputClass(!!errors.message)} resize-none`}
                      placeholder="Tell us about your study abroad plans..."
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-300 select-none">
                      {(watchedFields.message || '').length}
                    </div>
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-turquoise to-turquoise-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

              </form>
            </motion.div>

            {/* Right panel — contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-3">Get In Touch</h2>
                <p className="text-body-text text-lg">
                  Visit either of our offices or reach out through any of the following channels. We are here to
                  help you achieve your international education goals.
                </p>
              </div>

              {/* Office hours */}
              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-white/80">Monday – Saturday</span>
                    <span className="font-semibold text-white">9:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/80">Sunday</span>
                    <span className="font-semibold text-white">11:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                <motion.a
                  href="tel:+919860667552"
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-4 p-5 bg-ghost-green rounded-2xl hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Phone Number</p>
                    <p className="font-semibold text-heading">+91 98606 67552</p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@hnstudyabroadpvtltd.com"
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-4 p-5 bg-ghost-green rounded-2xl hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Email Address</p>
                    <p className="font-semibold text-heading text-sm">info@hnstudyabroadpvtltd.com</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-ghost-green">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Office Locations</h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Visit us at either of our conveniently located offices
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

            {/* Palghar Branch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-turquoise/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-turquoise" />
                  </div>
                  <h3 className="text-2xl font-bold">Palghar Branch</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-body-text text-sm">
                        Shop No 06 Sunshine Developers, Near Tulshi Pushp, Palghar, Thane – 401404, Maharashtra
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Phone</p>
                      <a href="tel:+919860667552" className="text-body-text text-sm hover:text-turquoise transition-colors font-medium">
                        +91 98606 67552
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Email</p>
                      <a href="mailto:info@hnstudyabroadpvtltd.com" className="text-body-text text-sm hover:text-turquoise transition-colors font-medium">
                        info@hnstudyabroadpvtltd.com
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={PALGHAR_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-turquoise hover:text-turquoise-dark transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Open in Google Maps
                </a>
              </div>

              <a
                href={PALGHAR_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-56 bg-gray-100 overflow-hidden group"
                title="Open Palghar branch in Google Maps"
              >
                <iframe
                  src="https://maps.google.com/maps?q=19.6967,72.7697&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Palghar Office Location"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-turquoise/10 transition-colors duration-200 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-heading text-xs font-semibold px-3 py-1.5 rounded-full shadow transition-opacity duration-200 flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3" /> Open in Maps
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Nallasopara Branch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-turquoise/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-turquoise" />
                  </div>
                  <h3 className="text-2xl font-bold">Nallasopara Branch</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-body-text text-sm">
                        301, Poonam Palace, Near Star Hospital, NSP (W) – 401203, Maharashtra
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Phone</p>
                      <a href="tel:+918087507773" className="text-body-text text-sm hover:text-turquoise transition-colors font-medium">
                        +91 8087507773
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-0.5">Email</p>
                      <a href="mailto:info@hnstudyabroadpvtltd.com" className="text-body-text text-sm hover:text-turquoise transition-colors font-medium">
                        info@hnstudyabroadpvtltd.com
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={NALLASOPARA_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-turquoise hover:text-turquoise-dark transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Open in Google Maps
                </a>
              </div>

              <a
                href={NALLASOPARA_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-56 bg-gray-100 overflow-hidden group"
                title="Open Nallasopara branch in Google Maps"
              >
                <iframe
                  src="https://maps.google.com/maps?q=19.4170,72.8087&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nallasopara Office Location"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-turquoise/10 transition-colors duration-200 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-heading text-xs font-semibold px-3 py-1.5 rounded-full shadow transition-opacity duration-200 flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3" /> Open in Maps
                  </span>
                </div>
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};
