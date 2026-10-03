export interface Room {
  id: string;
  name: string;
  category: 'Standard' | 'Deluxe' | 'Executive' | 'Family';
  priceMYR: number;
  capacity: number;
  bedType: string;
  sizeSqM: number;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  popular: boolean;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exterior' | 'rooms' | 'bathrooms' | 'lobby' | 'nearby';
  categoryLabel: string;
  image: string;
  description: string;
}

export const HOTEL_INFO = {
  name: 'T Hotel Johor Bahru',
  phone: '+60 16-772 4772',
  phoneClean: '+60167724772',
  address: '89-91, Jalan Bestari 1/5, Taman Nusa Bestari, 81300 Skudai, Johor Darul Ta\'zim, Malaysia',
  addressShort: '89-91, Jalan Bestari 1/5, Taman Nusa Bestari, Skudai, Johor',
  email: 'info@thoteljb.com',
  checkIn: '02:00 PM',
  checkOut: '12:00 PM',
  receptionHours: '24 Hours / 7 Days a Week',
  whatsappUrl: 'https://wa.me/60167724772?text=Hello%20T%20Hotel%20Johor%20Bahru,%20I%20would%20like%20to%20inquire%20about%20room%20availability.',
  googleMapsUrl: 'https://maps.google.com/?q=89-91+Jalan+Bestari+1/5+Taman+Nusa+Bestari+81300+Skudai+Johor+Malaysia',
  coordinates: { lat: 1.4828, lng: 103.6593 }
};

export const EXCHANGE_RATES = {
  MYR: 1,
  SGD: 0.30,
  USD: 0.23,
};

export const CURRENCY_SYMBOLS = {
  MYR: 'RM',
  SGD: 'S$',
  USD: '$',
};

// Image assets (using generated high resolution images and fallback curated hotel imagery)
import heroFacade from '../assets/images/thotel_hero_facade_1791028892523.jpg';
import deluxeRoomImg from '../assets/images/thotel_deluxe_room_1791028905184.jpg';
import lobbyImg from '../assets/images/thotel_lobby_reception_1791028919038.jpg';
import familySuiteImg from '../assets/images/thotel_family_suite_1791028930855.jpg';

import malaysianReceptionImg from '../assets/images/malaysian_reception_lobby_1791029257298.jpg';
import malaysianWifiImg from '../assets/images/malaysian_wifi_lounge_1791029269864.jpg';
import malaysianParkingImg from '../assets/images/malaysian_hotel_parking_1791029281300.jpg';
import malaysianSkudaiImg from '../assets/images/malaysian_skudai_street_1791029293170.jpg';
import malaysianBreakfastImg from '../assets/images/malaysian_breakfast_food_1791029304149.jpg';

export const HOTEL_IMAGES = {
  hero: heroFacade,
  deluxe: deluxeRoomImg,
  lobby: malaysianReceptionImg || lobbyImg,
  family: familySuiteImg,
  reception: malaysianReceptionImg,
  wifi: malaysianWifiImg,
  parking: malaysianParkingImg,
  street: malaysianSkudaiImg,
  breakfast: malaysianBreakfastImg,
};

