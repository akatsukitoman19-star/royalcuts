/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Barber, Service, Testimonial, GalleryItem } from './types';

export const BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Alex Johnson',
    role: 'Senior Barber',
    experience: 8,
    specialty: 'Haircuts & Fades Specialist',
    image: '/src/assets/images/barber_alex_1781339366981.jpg',
    rating: 4.9,
    ratingCount: 148,
  },
  {
    id: 'b2',
    name: 'David Smith',
    role: 'Beard Expert',
    experience: 6,
    specialty: 'Beard Styling Specialist',
    image: '/src/assets/images/barber_david_1781339381917.jpg',
    rating: 4.8,
    ratingCount: 112,
  },
  {
    id: 'b3',
    name: 'Michael Brown',
    role: 'Hair Stylist',
    experience: 10,
    specialty: 'Modern Hairstyles Specialist',
    image: '/src/assets/images/barber_michael_1781339396209.jpg',
    rating: 5.0,
    ratingCount: 204,
  },
  {
    id: 'b4',
    name: 'James Wilson',
    role: 'Premium Grooming Expert',
    experience: 7,
    specialty: 'Luxury Grooming Specialist',
    image: '/src/assets/images/barber_james_1781339410394.jpg',
    rating: 4.9,
    ratingCount: 96,
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Haircut',
    price: 299,
    duration: '30 mins',
    description: 'Precision cut customized for your head shape. Includes wash, style, and signature hot towel finish.',
  },
  {
    id: 's2',
    name: 'Beard Trim',
    price: 199,
    duration: '20 mins',
    description: 'Detailed beard reshaping, line-up with razor edge detailing, condition, and soothing premium oils.',
  },
  {
    id: 's3',
    name: 'Haircut + Beard',
    price: 449,
    duration: '50 mins',
    description: 'Our ultimate duo. Premium structural haircut paired with complete beard grooming and steam towel hydration.',
  },
  {
    id: 's4',
    name: 'Hair Styling',
    price: 399,
    duration: '30 mins',
    description: 'Wash, expert blow-dry, styling with premium hair clays or pomades for special events or regular maintenance.',
  },
  {
    id: 's5',
    name: 'Hair Spa',
    price: 699,
    duration: '45 mins',
    description: 'Nourishing scalp treatment, deep cleansing, intense mask application, relaxing scalp massage, and steam therapy.',
  },
  {
    id: 's6',
    name: 'Premium Package',
    price: 999,
    duration: '90 mins',
    description: 'The Royal Treatment. Haircut, complete beard detailing, premium hair spa, luxury face massage, and a signature cold beverage.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rohan Sharma',
    rating: 5,
    comment: 'Best haircut I have ever had! Michael is a true artist. The luxury atmosphere, warm lighting, and detailed attention to detail make this the only place I will ever go.',
    date: 'June 10, 2026',
  },
  {
    id: 't2',
    name: 'Vikram Patel',
    rating: 5,
    comment: 'The Premium Package is absolutely worth every rupee. James provided top-notch service. The face massage and steam towel treatment are incredibly relaxing.',
    date: 'May 28, 2026',
  },
  {
    id: 't3',
    name: 'Arjun Mehta',
    rating: 5,
    comment: 'David is a wizard with beards. I went in for a cleanup and got a masterclass in beard care. Super sharp lines and high-quality grooming oil.',
    date: 'April 14, 2026',
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Textured Crop Fade',
    category: 'Haircut',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'g2',
    title: 'Executive Pompadour',
    category: 'Styling',
    image: 'https://images.pexels.com/photos/26832816/pexels-photo-26832816.jpeg',
  },
  {
    id: 'g3',
    title: 'Beard Sculpt & Shave',
    category: 'Beard',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'g4',
    title: 'Mid Drop Fade',
    category: 'Haircut',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'g5',
    title: 'Slick Back Style',
    category: 'Styling',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'g6',
    title: 'Ultimate Royal Grooming',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?w=600&auto=format&fit=crop&q=80',
  }
];

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM'
];

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
