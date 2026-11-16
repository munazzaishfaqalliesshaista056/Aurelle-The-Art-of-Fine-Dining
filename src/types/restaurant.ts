export type MenuCategory =
  | 'All Items'
  | 'Starters'
  | 'Main Course'
  | 'Desserts'
  | 'Beverages'
  | 'Pizza'
  | "Chef's Specials";

export type DishCategory = Exclude<MenuCategory, 'All Items' | "Chef's Specials">;

export type DishBadge = 'BESTSELLER' | 'NEW' | "CHEF'S PICK";

export interface MenuItem {
  id: string;
  name: string;
  category: DishCategory;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  badge?: DishBadge;
  isChefSpecial?: boolean;
  dietary?: string[];
  pairingNote?: string;
}

export interface CategoryTile {
  id: string;
  label: Exclude<MenuCategory, 'All Items'>;
  image: string;
  imageAlt: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  subline: string;
  image: string;
  imageAlt: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  guestName: string;
  guestTitle: string;
  initials: string;
  rating: number;
  visitContext: string;
}

export interface ReservationFormData {
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Cancelled';

export interface ReservationRecord extends ReservationFormData {
  id: string;
  referenceCode: string;
  status: ReservationStatus;
  createdAt: string;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Delivered';

export interface OrderItemSummary {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type LegalModalType = 'story' | 'private-dining' | 'privacy' | 'terms' | null;
