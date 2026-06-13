/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: number;
  specialty: string;
  image: string;
  rating: number;
  ratingCount: number;
}

export interface Service {
  id: string;
  name: string;
  price: number; // in INR (₹)
  duration: string;
  description: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  barber: string;
  day: string;
  date: string; // YYYY-MM-DD
  time: string;
  notes?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}
