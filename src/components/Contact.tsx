/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  ExternalLink,
  Map
} from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/royalcuts', label: 'Instagram' },
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/royalcuts', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/royalcuts', label: 'Twitter' },
  ];

  const openingHours = [
    { days: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
    { days: 'Saturday', hours: '9:00 AM - 9:00 PM' },
    { days: 'Sunday', hours: '10:00 AM - 6:00 PM' },
  ];

  return (
    <section id="contact" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-gold-500 uppercase flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-gold-500" /> APPOINTMENTS & ENQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white">
            Find Our <span className="text-gold-500 font-bold">Studio</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold-500 mx-auto" />
          <p className="text-zinc-400 font-sans text-sm leading-relaxed">
            Drop by for a premium pour and custom trim session. Walk-ins are accepted dependent on station availability, appointments are highly recommended.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Opening hours & details */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact details card */}
            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-850 space-y-6">
              <h3 className="text-xl font-display font-bold text-white">Contact Info</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 text-gold-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-500 tracking-wider">ADDRESS</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      102 Royal Arcade, Bandra West, Mumbai, MH - 400050
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 text-gold-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-500 tracking-wider">RESERVATION DESK</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">+91 98765 43210</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Toll-free priority styling line</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 text-gold-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-500 tracking-wider">EMAIL SERVICE</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">guest@royalcuts.com</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct booking link */}
              <div className="pt-4 border-t border-zinc-850">
                <a
                  id="whatsapp-booking-link"
                  href="https://wa.me/919876543210?text=Hi!%20I'd%20like%20to%20book%20a%20luxury%20appointment%20at%20Royal%20Cuts%20Barbershop."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all duration-200 cursor-pointer"
                >
                  {/* WhatsApp vector representation inside a standard span */}
                  <span className="font-bold">📱 Book via WhatsApp Desk</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Opening hours card */}
            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-850 space-y-6">
              <h3 className="text-xl font-display font-bold text-white">Opening Hours</h3>
              <div className="space-y-3">
                {openingHours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-zinc-300 font-semibold">{item.days}</span>
                    <span className="font-mono text-xs text-gold-500 font-bold bg-gold-400/5 px-2.5 py-1 rounded border border-gold-500/10">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Mock & Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Vector Map details */}
            <div className="rounded-2xl border border-zinc-850 overflow-hidden bg-zinc-900 aspect-[16/9] relative shadow-lg">
              
              {/* Luxury Map Mock Graphic */}
              <div className="absolute inset-0 bg-zinc-950 flex flex-col justify-between p-6 opacity-90 scale-101 border border-gold-500/15">
                {/* Simulated Grid streets */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                
                {/* Simulated Park */}
                <div className="absolute top-1/4 left-1/3 w-32 h-20 bg-emerald-900/10 rounded-lg border border-emerald-500/10 backdrop-blur-xs flex items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest text-emerald-500">BANDRA PARK</span>
                </div>

                {/* Simulated Sea Link */}
                <div className="absolute bottom-1/4 left-1/10 w-24 h-4 bg-cyan-900/20 rounded border border-cyan-500/10 rotate-12 flex items-center justify-center">
                  <span className="text-[8px] font-mono text-cyan-400">SEA LINK</span>
                </div>

                {/* Pin Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-15">
                  <div className="relative inline-block animate-bounce">
                    <div className="p-3 bg-gradient-to-tr from-gold-600 to-gold-400 text-black rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                      <MapPin className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border border-black animate-pulse" />
                  </div>
                  <div className="text-xs font-mono font-bold text-white bg-zinc-950/90 border border-gold-500 py-1.5 px-3 rounded-lg mt-2 shadow-lg backdrop-blur-sm tracking-wide">
                    ROYAL CUTS HQ
                    <span className="block text-[8px] text-zinc-400 font-light">Suite 102, Bandra West</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-auto bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl backdrop-blur-sm w-full font-mono text-[10px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Map className="w-4 h-4 text-gold-500" />
                    <span>COORDINATES: 19.0596° N, 72.8295° E</span>
                  </div>
                  <a
                    id="trigger-google-maps"
                    href="https://maps.google.com/?q=Bandra+West+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gold-500 hover:text-white"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="p-8 rounded-2xl bg-zinc-900/85 border border-zinc-850 space-y-6 text-left">
              <h3 className="text-xl font-display font-medium text-white">Quick Inquiry Desk</h3>
              
              {submitted ? (
                <div id="contact-success-callout" className="p-6 rounded-xl border border-gold-500/20 bg-gold-500/5 text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-gold-500 mx-auto" />
                  <h4 className="font-display font-bold text-white text-base">Inquiry Dispatched</h4>
                  <p className="text-xs text-zinc-400">Thank you for writing. Our concierge desk will contact you within 2 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-gold-500 hover:underline pt-2 cursor-pointer font-mono font-bold"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form id="contact-inquiry-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest font-bold block uppercase">Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Patron Name"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500/20"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest font-bold block uppercase">Email Mailbox *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        placeholder="john@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 font-mono tracking-widest font-bold block uppercase">Your Message *</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      placeholder="Specify private event bookings, wedding groom styling services, or general salon inquiries..."
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500/20 resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-zinc-950 hover:bg-gold-500 border border-gold-500/30 text-gold-500 hover:text-black py-3.5 px-6 rounded-xl font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer duration-200"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-dashed border-gold-500 rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>DISPATCH MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
