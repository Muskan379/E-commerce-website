import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import {
  ShoppingCart,
  Sun,
  Moon,
  Menu,
  X,
  Heart,
  Star,
  Search,
  ChevronRight,
  ChevronLeft,
  Package,
  Truck,
  Shield,
  CreditCard,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Play,
  Quote,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  Award,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Send,
  Check,
  Eye,
  Share2,
  Gift,
  Clock,
  Tag,
  XCircle
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description?: string;
  colors?: string[];
  inStock?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones Pro',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 342,
    badge: 'Best Seller',
    description: 'Experience premium audio quality with active noise cancellation. Our flagship wireless headphones deliver crystal-clear sound with deep bass and immersive spatial audio. Features 40-hour battery life, premium memory foam ear pads, and seamless Bluetooth 5.2 connectivity.',
    colors: ['#000000', '#FFFFFF', '#0ea5e9'],
    inStock: true
  },
  {
    id: 2,
    name: 'Minimalist Leather Watch',
    price: 189.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/277335/pexels-photo-277335.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    rating: 4.9,
    reviews: 128,
    description: 'Swiss movement with genuine Italian leather strap. This elegant timepiece features a sapphire crystal face, 50m water resistance, and a classic design that transitions from casual to formal occasions effortlessly.',
    colors: ['#8B4513', '#000000'],
    inStock: true
  },
  {
  id: 3,
  name: 'Professional Camera Kit 4K',
  price: 1299.99,
  originalPrice: 1499.99,
  image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop'
  ],
  category: 'Electronics',
  rating: 4.7,
  reviews: 89,
  badge: 'Hot',
  description: 'Full-frame mirrorless with pro lens kit. Capture stunning 4K video and 45MP photos with this professional-grade camera system. Includes 24-70mm f/2.8 lens, dual battery grip, and weather-sealed body for any shooting condition.',
  inStock: true
},
  {
    id: 4,
    name: 'Designer Polarized Sunglasses',
    price: 159.99,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4673928/pexels-photo-4673928.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    rating: 4.6,
    reviews: 256,
    description: '100% UV protection with titanium frame. Handcrafted in Italy, these polarized sunglasses offer superior clarity and comfort. Features scratch-resistant coating and spring hinges for a perfect fit.',
    colors: ['#000000', '#D4AF37', '#C0C0C0'],
    inStock: true
  },
  {
    id: 5,
    name: 'Smart Fitness Tracker Elite',
    price: 249.99,
    originalPrice: 299.99,
    image: 'https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4222498/pexels-photo-4222498.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    rating: 4.5,
    reviews: 412,
    badge: 'New',
    description: 'Advanced health monitoring with 7-day battery. Track your heart rate, sleep quality, SpO2, and stress levels with medical-grade accuracy. Built-in GPS and 50+ workout modes for comprehensive fitness tracking.',
    colors: ['#000000', '#FF0000', '#0ea5e9'],
    inStock: true
  },
  {
    id: 6,
    name: 'Luxury Italian Leather Bag',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    rating: 4.9,
    reviews: 167,
    description: 'Handcrafted genuine leather with gold hardware. This timeless messenger bag features a padded laptop sleeve, multiple organizer pockets, and adjustable shoulder strap. Perfect for business professionals.',
    colors: ['#8B4513', '#000000', '#F5F5DC'],
    inStock: true
  },
  {
    id: 7,
    name: 'Premium Espresso Machine',
    price: 179.99,
    image: 'https://images.pexels.com/photos/1693359/pexels-photo-1693359.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1693359/pexels-photo-1693359.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1128458/pexels-photo-1128458.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home',
    rating: 4.7,
    reviews: 298,
    description: '15-bar pressure system with built-in grinder. Create barista-quality espresso at home with this professional-grade machine. Features a steam wand for latte art, programmable shot volumes, and rapid heat-up technology.',
    inStock: true
  },
  {
    id: 8,
    name: 'Wireless Earbuds Pro Max',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/3945631/pexels-photo-3945631.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3945631/pexels-photo-3945631.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3786141/pexels-photo-3786141.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 521,
    badge: 'Sale',
    description: 'Spatial audio with 24hr battery life. These premium true wireless earbuds feature adaptive EQ, sweat resistance, and seamless device switching. The case doubles as a portable charger for your other devices.',
    colors: ['#FFFFFF', '#000000'],
    inStock: true
  },
  {
    id: 9,
    name: 'Silk Evening Dress',
    price: 289.99,
    originalPrice: 389.99,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    rating: 4.7,
    reviews: 203,
    badge: 'New',
    description: 'Pure silk with hand-stitched embroidery. This floor-length evening gown features a flattering A-line silhouette, adjustable spaghetti straps, and a hidden back zipper. Dry clean only.',
    colors: ['#000000', '#C0C0C0', '#8B0000'],
    inStock: true
  },
  {
    id: 10,
    name: 'Scented Candle Collection',
    price: 79.99,
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home',
    rating: 4.9,
    reviews: 445,
    description: 'Set of 6 hand-poured soy wax candles with premium fragrance oils. Scents include Sandalwood, Vanilla Bean, Ocean Breeze, Lavender Fields, Citrus Burst, and Warm Amber. 50-hour burn time each.',
    inStock: true
  },
  {
    id: 11,
    name: 'Titanium Sport Watch',
    price: 449.99,
    originalPrice: 549.99,
    image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    rating: 4.8,
    reviews: 178,
    badge: 'Hot',
    description: 'Grade 5 titanium case with sapphire crystal. This rugged sport watch features 200m water resistance, solar charging, GPS tracking, and a 60-day battery life. Perfect for outdoor adventures.',
    colors: ['#808080', '#000000', '#FF6600'],
    inStock: true
  },
  {
    id: 12,
    name: 'Portable Bluetooth Speaker',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    rating: 4.6,
    reviews: 389,
    description: '360° surround sound with 24-hour battery. This waterproof portable speaker delivers powerful bass and crystal-clear highs. Features dual pairing mode, built-in microphone, and USB-C fast charging.',
    colors: ['#000000', '#FF0000', '#0ea5e9'],
    inStock: true
  }
];

