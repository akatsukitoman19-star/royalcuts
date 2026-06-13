/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote, Flame } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-84 h-84 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-[#C5A059] animate-pulse" /> REPUTED REVIEWS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white">
            What Patrons Say About <span className="text-[#C5A059] italic">Us</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-[#C5A059] mx-auto" />
          <p className="text-white/60 font-sans text-xs sm:text-sm leading-relaxed">
            We are dedicated to building long term partnerships based on impeccable standards and premium style outcomes. Our scores speak of our precision.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#C5A059]/40 relative shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-6 right-8 text-[#C5A059]/10 pointer-events-none">
                <MessageSquareQuote className="w-12 h-12 text-white/5" />
              </div>

              <div className="space-y-4">
                {/* Five Star rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059] stroke-0" />
                  ))}
                </div>

                <p className="text-white/80 text-xs italic font-sans leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-sm text-white">
                    {t.name}
                  </h4>
                  <p className="text-[9px] text-[#C5A059] font-mono mt-0.5">PATRON SINCE 2024</p>
                </div>
                <span className="text-[9px] text-white/40 font-mono">
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand highlights slider */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-serif text-white">5.0 ★</p>
            <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Google Reviews</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-serif text-[#C5A059]">4.9 ★</p>
            <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">JustDial Ratings</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-serif text-white">100%</p>
            <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Secure Appointments</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-serif text-[#C5A059]">No-Wait</p>
            <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Priority Queue</p>
          </div>
        </div>

      </div>
    </section>
  );
}
