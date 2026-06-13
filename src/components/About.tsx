/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Users, Smile, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    {
      id: 'stat1',
      icon: <Award className="w-8 h-8 text-gold-500" />,
      value: '8+',
      label: 'Years Experience',
      desc: 'Crafting luxury styles since 2018',
    },
    {
      id: 'stat2',
      icon: <Users className="w-8 h-8 text-gold-500" />,
      value: '15,000+',
      label: 'Happy Clients',
      desc: 'Loyal patrons who trust our vision',
    },
    {
      id: 'stat3',
      icon: <Smile className="w-8 h-8 text-gold-500" />,
      value: '99.8%',
      label: 'Satisfaction Rate',
      desc: 'Rated 4.9+ stars across major platforms',
    },
    {
      id: 'stat4',
      icon: <ShieldCheck className="w-8 h-8 text-gold-500" />,
      value: '100%',
      label: 'Hygienic Tools',
      desc: 'Oven-sterilized gear for maximum care',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Images Grid */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <div className="overflow-hidden rounded-3xl border border-white/10 group shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80"
                    alt="Barber sculpting beard"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="col-span-4 self-end">
                <div className="overflow-hidden rounded-2xl border border-white/10 group shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&auto=format&fit=crop&q=80"
                    alt="Hot towel treatment"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="col-span-4">
                <div className="overflow-hidden rounded-2xl border border-white/10 group shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?w=400&auto=format&fit=crop&q=80"
                    alt="Grooming products"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="col-span-8">
                <div className="overflow-hidden rounded-3xl border border-white/10 group shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80"
                    alt="Premium scissor trim"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Experience badge overlay */}
            <div className="absolute -top-6 -right-6 md:right-4 bg-black border border-white/10 p-6 rounded-3xl shadow-2xl z-20 text-center flex flex-col justify-center items-center backdrop-blur-md">
              <span className="text-4xl font-serif font-extrabold text-[#C5A059]">8+</span>
              <span className="text-[10px] uppercase text-white/40 font-mono tracking-widest pt-1">Years of Craft</span>
            </div>
          </div>

          {/* Right Side: Text & Stats info */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase flex items-center gap-2">
                <Compass className="w-4 h-4" /> WE ARE THE ORIGINAL
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-wide">
                Redefining the Art of <br />
                <span className="text-[#C5A059] italic font-light">Traditional Grooming</span>
              </h2>
              <div className="w-20 h-[1.5px] bg-[#C5A059]" />
            </div>

            <p className="text-white/60 font-sans leading-relaxed text-sm">
              At Royal Cuts Barbershop, we believe a haircut is more than just service—it’s a ritual. Founded in 2018, we have established our studio as Mumbai's supreme destination for high-end styling, premium beard sculpting, and luxury hot-towel treatments.
            </p>

            <p className="text-white/40 font-sans leading-relaxed text-xs">
              Our barbers are trained masters, blending time-honored traditional techniques with the sharpest urban trends. Every chair hosts a dedicated consultation to ensure your style is customized to your face shape, personality, and lifestyle.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded bg-[#C5A059]/10 text-[#C5A059] mt-1">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Classic Heritage</h4>
                  <p className="text-xs text-white/40">Authentic razor and blade skills</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded bg-[#C5A059]/10 text-[#C5A059] mt-1">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Guest First</h4>
                  <p className="text-xs text-white/40">Personalized drinks & warm towels</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 mt-16 border-t border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-gold-500/40 transition-colors duration-300 group"
            >
              <div className="mb-4 duration-300 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <p className="text-3xl font-serif font-extrabold text-white">{stat.value}</p>
              <p className="text-xs uppercase font-mono tracking-wider text-[#C5A059] mt-1">{stat.label}</p>
              <p className="text-[11px] text-white/40 mt-1 leading-snug">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
