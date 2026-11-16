import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  CalendarCheck,
  Check,
  Edit3,
  LayoutDashboard,
  Lock,
  Menu,
  Package,
  Plus,
  Search,
  Trash2,
  UserCheck,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuData';
import type {
  DishCategory,
  MenuItem,
  OrderRecord,
  OrderStatus,
  ReservationRecord,
  ReservationStatus,
} from '../../types/restaurant';
import { BrandLogo } from '../BrandLogo';
import { ImageWithFallback } from '../ImageWithFallback';

type AdminTab = 'overview' | 'bookings' | 'orders' | 'menu';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  reservations: ReservationRecord[];
  orders: OrderRecord[];
  onExitAdmin: () => void;
  onLogoutAdmin: () => void;
  onOpenSwitchAccount: () => void;
  onUpdateReservationStatus: (id: string, status: ReservationStatus) => void;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
  onAddDish: (dish: MenuItem) => void;
  onUpdateDishPrice: (id: string, newPrice: number) => void;
  onToggleChefSpecial: (id: string) => void;
  onDeleteDish: (id: string) => void;
}

const DISH_CATEGORIES: DishCategory[] = [
  'Starters',
  'Main Course',
  'Desserts',
  'Beverages',
  'Pizza',
];

const STATUS_DOT_COLOR: Record<string, string> = {
  Confirmed: 'text-[#16A34A]',
  Delivered: 'text-[#16A34A]',
  Pending: 'text-[#D97706]',
  Preparing: 'text-[#2563EB]',
  Cancelled: 'text-[#DC2626]',
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  menuItems,
  reservations,
  orders,
  onExitAdmin,
  onLogoutAdmin,
  onOpenSwitchAccount,
  onUpdateReservationStatus,
  onUpdateOrderStatus,
  onAddDish,
  onUpdateDishPrice,
  onToggleChefSpecial,
  onDeleteDish,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Bookings filter state
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState<'All' | ReservationStatus>('All');

  // Orders filter state
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<'All' | OrderStatus>('All');

  // Menu Manager state
  const [menuSearch, setMenuSearch] = useState('');
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<'All' | DishCategory>('All');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [draftPrice, setDraftPrice] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Add New Dish form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<DishCategory>('Main Course');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState(MENU_ITEMS[0].image);
  const [newIsSpecial, setNewIsSpecial] = useState(false);
  const [addFormError, setAddFormError] = useState('');
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const notify = (message: string) => {
    setFeedbackNotice(message);
    window.setTimeout(() => {
      setFeedbackNotice((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  // Live Analytics Computations
  const analytics = useMemo(() => {
    const totalReservations = reservations.length;
    const pendingReservations = reservations.filter((r) => r.status === 'Pending').length;
    const pendingOrders = orders.filter(
      (o) => o.status === 'Pending' || o.status === 'Preparing'
    ).length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Aggregate popular dishes from all orders
    const dishCounts = new Map<
      string,
      { name: string; count: number; revenue: number }
    >();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const current = dishCounts.get(item.name) || {
          name: item.name,
          count: 0,
          revenue: 0,
        };
        dishCounts.set(item.name, {
          name: item.name,
          count: current.count + item.quantity,
          revenue: current.revenue + item.price * item.quantity,
        });
      });
    });

    const popularDishes = Array.from(dishCounts.values()).sort(
      (a, b) => b.count - a.count
    );

    return {
      totalReservations,
      pendingReservations,
      pendingOrders,
      totalRevenue,
      popularDishes,
      topDish: popularDishes[0] || null,
    };
  }, [reservations, orders]);

  const filteredBookings = useMemo(() => {
    const q = bookingSearch.trim().toLowerCase();
    return reservations.filter((b) => {
      const matchesStatus = bookingFilter === 'All' || b.status === bookingFilter;
      const matchesQuery =
        !q ||
        b.guestName.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.referenceCode.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [reservations, bookingSearch, bookingFilter]);

  const filteredOrders = useMemo(() => {
    const q = orderSearch.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = orderFilter === 'All' || o.status === orderFilter;
      const matchesQuery =
        !q ||
        o.customerName.toLowerCase().includes(q) ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [orders, orderSearch, orderFilter]);

  const filteredMenu = useMemo(() => {
    const q = menuSearch.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCat =
        menuCategoryFilter === 'All' || item.category === menuCategoryFilter;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [menuItems, menuSearch, menuCategoryFilter]);

  const handleSavePrice = (id: string) => {
    const parsed = parseFloat(draftPrice);
    if (Number.isNaN(parsed) || parsed <= 0) return;
    onUpdateDishPrice(id, Math.round(parsed * 100) / 100);
    setEditingPriceId(null);
    setDraftPrice('');
    notify('Dish price updated on live website.');
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    const trimmedDesc = newDescription.trim();
    const parsedPrice = parseFloat(newPrice);

    if (!trimmedName) {
      setAddFormError('Please enter a dish name.');
      return;
    }
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setAddFormError('Please enter a valid positive price.');
      return;
    }
    if (!trimmedDesc) {
      setAddFormError('Please enter a short description for the dish.');
      return;
    }

    const newDish: MenuItem = {
      id: `dish-${Date.now()}`,
      name: trimmedName,
      category: newCategory,
      description: trimmedDesc,
      price: Math.round(parsedPrice * 100) / 100,
      rating: 4.9,
      reviewCount: 1,
      image: newImageUrl.trim() || MENU_ITEMS[0].image,
      imageAlt: `${trimmedName} — freshly prepared at Aurelle`,
      badge: 'NEW',
      isChefSpecial: newIsSpecial,
    };

    onAddDish(newDish);
    setAddFormError('');
    setNewName('');
    setNewPrice('');
    setNewDescription('');
    setNewIsSpecial(false);
    setShowAddForm(false);
    notify(`"${trimmedName}" added to the live menu.`);
  };

  const navItems: {
    id: AdminTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    count?: number;
  }[] = [
    { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
    {
      id: 'bookings',
      label: 'Table Bookings',
      icon: CalendarCheck,
      count: analytics.pendingReservations,
    },
    {
      id: 'orders',
      label: 'Customer Orders',
      icon: Package,
      count: analytics.pendingOrders,
    },
    {
      id: 'menu',
      label: 'Menu Manager',
      icon: UtensilsCrossed,
      count: menuItems.length,
    },
  ];

  const tabTitles: Record<AdminTab, string> = {
    overview: 'Overview & Analytics',
    bookings: 'Table Bookings Manager',
    orders: 'Customer Orders Manager',
    menu: 'Menu Manager (Live Editor)',
  };

  const SidebarContent = (
    <div className="flex flex-col justify-between h-full bg-white border-r border-[#E7E5E0]">
      <div>
        <div className="px-5 py-5 border-b border-[#E7E5E0] flex items-center justify-between">
          <BrandLogo
            compact
            onClick={() => setActiveTab('overview')}
          />
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 text-[#6B6965] hover:text-[#2D2A26]"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-[#E7E5E0] bg-[#F7F7F5]">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#3E6B2C]">
            Admin Console
          </p>
          <p className="text-xs text-[#6B6965] mt-0.5">
            Synced via localStorage
          </p>
        </div>

        <nav className="p-3 space-y-1" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-sm font-medium rounded-xs transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2F5D28] text-white'
                    : 'text-[#2D2A26] hover:bg-[#F7F7F5]'
                }`}
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </span>
                {typeof item.count === 'number' && (
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isActive ? 'text-white/90' : 'text-[#6B6965]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#E7E5E0] space-y-2 bg-[#F7F7F5]">
        <button
          type="button"
          onClick={onExitAdmin}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-[#EAE8E3] text-[#2D2A26] border border-[#E7E5E0] text-xs font-bold tracking-[0.1em] uppercase rounded-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Website</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileSidebarOpen(false);
            onOpenSwitchAccount();
          }}
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs text-[#2D2A26] hover:text-[#2F5D28] transition-colors"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Switch User / Role</span>
        </button>
        <button
          type="button"
          onClick={onLogoutAdmin}
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs text-[#6B6965] hover:text-[#DC2626] transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock Admin Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#2D2A26] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#2D2A26]/55"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full">{SidebarContent}</aside>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar Contract */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E7E5E0] px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open admin sidebar"
              className="lg:hidden p-1.5 -ml-1.5 text-[#2D2A26] hover:text-[#2F5D28]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm truncate">
              <span className="text-[#6B6965] hidden sm:inline">
                Admin Console
              </span>
              <span className="text-[#6B6965] hidden sm:inline">/</span>
              <h1 className="font-bold text-[#2D2A26] truncate">
                {tabTitles[activeTab]}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {feedbackNotice && (
              <span className="hidden md:inline-block text-xs font-medium text-[#16A34A]">
                {feedbackNotice}
              </span>
            )}
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.1em] uppercase rounded-xs transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Live Website</span>
            </button>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Summary KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E7E5E0] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6965]">
                    Total Reservations
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[#2D2A26] tabular-nums">
                    {analytics.totalReservations}
                  </p>
                  <p className="mt-1 text-xs text-[#D97706] font-medium tabular-nums">
                    {analytics.pendingReservations} pending approval
                  </p>
                </div>

                <div className="bg-white border border-[#E7E5E0] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6965]">
                    Pending Orders
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[#2D2A26] tabular-nums">
                    {analytics.pendingOrders}
                  </p>
                  <p className="mt-1 text-xs text-[#6B6965] tabular-nums">
                    Out of {orders.length} total orders
                  </p>
                </div>

                <div className="bg-white border border-[#E7E5E0] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6965]">
                    Total Revenue
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[#2D2A26] tabular-nums">
                    ${analytics.totalRevenue.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-[#16A34A] font-medium">
                    Synced across all food orders
                  </p>
                </div>

                <div className="bg-white border border-[#E7E5E0] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6965]">
                    Popular Dish
                  </p>
                  <p className="mt-2 text-lg font-bold text-[#2D2A26] truncate">
                    {analytics.topDish ? analytics.topDish.name : 'No orders yet'}
                  </p>
                  <p className="mt-1 text-xs text-[#3E6B2C] font-medium tabular-nums">
                    {analytics.topDish
                      ? `${analytics.topDish.count} plates ordered`
                      : 'Waiting for first order'}
                  </p>
                </div>
              </div>

              {/* Popular Dishes Ranking + Recent Bookings/Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-white border border-[#E7E5E0]">
                  <div className="px-5 py-4 border-b border-[#E7E5E0] flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#2D2A26] flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#2F5D28]" />
                      <span>Popular Dishes</span>
                    </h2>
                    <span className="text-xs text-[#6B6965]">By units sold</span>
                  </div>

                  {analytics.popularDishes.length === 0 ? (
                    <p className="p-5 text-sm text-[#6B6965]">
                      No dish order history recorded yet.
                    </p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-[#F7F7F5] text-xs uppercase text-[#6B6965] border-b border-[#E7E5E0]">
                        <tr>
                          <th className="text-left font-semibold px-5 py-2.5">Dish</th>
                          <th className="text-right font-semibold px-4 py-2.5">Qty</th>
                          <th className="text-right font-semibold px-5 py-2.5">Sales</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7E5E0]">
                        {analytics.popularDishes.slice(0, 6).map((dish) => (
                          <tr key={dish.name} className="hover:bg-[#F7F7F5]/70">
                            <td className="px-5 py-3 font-medium text-[#2D2A26]">
                              {dish.name}
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums text-[#6B6965]">
                              {dish.count}
                            </td>
                            <td className="px-5 py-3 text-right tabular-nums font-semibold text-[#2D2A26]">
                              ${dish.revenue.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="lg:col-span-7 bg-white border border-[#E7E5E0]">
                  <div className="px-5 py-4 border-b border-[#E7E5E0] flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#2D2A26]">
                      Recent Table Bookings
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs font-bold text-[#2F5D28] hover:underline"
                    >
                      Manage All
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#F7F7F5] text-xs uppercase text-[#6B6965] border-b border-[#E7E5E0]">
                        <tr>
                          <th className="text-left font-semibold px-5 py-2.5">Guest</th>
                          <th className="text-left font-semibold px-4 py-2.5">Date &amp; Time</th>
                          <th className="text-right font-semibold px-4 py-2.5">Party</th>
                          <th className="text-left font-semibold px-5 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7E5E0]">
                        {reservations.slice(0, 5).map((res) => (
                          <tr key={res.id} className="hover:bg-[#F7F7F5]/70">
                            <td className="px-5 py-3 font-medium text-[#2D2A26]">
                              {res.guestName}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-[#6B6965]">
                              {res.date} · {res.time}
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums text-[#2D2A26]">
                              {res.guests}
                            </td>
                            <td
                              className={`px-5 py-3 font-semibold text-xs uppercase tracking-wider ${
                                STATUS_DOT_COLOR[res.status] || 'text-[#2D2A26]'
                              }`}
                            >
                              {res.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TABLE BOOKINGS MANAGER */}
          {activeTab === 'bookings' && (
            <div className="bg-white border border-[#E7E5E0]">
              <div className="p-5 border-b border-[#E7E5E0] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(['All', 'Pending', 'Confirmed', 'Cancelled'] as const).map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setBookingFilter(status)}
                        className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                          bookingFilter === status
                            ? 'bg-[#2F5D28] text-white border-[#2F5D28]'
                            : 'bg-[#F7F7F5] text-[#2D2A26] border-[#E7E5E0] hover:border-[#2F5D28]'
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#6B6965] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search guest, phone, or ref..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none"
                  />
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="p-10 text-center text-sm text-[#6B6965]">
                  No table reservations match the selected filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F7F7F5] text-xs uppercase text-[#6B6965] border-b border-[#E7E5E0]">
                      <tr>
                        <th className="text-left font-semibold px-5 py-3">Customer</th>
                        <th className="text-left font-semibold px-4 py-3">Phone</th>
                        <th className="text-left font-semibold px-4 py-3">Date</th>
                        <th className="text-left font-semibold px-4 py-3">Time</th>
                        <th className="text-right font-semibold px-4 py-3">Guests</th>
                        <th className="text-left font-semibold px-4 py-3">Status</th>
                        <th className="text-right font-semibold px-5 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E5E0]">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-[#F7F7F5]/65">
                          <td className="px-5 py-3.5">
                            <p className="font-semibold text-[#2D2A26]">
                              {booking.guestName}
                            </p>
                            <p className="text-xs text-[#6B6965]">
                              {booking.referenceCode} · {booking.email}
                            </p>
                            {booking.specialRequests && (
                              <p className="text-xs italic text-[#3E6B2C] mt-0.5">
                                Note: {booking.specialRequests}
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-3.5 tabular-nums text-[#2D2A26] whitespace-nowrap">
                            {booking.phone}
                          </td>
                          <td className="px-4 py-3.5 tabular-nums text-[#2D2A26] whitespace-nowrap">
                            {booking.date}
                          </td>
                          <td className="px-4 py-3.5 tabular-nums text-[#2D2A26] whitespace-nowrap">
                            {booking.time}
                          </td>
                          <td className="px-4 py-3.5 text-right tabular-nums font-semibold">
                            {booking.guests}
                          </td>
                          <td
                            className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                              STATUS_DOT_COLOR[booking.status]
                            }`}
                          >
                            {booking.status}
                          </td>
                          <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2">
                            {booking.status !== 'Confirmed' && (
                              <button
                                type="button"
                                onClick={() => {
                                  onUpdateReservationStatus(booking.id, 'Confirmed');
                                  notify(`Booking ${booking.referenceCode} confirmed.`);
                                }}
                                className="px-3 py-1.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {booking.status !== 'Cancelled' && (
                              <button
                                type="button"
                                onClick={() => {
                                  onUpdateReservationStatus(booking.id, 'Cancelled');
                                  notify(`Booking ${booking.referenceCode} cancelled.`);
                                }}
                                className="px-3 py-1.5 bg-white hover:bg-red-50 text-[#DC2626] border border-[#E7E5E0] hover:border-red-300 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDERS MANAGER */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-[#E7E5E0]">
              <div className="p-5 border-b border-[#E7E5E0] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(['All', 'Pending', 'Preparing', 'Delivered'] as const).map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setOrderFilter(status)}
                        className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                          orderFilter === status
                            ? 'bg-[#2F5D28] text-white border-[#2F5D28]'
                            : 'bg-[#F7F7F5] text-[#2D2A26] border-[#E7E5E0] hover:border-[#2F5D28]'
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#6B6965] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search order # or customer..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none"
                  />
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="p-10 text-center text-sm text-[#6B6965]">
                  No customer food orders match the selected filter.
                </div>
              ) : (
                <div className="divide-y divide-[#E7E5E0]">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-[#F7F7F5]/60"
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="font-mono font-bold text-[#2D2A26]">
                            {order.orderNumber}
                          </span>
                          <span className="text-[#6B6965]">·</span>
                          <span className="font-semibold text-[#2D2A26]">
                            {order.customerName}
                          </span>
                          <span className="text-[#6B6965] tabular-nums">
                            {order.customerPhone}
                          </span>
                          <span
                            className={`text-xs font-bold uppercase tracking-wider ${
                              STATUS_DOT_COLOR[order.status]
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <p className="text-xs text-[#6B6965]">
                          Delivery: {order.deliveryAddress}
                        </p>

                        <div className="pt-1 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#2D2A26]">
                          {order.items.map((entry) => (
                            <span key={`${order.id}-${entry.id}`} className="tabular-nums">
                              <strong>{entry.quantity}&times;</strong> {entry.name} ($
                              {(entry.price * entry.quantity).toFixed(2)})
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 shrink-0">
                        <div className="text-left lg:text-right">
                          <p className="text-[11px] uppercase tracking-wider text-[#6B6965]">
                            Order Total
                          </p>
                          <p className="text-lg font-bold text-[#2D2A26] tabular-nums">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateOrderStatus(order.id, 'Preparing');
                              notify(`Order ${order.orderNumber} marked as Preparing.`);
                            }}
                            disabled={order.status === 'Preparing'}
                            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                              order.status === 'Preparing'
                                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                                : 'bg-white text-[#2D2A26] border-[#E7E5E0] hover:border-[#2563EB] hover:text-[#2563EB]'
                            }`}
                          >
                            Preparing
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onUpdateOrderStatus(order.id, 'Delivered');
                              notify(`Order ${order.orderNumber} marked as Delivered.`);
                            }}
                            disabled={order.status === 'Delivered'}
                            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                              order.status === 'Delivered'
                                ? 'bg-[#16A34A] text-white border-[#16A34A]'
                                : 'bg-[#2F5D28] hover:bg-[#23471E] text-white border-[#2F5D28]'
                            }`}
                          >
                            Delivered
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MENU MANAGER (LIVE UI EDITOR) */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              {/* Top Action Bar */}
              <div className="bg-white border border-[#E7E5E0] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-[#2D2A26]">
                    Live Restaurant Menu ({menuItems.length} Dishes)
                  </h2>
                  <p className="text-xs text-[#6B6965] mt-0.5">
                    Adding, editing prices, or removing items updates the live customer Menu immediately.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddForm((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.12em] uppercase rounded-xs transition-colors whitespace-nowrap shrink-0"
                >
                  {showAddForm ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Close Form</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add New Dish</span>
                    </>
                  )}
                </button>
              </div>

              {/* Add New Dish Form */}
              {showAddForm && (
                <form
                  onSubmit={handleCreateDish}
                  className="bg-white border border-[#2F5D28]/40 p-6 space-y-4"
                >
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#3E6B2C]">
                    Create New Menu Dish
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="new-dish-name"
                        className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26] mb-1"
                      >
                        Dish Name *
                      </label>
                      <input
                        id="new-dish-name"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Seared Sea Bass & Fennel"
                        className="w-full px-3 py-2 border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="new-dish-category"
                        className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26] mb-1"
                      >
                        Category *
                      </label>
                      <select
                        id="new-dish-category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as DishCategory)}
                        className="w-full px-3 py-2 border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none text-sm bg-white"
                      >
                        {DISH_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="new-dish-price"
                        className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26] mb-1"
                      >
                        Price (USD) *
                      </label>
                      <input
                        id="new-dish-price"
                        type="number"
                        step="0.01"
                        min="0.5"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="26.50"
                        className="w-full px-3 py-2 border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none text-sm tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="new-dish-desc"
                        className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26] mb-1"
                      >
                        Description *
                      </label>
                      <textarea
                        id="new-dish-desc"
                        rows={2}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Wild-caught sea bass roasted with braised fennel, citrus beurre blanc, and herbs."
                        className="w-full px-3 py-2 border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="new-dish-image"
                        className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26] mb-1"
                      >
                        Image URL
                      </label>
                      <input
                        id="new-dish-image"
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Paste image URL or select preset below"
                        className="w-full px-3 py-2 border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none text-sm"
                      />
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="text-[#6B6965]">Quick presets:</span>
                        {MENU_ITEMS.slice(0, 4).map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setNewImageUrl(preset.image)}
                            className="text-[#2F5D28] hover:underline font-medium"
                          >
                            {preset.name.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <label className="inline-flex items-center gap-2 text-sm text-[#2D2A26] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newIsSpecial}
                        onChange={(e) => setNewIsSpecial(e.target.checked)}
                        className="accent-[#2F5D28] w-4 h-4"
                      />
                      <span>Feature in Chef&apos;s Specials</span>
                    </label>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors"
                    >
                      Save Dish to Live Menu
                    </button>
                  </div>

                  {addFormError && (
                    <p role="alert" className="text-xs text-red-700 font-medium">
                      {addFormError}
                    </p>
                  )}
                </form>
              )}

              {/* Menu Table & Live Price Editor */}
              <div className="bg-white border border-[#E7E5E0]">
                <div className="p-5 border-b border-[#E7E5E0] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(['All', ...DISH_CATEGORIES] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setMenuCategoryFilter(cat)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                          menuCategoryFilter === cat
                            ? 'bg-[#2F5D28] text-white border-[#2F5D28]'
                            : 'bg-[#F7F7F5] text-[#2D2A26] border-[#E7E5E0] hover:border-[#2F5D28]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-[#6B6965] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="search"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Filter menu dishes..."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none"
                    />
                  </div>
                </div>

                {filteredMenu.length === 0 ? (
                  <div className="p-10 text-center text-sm text-[#6B6965]">
                    No dishes match your current filter.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#F7F7F5] text-xs uppercase text-[#6B6965] border-b border-[#E7E5E0]">
                        <tr>
                          <th className="text-left font-semibold px-5 py-3">Dish</th>
                          <th className="text-left font-semibold px-4 py-3">Category</th>
                          <th className="text-left font-semibold px-4 py-3">Chef&apos;s Special</th>
                          <th className="text-right font-semibold px-4 py-3">Price</th>
                          <th className="text-right font-semibold px-5 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7E5E0]">
                        {filteredMenu.map((item) => {
                          const isEditing = editingPriceId === item.id;
                          return (
                            <tr key={item.id} className="hover:bg-[#F7F7F5]/65">
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 shrink-0 overflow-hidden bg-[#F7F7F5] border border-[#E7E5E0]">
                                    <ImageWithFallback
                                      src={item.image}
                                      alt={item.imageAlt}
                                      fallbackTitle={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0 max-w-xs">
                                    <p className="font-semibold text-[#2D2A26] truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-[#6B6965] truncate">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3.5 text-[#6B6965] whitespace-nowrap">
                                {item.category}
                              </td>
                              <td className="px-4 py-3.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onToggleChefSpecial(item.id);
                                    notify(`Updated Chef's Special status for ${item.name}.`);
                                  }}
                                  className={`text-xs font-bold uppercase tracking-wider ${
                                    item.isChefSpecial
                                      ? 'text-[#16A34A]'
                                      : 'text-[#6B6965] hover:text-[#2D2A26]'
                                  }`}
                                >
                                  {item.isChefSpecial ? 'Featured' : 'Standard'}
                                </button>
                              </td>
                              <td className="px-4 py-3.5 text-right tabular-nums whitespace-nowrap">
                                {isEditing ? (
                                  <div className="inline-flex items-center gap-1.5">
                                    <input
                                      type="number"
                                      step="0.01"
                                      min="0.5"
                                      value={draftPrice}
                                      onChange={(e) => setDraftPrice(e.target.value)}
                                      aria-label={`Edit price for ${item.name}`}
                                      className="w-20 px-2 py-1 text-right border border-[#2F5D28] focus:outline-none text-sm tabular-nums"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleSavePrice(item.id)}
                                      aria-label="Save price"
                                      className="p-1.5 bg-[#2F5D28] text-white rounded-xs"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingPriceId(null)}
                                      aria-label="Cancel price edit"
                                      className="p-1.5 border border-[#E7E5E0] text-[#6B6965] rounded-xs"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="font-bold text-[#2D2A26]">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                              </td>
                              <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2">
                                {!isEditing && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingPriceId(item.id);
                                      setDraftPrice(item.price.toFixed(2));
                                    }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#E7E5E0] hover:border-[#2F5D28] text-xs font-semibold text-[#2D2A26] rounded-xs transition-colors"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit Price</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    onDeleteDish(item.id);
                                    notify(`"${item.name}" removed from live menu.`);
                                  }}
                                  aria-label={`Delete ${item.name}`}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#E7E5E0] hover:border-red-300 hover:bg-red-50 text-xs font-semibold text-[#DC2626] rounded-xs transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