const categories = [
  { name: 'Electronics', count: 156, icon: Zap, color: 'from-sky-500 to-cyan-500' },
  { name: 'Fashion', count: 234, icon: Award, color: 'from-rose-500 to-pink-500' },
  { name: 'Accessories', count: 89, icon: Gift, color: 'from-amber-500 to-orange-500' },
  { name: 'Home', count: 167, icon: Package, color: 'from-emerald-500 to-teal-500' }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Fashion Blogger',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Absolutely love the quality and design. The customer service is exceptional and shipping was faster than expected.',
    rating: 5
  },
  {
    name: 'Michael Torres',
    role: 'Tech Enthusiast',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The wireless headphones exceeded all my expectations. Best purchase I\'ve made this year. Highly recommend!',
    rating: 5
  },
  {
    name: 'Emma Wilson',
    role: 'Interior Designer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Stunning products and amazing attention to detail. The espresso machine has become my morning essential.',
    rating: 5
  }
];

const stats = [
  { label: 'Products Sold', value: '50K+', icon: Package },
  { label: 'Happy Customers', value: '25K+', icon: Users },
  { label: 'Countries', value: '150+', icon: MapPin },
  { label: 'Awards Won', value: '48', icon: Award }
];

function Header({ cartCount, onCartClick, mobileMenuOpen, setMobileMenuOpen, onWishlistClick, wishlistCount }: {
  cartCount: number;
  onCartClick: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onWishlistClick: () => void;
  wishlistCount: number;
}) {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-xl shadow-sky-500/5 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                Luxe<span className="gradient-text">Store</span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {['Home', 'Shop', 'Collections', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium group cursor-pointer"
                >
                  {item}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className={`hidden md:flex items-center rounded-full transition-all duration-300 ${
              searchFocused
                ? 'bg-[var(--bg-secondary)] ring-2 ring-sky-500 shadow-lg shadow-sky-500/20 w-72'
                : 'bg-[var(--bg-secondary)] w-56'
            }`}>
              <Search className="w-4 h-4 text-[var(--text-secondary)] ml-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] w-full"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <kbd className="hidden lg:flex items-center gap-1 px-2 py-1 mr-2 text-xs text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] rounded">
                <span>Ctrl</span>K
              </kbd>
            </div>

            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-gradient-to-br hover:from-sky-500 hover:to-emerald-500 transition-all duration-300 group overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="relative z-10 text-[var(--text-primary)] group-hover:text-white transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={onWishlistClick}
              className="relative p-2.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-rose-500 transition-all duration-300 group"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[var(--text-primary)] group-hover:text-white transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="hidden sm:inline text-white font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[22px] h-[22px] bg-white text-sky-600 text-xs rounded-full font-bold px-1.5">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[var(--bg-secondary)]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-[var(--border-color)] mt-4 animate-slide-up">
            <div className="flex flex-col gap-2">
              {['Home', 'Shop', 'Collections', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-4 py-3 rounded-xl text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center bg-[var(--bg-secondary)] rounded-xl px-4 py-3 mt-4">
              <Search className="w-5 h-5 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none ml-3 text-sm text-[var(--text-primary)] w-full"
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Premium Audio Experience',
      subtitle: 'Immerse yourself in crystal-clear sound',
      cta: 'Shop Audio',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gradient: 'from-sky-900/90 via-sky-900/70 to-transparent'
    },
    {
      title: 'Luxury Timepieces',
      subtitle: 'Swiss precision meets Italian elegance',
      cta: 'Explore Watches',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gradient: 'from-amber-900/90 via-amber-900/70 to-transparent'
    },
    {
      title: 'Smart Living',
      subtitle: 'Technology that enhances everyday life',
      cta: 'Discover Tech',
      image: 'https://images.pexels.com/photos/1714240/pexels-photo-1714240.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gradient: 'from-emerald-900/90 via-emerald-900/70 to-transparent'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToShop = () => {
    const element = document.getElementById('shop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="absolute inset-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-48 pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/20">
              New Collection 2024
            </span>
            <div className="flex items-center gap-1 text-white/80">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm">4.9 (2.5k reviews)</span>
            </div>
          </div>

          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg transition-all duration-700 ${
            currentSlide === 0 ? 'animate-slide-down' : ''
          }`}>
            {slides[currentSlide].title}
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal mt-4 text-white/80">
              {slides[currentSlide].subtitle}
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={scrollToShop}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            >
              {slides[currentSlide].cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-white/40">
              <Play className="w-5 h-5" />
              Watch Story
            </button>
          </div>

          <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 cursor-pointer ${
                  idx === currentSlide
                    ? 'w-12 h-3 bg-white rounded-full'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group text-center p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-sky-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-sky-500/10 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 mb-4 group-hover:from-sky-500 group-hover:to-emerald-500 transition-all duration-500">
                <stat.icon className="w-7 h-7 text-sky-500 group-hover:text-white transition-colors duration-500" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'sky' },
    { icon: Shield, title: 'Secure Payment', desc: '256-bit SSL encryption', color: 'emerald' },
    { icon: Package, title: 'Easy Returns', desc: '30-day hassle-free', color: 'amber' },
    { icon: CreditCard, title: 'Flexible Payment', desc: 'Pay in installments', color: 'rose' }
  ];

  return (
    <section className="py-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)] to-transparent border border-[var(--border-color)] hover:shadow-xl transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                feature.color === 'sky' ? 'bg-sky-500/10 group-hover:bg-sky-500' :
                feature.color === 'emerald' ? 'bg-emerald-500/10 group-hover:bg-emerald-500' :
                feature.color === 'amber' ? 'bg-amber-500/10 group-hover:bg-amber-500' :
                'bg-rose-500/10 group-hover:bg-rose-500'
              }`}>
                <feature.icon className={`w-6 h-6 ${
                  feature.color === 'sky' ? 'text-sky-500 group-hover:text-white' :
                  feature.color === 'emerald' ? 'text-emerald-500 group-hover:text-white' :
                  feature.color === 'amber' ? 'text-amber-500 group-hover:text-white' :
                  'text-rose-500 group-hover:text-white'
                } transition-colors duration-500`} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">{feature.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="collections" className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-500 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Shop by Category
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Explore our curated collection of premium products across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-[var(--bg-secondary)] animate-fade-in cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-90 transition-all duration-500`} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <cat.icon className="w-8 h-8 text-[var(--text-primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] group-hover:text-white/80 transition-colors">
                  {cat.count} Products
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist, onQuickView }: {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onQuickView: (product: Product) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-[var(--card-bg)] rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-sky-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-500/10 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease-out' }}
      onClick={() => onQuickView(product)}
    >
      {product.badge && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md animate-bounce-in">
          <span className={`w-2 h-2 rounded-full ${
            product.badge === 'Sale' ? 'bg-rose-500' :
            product.badge === 'New' ? 'bg-emerald-500' :
            product.badge === 'Hot' ? 'bg-orange-500' :
            'bg-sky-500'
          } animate-pulse`} />
          <span className="text-white">
            {product.badge}
          </span>
        </div>
      )}

      {product.originalPrice && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold">
          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-shimmer" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
              isInWishlist ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-900 hover:bg-rose-500 hover:text-white'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 rounded-full bg-white/90 backdrop-blur-md text-gray-900 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-3 rounded-full bg-white/90 backdrop-blur-md text-gray-900 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-sky-500 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">{product.rating}</span>
            <span className="text-xs text-[var(--text-secondary)]">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-sky-500 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-1">
          {product.description}
        </p>

        {product.colors && (
          <div className="flex items-center gap-2 mb-4">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  selectedColor === color
                    ? 'border-sky-500 scale-110 shadow-lg'
                    : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--text-primary)]">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--text-secondary)] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5"
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
            Add
          </button>
        </div>

        {product.inStock ? (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            In Stock
          </div>
        ) : (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
}

function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onToggleWishlist, isInWishlist }: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const images = product.images || [product.image];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-4 md:inset-10 z-50 bg-[var(--bg-primary)] rounded-3xl overflow-hidden shadow-2xl animate-scale-in overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[var(--bg-secondary)] hover:bg-rose-500 hover:text-white transition-all duration-300"
        >
          <XCircle className="w-6 h-6" />
        </button>

        <div className="grid lg:grid-cols-2 gap-0 h-full">
          <div className="relative bg-[var(--bg-secondary)] p-6">
            <div className="aspect-square rounded-2xl overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx ? 'border-sky-500' : 'border-transparent hover:border-sky-500/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-8 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                {product.badge && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.badge === 'Sale' ? 'bg-rose-500 text-white' :
                    product.badge === 'New' ? 'bg-emerald-500 text-white' :
                    product.badge === 'Hot' ? 'bg-orange-500 text-white' :
                    'bg-sky-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--text-secondary)]">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {product.description}
              </p>

              {product.colors && (
                <div className="mb-6">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">Color</h3>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-sky-500 scale-110 shadow-lg'
                            : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-semibold text-[var(--text-primary)]">Quantity</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {product.inStock ? (
                <div className="flex items-center gap-2 mb-6 text-emerald-500">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-6 text-rose-500">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--border-color)] pt-6">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-[var(--text-primary)]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-[var(--text-secondary)] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-sm font-bold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      onAddToCart(product);
                    }
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    isInWishlist
                      ? 'bg-rose-500 text-white'
                      : 'bg-[var(--bg-secondary)] hover:bg-rose-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductGrid({ onAddToCart, onToggleWishlist, wishlist, onQuickView }: {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onQuickView: (product: Product) => void;
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);
  const categories = ['All', 'Electronics', 'Accessories', 'Fashion', 'Home'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section id="shop" className="py-20 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Featured Products
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Discover our handpicked selection of premium products, carefully curated for quality and style.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(8); }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-lg shadow-sky-500/30'
                  : 'bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlist.some(w => w.id === product.id)}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col items-center gap-3">
          {hasMore && (
            <button
              onClick={() => setVisibleCount(v => v + 4)}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-sky-500/30 cursor-pointer"
            >
              Show More Products
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          )}
          <p className="text-sm text-[var(--text-secondary)]">
            Showing {visibleProducts.length} of {filteredProducts.length} products
          </p>
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold mb-6">
              <Clock className="w-4 h-4" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Up to 50% Off
            </h2>
            <p className="text-lg text-white/90 max-w-lg mb-6">
              Don't miss out on our biggest sale of the year. Premium products at unbeatable prices.
            </p>
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() => {
                  const element = document.getElementById('shop');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
              >
                Shop Now
              </button>
              <div className="flex items-center gap-3 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs">Days</div>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="text-center">
                  <div className="text-2xl font-bold">08</div>
                  <div className="text-xs">Hours</div>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="text-center">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-xs">Mins</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                <div className="text-center text-white">
                  <Tag className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                  <div className="text-5xl md:text-6xl font-bold">50%</div>
                  <div className="text-lg">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="about" className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[var(--card-bg)] rounded-3xl p-8 md:p-12 border border-[var(--border-color)] shadow-xl">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <Quote className="w-10 h-10 text-sky-500/20 mb-4" />
                    <p className="text-lg md:text-xl text-[var(--text-primary)] mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-sky-500/20"
                      />
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">{testimonial.name}</h4>
                        <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === current ? 'w-8 bg-sky-500' : 'bg-[var(--bg-tertiary)] hover:bg-sky-500/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="contact" className="py-20 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 p-8 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold mb-6">
              <Mail className="w-4 h-4" />
              Newsletter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get 20% Off Your First Order
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/20 backdrop-blur-md animate-scale-in">
                <Check className="w-6 h-6" />
                <span className="font-semibold">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl cursor-pointer"
                >
                  Subscribe
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}

            <p className="text-sm text-white/70 mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WishlistSidebar({ isOpen, onClose, items, onRemove, onAddToCart }: {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: number) => void;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-[var(--bg-primary)] z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Wishlist</h2>
                <p className="text-sm text-[var(--text-secondary)]">{items.length} items</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                  <Heart className="w-10 h-10 text-[var(--text-secondary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Your wishlist is empty</h3>
                <p className="text-[var(--text-secondary)] mb-6">Save items you love by clicking the heart icon.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-semibold transition-all duration-300 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => onRemove(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] line-clamp-1 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">{item.category}</p>
                      <p className="text-lg font-bold text-sky-500">${item.price}</p>

                      <button
                        onClick={() => onAddToCart(item)}
                        className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-all duration-300 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function CartSidebar({ isOpen, onClose, onCheckout, items, onUpdateQuantity, onRemove }: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-[var(--bg-primary)] z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Shopping Cart</h2>
                <p className="text-sm text-[var(--text-secondary)]">{items.length} items</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-[var(--text-secondary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Your cart is empty</h3>
                <p className="text-[var(--text-secondary)] mb-6">Looks like you haven't added anything yet.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-semibold transition-all duration-300 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => onRemove(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] line-clamp-1 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">{item.category}</p>
                      <p className="text-lg font-bold text-sky-500">${item.price}</p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-semibold text-[var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>

                        <span className="ml-auto font-semibold text-[var(--text-primary)]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text-primary)]">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-500 font-medium' : 'text-[var(--text-primary)]'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Tax</span>
                  <span className="text-[var(--text-primary)]">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-[var(--border-color)] my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold text-[var(--text-primary)]">Total</span>
                  <span className="font-bold text-xl text-sky-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-sky-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 mt-3 border border-[var(--border-color)] rounded-xl font-medium text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CheckoutModal({ isOpen, onClose, items, onSuccess }: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<'review' | 'shipping' | 'payment' | 'done'>('review');
  const [form, setForm] = useState<CheckoutForm>({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', cardExpiry: '', cardCvc: ''
  });

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const update = (field: keyof CheckoutForm, value: string) =>
    setForm(f => ({ ...f, [field]: value }));

  const handlePlaceOrder = () => {
    setStep('done');
    setTimeout(onSuccess, 3000);
  };

  useEffect(() => {
    if (isOpen) setStep('review');
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = ['review', 'shipping', 'payment'];
  const stepIdx = steps.indexOf(step);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-4 md:inset-10 z-50 bg-[var(--bg-primary)] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {step === 'done' ? 'Order Confirmed!' : 'Checkout'}
            </h2>
          </div>
          {step !== 'done' && (
            <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {step !== 'done' && (
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border-color)]">
            {['Cart Review', 'Shipping', 'Payment'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < stepIdx ? 'bg-emerald-500 text-white' :
                  i === stepIdx ? 'bg-gradient-to-br from-sky-500 to-emerald-500 text-white' :
                  'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                }`}>
                  {i < stepIdx ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${
                  i === stepIdx ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                }`}>{label}</span>
                {i < 2 && <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />}
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'review' && (
            <div className="max-w-2xl mx-auto">
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)]">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[var(--text-primary)] line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sky-500">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-[var(--bg-secondary)] p-5 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Shipping</span><span className={shipping === 0 ? 'text-emerald-500' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="h-px bg-[var(--border-color)]" />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-sky-500">${grandTotal.toFixed(2)}</span></div>
              </div>
            </div>
          )}

          {step === 'shipping' && (
            <div className="max-w-lg mx-auto space-y-4">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {(['firstName', 'lastName'] as const).map(f => (
                  <div key={f}>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1 capitalize">{f === 'firstName' ? 'First Name' : 'Last Name'}</label>
                    <input value={form[f]} onChange={e => update(f, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all"
                      placeholder={f === 'firstName' ? 'John' : 'Doe'} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all"
                  placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Address</label>
                <input value={form.address} onChange={e => update('address', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all"
                  placeholder="123 Main Street" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">City</label>
                  <input value={form.city} onChange={e => update('city', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all"
                    placeholder="New York" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">ZIP Code</label>
                  <input value={form.zip} onChange={e => update('zip', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all"
                    placeholder="10001" />
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="max-w-lg mx-auto space-y-4">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Payment Details</h3>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-[var(--text-secondary)]">Your payment info is encrypted and secure</span>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Card Number</label>
                <input value={form.cardNumber} onChange={e => update('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim())}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all font-mono"
                  placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Expiry Date</label>
                  <input value={form.cardExpiry} onChange={e => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                    update('cardExpiry', v.length > 2 ? `${v.slice(0,2)}/${v.slice(2)}` : v);
                  }}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all font-mono"
                    placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">CVC</label>
                  <input value={form.cardCvc} onChange={e => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-[var(--text-primary)] transition-all font-mono"
                    placeholder="123" />
                </div>
              </div>
              <div className="rounded-2xl bg-[var(--bg-secondary)] p-4 flex justify-between items-center">
                <span className="text-[var(--text-secondary)] text-sm">Order Total</span>
                <span className="text-2xl font-bold text-sky-500">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center mb-6 animate-scale-in shadow-2xl shadow-emerald-500/30">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Order Placed!</h3>
              <p className="text-[var(--text-secondary)] mb-2 max-w-sm">
                Thank you, <span className="font-semibold text-[var(--text-primary)]">{form.firstName || 'Customer'}</span>! Your order has been confirmed.
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-6">A confirmation email will be sent to <span className="text-sky-500">{form.email || 'your email'}</span></p>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] mb-8">
                <Package className="w-5 h-5 text-sky-500" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Estimated Delivery</p>
                  <p className="text-xs text-[var(--text-secondary)]">3–5 business days</p>
                </div>
                <span className="ml-4 font-bold text-sky-500">${grandTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Redirecting you back to the store...</p>
            </div>
          )}
        </div>

        {step !== 'done' && (
          <div className="p-6 border-t border-[var(--border-color)] flex gap-3">
            {step !== 'review' && (
              <button
                onClick={() => setStep(step === 'payment' ? 'shipping' : 'review')}
                className="px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors font-medium"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step === 'review') setStep('shipping');
                else if (step === 'shipping') setStep('payment');
                else handlePlaceOrder();
              }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {step === 'review' ? 'Continue to Shipping' : step === 'shipping' ? 'Continue to Payment' : 'Place Order'}
              {step === 'payment' ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Footer() {
  const footerLinks = {
    Shop: ['All Products', 'New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'],
    Company: ['About Us', 'Careers', 'Press', 'Blog', 'Sustainability'],
    Support: ['Contact Us', 'FAQ', 'Shipping', 'Returns', 'Track Order'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility']
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 mb-6 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                Luxe<span className="gradient-text">Store</span>
              </span>
            </button>
            <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-xs">
              Premium shopping experience with curated collections for the modern lifestyle. Quality meets elegance.
            </p>

        <div className="flex items-center gap-3 mb-6">
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-all duration-300"
  >
    <Facebook size={18} />
  </a>

  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center hover:border-sky-500 hover:text-sky-500 transition-all duration-300"
  >
    <Twitter size={18} />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center hover:border-sky-500 hover:text-pink-500 transition-all duration-300"
  >
    <Instagram size={18} />
  </a>

  <a
    href="https://youtube.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-all duration-300"
  >
    <Youtube size={18} />
  </a>
</div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 text-sky-500" />
                <span>123 Design Street, Creative City, 10001</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Phone className="w-4 h-4 text-sky-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Mail className="w-4 h-4 text-sky-500" />
                <span>hello@luxestore.com</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                      className="text-sm text-[var(--text-secondary)] hover:text-sky-500 transition-colors inline-flex items-center gap-1 group cursor-pointer"
                    >
                      {link}
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border-color)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2024 LuxeStore. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
  

  <img
    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
    alt="Mastercard"
    className="h-6 opacity-40 hover:opacity-100 transition-opacity duration-300"
  />

  <img
    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
    alt="PayPal"
    className="h-6 opacity-40 hover:opacity-100 transition-opacity duration-300"
  />

  <img
    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
    alt="Apple Pay"
    className="h-5 opacity-40 hover:opacity-100 transition-opacity duration-300 dark:invert"
  />

 
</div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
        <Header
          cartCount={cartCount}
          onCartClick={() => setCartOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onWishlistClick={() => setWishlistOpen(true)}
          wishlistCount={wishlist.length}
        />
        <main>
          <Hero />
          <Stats />
          <Features />
          <Categories />
          <ProductGrid
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onQuickView={setQuickViewProduct}
          />
          <PromoBanner />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <CartSidebar
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          items={cart}
          onSuccess={() => { setCart([]); setCheckoutOpen(false); }}
        />
        <WishlistSidebar
          isOpen={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          items={wishlist}
          onRemove={removeFromWishlist}
          onAddToCart={addToCart}
        />
        <ProductDetailModal
          product={quickViewProduct}
          isOpen={quickViewProduct !== null}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isInWishlist={quickViewProduct ? wishlist.some(w => w.id === quickViewProduct.id) : false}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
