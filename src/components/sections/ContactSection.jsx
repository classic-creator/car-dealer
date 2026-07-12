import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app: send data to API
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const businessHours = [
    { days: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
    { days: 'Saturday', hours: '10:00 AM - 6:00 PM' },
    { days: 'Sunday', hours: 'Closed' }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Details & Map Column Left */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Contact Info</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight leading-tight">
                Visit Our Showroom
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-semibold leading-relaxed mt-2">
                Connect with our automotive consultants directly or stop by our flagship branch today.
              </p>
            </div>

            {/* Structured details */}
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center shrink-0 text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-primary text-sm uppercase tracking-wider">Address</h4>
                  <p className="text-sm text-gray-500 font-semibold mt-1">123 Luxury Drive, Beverly Hills, CA 90210</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center shrink-0 text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-primary text-sm uppercase tracking-wider">Call Center</h4>
                  <p className="text-sm text-gray-500 font-semibold mt-1">+1 (800) 555-0199</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center shrink-0 text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-primary text-sm uppercase tracking-wider">Email Support</h4>
                  <p className="text-sm text-gray-500 font-semibold mt-1">contact@autoelite.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center shrink-0 text-accent">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-primary text-sm uppercase tracking-wider">Business Hours</h4>
                  <div className="space-y-1 mt-1 text-xs md:text-sm text-gray-500 font-semibold">
                    {businessHours.map((h, i) => (
                      <div key={i} className="flex justify-between w-64">
                        <span>{h.days}:</span>
                        <span className="text-primary font-bold">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Mock Placeholder */}
            <div className="h-60 rounded-3xl overflow-hidden border border-gray-150 bg-gray-100 relative shadow-inner">
              {/* Using stylized light grey map style embed */}
              <iframe 
                title="Dealership Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.5186060161476!2d-118.4026369242831!3d34.06909897315185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc05206c9b31%3A0xe543e498c4f2e0f8!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-300"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form Column Right */}
          <div className="lg:col-span-7 bg-surface-dark border border-gray-150/70 p-8 md:p-12 rounded-[32px] shadow-sm relative">
            <h3 className="text-2xl font-extrabold text-primary tracking-tight mb-2">
              Send an Inquiry
            </h3>
            <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-8">
              Fill in the form and a team consultant will contact you back in 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="name@domain.com"
                  />
                </div>

              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                <textarea
                  required
                  rows="4"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  placeholder="Tell us what vehicle or services you are looking for..."
                />
              </div>

              {/* Submit button */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl text-sm font-extrabold tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSubmitted 
                      ? 'bg-emerald-600 text-white shadow-emerald-600/10' 
                      : 'bg-primary hover:bg-accent text-white shadow-primary/20'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <Check size={18} strokeWidth={2.5} />
                      <span>Message Sent Successfully</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
