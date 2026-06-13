/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" /> OUR VALUED SERVICES
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white">
            Premium Grooming <span className="text-[#C5A059] italic">Menu</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-[#C5A059] mx-auto" />
          <p className="text-white/60 font-sans text-xs sm:text-sm leading-relaxed">
            Choose from our specialized grooming services. Every treatment includes our signature consultation, premium organic hair ingredients, and relaxing hot towel finish.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative rounded-3xl bg-white/5 border border-white/10 hover:border-[#C5A059]/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-[#C5A059]/10 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all duration-300 rounded-2xl">
                    <Scissors className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  {/* Price */}
                  <div className="text-right">
                    <span className="text-2xl font-serif text-[#C5A059]">
                      ₹{service.price}
                    </span>
                    <p className="text-[9px] text-white/40 font-mono tracking-widest uppercase">
                      INR
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-serif text-white group-hover:text-gold-400 transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span>{service.duration}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  id={`book-service-${service.id}`}
                  onClick={() => onServiceSelect(service.name)}
                  className="w-full flex items-center justify-between px-5 py-3 border border-[#C5A059]/30 text-[#C5A059] text-[11px] font-sans uppercase tracking-widest hover:bg-[#C5A059] hover:text-black hover:border-gold-500 group/btn transition-all duration-300 cursor-pointer rounded-none bg-transparent"
                >
                  <span>Select & Book Style</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover/btn:translate-x-1 group-hover/btn:text-black transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Promotion bar */}
        <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-lg font-serif text-white">First time at Royal Cuts?</h4>
            <p className="text-xs text-white/40">Get a complimentary beard line-up styling session with any Haircut or Spa packages. Valid for online bookings now.</p>
          </div>
          <button
            id="promo-book-btn"
            onClick={() => onServiceSelect('Premium Package')}
            className="whitespace-nowrap px-6 py-3.5 bg-[#C5A059] hover:bg-[#b18d48] text-black text-[11px] font-sans font-bold uppercase tracking-widest rounded-none cursor-pointer transition-all duration-300"
          >
            Claim Luxury Treatment
          </button>
        </div>

      </div>
    </section>
  );
}
