import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import {
  AdminLoginModal,
  type AccessRole,
} from './components/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BackToTop } from './components/BackToTop';
import { BenefitsStrip } from './components/BenefitsStrip';
import { CartDrawer } from './components/CartDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { Footer } from './components/Footer';
import { GalleryStrip } from './components/GalleryStrip';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LegalModal } from './components/LegalModal';
import { MenuCategories } from './components/MenuCategories';
import { MenuSection } from './components/MenuSection';
import { NewsletterSection } from './components/NewsletterSection';
import { PromoBanner } from './components/PromoBanner';
import { ReservationModal } from './components/ReservationModal';
import { SearchModal } from './components/SearchModal';
import { SignatureExperience } from './components/SignatureExperience';
import { TestimonialsSection } from './components/TestimonialsSection';
import type {
  CartItem,
  LegalModalType,
  MenuCategory,
  MenuItem,
  OrderRecord,
  OrderStatus,
  ReservationFormData,
  ReservationRecord,
  ReservationStatus,
} from './types/restaurant';
import {
  loadStoredMenu,
  loadStoredOrders,
  loadStoredReservations,
  STORAGE_KEYS,
} from './utils/storage';

const CART_STORAGE_KEY = 'aurelle_dining_cart_v1';

function loadInitialCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadAdminAuth(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(loadInitialCart);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(loadStoredMenu);
  const [reservations, setReservations] = useState<ReservationRecord[]>(
    loadStoredReservations
  );
  const [orders, setOrders] = useState<OrderRecord[]>(loadStoredOrders);

  const [isAdminAuthenticated, setIsAdminAuthenticated] =
    useState<boolean>(loadAdminAuth);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [loginInitialRole, setLoginInitialRole] = useState<AccessRole>('admin');

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All Items');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [activeModal, setActiveModal] = useState<LegalModalType>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.RESERVATIONS,
        JSON.stringify(reservations)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [reservations]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.ADMIN_AUTH,
        isAdminAuthenticated ? 'true' : 'false'
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    const handleStorageSync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.MENU) setMenuItems(loadStoredMenu());
      if (e.key === STORAGE_KEYS.RESERVATIONS)
        setReservations(loadStoredReservations());
      if (e.key === STORAGE_KEYS.ORDERS) setOrders(loadStoredOrders());
      if (e.key === STORAGE_KEYS.ADMIN_AUTH) {
        const authed = e.newValue === 'true';
        setIsAdminAuthenticated(authed);
        if (!authed) setIsAdminView(false);
      }
    };
    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsReservationOpen(false);
        setIsSearchOpen(false);
        setSelectedDish(null);
        setActiveModal(null);
        setIsAdminLoginOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCartCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  const handleAddToCart = useCallback((item: MenuItem, quantityToAdd = 1) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + quantityToAdd }
            : entry
        );
      }
      return [...prev, { item, quantity: quantityToAdd }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== id));
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleCreateReservation = useCallback(
    (payload: ReservationFormData): ReservationRecord => {
      const randomRef = Math.floor(100000 + Math.random() * 899999);
      const record: ReservationRecord = {
        ...payload,
        id: `res-${Date.now()}`,
        referenceCode: `AUR-${randomRef}`,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      setReservations((prev) => [record, ...prev]);
      return record;
    },
    []
  );

  const handleCreateOrder = useCallback(
    (payload: {
      customerName: string;
      customerPhone: string;
      deliveryAddress: string;
      items: CartItem[];
      subtotal: number;
      deliveryFee: number;
      total: number;
    }): OrderRecord => {
      const randomNum = Math.floor(4100 + Math.random() * 5800);
      const record: OrderRecord = {
        id: `ord-${Date.now()}`,
        orderNumber: `ORD-${randomNum}`,
        customerName: payload.customerName,
        customerPhone: payload.customerPhone,
        deliveryAddress: payload.deliveryAddress,
        items: payload.items.map(({ item, quantity }) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image,
        })),
        subtotal: Math.round(payload.subtotal * 100) / 100,
        deliveryFee: Math.round(payload.deliveryFee * 100) / 100,
        total: Math.round(payload.total * 100) / 100,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [record, ...prev]);
      return record;
    },
    []
  );

  const handleUpdateReservationStatus = useCallback(
    (id: string, status: ReservationStatus) => {
      setReservations((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
    },
    []
  );

  const handleUpdateOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order))
      );
    },
    []
  );

  const handleAddDish = useCallback((dish: MenuItem) => {
    setMenuItems((prev) => [dish, ...prev]);
  }, []);

  const handleUpdateDishPrice = useCallback((id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((dish) => (dish.id === id ? { ...dish, price: newPrice } : dish))
    );
    setCart((prev) =>
      prev.map((entry) =>
        entry.item.id === id
          ? { ...entry, item: { ...entry.item, price: newPrice } }
          : entry
      )
    );
  }, []);

  const handleToggleChefSpecial = useCallback((id: string) => {
    setMenuItems((prev) =>
      prev.map((dish) =>
        dish.id === id
          ? { ...dish, isChefSpecial: !dish.isChefSpecial }
          : dish
      )
    );
  }, []);

  const handleDeleteDish = useCallback((id: string) => {
    setMenuItems((prev) => prev.filter((dish) => dish.id !== id));
    setCart((prev) => prev.filter((entry) => entry.item.id !== id));
    setSelectedDish((prev) => (prev?.id === id ? null : prev));
  }, []);

  const handleOpenAdmin = useCallback(() => {
    if (isAdminAuthenticated) {
      setIsAdminView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLoginInitialRole('admin');
      setIsAdminLoginOpen(true);
    }
  }, [isAdminAuthenticated]);

  const handleOpenSwitchAccount = useCallback(() => {
    setLoginInitialRole('user');
    setIsAdminLoginOpen(true);
  }, []);

  const handleAdminLoginSuccess = useCallback((role: AccessRole) => {
    setIsAdminLoginOpen(false);
    if (role === 'admin') {
      setIsAdminAuthenticated(true);
      setIsAdminView(true);
    } else {
      setIsAdminAuthenticated(false);
      setIsAdminView(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleExitAdmin = useCallback(() => {
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToMenu = useCallback(() => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (isAdminView && isAdminAuthenticated) {
    return (
      <>
        <AdminDashboard
          menuItems={menuItems}
          reservations={reservations}
          orders={orders}
          onExitAdmin={handleExitAdmin}
          onLogoutAdmin={handleLogoutAdmin}
          onOpenSwitchAccount={handleOpenSwitchAccount}
          onUpdateReservationStatus={handleUpdateReservationStatus}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onAddDish={handleAddDish}
          onUpdateDishPrice={handleUpdateDishPrice}
          onToggleChefSpecial={handleToggleChefSpecial}
          onDeleteDish={handleDeleteDish}
        />

        <AdminLoginModal
          isOpen={isAdminLoginOpen}
          initialRole={loginInitialRole}
          onClose={() => setIsAdminLoginOpen(false)}
          onSuccess={handleAdminLoginSuccess}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2D2A26] page-fade-in">
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenModal={(type) => setActiveModal(type)}
        onOpenAdmin={handleOpenAdmin}
      />

      <main className="flex-1">
        <HeroSection
          onBookTable={() => setIsReservationOpen(true)}
          onExploreMenu={scrollToMenu}
        />

        <BenefitsStrip onOrderNow={scrollToMenu} />

        <MenuCategories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <PromoBanner onOrderNow={scrollToMenu} onExploreMenu={scrollToMenu} />

        <MenuSection
          menuItems={menuItems}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={(item) => handleAddToCart(item, 1)}
          onInspectDish={(item) => setSelectedDish(item)}
        />

        <NewsletterSection />

        <AboutSection onDiscoverStory={() => setActiveModal('story')} />

        <SignatureExperience
          onExploreDish={(dish) => setSelectedDish(dish)}
          onAddToCart={(dish) => {
            handleAddToCart(dish, 1);
            setIsCartOpen(true);
          }}
        />

        <TestimonialsSection />

        <GalleryStrip
          menuItems={menuItems}
          onInspectDish={(dish) => setSelectedDish(dish)}
        />
      </main>

      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenModal={(type) => setActiveModal(type)}
        onOpenAdmin={handleOpenAdmin}
      />

      <BackToTop />

      {/* Interactive Overlays & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onBrowseMenu={scrollToMenu}
        onCreateOrder={handleCreateOrder}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onCreateReservation={handleCreateReservation}
      />

      <SearchModal
        menuItems={menuItems}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToCart={(item) => handleAddToCart(item, 1)}
        onInspectDish={(item) => setSelectedDish(item)}
      />

      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddMultiple={(dish, qty) => {
          handleAddToCart(dish, qty);
          setIsCartOpen(true);
        }}
      />

      <LegalModal
        modalType={activeModal}
        onClose={() => setActiveModal(null)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        initialRole={loginInitialRole}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
