/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Users,
  CalendarDays,
  Clock,
  User,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Phone,
  Mail,
  FileText,
  X,
  Printer
} from 'lucide-react';
import { SERVICES, BARBERS, TIME_SLOTS, DAYS_OF_WEEK } from '../data';
import { Appointment } from '../types';

interface BookingWizardProps {
  existingAppointments: Appointment[];
  preSelectedService?: string;
  preSelectedBarber?: string;
  onBookingSuccess: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingWizard({
  existingAppointments,
  preSelectedService = '',
  preSelectedBarber = '',
  onBookingSuccess,
  isOpen,
  onClose
}: BookingWizardProps) {
  // Wizard steps
  // 1: Service, 2: Barber, 3: Day, 4: Date, 5: Time, 6: Personal Details, 7: Confirm
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form selections and data
  const [service, setService] = useState(preSelectedService);
  const [barber, setBarber] = useState(preSelectedBarber);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState('');
  
  // Customer details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  
  // Validation messages
  const [error, setError] = useState('');

  // Handle pre-selections when populating
  useEffect(() => {
    if (preSelectedService) {
      setService(preSelectedService);
      setStep(1); // Ensure we are on service step or skip appropriately
    }
  }, [preSelectedService]);

  useEffect(() => {
    if (preSelectedBarber) {
      setBarber(preSelectedBarber);
    }
  }, [preSelectedBarber]);

  // Calendar logic: Generate next 14 days for selection
  const [availableDaysList, setAvailableDaysList] = useState<{ date: Date; dateString: string; dayName: string }[]>([]);

  useEffect(() => {
    const list = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;

      const weekdayIndex = d.getDay(); // 0 is Sunday, ..., 6 is Saturday
      // Format to Monday-Sunday name
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = dayNames[weekdayIndex];

      list.push({
        date: d,
        dateString,
        dayName
      });
    }
    setAvailableDaysList(list);
  }, []);

  // Sync selected day and selected date:
  // When date is selected, we automatically fill the day name!
  const handleDateSelect = (dateStr: string, dayName: string) => {
    setSelectedDate(dateStr);
    setSelectedDay(dayName);
    setError('');
  };

  // Check if a time slot is already booked for that date and barber combo
  const isTimeSlotBooked = (timeStr: string) => {
    return existingAppointments.some(
      (appt) =>
        appt.date === selectedDate &&
        appt.barber === barber &&
        appt.time === timeStr &&
        appt.status !== 'cancelled'
    );
  };

  // Steps configuration
  const stepsDef = [
    { num: 1, title: 'Service' },
    { num: 2, title: 'Barber' },
    { num: 3, title: 'Date' }, // Combing day and date selection simplifies and improves UI flow
    { num: 4, title: 'Time' },
    { num: 5, title: 'Details' },
    { num: 6, title: 'Confirm' }
  ];

