/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scissors, Crown, MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
  onBookClick: () => void;
  scrollToSection: (id: string) => void;
}

export default function Footer({ onAdminClick, onBookClick, scrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'About Studio', id: 'about' },
    { label: 'Grooming Menu', id: 'services' },
    { label: 'Our Team', id: 'team' },
    { label: 'Style Gallery', id: 'gallery' },
    { label: 'Guest Reviews', id: 'testimonials' },
    { label: 'Map & Contact', id: 'contact' },
  ];

  return (
    <footer id="footer" className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer group w-fit"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-gold-500/40 group-hover:border-gold-500 transition-colors">
                <Scissors className="w-5 h-5 text-gold-500 group-hover:rotate-12 transition-transform" />
                <Crown className="absolute -top-2 -right-1 w-3.5 h-3.5 text-gold-500/80 animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-display font-bold tracking-wider text-white">
                  ROYAL<span className="text-gold-500 font-extrabold">CUTS</span>
                </span>
                <p className="text-[9px] text-zinc-400 font-mono tracking-widest leading-none">
                  BARBERSHOP & SALON
                </p>
              </div>
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Premium grooming made social. Step into Bandra’s supreme luxury barbershop experience. Traditional craftsmanship coupled with contemporary design.
            </p>

            <div className="flex gap-3 pt-2">
              <span className="text-xs font-mono text-zinc-500">ESTD. 2018 © MUMBAI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-zinc-400 hover:text-gold-400 transition-colors text-left font-sans cursor-pointer focus:outline-none"
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick contact */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">Our HQ Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400">102 Royal Arcade, Bandra West, Mumbai</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-zinc-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-zinc-400 text-xs">guest@royalcuts.com</span>
              </li>
            </ul>
          </div>

          {/* Priority Desk */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-bold">HQ Priority</h4>
            <p className="text-xs text-zinc-500 leading-normal">
              Book online to get priority fast lane chair service of your dedicated barber station.
            </p>
            <button
              onClick={onBookClick}
              className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-black text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors shadow-md shadow-gold-500/10 block w-full text-center"
            >
              Book Seat Now
            </button>
          </div>

        </div>

        {/* Footer Bottom copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs font-mono gap-4">
          <p>© {currentYear} Royal Cuts Barbershop Co. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onAdminClick}
              className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer text-zinc-500"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-zinc-500 hover:text-red-400" />
              <span>HQ Administration Login</span>
            </button>
            <span>•</span>
            <a href="#about" className="hover:text-white transition-colors">Privacy</a>
            <span>•</span>
            <a href="#services" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
