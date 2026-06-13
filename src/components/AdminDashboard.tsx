/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Users,
  Compass,
  DollarSign,
  Briefcase,
  Sliders,
  RotateCcw,
  Clock,
  Trash2,
  ListFilter,
  CheckSquare
} from 'lucide-react';
import { Appointment } from '../types';
import { SERVICES, BARBERS, TIME_SLOTS } from '../data';

interface AdminDashboardProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'pending' | 'completed' | 'cancelled') => void;
  onDeleteBooking?: (id: string) => void;
}

export default function AdminDashboard({
  appointments,
  onUpdateStatus,
  onDeleteBooking,
}: AdminDashboardProps) {
  // Filters
  const [selectedBarberFilter, setSelectedBarberFilter] = useState('All Barbers');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Today's Date String for stat calculation
  const todayStr = new Date().toISOString().split('T')[0];

  // Calculations
  const totalAppointments = appointments.length;

  const todaysAppointments = appointments.filter((appt) => appt.date === todayStr);
  const activeTodaysAppointmentsCount = todaysAppointments.filter((appt) => appt.status !== 'cancelled').length;

  const upcomingAppointments = appointments.filter((appt) => appt.date >= todayStr && appt.status === 'pending');
  const upcomingAppointmentsCount = upcomingAppointments.length;

  // Revenue estimation
  const totalRevenue = appointments
    .filter((appt) => appt.status === 'completed')
    .reduce((sum, appt) => {
      const match = SERVICES.find((s) => s.name === appt.service);
      return sum + (match ? match.price : 0);
    }, 0);

  // Filters logic
  const filteredAppointments = appointments.filter((appt) => {
    const matchesBarber = selectedBarberFilter === 'All Barbers' || appt.barber === selectedBarberFilter;
    const matchesDate = !selectedDateFilter || appt.date === selectedDateFilter;
    const matchesStatus = selectedStatusFilter === 'All' || appt.status === selectedStatusFilter;
    return matchesBarber && matchesDate && matchesStatus;
  });

  const resetFilters = () => {
    setSelectedBarberFilter('All Barbers');
    setSelectedDateFilter('');
    setSelectedStatusFilter('All');
  };

  return (
    <section id="admin" className="py-24 bg-zinc-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-6 mb-10 gap-4">
          <div>
            <span className="text-xs font-mono text-red-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
              <Compass className="w-4 h-4 animate-spin-slow" /> INTERNAL SECURED SCHEDULER
            </span>
            <h2 className="text-3xl font-display font-bold text-white mt-1">
              Barbershop <span className="text-gold-500">HQ Console</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Real-time reservation diagnostics, barber loading, and status controllers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Quick stats for current timezone */}
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
              TIMEZONE: IST (GMT+5:30)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-gold-500">
              OPERATIONALS: ACTIVE
            </span>
          </div>
        </div>

        {/* Dashboard Stats Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Total appointments */}
          <div className="p-6 rounded-2xl glass border border-gold-500/10">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-semibold tracking-wider font-mono">TOTAL BOOKINGS</p>
              <Briefcase className="w-5 h-5 text-gold-500" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white mt-4">{totalAppointments}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Lifetime generated slots</p>
          </div>

          {/* Card 2: Today's active appointments */}
          <div className="p-6 rounded-2xl glass border border-gold-500/10">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-semibold tracking-wider font-mono">TODAY'S SEATS</p>
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white mt-4">{activeTodaysAppointmentsCount}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Active on {todayStr}</p>
          </div>

          {/* Card 3: Upcoming schedules */}
          <div className="p-6 rounded-2xl glass border border-gold-500/10">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-semibold tracking-wider font-mono">UPCOMING CHAIRS</p>
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white mt-4">{upcomingAppointmentsCount}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Pending approval & queue</p>
          </div>

          {/* Card 4: Estimated revenue */}
          <div className="p-6 rounded-2xl glass border border-gold-500/10">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-semibold tracking-wider font-mono">REVENUE ESTIMATE</p>
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white mt-4">₹{totalRevenue}</p>
            <p className="text-[10px] text-zinc-500 mt-1">From concluded actions</p>
          </div>

        </div>

        {/* Console Filters Panel */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-850 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono text-gold-400 font-semibold">
            <Sliders className="w-4 h-4" />
            <span>CONSOLE ADVANCED FILTERS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            
            {/* Filter 1: Barber Selection */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Grooming Personnel</label>
              <select
                id="filter-barber"
                value={selectedBarberFilter}
                onChange={(e) => setSelectedBarberFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 p-2.5 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
              >
                <option value="All Barbers">All Barbers</option>
                <option value="Any Barber (First Available)">First Available (Walk-in)</option>
                {BARBERS.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Calendar Date choice */}
            <div className="space-y-1 text-left font-mono">
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider">Date Selection</label>
              <input
                id="filter-date"
                type="date"
                value={selectedDateFilter}
                onChange={(e) => setSelectedDateFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 p-2.5 rounded-lg focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Filter 3: Status selection */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Booking Status</label>
              <select
                id="filter-status"
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 p-2.5 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Filter 4: Reset & Actions */}
            <div>
              <button
                id="filter-reset-btn"
                onClick={resetFilters}
                className="w-full py-2.5 px-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                title="Reset active query filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            </div>

          </div>
        </div>

        {/* Database List / Table layout */}
        <div className="rounded-2xl border border-zinc-850 overflow-hidden bg-zinc-900/40">
          <div className="p-5 border-b border-zinc-850 bg-zinc-900/60 flex items-center justify-between">
            <span className="text-sm font-mono text-white font-semibold">
              DIAGNOSTIC LOGS ({filteredAppointments.length} matching)
            </span>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-zinc-500">
              <ListFilter className="w-3.5 h-3.5" />
              <span>LOG STREAM SECURE</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredAppointments.length > 0 ? (
              <table className="w-full text-left text-sm divide-y divide-zinc-850">
                <thead className="bg-zinc-950 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-4">PATRON INFO</th>
                    <th scope="col" className="px-6 py-4">SERVICE PREFERENCE</th>
                    <th scope="col" className="px-6 py-4">BARBER SHIFT</th>
                    <th scope="col" className="px-6 py-4">DATE & DAYS</th>
                    <th scope="col" className="px-6 py-4 text-center">STATUS</th>
                    <th scope="col" className="px-6 py-4 text-right">ACTION COMMANDS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 font-sans text-xs">
                  {filteredAppointments.map((appt) => (
                    <tr key={appt.id} id={`admin-row-${appt.id}`} className="hover:bg-zinc-900/55 transition-colors">
                      {/* Name / phone / email */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{appt.customerName}</div>
                        <div className="text-zinc-400 font-mono text-[10px] mt-0.5">{appt.phone}</div>
                        <div className="text-zinc-500 text-[10px] truncate max-w-[150px]">{appt.email}</div>
                      </td>
                      {/* Service */}
                      <td className="px-6 py-4 font-medium text-gold-400">
                        {appt.service}
                        {appt.notes && (
                          <div className="text-[10px] text-zinc-400 italic max-w-xs truncate mt-0.5" title={appt.notes}>
                            "{appt.notes}"
                          </div>
                        )}
                      </td>
                      {/* Barber */}
                      <td className="px-6 py-4 font-medium text-white">{appt.barber}</td>
                      {/* Schedule info */}
                      <td className="px-6 py-4 font-mono">
                        <div className="text-white font-semibold">{appt.date}</div>
                        <div className="text-zinc-400 text-[10px] uppercase">{appt.day}</div>
                        <div className="text-emerald-400 text-[10px] mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-500" />
                          <span>{appt.time}</span>
                        </div>
                      </td>
                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                            appt.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : appt.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse'
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {appt.status === 'pending' && (
                            <>
                              <button
                                id={`admin-complete-${appt.id}`}
                                onClick={() => onUpdateStatus(appt.id, 'completed')}
                                className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all cursor-pointer"
                                title="Conclude appointment (Completed)"
                              >
                                <CheckSquare className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`admin-cancel-${appt.id}`}
                                onClick={() => onUpdateStatus(appt.id, 'cancelled')}
                                className="p-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all cursor-pointer"
                                title="Strike appointment (Cancelled)"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          {appt.status !== 'pending' && (
                            <button
                              id={`admin-revert-${appt.id}`}
                              onClick={() => onUpdateStatus(appt.id, 'pending')}
                              className="px-2 py-1 text-[10px] font-mono border border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 cursor-pointer"
                              title="Revert back to Pending status"
                            >
                              Revert
                            </button>
                          )}
                          {onDeleteBooking && (
                            <button
                              id={`admin-delete-${appt.id}`}
                              onClick={() => onDeleteBooking(appt.id)}
                              className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer"
                              title="Remove completely from database"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div id="no-appointments-placeholder" className="py-20 text-center space-y-3">
                <Clock className="w-12 h-12 text-zinc-700 mx-auto" />
                <p className="text-zinc-500 font-mono text-xs">NO SYSTEM SCHEDULES MATCHING ACTIVE FILTERS</p>
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 rounded text-xs font-mono text-gold-500 cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Barber Daily Queue schedule list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          
          <div className="p-6 rounded-2xl glass border border-gold-500/10">
            <h3 className="text-base font-mono font-bold text-white mb-4 uppercase">Barber Station Loads (Today)</h3>
            <div className="space-y-3">
              {BARBERS.map((barb) => {
                const stationsAppointments = todaysAppointments.filter(
                  (a) => a.barber === barb.name && a.status !== 'cancelled'
                ).length;
                
                return (
                  <div key={barb.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={barb.image}
                        alt={barb.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                      />
                      <div>
                        <p className="font-display font-medium text-sm text-white">{barb.name}</p>
                        <p className="text-[10px] text-zinc-500">{barb.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-gold-500 bg-gold-400/5 px-2.5 py-1 rounded-full border border-gold-500/10">
                        {stationsAppointments} Slots Active
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass border border-gold-500/10 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-mono font-bold text-white mb-4 uppercase">Consolidated Schedule Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-center">
                  <p className="text-2xl font-display font-extrabold text-white">
                    {appointments.filter((a) => a.status === 'completed').length}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">Completed</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-center">
                  <p className="text-2xl font-display font-extrabold text-amber-500">
                    {appointments.filter((a) => a.status === 'pending').length}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">Pending Waitlist</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-center">
                  <p className="text-2xl font-display font-extrabold text-red-400">
                    {appointments.filter((a) => a.status === 'cancelled').length}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">Striked / Cancelled</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-center">
                  <p className="text-2xl font-display font-extrabold text-emerald-400">
                    {((appointments.filter((a) => a.status === 'completed').length / (totalAppointments || 1)) * 100).toFixed(0)}%
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">Fulfilment Rate</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900 mt-6 text-center text-xs text-zinc-500 font-mono">
              STAFF INTERACTION SECURED AT EVERY ENTRY.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
