import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Contact = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <iframe
                  id="JotFormIFrame-260572638804058"
                  title="Contact Form"
                  onLoad={() => window.parent.scrollTo(0,0)}
                  allow="geolocation; microphone; camera; fullscreen"
                  src="https://form.jotform.com/260572638804058"
                  frameBorder="0"
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    height: '700px',
                    border: 'none',
                  }}
                  scrolling="no"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-body-text text-lg mb-8">
                  Visit either of our offices or reach out through any of the following channels. We are here to
                  help you achieve your international education goals.
                </p>
              </div>

              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span className="font-semibold">9:00 AM - 8:00 PM</span>
                  </p>
                  
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">11:00 AM - 6:00 PM</span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-ghost-green rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading mb-1">Phone Number</h3>
                    <p className="text-body-text">+91 9860667552/8087507773</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-ghost-green rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading mb-1">Email Address</h3>
                    <p className="text-body-text">info@hnstudyabroad.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Palghar Branch</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-heading">Address</p>
                      <p className="text-body-text">
                        Shop No 06 Sunshine Developers Near Tulshi Pusph, Palghar, Thane- 401404, Maharashtra
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-heading">Phone</p>
                      <p className="text-body-text">+91 9860667552</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-heading">Email</p>
                      <p className="text-body-text">info@hnstudyabroad.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 h-64">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Shop+No+06+Sunshine+Developers+Near+Tulshi+Pusph+Palghar+Thane+401404+Maharashtra"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Palghar Office Location"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Nallasopara Branch</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-heading">Address</p>
                      <p className="text-body-text">
                        301,Poonam Palace,Near Star Hospital NSP(W)-401203,Maharashtra
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-heading">Phone</p>
                      <p className="text-body-text">+91 8087507773</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-turquoise flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-heading">Email</p>
                      <p className="text-body-text">info@hnstudyabroad.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 h-64">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=301+Poonam+Palace+Near+Star+Hospital+Nallasopara+West+401203"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nallasopara Office Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
