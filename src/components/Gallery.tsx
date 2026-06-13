/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Haircut', 'Beard', 'Styling', 'Premium'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section id="gallery" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[125px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 text-[#C5A059] animate-spin-slow" /> STYLING SHOWCASE
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white">
            Our Styling <span className="text-[#C5A059] italic">Gallery</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-[#C5A059] mx-auto" />
          <p className="text-white/60 font-sans text-xs sm:text-sm leading-relaxed">
            Take a look at some of our actual guest outputs. Precision trims, sharp alignments, modern styles, and classic signature grooming.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat}`}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 text-xs font-sans uppercase tracking-widest transition-all duration-300 cursor-pointer border rounded-none ${
                activeFilter === cat
                  ? 'bg-gold-500 border-gold-500 text-black font-semibold'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-[#C5A059]/40 transition-all duration-300 aspect-square shadow-2xl cursor-default"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Elegant overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-gold-500 uppercase">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-serif text-white mt-1">
                    {item.title}
                  </h4>
                  <div className="w-10 h-[1.5px] bg-[#C5A059] mt-2.5" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
