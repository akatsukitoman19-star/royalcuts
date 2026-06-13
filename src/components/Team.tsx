/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Award, Scissors, Check, Sparkles } from 'lucide-react';
import { BARBERS } from '../data';

interface TeamProps {
  onSelectBarber: (barberName: string) => void;
}

export default function Team({ onSelectBarber }: TeamProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextBarber = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % BARBERS.length);
  };

  const prevBarber = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? BARBERS.length - 1 : prevIndex - 1));
  };

  const setBarberIndex = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    }),
  };

  const barber = BARBERS[activeIndex];

  return (
    <section id="team" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> MASTER CRAFTSMEN
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white">
            Meet Our <span className="text-[#C5A059] italic">Barbers</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-[#C5A059] mx-auto" />
          <p className="text-white/60 font-sans text-xs sm:text-sm leading-relaxed">
            Every professional at Royal Cuts has been handpicked for their exquisite skills, eye for style, and dedication to pure luxury service.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-6 md:p-8 shadow-2xl min-h-[500px] flex flex-col justify-between">
          
          {/* Main animated stage */}
          <div className="relative overflow-hidden w-full flex-grow flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={barber.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Barber Picture */}
                <div className="md:col-span-6 relative group">
                  <div className="aspect-[4/5] object-cover rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#C5A059]/40 transition-colors duration-300 shadow-md">
                    <img
                      src={barber.image}
                      alt={barber.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/90 border border-white/10 text-[#C5A059] px-3 py-1.5 rounded-full flex items-center gap-1 text-[10px] font-semibold backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059] stroke-1" />
                    <span>{barber.rating.toFixed(1)}</span>
                    <span className="text-[9px] text-white/40">({barber.ratingCount})</span>
                  </div>
                </div>

                {/* Barber Details */}
                <div className="md:col-span-6 space-y-6 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-mono font-bold">
                      {barber.role}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
                      {barber.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#C5A059]/50 pt-1">
                      <Award className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-xs font-mono font-medium text-white/60">
                        {barber.experience} Years Experience
                      </span>
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  {/* Specialty card */}
                  <div className="space-y-2">
                    <p className="text-[9px] text-white/40 font-mono tracking-wider uppercase">PRIMARY SPECIALTY</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-xs font-semibold">
                      <Scissors className="w-3.5 h-3.5" />
                      <span>{barber.specialty}</span>
                    </div>
                  </div>

                  {/* Trust criteria list */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-white/60 font-sans">
                      <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Specializes in custom-tailored client consults</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60 font-sans">
                      <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Expert in meticulous beard alignments & hot shaves</span>
                    </div>
                  </div>

                  {/* Appointment Selector */}
                  <button
                    id={`select-barber-${barber.id}`}
                    onClick={() => onSelectBarber(barber.name)}
                    className="w-full bg-[#C5A059] hover:bg-[#b18d48] text-black text-[11px] font-sans font-bold uppercase tracking-widest py-3.5 px-6 rounded-none flex items-center justify-center gap-2 cursor-pointer duration-300"
                  >
                    <span>Request {barber.name.split(' ')[0]} Now</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls (Arrows + Pagination) */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-6 md:mt-2">
            
            {/* Prev arrow */}
            <button
              id="team-prev-btn"
              onClick={prevBarber}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-colors cursor-pointer"
              aria-label="Previous barber"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {BARBERS.map((_, index) => (
                <button
                  key={index}
                  id={`team-dot-${index}`}
                  onClick={() => setBarberIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-gold-500 w-5'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label={`Go to barber ${index + 1}`}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              id="team-next-btn"
              onClick={nextBarber}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-colors cursor-pointer"
              aria-label="Next barber"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
