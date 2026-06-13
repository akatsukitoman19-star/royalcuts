/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Calendar, MapPin, Sparkles, Crown } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onViewServicesClick: () => void;
}

export default function Hero({ onBookClick, onViewServicesClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] text-white pt-20"
    >
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/luxury_barbershop_1781339346335.jpg"
          alt="Royal Cuts Luxury Barbershop Interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-100 transition-transform duration-1000"
        />
        {/* Advanced elegant multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
      </div>

      {/* Floating Sparkles ambient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-gold-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-gold-500/5 blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full h-full flex flex-col justify-center py-12 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 text-gold-500 text-xs font-mono tracking-widest uppercase bg-white/5 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>SOCIALLY REVERED • EXPERTLY CRAFTED</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide leading-[1.05]"
            >
              Premium<br />
              <span className="text-[#C5A059] italic font-light">Grooming</span><br />
              Experience
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              id="hero-subheading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 font-sans max-w-xl leading-relaxed font-light"
            >
              Refined styles for the modern gentleman. Book your appointment with the best barbers in the city. Step into Bandra's supreme luxury barbershop experience.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start"
            >
              <button
                id="hero-book-btn"
                onClick={onBookClick}
                className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-black font-sans font-medium uppercase tracking-widest text-xs px-8 py-4.5 rounded-none transition-all duration-300 cursor-pointer shadow-lg shadow-gold-500/10"
              >
                Book Appointment
              </button>
              
              <button
                id="hero-services-btn"
                onClick={onViewServicesClick}
                className="w-full sm:w-auto border border-white/10 hover:border-gold-500 text-white uppercase tracking-widest text-xs font-sans bg-white/5 hover:bg-white/10 px-8 py-4.5 rounded-none backdrop-blur-sm transition-all duration-300 cursor-pointer"
              >
                View Grooming Menu
              </button>
            </motion.div>

            {/* Quick Stats Blocks paired with location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-8 pt-8 border-t border-white/10"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-white">12+</span>
                <span className="text-[10px] uppercase text-white/40 tracking-widest">Years Exp</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-[#C5A059]">98%</span>
                <span className="text-[10px] uppercase text-white/40 tracking-widest">Satisfaction</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
              <div className="hidden sm:flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold-500" />
                <div>
                  <p className="text-[9px] text-white/40 font-mono tracking-wider">MUMBAI HQ</p>
                  <p className="text-xs text-zinc-300">102 Royal Arcade, Bandra West</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Luxury Badge element (right column on desktop) */}
          <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
              className="relative w-72 h-72 rounded-full border-2 border-gold-500/20 flex items-center justify-center p-4 glass-accent"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-gold-500/10 animate-spin" style={{ animationDuration: '60s' }} />
              <div className="text-center space-y-2">
                <Crown className="w-12 h-12 text-gold-500 mx-auto animate-bounce" style={{ animationDuration: '3s' }} />
                <p className="text-gold-500 font-display font-semibold tracking-widest text-xs uppercase pt-2">
                  ROYAL BARBERING
                </p>
                <p className="text-white text-3xl font-display font-light">
                  ESTD. 2018
                </p>
                <div className="w-12 h-[1px] bg-gold-500/50 mx-auto my-3" />
                <p className="text-zinc-400 text-xs font-mono">
                  THE ART OF GROOMING
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
