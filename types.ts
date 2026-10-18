
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  transformations?: { before: string; after: string }[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Professional';
  highlights?: string[];
}

export interface VideoItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
  musicTrack?: string;
  likes: number;
  comments?: number;
  shares?: number;
  type: 'video' | 'image';
  linkedServiceId?: string;
}

export interface GalleryItem {
  id: string;
  before: string;
  after: string;
  title: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'product' | 'course';
}

export interface Appointment {
  id: string;
  serviceName: string;
  clientName: string;
  phone: string;
  date: string;
  time: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  price: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  clientName: string;
  phone: string;
  address: string;
  total: number;
  paymentMethod: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface Feedback {
  id: string;
  userName: string;
  userPhone: string;
  message: string;
  date: string;
  rating: number;
  approved?: boolean;
}
