
import { Service, Course, GalleryItem, Product, VideoItem, Feedback } from './types';

export const THEME = {
  primaryGreen: '#0A2419',
  champagneGold: '#F7E7CE',
  accentGold: '#E1B84F',
  cardBg: 'rgba(18, 76, 52, 0.4)',
  textLight: '#F3F3F3',
};

export const SPECIALIST_NAME = "Aneela";

export const MOCK_SERVICES: Service[] = [
  { 
    id: 's1', 
    name: 'Signature Bridal Masterpiece', 
    description: 'Aneela\'s world-famous bridal glow. A four-hour intensive transformation focusing on skin prep, luxury base, and intricate eye artistry.', 
    price: 45000, 
    duration: '4h', 
    category: 'Makeup', 
    image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=800&auto=format&fit=crop',
    transformations: [
      { before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&h=600&auto=format&fit=crop' }
    ]
  },
  { 
    id: 's2', 
    name: 'Walima Elegance', 
    description: 'Soft and elegant traditional look with premium silk finish, highlighting natural features with a sophisticated palette.', 
    price: 35000, 
    duration: '3h', 
    category: 'Makeup', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    transformations: [
      { before: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&h=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1488421774737-2680193b3f46?q=80&w=400&h=600&auto=format&fit=crop' }
    ]
  },
  { 
    id: 's3', 
    name: 'Luxury Party Glam', 
    description: 'Be the star of the night with high-impact contouring and signature Arabic eye styles.', 
    price: 12000, 
    duration: '1.5h', 
    category: 'Makeup', 
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop'
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Aneela Velvet Glow Palette', price: 4500, description: '12 high-pigment shades for the perfect eye.', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop', category: 'Makeup' },
  { id: 'p2', name: 'Silk Finish Foundation', price: 3200, description: 'Flawless coverage for all Pakistani skin tones.', image: 'https://images.unsplash.com/photo-1631214503851-a18518ce9241?q=80&w=400&auto=format&fit=crop', category: 'Skin' },
];

export const MOCK_COURSES: Course[] = [
  { 
    id: 'c1', 
    title: 'Professional Bridal Masterclass', 
    duration: '3 Months', 
    price: 85000, 
    description: 'Direct training under Aneela including certification.', 
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop', 
    level: 'Professional',
    highlights: ["Personalized Mentorship by Aneela", "Hands-on Practical Workshops", "International Product Access", "Professional Portfolio Shoot", "Industry-Recognized Certificate"]
  },
  { 
    id: 'c2', 
    title: 'Self-Makeup Artistry', 
    duration: '1 Week', 
    price: 18000, 
    description: 'Master your own face with daily live feedback.', 
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop', 
    level: 'Beginner',
    highlights: ["Daily Practice", "Skin Prep Basics", "Day to Night Transition", "Mastering the Wing"]
  },
];

export const MOCK_VIDEOS: VideoItem[] = [
  { id: 'v1', url: '#', thumbnail: 'https://images.unsplash.com/photo-1503910358245-44a77ba935f1?q=80&w=400&h=700&auto=format&fit=crop', title: 'Arabic Eye Magic', likes: 1200, type: 'video' },
  { id: 'v2', url: '#', thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&h=700&auto=format&fit=crop', title: 'Bridal Transformation', likes: 4500, type: 'video' },
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: 'g1', before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&h=600&auto=format&fit=crop', title: 'Nikkah Glow' },
  { id: 'g2', before: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&h=600&auto=format&fit=crop', after: 'https://images.unsplash.com/photo-1488421774737-2680193b3f46?q=80&w=400&h=600&auto=format&fit=crop', title: 'Mehndi Look' },
];

export const MOCK_FEEDBACKS: Feedback[] = [
  { id: 'f1', userName: 'Sarah Khan', userPhone: '', message: 'The bridal service was absolutely magical. Aneela truly has a gift!', date: '12/10/2023', rating: 5, approved: true },
  { id: 'f2', userName: 'Zara Ahmed', userPhone: '', message: 'Loved the products! The velvet glow palette is my new daily essential.', date: '15/11/2023', rating: 5, approved: true },
  { id: 'f3', userName: 'Mariam B.', userPhone: '', message: 'Professional, hygienic, and purely luxurious. Worth every rupee.', date: '02/01/2024', rating: 4, approved: true },
  { id: 'f4', userName: 'Ayesha Raza', userPhone: '', message: 'Took the self-grooming course and it changed my life. Highly recommend the academy!', date: '10/02/2024', rating: 5, approved: true },
];