export const ROOMS: Room[] = [
  {
    id: 'standard-queen',
    name: 'Standard Queen Room',
    category: 'Standard',
    priceMYR: 118,
    capacity: 2,
    bedType: '1 Queen Bed',
    sizeSqM: 18,
    description: 'A cozy, modern room tailored for solo travelers or couples looking for clean, peaceful accommodation at incredible value.',
    image: deluxeRoomImg,
    gallery: [
      deluxeRoomImg,
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '1 Queen Bed',
      'Individual Air Conditioning',
      'High-Speed Wi-Fi',
      'Flat Screen Smart TV',
      'Ensuite Hot Shower',
      'Complimentary Toiletries',
      'Electric Kettle & Water',
      'Daily Housekeeping'
    ],
    popular: false,
  },
  {
    id: 'deluxe-twin',
    name: 'Deluxe Twin Room',
    category: 'Deluxe',
    priceMYR: 138,
    capacity: 2,
    bedType: '2 Single Beds',
    sizeSqM: 22,
    description: 'Perfect for friends, colleagues, or family members. Features two plush single beds with crisp cotton linens and ample working desk space.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      deluxeRoomImg,
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '2 Single Beds',
      'Quiet Air Conditioning',
      'High-Speed Wi-Fi',
      '32" Smart TV with Astro',
      'Private Bathroom & Water Heater',
      'Work Desk & Ergonomic Chair',
      'Free Bottled Water',
      'Electronic Door Lock'
    ],
    popular: true,
  },
  {
    id: 'executive-king',
    name: 'Executive King Room',
    category: 'Executive',
    priceMYR: 168,
    capacity: 2,
    bedType: '1 Super King Bed',
    sizeSqM: 26,
    description: 'Spacious and refined room equipped with a plush Super King bed, premium room lighting, seating nook, and extra space to relax after shopping or sightseeing.',
    image: deluxeRoomImg,
    gallery: [
      deluxeRoomImg,
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '1 Super King Bed',
      'In-room Safe',
      'Mini Fridge',
      'High-Speed Wi-Fi',
      '40" Smart Cable TV',
      'Rainfall Hot Shower',
      'Premium Toiletries & Hairdryer',
      'Coffee & Tea Making Facilities',
      'In-room Seating Nook'
    ],
    popular: true,
  },
  {
    id: 'family-triple',
    name: 'Family Triple Suite',
    category: 'Family',
    priceMYR: 198,
    capacity: 3,
    bedType: '1 Queen + 1 Single Bed',
    sizeSqM: 30,
    description: 'Thoughtfully designed for small families or group getaways. Comfortably sleeps 3 guests with distinct bed arrangements and modern amenities.',
    image: familySuiteImg,
    gallery: [
      familySuiteImg,
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '1 Queen + 1 Single Bed',
      'Spacious Layout',
      'Split Air Conditioning',
      'Ultra Fast Wi-Fi',
      'Flat Screen TV',
      'Double Vanities & Hot Shower',
      'Clothes Rack & Storage',
      'Complimentary Bottled Water'
    ],
    popular: false,
  },
  {
    id: 'grand-family-suite',
    name: 'Grand Family Quad Suite',
    category: 'Family',
    priceMYR: 248,
    capacity: 4,
    bedType: '2 Queen Beds',
    sizeSqM: 36,
    description: 'Our largest accommodation suite, perfect for families visiting Legoland or shopping in Johor Bahru. Fits up to 4 adults comfortably.',
    image: familySuiteImg,
    gallery: [
      familySuiteImg,
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '2 Queen Beds',
      'Fits 4-5 Guests',
      'Dual Air Conditioning',
      '43" Smart LED TV',
      'Spacious Private Bathroom',
      'Mini Refrigerator',
      'Generous Storage Space',
      'Daily Towel & Room Service'
    ],
    popular: true,
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'wifi',
    title: 'Free Ultra-Fast Fiber Wi-Fi',
    description: 'High-speed optic fiber Wi-Fi in all guest rooms, lobby, and lounge areas.',
    icon: 'Wifi',
    image: malaysianWifiImg
  },
  {
    id: 'parking',
    title: 'Free On-Site Safe Parking',
    description: 'Convenient and safe parking spots right in front of and surrounding the hotel.',
    icon: 'Car',
    image: malaysianParkingImg
  },
  {
    id: 'reception',
    title: '24/7 Malaysian Front Desk',
    description: 'Friendly, multilingual reception team ready to assist with late check-ins and local travel tips.',
    icon: 'Clock',
    image: malaysianReceptionImg
  },
  {
    id: 'ac',
    title: 'Individual Air Conditioning',
    description: 'Powerful, whisper-quiet air conditioning units with full remote climate control in every room.',
    icon: 'Wind',
    image: deluxeRoomImg
  },
  {
    id: 'breakfast',
    title: 'Authentic Malaysian Dining & Snacks',
    description: 'Savor local delights including Nasi Lemak, Teh Tarik, and morning coffee steps away.',
    icon: 'Coffee',
    image: malaysianBreakfastImg
  },
  {
    id: 'housekeeping',
    title: 'Daily Professional Housekeeping',
    description: 'Fresh towels, crisp sanitized linens, and thorough daily room cleaning service.',
    icon: 'Sparkles',
    image: familySuiteImg
  },
  {
    id: 'security',
    title: '24-Hour Security & Smart Access',
    description: 'Monitored premises with electronic keycard door locks for total guest safety.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'location',
    title: 'Strategic Skudai Shoplot Location',
    description: 'Surrounded by top Johor eateries, cafes, massage centers, TF Value-Mart, and shopping malls.',
    icon: 'MapPin',
    image: malaysianSkudaiImg
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'ext-1',
    title: 'T Hotel Facade at Dusk',
    category: 'exterior',
    categoryLabel: 'Exterior & Building',
    image: heroFacade,
    description: 'Modern entrance facade located in Taman Nusa Bestari, Skudai.'
  },
  {
    id: 'lob-1',
    title: 'Warm Malaysian Reception Team',
    category: 'lobby',
    categoryLabel: 'Lobby & Reception',
    image: malaysianReceptionImg,
    description: 'Clean, warm 24-hour reception desk with friendly Malaysian hospitality team.'
  },
  {
    id: 'wifi-1',
    title: 'High-Speed Fiber Wi-Fi Lounge',
    category: 'lobby',
    categoryLabel: 'Lobby & Reception',
    image: malaysianWifiImg,
    description: 'Relaxed guest workspace equipped with ultra-fast optic fiber internet.'
  },
  {
    id: 'food-1',
    title: 'Authentic Malaysian Breakfast',
    category: 'nearby',
    categoryLabel: 'Dining & Experiences',
    image: malaysianBreakfastImg,
    description: 'Savor traditional Nasi Lemak, Teh Tarik, and local delicacies.'
  },
  {
    id: 'park-1',
    title: 'Complimentary On-Site Parking',
    category: 'exterior',
    categoryLabel: 'Exterior & Building',
    image: malaysianParkingImg,
    description: 'Safe and convenient dedicated parking right in front of the hotel.'
  },
  {
    id: 'skudai-1',
    title: 'Taman Nusa Bestari Shoplot Vibes',
    category: 'nearby',
    categoryLabel: 'Nearby Attractions',
    image: malaysianSkudaiImg,
    description: 'Vibrant neighborhood surrounded by popular hawker stalls, cafes & shops.'
  },
  {
    id: 'room-1',
    title: 'Deluxe Room Bedding',
    category: 'rooms',
    categoryLabel: 'Rooms & Beds',
    image: deluxeRoomImg,
    description: 'Sanitized crisp white linens with plush accent pillows.'
  },
  {
    id: 'room-2',
    title: 'Family Suite Layout',
    category: 'rooms',
    categoryLabel: 'Rooms & Beds',
    image: familySuiteImg,
    description: 'Spacious dual-bed configuration ideal for families.'
  },
  {
    id: 'bath-1',
    title: 'Ensuite Modern Bathroom',
    category: 'bathrooms',
    categoryLabel: 'Bathrooms & Amenities',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    description: 'Pristine private bathroom with instant hot water shower.'
  },
  {
    id: 'near-1',
    title: 'Legoland Malaysia Resort',
    category: 'nearby',
    categoryLabel: 'Nearby Attractions',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    description: 'World-class family theme park located just 12 minutes drive away.'
  },
  {
    id: 'near-2',
    title: 'Aeon Mall Bukit Indah',
    category: 'nearby',
    categoryLabel: 'Nearby Attractions',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80',
    description: 'Major shopping mall, cinema, and dining hub 5 minutes away.'
  }
];

