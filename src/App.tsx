/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import BookingWizard from './components/BookingWizard';
import AdminDashboard from './components/AdminDashboard';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Appointment } from './types';

export default function App() {
  // Navigation: 'home' show all home sections, 'admin' show dashboard
  const [currentTab, setCurrentTab] = useState<'home' | 'admin'>('home');
  const [darkMode, setDarkMode] = useState(true);

  // Booking wizard modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState('');
  const [preSelectedBarber, setPreSelectedBarber] = useState('');

  // Initial seed appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Toggle Dark Mode HTML Class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Load appointments from localStorage or seed initial data
  useEffect(() => {
    const cached = localStorage.getItem('royalcuts_appointments');
    if (cached) {
      try {
        setAppointments(JSON.parse(cached));
      } catch (err) {
        console.error('Failed to parse cached appointments:', err);
      }
    } else {
      // Seed default appointments
      // Base date 2026-06-13
      const seedData: Appointment[] = [
        {
          id: 'seed-1',
          customerName: 'Kabir Singhania',
          phone: '9820011223',
          email: 'kabir@singhania.com',
          service: 'Haircut + Beard',
          barber: 'Alex Johnson',
          day: 'Saturday',
          date: '2026-06-13', // Today
          time: '11:00 AM',
          notes: 'Wants a high skin fade with long textured top.',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'seed-2',
          customerName: 'Aditya Kapoor',
          phone: '9819954321',
          email: 'aditya@kapoor.com',
          service: 'Hair Spa',
          barber: 'James Wilson',
          day: 'Saturday',
          date: '2026-06-13', // Today
          time: '01:00 PM',
          notes: 'Nervous scalp treatment, please provide warm mint tea.',
          status: 'completed',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'seed-3',
          customerName: 'Devansh Shah',
          phone: '9167332211',
          email: 'dev@shahco.org',
          service: 'Hair Styling',
          barber: 'Michael Brown',
          day: 'Sunday',
          date: '2026-06-14', // Tomorrow
          time: '03:00 PM',
          notes: 'Wedding shoot tomorrow evening.',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'seed-4',
          customerName: 'Rohit Sharma',
          phone: '9930055667',
          email: 'rohit@cricket.in',
          service: 'Beard Trim',
          barber: 'David Smith',
          day: 'Friday',
          date: '2026-06-12', // Yesterday
          time: '04:00 PM',
          notes: 'Reshape lines and apply premium gold beard elixir.',
          status: 'completed',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'seed-5',
          customerName: 'Aryan Khan',
          phone: '9820304050',
          email: 'aryan@redchillies.com',
          service: 'Premium Package',
          barber: 'Alex Johnson',
          day: 'Monday',
          date: '2026-06-15', // In 2 days
          time: '02:00 PM',
          notes: 'Complimentary drinks, keep it top-tier.',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ];
      setAppointments(seedData);
      localStorage.setItem('royalcuts_appointments', JSON.stringify(seedData));
    }
  }, []);

  // Sync state with localStorage whenever appointments change
  const saveAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    localStorage.setItem('royalcuts_appointments', JSON.stringify(updated));
  };

  // Status updates (complete/cancel) called by admin console
  const handleUpdateAppointmentStatus = (id: string, status: 'pending' | 'completed' | 'cancelled') => {
    const updated = appointments.map((appt) => {
      if (appt.id === id) {
        return { ...appt, status };
      }
      return appt;
    });
    saveAppointments(updated);
  };

  // Complete removal from admin dashboard list
  const handleDeleteAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this reservation from database log stream?')) {
      const updated = appointments.filter((appt) => appt.id !== id);
      saveAppointments(updated);
    }
  };

  // Process booking wizard reservation concluding
  const handleBookingSuccess = (newApptRaw: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newAppointment: Appointment = {
      ...newApptRaw,
      id: `rc-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    saveAppointments([newAppointment, ...appointments]);
  };

  // Scrolling logic to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar sticky height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Launch booking wizard with defaults
  const openBookingWithService = (serviceName: string) => {
    setPreSelectedService(serviceName);
    setPreSelectedBarber('');
    setIsBookingOpen(true);
  };

  const openBookingWithBarber = (barberName: string) => {
    setPreSelectedBarber(barberName);
    setPreSelectedService('');
    setIsBookingOpen(true);
  };

  const openGeneralBooking = () => {
    setPreSelectedService('');
    setPreSelectedBarber('');
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-zinc-900'} transition-colors duration-300`}>
      {/* Navbar always sticky */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onBookClick={openGeneralBooking}
        scrollToSection={scrollToSection}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {currentTab === 'home' ? (
        <div className="space-y-0">
          <Hero
            onBookClick={openGeneralBooking}
            onViewServicesClick={() => scrollToSection('services')}
          />
          <About />
          <Services onServiceSelect={openBookingWithService} />
          <Team onSelectBarber={openBookingWithBarber} />
          <Gallery />
          <Testimonials />
          <Contact />
        </div>
      ) : (
        <div className="pt-20">
          <AdminDashboard
            appointments={appointments}
            onUpdateStatus={handleUpdateAppointmentStatus}
            onDeleteBooking={handleDeleteAppointment}
          />
        </div>
      )}

      {/* Footer is global */}
      <Footer
        onAdminClick={() => {
          setCurrentTab(currentTab === 'admin' ? 'home' : 'admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBookClick={openGeneralBooking}
        scrollToSection={scrollToSection}
      />

      {/* Booking Wizard Popup */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        existingAppointments={appointments}
        preSelectedService={preSelectedService}
        preSelectedBarber={preSelectedBarber}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
