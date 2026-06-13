/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors, Crown, ShieldAlert, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'admin';
  setCurrentTab: (tab: 'home' | 'admin') => void;
  onBookClick: () => void;
  scrollToSection: (id: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  onBookClick,
  scrollToSection,
  darkMode,
  setDarkMode,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Our Team', id: 'team' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavItemClick = (id: string) => {
    setCurrentTab('home');
    setIsOpen(false);
    // Use a small delay if we were in admin tab to let DOM render home page
    if (currentTab === 'admin') {
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gold-500 border border-white/10 group-hover:scale-105 transition-transform shadow-lg shadow-gold-500/20">
              <span className="text-black font-serif font-extrabold text-sm tracking-tighter">R</span>
              <Crown className="absolute -top-1.5 -right-1 w-3 h-3 text-gold-300 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-serif tracking-widest uppercase text-white">
                ROYAL<span className="text-gold-500 font-normal">CUTS</span>
              </span>
              <p className="text-[8px] text-white/40 font-mono tracking-[0.25em] leading-none uppercase">
                Supreme Grooming
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                id="tab-home-btn"
                onClick={() => {
                  setCurrentTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 text-xs uppercase tracking-widest font-sans transition-colors cursor-pointer ${
                  currentTab === 'home' ? 'text-gold-500 font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                Home
              </button>

              {currentTab === 'home' &&
                navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavItemClick(item.id)}
                    className="px-3 py-2 text-xs uppercase tracking-widest font-sans text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            <div className="flex items-center gap-3">
              {/* Dark mode Toggle */}
              <button
                id="darkmode-toggle-btn"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full border border-white/10 hover:border-gold-500/50 text-white/60 hover:text-gold-500 transition-colors cursor-pointer bg-white/5"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
              </button>

              {/* Admin Button */}
              <button
                id="nav-admin-btn"
                onClick={() => setCurrentTab(currentTab === 'admin' ? 'home' : 'admin')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono border rounded-md transition-all cursor-pointer ${
                  currentTab === 'admin'
                    ? 'bg-red-500/10 border-red-500 text-red-400 ring-2 ring-red-500/10'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-gold-500/10 hover:border-gold-500 hover:text-gold-400'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {currentTab === 'admin' ? 'Exit Admin' : 'Admin'}
              </button>

              {/* CTA Booking Button */}
              <button
                id="nav-book-now"
                onClick={onBookClick}
                className="px-5 py-2 border border-gold-500 text-gold-500 text-xs font-sans uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all duration-300 rounded-none cursor-pointer"
              >
                Book Seat
              </button>
            </div>
          </div>

          {/* Mobile menu and controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Dark mode toggle */}
            <button
              id="mobile-darkmode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-zinc-900 text-zinc-400 hover:text-gold-500 bg-zinc-900/80"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Admin toggle */}
            <button
              id="mobile-admin-toggle"
              onClick={() => setCurrentTab(currentTab === 'admin' ? 'home' : 'admin')}
              className={`p-2 border rounded-md ${
                currentTab === 'admin'
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-zinc-900 border-gold-500/30 text-gold-500'
              }`}
              title="Admin Portal"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-300 hover:text-white cursor-pointer bg-zinc-900/60 border border-zinc-800 rounded-md"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-[#050505] border-b border-white/10">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button
              id="mobile-nav-home"
              onClick={() => {
                setCurrentTab('home');
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-xs uppercase tracking-widest font-sans ${
                currentTab === 'home' ? 'text-gold-500 bg-white/5' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              Home
            </button>

            {currentTab === 'home' &&
              navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavItemClick(item.id)}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-xs uppercase tracking-widest font-sans text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}

            <div className="pt-4 pb-2 border-t border-white/10 px-3">
              <button
                id="mobile-nav-book"
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="w-full border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black text-center text-xs uppercase font-sans tracking-widest px-4 py-3 rounded-none shadow-md block"
              >
                Book Seat
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