export const NEARBY_ATTRACTIONS = [
  { name: 'Aeon Bukit Indah Shopping Centre', distance: '5 mins drive (2.1 km)', icon: 'ShoppingBag' },
  { name: 'TF Value-Mart Nusa Bestari', distance: '2 mins walk (300 m)', icon: 'Store' },
  { name: 'Legoland Malaysia & Waterpark', distance: '12 mins drive (9.5 km)', icon: 'Sparkles' },
  { name: 'Paradigm Mall Johor Bahru', distance: '8 mins drive (6.2 km)', icon: 'ShoppingBag' },
  { name: 'Danga Bay Waterfront', distance: '14 mins drive (11.0 km)', icon: 'Waves' },
  { name: 'JB Sentral / CIQ Woodlands Causeway', distance: '20 mins drive (16.5 km)', icon: 'Navigation' },
  { name: 'Tuas Second Link Checkpoint', distance: '22 mins drive (22.0 km)', icon: 'Car' },
  { name: 'Senai International Airport (JHB)', distance: '25 mins drive (24.0 km)', icon: 'Plane' }
];

export const FAQS = [
  {
    q: 'What are the Check-in and Check-out times?',
    a: 'Standard Check-in time is from 2:00 PM onwards, and Check-out is by 12:00 PM (noon). Early check-in and late check-out are subject to room availability and may be arranged with our 24/7 reception desk.'
  },
  {
    q: 'Is parking available at T Hotel Johor Bahru?',
    a: 'Yes! We offer complimentary public and on-site parking directly in front of and surrounding our hotel premises in Taman Nusa Bestari.'
  },
  {
    q: 'How close is the hotel to Legoland Malaysia?',
    a: 'T Hotel Johor Bahru is conveniently located just 9.5 km away from Legoland Malaysia, which takes approximately 10 to 12 minutes by car or Grab ride.'
  },
  {
    q: 'Do you offer free Wi-Fi in the rooms?',
    a: 'Yes, high-speed fiber optic Wi-Fi is available free of charge in all guest rooms, corridors, and the lobby area.'
  },
  {
    q: 'Are there restaurants and conveniences near the hotel?',
    a: 'Excellently located! Within 1-3 minutes walking distance, you will find authentic local hawker stalls, Chinese eateries, Nasi Kandar, 7-Eleven, TF Value-Mart, clinics, and massage centers.'
  }
];
