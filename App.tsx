import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LuxuryMenu from './components/LuxuryMenu';
import Logo from './components/Logo';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import StoreScreen from './screens/StoreScreen';
import ViralScreen from './screens/ViralScreen';
import AIScreen from './screens/AIScreen';
import GalleryScreen from './screens/GalleryScreen';
import BookingScreen from './screens/BookingScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import AdminPanel from './screens/AdminPanel';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import { MOCK_SERVICES, MOCK_PRODUCTS, MOCK_COURSES, MOCK_VIDEOS, MOCK_GALLERY, MOCK_FEEDBACKS } from './constants';
import { CartItem, Service, Product, Course, VideoItem, GalleryItem, Appointment, Order, Feedback } from './types';
import { MessageCircle, RefreshCw } from 'lucide-react';
import { sendNotification } from './services/notificationService';
import { subscribeToCollection, saveData } from './services/firebaseService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSplashing, setIsSplashing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CartItem[] | null>(null);
  const [bookingService, setBookingService] = useState<Service | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Business Data State
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [videos, setVideos] = useState<VideoItem[]>(MOCK_VIDEOS);
  const [gallery, setGallery] = useState<GalleryItem[]>(MOCK_GALLERY);
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(MOCK_FEEDBACKS);

  // Real-time Data Sync from Firebase
  useEffect(() => {
    const unsubs = [
      subscribeToCollection('services', (data) => { if(data.length > 0) setServices(data as Service[]); }),
      subscribeToCollection('products', (data) => { if(data.length > 0) setProducts(data as Product[]); }),
      subscribeToCollection('courses', (data) => { if(data.length > 0) setCourses(data as Course[]); }),
      subscribeToCollection('videos', (data) => { if(data.length > 0) setVideos(data as VideoItem[]); }),
      subscribeToCollection('gallery', (data) => { if(data.length > 0) setGallery(data as GalleryItem[]); }),
      
      subscribeToCollection('bookings', (data) => setBookings(data as Appointment[])),
      subscribeToCollection('orders', (data) => setOrders(data as Order[])),
      subscribeToCollection('feedbacks', (data) => { 
        if (data.length > 0) setFeedbacks(data as Feedback[]);
        else setFeedbacks(MOCK_FEEDBACKS);
      })
    ];

    setLoading(false);

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  const handleSplashFinish = () => {
    setIsSplashing(false);
  };

  const handleAdminTrigger = () => setShowAdminLogin(true);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
    sendNotification("Welcome to the Lounge ✨", `Welcome back, ${userData.name}. Your session has been authorized.`);
  };

  const addToCart = (item: any) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { 
        id: item.id, 
        name: item.name || item.title, 
        price: item.price, 
        image: item.image, 
        quantity: 1,
        type: item.title ? 'course' : 'product'
      }];
    });
  };

  const handleBookingConfirm = async (appointment: Appointment) => {
    // Optimistic update
    setBookings(prev => [appointment, ...prev]);
    await saveData('bookings', appointment.id, appointment);
    sendNotification(
      "Reservation Confirmed ✨",
      `Your session for ${appointment.serviceName} is secured for ${appointment.date} at ${appointment.time}.`
    );
  };

  const handleOrderConfirm = async (order: Order) => {
    // Optimistic update
    setOrders(prev => [order, ...prev]);
    setCartItems([]);
    await saveData('orders', order.id, order);
    sendNotification(
      "Luxury Order Placed 🛍️",
      `Thank you ${order.clientName}! Your order #${order.id.slice(-6)} is being prepared for perfection.`
    );
  };

  const handleFeedbackSubmit = async (fb: Feedback) => {
    // Optimistic update
    setFeedbacks(prev => [fb, ...prev]);
    await saveData('feedbacks', fb.id, fb);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/923134528585', '_blank');
  };

  if (isSplashing) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (showAdminLogin && !isAdmin) {
    return <AdminPanel onLogin={() => setIsAdmin(true)} onCancel={() => setShowAdminLogin(false)} />;
  }

  if (isAdmin) {
    return (
      <AdminPanel 
        isFullPanel 
        onLogout={() => { setIsAdmin(false); setShowAdminLogin(false); }}
        data={{ services, products, courses, videos, gallery, bookings, orders, feedbacks }}
        setters={{ setServices, setProducts, setCourses, setVideos, setGallery, setBookings, setOrders, setFeedbacks }}
      />
    );
  }

  const renderScreen = () => {
    if (showLogin) return <LoginScreen onLogin={handleLogin} onBack={() => setShowLogin(false)} />;
    if (showCart) return <CartScreen items={cartItems} onBack={() => setShowCart(false)} onRemove={(id) => setCartItems(p => p.filter(i => i.id !== id))} onUpdateQty={(id, d) => setCartItems(p => p.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity+d)} : i))} onCheckout={() => { setShowCart(false); setCheckoutItem(cartItems); }} />;
    if (checkoutItem) return <CheckoutScreen item={checkoutItem} onBack={() => setCheckoutItem(null)} onComplete={handleOrderConfirm} />;
    if (bookingService) return <BookingScreen service={bookingService} onBack={() => setBookingService(null)} onConfirm={handleBookingConfirm} />;
    if (showFeedback) return <FeedbackScreen onBack={() => setShowFeedback(false)} onSubmit={handleFeedbackSubmit} />;
    if (selectedServiceDetail) return <ServiceDetailScreen service={selectedServiceDetail} onBack={() => setSelectedServiceDetail(null)} onBook={(s) => { setSelectedServiceDetail(null); setBookingService(s); }} />;
    if (selectedProductDetail) return <ProductDetailScreen product={selectedProductDetail} onBack={() => setSelectedProductDetail(null)} onAddToCart={addToCart} />;
    if (selectedCourseDetail) return <CourseDetailScreen course={selectedCourseDetail} onBack={() => setSelectedCourseDetail(null)} onEnroll={addToCart} />;

    switch (activeTab) {
      case 'home': return <HomeScreen setActiveTab={setActiveTab} onBook={(s) => setBookingService(s)} featuredServices={services} onOpenFeedback={() => setShowFeedback(true)} feedbacks={feedbacks} />;
      case 'services': return <ServicesScreen services={services} onBook={(s) => setBookingService(s)} onViewDetails={(s) => setSelectedServiceDetail(s)} />;
      case 'store': return <StoreScreen products={products} courses={courses} onAddToCart={addToCart} onViewProduct={setSelectedProductDetail} onViewCourse={setSelectedCourseDetail} />;
      case 'viral': return <ViralScreen videos={videos} onBook={(sId) => {
        const found = services.find(s => s.id === sId);
        if (found) setBookingService(found);
      }} />;
      case 'ai': return <AIScreen />;
      case 'gallery': return <GalleryScreen gallery={gallery} />;
      default: return <HomeScreen setActiveTab={setActiveTab} onBook={(s) => setBookingService(s)} featuredServices={services} onOpenFeedback={() => setShowFeedback(true)} feedbacks={feedbacks} />;
    }
  };

  const showGlobalUI = !checkoutItem && !bookingService && !showCart && !selectedServiceDetail && !selectedProductDetail && !selectedCourseDetail && !showFeedback && !showLogin;
  const isViralTab = activeTab === 'viral' && showGlobalUI;

  return (
    <div className="min-h-screen green-gradient flex flex-col font-sans">
      {/* Show header on all main tabs including viral, only hide when logging in */}
      {!showLogin && (
        <Header 
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)} 
          onCartClick={() => setShowCart(true)} 
          onMenuOpen={() => setIsMenuOpen(true)}
          onProfileClick={() => setShowLogin(true)}
          onAdminTrigger={handleAdminTrigger}
          user={user}
        />
      )}
      
      {syncing && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-[#F7E7CE] text-[#0A2419] px-4 py-1.5 rounded-full text-[8px] font-black uppercase flex items-center gap-2 shadow-2xl animate-bounce">
          <RefreshCw size={12} className="animate-spin" /> Syncing Cloud Data
        </div>
      )}

      {/* 
        Changes:
        - If isViralTab: using 'p-0' so content starts at top (0px), behind the fixed header. 
        - Removed 'pt-16' which was pushing video down.
      */}
      <main className={`flex-1 ${isViralTab ? 'p-0 bg-black' : 'pt-20 px-4'} max-w-lg mx-auto w-full no-scrollbar overflow-y-auto animate-royal`}>
        {renderScreen()}
        {!isViralTab && showGlobalUI && <div className="h-20" />}
      </main>
      
      {showGlobalUI && (
        <>
          <LuxuryMenu 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isOpen={isMenuOpen} 
            setIsOpen={setIsMenuOpen} 
            services={services}
            products={products}
            onServiceSelect={(s) => setSelectedServiceDetail(s)}
            onProductSelect={(p) => setSelectedProductDetail(p)}
          />
          {!isViralTab && (
            <button 
              onClick={openWhatsApp}
              className="fixed bottom-10 right-6 z-[50] w-14 h-14 bg-white/5 border border-white/10 text-[#F7E7CE] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md active:scale-90 transition-all hover:scale-110"
              aria-label="Connect on WhatsApp"
            >
              <MessageCircle size={28} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;