  const nextStep = () => {
    // Validate current step
    if (step === 1 && !service) {
      setError('Please select a grooming service');
      return;
    }
    if (step === 2 && !barber) {
      setError('Please select your preferred barber');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedDay)) {
      setError('Please choose an appointment date');
      return;
    }
    if (step === 4 && !selectedTime) {
      setError('Please choose a preferred time slot');
      return;
    }
    if (step === 5) {
      if (!name.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!phone.trim() || phone.length < 8) {
        setError('Please enter a valid phone number');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  // Submit appointment
  const handleFormSubmission = () => {
    setLoading(true);
    // Mimic secure server API writing
    setTimeout(() => {
      onBookingSuccess({
        customerName: name,
        phone,
        email,
        service,
        barber,
        day: selectedDay,
        date: selectedDate,
        time: selectedTime,
        notes: notes.trim()
      });
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const resetWizardState = () => {
    setStep(1);
    setSuccess(false);
    setService('');
    setBarber('');
    setSelectedDay('');
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-[#090909] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a6f37] via-[#C5A059] to-[#8a6f37]" />
        
        {/* Close Button */}
        <button
          id="close-wizard-btn"
          onClick={() => {
            resetWizardState();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Wizard Main Content Wrapper */}
        <div className="p-6 md:p-8">
          
          {!success ? (
            <>
              {/* Brand Header */}
              <div className="mb-6 pt-3">
                <span className="text-[10px] font-mono text-[#C5A059] tracking-widest uppercase">ROYAL APPOINTMENT BOOKING</span>
                <h3 className="text-3xl font-serif text-white tracking-wide">Book Your Experience</h3>
                <p className="text-xs text-white/40 mt-1">Configure your personal grooming profile below.</p>
              </div>

              {/* Steps Progress Visualizer */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 scrollbar-none">
                {stepsDef.map((s, idx) => (
                  <React.Fragment key={s.num}>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border ${
                          step >= s.num
                            ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-md'
                            : 'bg-[#111] border-white/10 text-white/40'
                        }`}
                      >
                        {s.num}
                      </div>
                      <span
                        className={`text-[11px] uppercase tracking-wider font-sans font-medium ${
                          step === s.num ? 'text-[#C5A059] font-bold' : 'text-white/40'
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    {idx < stepsDef.length - 1 && (
                      <div
                        className={`h-[1px] w-4 md:w-8 flex-shrink-0 ${
                          step > s.num ? 'bg-[#C5A059]/40' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Error Callout */}
              {error && (
                <div id="booking-error-callout" className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                  <div className="p-1 rounded-full bg-red-700/20">
                    <span className="text-sm font-bold leading-none">!</span>
                  </div>
                  <span>{error}</span>
                </div>
              )}

              {/* Step Forms */}
              <div className="min-h-[280px]">
                {/* STEP 1: SERVICE */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs text-white/40 font-mono tracking-widest flex items-center gap-2">
                      <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
                      SELECT SERVICE TYPE (1/6)
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                      {SERVICES.map((s) => (
                        <div
                          key={s.id}
                          id={`wizard-service-card-${s.id}`}
                          onClick={() => {
                            setService(s.name);
                            setError('');
                          }}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                            service === s.name
                              ? 'bg-[#C5A059]/10 border-[#C5A059] shadow-md'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm text-white group-hover:text-gold-400">
                              {s.name}
                            </h4>
                            <span className="text-sm font-sans font-semibold text-[#C5A059]">₹{s.price}</span>
                          </div>
                          <p className="text-xs text-white/60 mt-1.5 line-clamp-2 leading-relaxed font-light">
                            {s.description}
                          </p>
                          <div className="text-[10px] text-white/40 font-mono mt-2 flex items-center gap-1">
                            <span>Duration:</span>
                            <span className="text-white/60 font-bold">{s.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: BARBER */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs text-white/40 font-mono tracking-widest flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                      CHOOSE BARBER PROFESSIONAL (2/6)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Any Barber (Walk-in) option */}
                      <div
                        id="wizard-barber-any"
                        onClick={() => {
                          setBarber('Any Barber (First Available)');
                          setError('');
                        }}
                        className={`p-4 rounded-2xl border text-left cursor-pointer flex items-center gap-4 transition-all duration-300 ${
                          barber === 'Any Barber (First Available)'
                            ? 'bg-[#C5A059]/10 border-[#C5A059]'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-dashed border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] text-base font-bold">
                          ★
                        </div>
                        <div>
                          <h4 className="font-serif text-sm text-white">
                            Any Barber (First Available)
                          </h4>
                          <p className="text-xs text-white/40">Perfect for quick schedule walks</p>
                        </div>
                      </div>

                      {BARBERS.map((b) => (
                        <div
                          key={b.id}
                          id={`wizard-barber-card-${b.id}`}
                          onClick={() => {
                            setBarber(b.name);
                            setError('');
                          }}
                          className={`p-4 rounded-2xl border text-left cursor-pointer flex items-center gap-4 transition-all duration-300 ${
                            barber === b.name
                              ? 'bg-[#C5A059]/10 border-[#C5A059]'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <img
                            src={b.image}
                            alt={b.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <h4 className="font-serif text-sm text-white">{b.name}</h4>
                            <p className="text-xs text-white/40">{b.role}</p>
                            <p className="text-[10px] text-[#C5A059] font-mono mt-0.5">{b.specialty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DATE */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs text-white/40 font-mono tracking-widest flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-[#C5A059]" />
                      CHOOSE APPOINTMENT DATE (3/6)
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-1 text-center">
                      {availableDaysList.map((dayItem) => {
                        const isSelected = selectedDate === dayItem.dateString;
                        return (
                          <div
                            key={dayItem.dateString}
                            id={`wizard-date-${dayItem.dateString}`}
                            onClick={() => handleDateSelect(dayItem.dateString, dayItem.dayName)}
                            className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-center items-center transition-all duration-300 ${
                              isSelected
                                ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-md'
                                : 'bg-white/5 border-white/10 text-white/80 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            <span className="text-[10px] tracking-wider uppercase font-mono font-bold opacity-60">
                              {dayItem.dayName.substring(0, 3)}
                            </span>
                            <span className="text-xl font-serif font-bold mt-1">
                              {dayItem.date.getDate()}
                            </span>
                            <span className="text-[10px] font-medium opacity-60 uppercase font-mono">
                              {dayItem.date.toLocaleString('en-US', { month: 'short' })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: TIME */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-white/40 font-mono tracking-widest flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        AVAILABLE SHIFTS & HOURS (4/6)
                      </label>
                      <span className="text-[10px] text-white/40 font-mono">Date: {selectedDate}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((timeStr) => {
                        const isBooked = isTimeSlotBooked(timeStr);
                        const isSelected = selectedTime === timeStr;

                        return (
                          <button
                            key={timeStr}
                            id={`wizard-time-${timeStr.replace(/[^a-zA-Z0-9]/g, '')}`}
                            onClick={() => {
                              if (!isBooked) {
                                setSelectedTime(timeStr);
                                setError('');
                              }
                            }}
                            disabled={isBooked}
                            className={`px-3 py-3 border font-mono text-xs font-semibold text-center transition-all duration-300 cursor-pointer rounded-none ${
                              isBooked
                                ? 'bg-black/40 border-white/5 text-white/20 cursor-not-allowed line-through'
                                : isSelected
                                ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-md'
                                : 'bg-white/5 border-white/10 text-white/80 hover:border-white/20'
                            }`}
                          >
                            <span>{timeStr}</span>
                            {isBooked && (
                              <p className="text-[8px] font-mono tracking-widest text-[#C5A059]/40">OCCUPIED</p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: PERSONAL DETAILS */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs text-white/40 font-mono tracking-widest flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#C5A059]" />
                      ENTER CUSTOMER CARD (5/6)
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs text-white/40 font-mono font-semibold">NAME *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type="text"
                            id="wizard-input-name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setError('');
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-11 pr-4 text-sm text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-xs text-white/40 font-mono font-semibold">PHONE NUMBER *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type="tel"
                            id="wizard-input-phone"
                            placeholder="e.g. 9876543210"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              setError('');
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-11 pr-4 text-sm text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left md:col-span-2">
                        <label className="text-xs text-white/40 font-mono font-semibold">EMAIL ADDRESS *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type="email"
                            id="wizard-input-email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError('');
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-11 pr-4 text-sm text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left md:col-span-2">
                        <label className="text-xs text-white/40 font-mono font-semibold">NOTES / INSTRUCTIONS</label>
                        <textarea
                          id="wizard-input-notes"
                          rows={2}
                          placeholder="Any physical constraints or special haircut preferences..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-none py-3 px-4 text-sm text-white focus:border-[#C5A059] focus:outline-none transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: CONFIRMATION SUMMARY */}
                {step === 6 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-xs text-white/40 font-mono tracking-widest flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C5A059]" />
                      VERIFY RESERVATION SLIP (6/6)
                    </label>

                    {/* Summary ticket design */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 divide-y divide-white/10 relative">
                      {/* Ticket side cutouts */}
                      <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-black border-r border-white/10" />
                      <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-black border-l border-white/10" />

                      <div className="pb-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] text-white/40 font-mono">GROOMING EXPERT</p>
                          <p className="text-sm font-semibold text-white mt-0.5 font-serif">{barber}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 font-mono">SELECTED WORK</p>
                          <p className="text-sm font-semibold text-[#C5A059] mt-0.5 font-serif">{service}</p>
                        </div>
                      </div>

                      <div className="py-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] text-white/40 font-mono font-semibold">APPOINTMENT DATE</p>
                          <p className="text-sm font-semibold text-white mt-0.5">
                            {selectedDate} <span className="text-xs text-white/40 font-light">({selectedDay})</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 font-mono font-semibold">SELECTED SHIFT</p>
                          <p className="text-sm font-semibold text-[#C5A059] mt-0.5">{selectedTime}</p>
                        </div>
                      </div>

                      <div className="pt-4 space-y-2">
                        <div>
                          <p className="text-[10px] text-white/40 font-mono">PATRON DETAILS</p>
                          <p className="text-xs text-white/60 mt-0.5 font-sans">
                            <span className="font-semibold text-white">{name}</span> • {phone} • {email}
                          </p>
                        </div>
                        {notes && (
                           <div>
                            <p className="text-[10px] text-white/40 font-mono">SPECS & NOTES</p>
                            <p className="text-xs text-white/40 italic mt-0.5">"{notes}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Wizard Nav Actions */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                {step > 1 ? (
                  <button
                    id="wizard-back-btn"
                    onClick={prevStep}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div /> // spacing layout holder
                )}

                {step < 6 ? (
                  <button
                    id="wizard-next-btn"
                    onClick={nextStep}
                    className="bg-[#C5A059] hover:bg-[#b08c48] text-black py-3 px-6 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all rounded-none"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="wizard-submit-btn"
                    onClick={handleFormSubmission}
                    disabled={loading}
                    className="bg-[#C5A059] hover:bg-[#b08c48] text-black py-4 px-8 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto transition-all rounded-none"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-dashed border-black rounded-full animate-spin" />
                        <span>Verifying seat...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Confirm & Schedule</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            /* STEP 7: ACCLAIMED SUCCESS SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-bold">
                  RESERVATION CONCLUDED
                </span>
                <h3 className="text-3xl font-serif text-white tracking-wide">Your Seat is Secured!</h3>
                <p className="text-sm text-white/60">
                  See you at Royal Cuts on <span className="text-[#C5A059] font-semibold">{selectedDate}</span> at{' '}
                  <span className="text-[#C5A059] font-semibold">{selectedTime}</span>.
                </p>
              </div>

              {/* Booking Pass Receipt styling */}
              <div id="booking-completed-receipt" className="max-w-md mx-auto p-5 rounded-3xl bg-white/5 border border-white/10 text-left space-y-3 font-mono text-xs text-white/80 relative shadow-inner overflow-hidden">
                <div className="absolute top-0 right-0 py-1 px-3 bg-[#C5A059] text-black font-extrabold text-[9px] uppercase">
                  ROYAL TICKET
                </div>
                
                <p className="text-[#C5A059] text-sm font-semibold border-b border-white/10 pb-2 font-serif">
                  ROYAL CUTS CO.
                </p>
                <div>
                  <span className="text-white/40 block uppercase text-[10px]">PATRON</span>
                  <span className="text-white text-sm font-bold">{name}</span>
                </div>
                <div>
                  <span className="text-white/40 block uppercase text-[10px]">SERVICE & STAFF</span>
                  <span className="text-white">{service} by <span className="text-[#C5A059] font-bold">{barber}</span></span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                  <div>
                    <span className="text-white/40 block uppercase text-[10px]">SCHEDULED</span>
                    <span className="text-white text-[11px]">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block uppercase text-[10px]">SHIFT</span>
                    <span className="text-[#C5A059]">{selectedTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  id="print-receipt-btn"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-3 border border-white/10 hover:border-[#C5A059]/50 text-white/80 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 cursor-pointer bg-white/5 transition-all rounded-none"
                >
                  <Printer className="w-4 h-4" />
                  Print Reservation Slip
                </button>
                <button
                  id="finish-booking-btn"
                  onClick={() => {
                    resetWizardState();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] hover:bg-[#b08c48] font-sans text-black text-xs uppercase tracking-wider font-bold cursor-pointer transition-all rounded-none"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
