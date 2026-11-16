import { MENU_ITEMS } from '../data/menuData';
import type {
  MenuItem,
  OrderRecord,
  ReservationRecord,
} from '../types/restaurant';

export const STORAGE_KEYS = {
  MENU: 'aurelle_menu_items_v1',
  RESERVATIONS: 'aurelle_reservations_v1',
  ORDERS: 'aurelle_orders_v1',
  ADMIN_AUTH: 'aurelle_admin_authenticated_v1',
} as const;

function getOffsetIsoDate(daysFromToday: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().split('T')[0];
}

export const INITIAL_SAMPLE_RESERVATIONS: ReservationRecord[] = [
  {
    id: 'res-sample-1',
    referenceCode: 'AUR-842190',
    guestName: 'Elena Vance-Sterling',
    email: 'elena.sterling@atelierliving.com',
    phone: '+1 (212) 555-0142',
    date: getOffsetIsoDate(0),
    time: '7:00 PM',
    guests: 4,
    specialRequests: 'Window booth preferred for anniversary toast.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 45 * 60_000).toISOString(),
  },
  {
    id: 'res-sample-2',
    referenceCode: 'AUR-739104',
    guestName: 'Marcus Chen',
    email: 'm.chen@culinarypress.org',
    phone: '+1 (212) 555-0188',
    date: getOffsetIsoDate(0),
    time: '7:45 PM',
    guests: 2,
    specialRequests: 'Shellfish allergy for one guest.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
  },
  {
    id: 'res-sample-3',
    referenceCode: 'AUR-619283',
    guestName: 'Sophia & Liam Brooks',
    email: 'sophia.brooks@mercerlaw.com',
    phone: '+1 (646) 555-0175',
    date: getOffsetIsoDate(1),
    time: '6:15 PM',
    guests: 6,
    specialRequests: 'Vegetarian tasting pairing options.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
  {
    id: 'res-sample-4',
    referenceCode: 'AUR-504812',
    guestName: 'Henri Laurent',
    email: 'hlaurent@maisonlaurent.fr',
    phone: '+1 (917) 555-0131',
    date: getOffsetIsoDate(2),
    time: '8:30 PM',
    guests: 2,
    specialRequests: 'Quiet corner table.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 24 * 3600_000).toISOString(),
  },
  {
    id: 'res-sample-5',
    referenceCode: 'AUR-392045',
    guestName: 'Daniela Ortiz',
    email: 'd.ortiz@studiomercer.com',
    phone: '+1 (212) 555-0119',
    date: getOffsetIsoDate(1),
    time: '5:30 PM',
    guests: 3,
    specialRequests: 'Rescheduled to next week.',
    status: 'Cancelled',
    createdAt: new Date(Date.now() - 36 * 3600_000).toISOString(),
  },
];

export const INITIAL_SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: 'ord-sample-1',
    orderNumber: 'ORD-4092',
    customerName: 'Claire Montgomery',
    customerPhone: '+1 (212) 555-0164',
    deliveryAddress: '112 Greene Street, Penthouse B, New York, NY',
    items: [
      {
        id: 'herb-crusted-salmon',
        name: 'Herb-Crusted Salmon',
        price: 24.99,
        quantity: 2,
        image: MENU_ITEMS[0].image,
      },
      {
        id: 'mango-passion-mocktail',
        name: 'Mango Passion Mocktail',
        price: 7.99,
        quantity: 2,
        image: MENU_ITEMS[6].image,
      },
    ],
    subtotal: 65.96,
    deliveryFee: 0,
    total: 65.96,
    status: 'Pending',
    createdAt: new Date(Date.now() - 22 * 60_000).toISOString(),
  },
  {
    id: 'ord-sample-2',
    orderNumber: 'ORD-4091',
    customerName: 'Julian Mercer',
    customerPhone: '+1 (646) 555-0129',
    deliveryAddress: '480 Broome Street, Apt 5A, New York, NY',
    items: [
      {
        id: 'signature-ribeye-steak',
        name: 'Signature Ribeye Steak',
        price: 29.99,
        quantity: 1,
        image: MENU_ITEMS[2].image,
      },
      {
        id: 'truffle-mushroom-risotto',
        name: 'Truffle Mushroom Risotto',
        price: 18.99,
        quantity: 1,
        image: MENU_ITEMS[4].image,
      },
      {
        id: 'chocolate-lava-cake',
        name: 'Chocolate Lava Cake',
        price: 9.99,
        quantity: 1,
        image: MENU_ITEMS[7].image,
      },
    ],
    subtotal: 58.97,
    deliveryFee: 0,
    total: 58.97,
    status: 'Preparing',
    createdAt: new Date(Date.now() - 55 * 60_000).toISOString(),
  },
  {
    id: 'ord-sample-3',
    orderNumber: 'ORD-4090',
    customerName: 'Nadia Al-Mansoor',
    customerPhone: '+1 (917) 555-0183',
    deliveryAddress: '84 Wooster Street, Suite 3C, New York, NY',
    items: [
      {
        id: 'margherita-pizza',
        name: 'Margherita Pizza',
        price: 16.99,
        quantity: 2,
        image: MENU_ITEMS[5].image,
      },
      {
        id: 'heirloom-burrata-tartine',
        name: 'Heirloom Burrata & Sourdough',
        price: 15.5,
        quantity: 1,
        image: MENU_ITEMS[8].image,
      },
    ],
    subtotal: 49.48,
    deliveryFee: 6.5,
    total: 55.98,
    status: 'Pending',
    createdAt: new Date(Date.now() - 80 * 60_000).toISOString(),
  },
  {
    id: 'ord-sample-4',
    orderNumber: 'ORD-4089',
    customerName: 'Arthur Pendelton',
    customerPhone: '+1 (212) 555-0155',
    deliveryAddress: '215 Lafayette Street, Fl 4, New York, NY',
    items: [
      {
        id: 'creamy-garlic-prawn-pasta',
        name: 'Creamy Garlic Prawn Pasta',
        price: 21.99,
        quantity: 2,
        image: MENU_ITEMS[1].image,
      },
      {
        id: 'classic-tiramisu',
        name: 'Classic Tiramisu',
        price: 8.99,
        quantity: 2,
        image: MENU_ITEMS[3].image,
      },
    ],
    subtotal: 61.96,
    deliveryFee: 0,
    total: 61.96,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
  },
  {
    id: 'ord-sample-5',
    orderNumber: 'ORD-4088',
    customerName: 'Camille Moreau',
    customerPhone: '+1 (646) 555-0190',
    deliveryAddress: '310 Spring Street, Apt 11D, New York, NY',
    items: [
      {
        id: 'herb-crusted-salmon',
        name: 'Herb-Crusted Salmon',
        price: 24.99,
        quantity: 1,
        image: MENU_ITEMS[0].image,
      },
      {
        id: 'yellowfin-tuna-tartare',
        name: 'Yellowfin Tuna Tartare',
        price: 19.5,
        quantity: 1,
        image: MENU_ITEMS[9].image,
      },
      {
        id: 'blood-orange-rosemary-spritz',
        name: 'Blood Orange Rosemary Spritz',
        price: 11.5,
        quantity: 2,
        image: MENU_ITEMS[11].image,
      },
    ],
    subtotal: 67.49,
    deliveryFee: 0,
    total: 67.49,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 18 * 3600_000).toISOString(),
  },
];

export function loadStoredMenu(): MenuItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.MENU);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(MENU_ITEMS));
      return MENU_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return MENU_ITEMS;
  } catch {
    return MENU_ITEMS;
  }
}

export function loadStoredReservations(): ReservationRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (!raw) {
      window.localStorage.setItem(
        STORAGE_KEYS.RESERVATIONS,
        JSON.stringify(INITIAL_SAMPLE_RESERVATIONS)
      );
      return INITIAL_SAMPLE_RESERVATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_RESERVATIONS;
  } catch {
    return INITIAL_SAMPLE_RESERVATIONS;
  }
}

export function loadStoredOrders(): OrderRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      window.localStorage.setItem(
        STORAGE_KEYS.ORDERS,
        JSON.stringify(INITIAL_SAMPLE_ORDERS)
      );
      return INITIAL_SAMPLE_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_ORDERS;
  } catch {
    return INITIAL_SAMPLE_ORDERS;
  }
}
