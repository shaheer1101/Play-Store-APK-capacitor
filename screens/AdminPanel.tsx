import React, { useState, useRef } from 'react';
import { ShoppingBag, Calendar, Edit2, Trash2, Plus, X, Camera, Image as ImageIcon, Save, Film, Phone, MapPin, Info, Clock, ChevronLeft, RefreshCw, Wallet, CreditCard, MessageSquare, Eye, EyeOff, Star, Video } from 'lucide-react';
import { Service, Product, Course, VideoItem, GalleryItem, Appointment, Order, Feedback } from '../types';
import Logo from '../components/Logo';
import { sendNotification } from '../services/notificationService';
import { saveData, deleteData, updateFields } from '../services/firebaseService';

interface AdminPanelProps {
  onLogin?: () => void;
  onCancel?: () => void;
  onLogout?: () => void;
  isFullPanel?: boolean;
  data?: {
    services: Service[];
    products: Product[];
    courses: Course[];
    videos: VideoItem[];
    gallery: GalleryItem[];
    bookings: Appointment[];
    orders: Order[];
    feedbacks: Feedback[];
  };
  setters?: {
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    setVideos: React.Dispatch<React.SetStateAction<VideoItem[]>>;
    setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
    setBookings: React.Dispatch<React.SetStateAction<Appointment[]>>;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>;
  };
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogin, onCancel, onLogout, isFullPanel, data, setters }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<any>(null);

  const mainFileRef = useRef<HTMLInputElement>(null);
  const secondFileRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    if (password === 'A1234567890a') onLogin?.();
    else setError('Security Clearance Failure');
  };

  const deleteItem = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Permanently delete this item?")) return;

    // Optimistic Update - Remove from UI immediately
    if (activeTab === 'services') setters?.setServices(p => p.filter(i => i.id !== id));
    if (activeTab === 'products') setters?.setProducts(p => p.filter(i => i.id !== id));
    if (activeTab === 'courses') setters?.setCourses(p => p.filter(i => i.id !== id));
    if (activeTab === 'videos') setters?.setVideos(p => p.filter(i => i.id !== id));
    if (activeTab === 'gallery') setters?.setGallery(p => p.filter(i => i.id !== id));
    if (activeTab === 'bookings') setters?.setBookings(p => p.filter(i => i.id !== id));
    if (activeTab === 'orders') setters?.setOrders(p => p.filter(i => i.id !== id));
    if (activeTab === 'feedbacks') setters?.setFeedbacks(p => p.filter(i => i.id !== id));

    setIsSyncing(true);
    await deleteData(activeTab, id);
    setIsSyncing(false);
  };

  const saveEdit = async () => {
    if (!editBuffer || !editingId) return;
    
    if (!editBuffer.name && !editBuffer.title) {
      alert("Please enter a Title or Name.");
      return;
    }

    setIsSyncing(true);
    const finalItem = { ...editBuffer };
    // Optimistic Update
    if (activeTab === 'services') {
      setters?.setServices(p => {
        const exists = p.find(i => i.id === editingId);
        return exists ? p.map(i => i.id === editingId ? finalItem : i) : [finalItem, ...p];
      });
    }
    // Simple optimistic updates for other lists
    if (activeTab === 'products') setters?.setProducts(p => { const e = p.find(i => i.id === editingId); return e ? p.map(i => i.id === editingId ? finalItem : i) : [finalItem, ...p]; });
    if (activeTab === 'courses') setters?.setCourses(p => { const e = p.find(i => i.id === editingId); return e ? p.map(i => i.id === editingId ? finalItem : i) : [finalItem, ...p]; });
    if (activeTab === 'videos') setters?.setVideos(p => { const e = p.find(i => i.id === editingId); return e ? p.map(i => i.id === editingId ? finalItem : i) : [finalItem, ...p]; });
    if (activeTab === 'gallery') setters?.setGallery(p => { const e = p.find(i => i.id === editingId); return e ? p.map(i => i.id === editingId ? finalItem : i) : [finalItem, ...p]; });

    await saveData(activeTab, editingId, finalItem);
    
    setEditingId(null);
    setEditBuffer(null);
    setIsSyncing(false);
  };

  const updateBookingStatus = async (id: string, status: Appointment['status']) => {
    // Optimistic Update
    setters?.setBookings(p => p.map(b => b.id === id ? { ...b, status } : b));
    
    const item = data?.bookings.find(b => b.id === id);
    if (item && (status === 'Accepted' || status === 'Rejected')) {
      sendNotification("Booking Update", `Session for ${item.clientName} is now ${status}.`);
    }

    setIsSyncing(true);
    await updateFields('bookings', id, { status });
    setIsSyncing(false);
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    // Optimistic Update
    setters?.setOrders(p => p.map(o => o.id === id ? { ...o, status } : o));

    setIsSyncing(true);
    await updateFields('orders', id, { status });
    setIsSyncing(false);
  };

  const toggleFeedbackVisibility = async (id: string, currentStatus?: boolean) => {
    const newStatus = !currentStatus;
    // Optimistic Update
    setters?.setFeedbacks(p => p.map(f => f.id === id ? { ...f, approved: newStatus } : f));

    setIsSyncing(true);
    await updateFields('feedbacks', id, { approved: newStatus });
    setIsSyncing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file && editBuffer) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditBuffer({ ...editBuffer, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderEditForm = () => (
    <div className="glass-card p-6 rounded-[2.5rem] border-[#F7E7CE]/40 glow-gold mb-8 animate-in slide-in-from-top-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[10px] font-black text-[#F7E7CE] uppercase tracking-[0.3em]">
          {editingId?.startsWith('item-') ? 'Create New Entry' : 'Editing Entry'}
        </h4>
        <button onClick={() => { setEditingId(null); setEditBuffer(null); }} className="text-white/40"><X size={20} /></button>
      </div>

      <div className="space-y-5">
        {/* MEDIA UPLOAD SECTION */}
        {activeTab === 'videos' ? (
          // VIDEO SPECIFIC MEDIA UPLOAD
          <div className="grid grid-cols-2 gap-4">
            {/* Thumbnail Upload */}
            <div className="relative h-40 bg-black/40 rounded-3xl overflow-hidden border border-white/10 group">
              {editBuffer.thumbnail ? (
                <img src={editBuffer.thumbnail} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                   <ImageIcon size={32} strokeWidth={1} />
                   <p className="text-[8px] uppercase tracking-widest mt-2">Thumbnail</p>
                </div>
              )}
              <button onClick={() => mainFileRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[10px] text-white font-black uppercase tracking-widest bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20}/> Upload Cover
              </button>
              <input type="file" ref={mainFileRef} hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'thumbnail')} />
            </div>

            {/* Video File Upload */}
            <div className="relative h-40 bg-black/40 rounded-3xl overflow-hidden border border-white/10 group">
              {editBuffer.url && editBuffer.url.startsWith('data:') ? (
                <video src={editBuffer.url} className="w-full h-full object-cover" muted loop autoPlay />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                   <Video size={32} strokeWidth={1} />
                   <p className="text-[8px] uppercase tracking-widest mt-2">Video File</p>
                </div>
              )}
              <button onClick={() => secondFileRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[10px] text-white font-black uppercase tracking-widest bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Film size={20}/> Upload Video
              </button>
              <input type="file" ref={secondFileRef} hidden accept="video/*" onChange={(e) => handleFileUpload(e, 'url')} />
            </div>
          </div>
        ) : activeTab === 'gallery' ? (
          // GALLERY SPECIFIC MEDIA UPLOAD
          <div className="grid grid-cols-2 gap-4">
             {/* Before Image */}
             <div className="relative h-40 bg-black/40 rounded-3xl overflow-hidden border border-white/10 group">
              {editBuffer.before ? (
                <img src={editBuffer.before} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                   <ImageIcon size={32} strokeWidth={1} />
                   <p className="text-[8px] uppercase tracking-widest mt-2">Before Look</p>
                </div>
              )}
              <button onClick={() => secondFileRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[10px] text-white font-black uppercase tracking-widest bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20}/> Upload Before
              </button>
              <input type="file" ref={secondFileRef} hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'before')} />
            </div>

            {/* After Image */}
            <div className="relative h-40 bg-black/40 rounded-3xl overflow-hidden border border-white/10 group">
              {editBuffer.after ? (
                <img src={editBuffer.after} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                   <ImageIcon size={32} strokeWidth={1} />
                   <p className="text-[8px] uppercase tracking-widest mt-2">After Look</p>
                </div>
              )}
              <button onClick={() => mainFileRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[10px] text-white font-black uppercase tracking-widest bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20}/> Upload After
              </button>
              <input type="file" ref={mainFileRef} hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'after')} />
            </div>
          </div>
        ) : (
          // DEFAULT SINGLE IMAGE UPLOAD (Services, Products, Courses)
          <div className="relative h-56 bg-black/40 rounded-3xl overflow-hidden border border-white/10 group">
            {editBuffer.image ? (
              <img src={editBuffer.image} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                 <ImageIcon size={48} strokeWidth={1} />
                 <p className="text-[8px] uppercase tracking-widest mt-2">No Media Uploaded</p>
              </div>
            )}
            <button onClick={() => mainFileRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[10px] text-white font-black uppercase tracking-widest bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={24}/> Change Media
            </button>
            <input type="file" ref={mainFileRef} hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
          </div>
        )}

        <div className="space-y-4">
          <input 
            className="w-full bg-[#0A2419] border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-[#F7E7CE]" 
            value={editBuffer.name || editBuffer.title || ''} 
            onChange={(e) => setEditBuffer({...editBuffer, [activeTab === 'services' || activeTab === 'products' ? 'name' : 'title']: e.target.value})} 
            placeholder={activeTab === 'services' || activeTab === 'products' ? "Item Name*" : "Title*"} 
          />
          
          {(activeTab === 'services' || activeTab === 'products' || activeTab === 'courses') && (
            <input 
              className="w-full bg-[#0A2419] border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-[#F7E7CE]" 
              value={editBuffer.price || ''} 
              type="number" 
              onChange={(e) => setEditBuffer({...editBuffer, price: Number(e.target.value)})} 
              placeholder="Price (PKR)" 
            />
          )}

          <textarea 
            className="w-full bg-[#0A2419] border border-white/10 rounded-2xl p-4 text-xs text-white h-28 resize-none outline-none focus:border-[#F7E7CE]" 
            value={editBuffer.description || ''} 
            onChange={(e) => setEditBuffer({...editBuffer, description: e.target.value})} 
            placeholder="Detailed Description" 
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={saveEdit} disabled={isSyncing} className="flex-1 btn-royal py-5 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 shadow-xl disabled:opacity-50">
            {isSyncing ? <RefreshCw className="animate-spin" size={16}/> : <Save size={16}/>} 
            {isSyncing ? 'Syncing...' : 'Save to Cloud'}
          </button>
          <button onClick={() => { setEditingId(null); setEditBuffer(null); }} className="flex-1 bg-white/5 text-white/40 py-5 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 border border-white/10"><X size={16}/> Discard</button>
        </div>
      </div>
    </div>
  );

  const renderEditableList = (title: string, list: any[]) => {
    const isNewItemBeingAdded = editingId && !list.some(item => item.id === editingId);

    return (
      <div className="animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-bold text-[#F7E7CE] uppercase tracking-[0.4em] serif">{title}</h3>
          {!editingId && (
            <button 
              onClick={() => {
                const newId = `item-${Date.now()}`;
                setEditingId(newId);
                setEditBuffer({ id: newId });
              }} 
              className="bg-[#F7E7CE] text-[#0A2419] p-4 rounded-full shadow-2xl active:scale-90 transition-transform"
            >
              <Plus size={24} strokeWidth={3} />
            </button>
          )}
        </div>

        {isNewItemBeingAdded && renderEditForm()}

        <div className="space-y-4">
          {list.map((item) => (
            <div key={item.id}>
              {editingId === item.id ? (
                renderEditForm()
              ) : (
                <div className="glass-card p-5 rounded-[2.5rem] border-white/5 glow-gold overflow-hidden flex items-center gap-5 relative group">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
                    <img src={item.image || item.after || item.thumbnail} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white serif truncate">{item.name || item.title}</p>
                    {item.price && <p className="text-[9px] text-[#F7E7CE] font-black">Rs. {item.price?.toLocaleString()}</p>}
                    <p className="text-[8px] text-white/30 truncate mt-0.5">{item.description || 'No description'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingId(item.id); setEditBuffer({ ...item }); }} className="p-3 bg-white/5 rounded-2xl text-[#F7E7CE]/60 hover:bg-[#F7E7CE]/10 transition-colors"><Edit2 size={18} /></button>
                    <button onClick={(e) => deleteItem(item.id, e)} className="p-3 bg-red-400/10 rounded-2xl text-red-400/60 hover:bg-red-400/20 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isFullPanel) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0A2419] flex flex-col items-center justify-center px-8">
        <div className="mb-12 animate-royal">
          <Logo size="xl" />
        </div>
        <div className="w-full glass-card p-10 rounded-[3rem] border-[#F7E7CE]/20 shadow-2xl max-w-sm">
          <h2 className="text-xl font-bold text-[#F7E7CE] mb-8 serif text-center uppercase tracking-widest">Admin Access</h2>
          <div className="space-y-6">
            <input 
              type="password" 
              placeholder="Enter Access Key" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-[#0A2419] border border-[#F7E7CE]/20 rounded-2xl py-4 px-6 text-center text-white outline-none focus:border-[#F7E7CE] transition-all" 
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && <p className="text-red-400 text-[10px] text-center uppercase font-bold tracking-[0.2em]">{error}</p>}
            <button onClick={handleLogin} className="w-full btn-royal py-5 rounded-2xl flex items-center justify-center gap-2">Verify Access</button>
            <button onClick={onCancel} className="w-full text-[#F7E7CE]/30 py-2 text-[10px] font-bold uppercase tracking-[0.3em]">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A2419] flex flex-col">
      <header className="h-24 border-b border-[#F7E7CE]/10 flex items-center justify-between px-8 bg-[#124C34]/30 backdrop-blur-3xl sticky top-0 z-[110]">
        <Logo size="sm" />
        <div className="flex items-center gap-6">
          {isSyncing && <RefreshCw className="text-[#F7E7CE] animate-spin" size={20} />}
          <button onClick={onLogout} className="text-red-400 text-[9px] font-black py-3 px-8 rounded-2xl border border-red-400/20 bg-red-400/5 uppercase tracking-[0.2em] active:scale-90 transition-transform">Logout</button>
        </div>
      </header>

      <div className="p-6 overflow-y-auto flex-1 no-scrollbar pb-32">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-12 py-2">
          {[
            { id: 'bookings', icon: <Calendar size={14} />, label: 'Bookings' },
            { id: 'orders', icon: <ShoppingBag size={14} />, label: 'Orders' },
            { id: 'feedbacks', icon: <MessageSquare size={14} />, label: 'Feedbacks' },
            { id: 'services', icon: <Edit2 size={14} />, label: 'Services' },
            { id: 'products', icon: <ImageIcon size={14} />, label: 'Products' },
            { id: 'videos', icon: <Film size={14} />, label: 'Reels' },
            { id: 'gallery', icon: <ImageIcon size={14} />, label: 'Gallery' },
          ].map((t) => (
            <button 
              key={t.id} 
              onClick={() => { setActiveTab(t.id); setEditingId(null); setEditBuffer(null); }} 
              className={`px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2.5 whitespace-nowrap shadow-lg ${activeTab === t.id ? 'bg-[#F7E7CE] text-[#0A2419] scale-105' : 'bg-[#124C34]/40 text-[#F7E7CE]/30'}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#F7E7CE] uppercase tracking-[0.4em] serif mb-8">Client Sessions</h3>
            {data?.bookings.map((b) => (
              <div key={b.id} className="glass-card p-6 rounded-[2.5rem] border-white/5 glow-gold relative group">
                <button 
                  onClick={(e) => deleteItem(b.id, e)}
                  className="absolute top-6 right-6 p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all z-30 active:scale-90"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex justify-between items-start mb-5 pr-12">
                  <div>
                    <h4 className="text-sm font-bold text-white serif">{b.serviceName}</h4>
                    <p className="text-[10px] text-[#F7E7CE] font-black mt-1 uppercase tracking-[0.2em]">{b.clientName}</p>
                  </div>
                  <span className={`text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border ${b.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-[#F7E7CE]/10 text-[#F7E7CE] border-[#F7E7CE]/20'}`}>
                    {b.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[10px] text-white/40 font-bold uppercase tracking-widest mb-6 bg-black/20 p-4 rounded-3xl">
                  <div className="flex items-center gap-2 text-white/60"><Calendar size={12} className="text-[#F7E7CE]"/> {b.date}</div>
                  <div className="flex items-center gap-2 text-white/60"><Clock size={12} className="text-[#F7E7CE]"/> {b.time}</div>
                  <div className="flex items-center gap-2 text-white/60"><Phone size={12} className="text-[#F7E7CE]"/> {b.phone}</div>
                  <div className="flex items-center gap-2 text-white/60"><Info size={12} className="text-[#F7E7CE]"/> Rs. {b.price.toLocaleString()}</div>
                </div>
                <div className="flex gap-3">
                  {b.status === 'Pending' ? (
                    <>
                      <button onClick={() => updateBookingStatus(b.id, 'Accepted')} className="flex-1 bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white py-3 rounded-xl text-[9px] font-black uppercase border border-green-600/30 transition-all shadow-lg active:scale-95">Accept</button>
                      <button onClick={() => updateBookingStatus(b.id, 'Rejected')} className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-3 rounded-xl text-[9px] font-black uppercase border border-red-600/30 transition-all shadow-lg active:scale-95">Reject</button>
                    </>
                  ) : b.status === 'Accepted' ? (
                     <button onClick={() => updateBookingStatus(b.id, 'Completed')} className="flex-1 bg-white/5 text-[#F7E7CE] hover:bg-white/10 py-3 rounded-xl text-[9px] font-black uppercase border border-white/10 transition-all shadow-lg active:scale-95">Mark Completed</button>
                  ) : (
                     <div className="w-full text-center py-3 text-[9px] font-bold text-white/30 uppercase tracking-widest bg-black/20 rounded-xl">Session {b.status}</div>
                  )}
                </div>
              </div>
            ))}
            {data?.bookings.length === 0 && <p className="text-center text-white/20 italic py-10">No pending bookings.</p>}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-[#F7E7CE] uppercase tracking-[0.4em] serif mb-8">Boutique Orders</h3>
             {data?.orders.map((o) => (
               <div key={o.id} className="glass-card p-6 rounded-[2.5rem] border-white/5 glow-gold relative group">
                  <button 
                    onClick={(e) => deleteItem(o.id, e)}
                    className="absolute top-6 right-6 p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all z-30 active:scale-90"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex justify-between items-center mb-6 pr-12">
                    <p className="text-[10px] font-black text-[#F7E7CE] uppercase tracking-[0.3em]">Order #{o.id.slice(-6)}</p>
                    <span className="text-[8px] font-black bg-white/5 px-4 py-1.5 rounded-full text-white/40 border border-white/5 uppercase tracking-widest">{o.status}</span>
                  </div>
                  <div className="space-y-3 mb-6 bg-black/20 p-4 rounded-3xl">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                         <p className="text-xs text-white/80"><span className="text-[#F7E7CE] font-bold">{it.quantity}x</span> {it.name}</p>
                         <p className="text-[10px] font-black text-white/40">Rs. {(it.price * it.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 bg-white/5 p-4 rounded-3xl border border-white/5">
                    <div>
                        <p className="text-[8px] text-[#F7E7CE]/60 uppercase font-black mb-1">Contact</p>
                        <p className="text-[10px] text-white font-bold">{o.clientName}</p>
                        <p className="text-[9px] text-white/60 mt-0.5">{o.phone}</p>
                    </div>
                    <div>
                        <p className="text-[8px] text-[#F7E7CE]/60 uppercase font-black mb-1">Payment</p>
                        <p className="text-[10px] text-white font-bold">{o.paymentMethod}</p>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/5">
                        <p className="text-[8px] text-[#F7E7CE]/60 uppercase font-black mb-1">Shipping Address</p>
                        <p className="text-[10px] text-white/80 leading-relaxed italic"><MapPin size={10} className="inline mr-1 text-[#F7E7CE]" /> {o.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {o.status === 'Pending' ? (
                       <button onClick={() => updateOrderStatus(o.id, 'Shipped')} className="flex-1 bg-[#F7E7CE] text-[#0A2419] py-3 rounded-xl text-[9px] font-black uppercase shadow-xl active:scale-95 transition-transform hover:bg-[#E1B84F]">Ship Order</button>
                    ) : o.status === 'Shipped' ? (
                       <button onClick={() => updateOrderStatus(o.id, 'Delivered')} className="flex-1 bg-green-600 text-white py-3 rounded-xl text-[9px] font-black uppercase shadow-xl active:scale-95 transition-transform hover:bg-green-500">Mark Delivered</button>
                    ) : (
                       <div className="w-full text-center py-3 text-[9px] font-bold text-white/30 uppercase tracking-widest bg-black/20 rounded-xl">Order {o.status}</div>
                    )}
                  </div>
               </div>
             ))}
             {data?.orders.length === 0 && <p className="text-center text-white/20 italic py-10">No orders placed yet.</p>}
          </div>
        )}

        {activeTab === 'feedbacks' && (
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-[#F7E7CE] uppercase tracking-[0.4em] serif mb-8">Customer Reviews</h3>
             {data?.feedbacks.map((f) => (
               <div key={f.id} className="glass-card p-6 rounded-[2.5rem] border-white/5 glow-gold relative group">
                  <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                     <button 
                       onClick={() => toggleFeedbackVisibility(f.id, f.approved)}
                       className={`p-3 rounded-xl transition-all ${f.approved ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'} hover:bg-white/10`}
                       title={f.approved ? "Hide Review" : "Show Review"}
                     >
                       {f.approved !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                     </button>
                     <button 
                       onClick={(e) => deleteItem(f.id, e)}
                       className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all active:scale-90"
                     >
                       <Trash2 size={16} />
                     </button>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7E7CE] to-[#C9A23A] flex items-center justify-center text-[#0A2419] font-black text-[10px] shadow-lg">
                      {f.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#F7E7CE] uppercase tracking-wider">{f.userName}</p>
                      <p className="text-[8px] text-white/30 uppercase tracking-widest">{f.date.split(',')[0]}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={i < f.rating ? "#F7E7CE" : "transparent"} className={i < f.rating ? "text-[#F7E7CE]" : "text-white/10"} />
                    ))}
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed italic pr-12">
                    "{f.message}"
                  </p>
                  
                  <div className="mt-4 inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-widest text-white/40">
                    Status: {f.approved !== false ? 'Visible' : 'Hidden'}
                  </div>
               </div>
             ))}
             {data?.feedbacks.length === 0 && <p className="text-center text-white/20 italic py-10">No feedbacks received yet.</p>}
          </div>
        )}

        {(activeTab === 'services' || activeTab === 'products' || activeTab === 'videos' || activeTab === 'gallery') && 
          renderEditableList(activeTab.toUpperCase(), data?.[activeTab === 'videos' ? 'videos' : (activeTab === 'gallery' ? 'gallery' : (activeTab === 'services' ? 'services' : 'products'))] || [])
        }
      </div>
    </div>
  );
};

export default AdminPanel;