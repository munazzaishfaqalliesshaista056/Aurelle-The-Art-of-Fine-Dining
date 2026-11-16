import heroGourmetDish from '../assets/images/hero_gourmet_dish_1794743098363.jpg';
import heroSteakPairing from '../assets/images/hero_steak_pairing_1794743098941.jpg';
import heroTastingCourse from '../assets/images/hero_tasting_course_1794743100495.jpg';
import promoCandlelitTable from '../assets/images/promo_candlelit_table_1794743101192.jpg';
import themeHeroOrganicWood from '../assets/images/theme_hero_organic_wood_1794746165572.jpg';
import themeOffersOliveHerbs from '../assets/images/theme_offers_olive_herbs_1794746165801.jpg';
import themeJoinGreenLeaves from '../assets/images/theme_join_green_leaves_1794746165675.jpg';
import signatureChefSpecial from '../assets/images/signature_chef_special_1794743102636.jpg';
import dishBurrataHeirloom from '../assets/images/dish_burrata_heirloom_1794743101934.jpg';
import dishTunaTartare from '../assets/images/dish_tuna_tartare_1794743102806.jpg';
import dishHerbSalmon from '../assets/images/dish_herb_salmon_1794743103168.jpg';
import dishGarlicPrawnPasta from '../assets/images/dish_garlic_prawn_pasta_1794743103712.jpg';
import dishRibeyeSteak from '../assets/images/dish_ribeye_steak_1794743104128.jpg';
import dishTruffleRisotto from '../assets/images/dish_truffle_risotto_1794743104760.jpg';
import dishMargheritaPizza from '../assets/images/dish_margherita_pizza_1794743105308.jpg';
import dishTruffleBiancaPizza from '../assets/images/dish_truffle_bianca_pizza_1794743105686.jpg';
import dishClassicTiramisu from '../assets/images/dish_classic_tiramisu_1794743106362.jpg';
import dishChocolateLavaCake from '../assets/images/dish_chocolate_lava_cake_1794743106767.jpg';
import dishMangoPassionMocktail from '../assets/images/dish_mango_passion_mocktail_1794743107200.jpg';
import dishSpicedBerrySpritz from '../assets/images/dish_spiced_berry_spritz_1794743108556.jpg';

import type {
  CategoryTile,
  HeroSlide,
  MenuCategory,
  MenuItem,
  Testimonial,
} from '../types/restaurant';

export const RESTAURANT_INFO = {
  name: 'Aurelle',
  tagline: 'THE ART OF FINE DINING',
  phoneDisplay: '+1 (212) 555-0194',
  phoneHref: 'tel:+12125550194',
  email: 'concierge@aurelledining.com',
  emailHref: 'mailto:concierge@aurelledining.com',
  promoNotice: 'Complimentary Delivery on Orders Above $50',
  address: '418 Mercer Promenade, Suite 200, New York, NY 10013',
  hours: {
    weekdays: '11:30 AM – 10:30 PM',
    weekends: '11:00 AM – 11:30 PM',
    holidays: '12:00 PM – 9:30 PM',
  },
};

export const PROMO_BANNER_IMAGE = promoCandlelitTable;
export const THEME_HERO_WOOD_IMAGE = themeHeroOrganicWood;
export const THEME_OFFERS_HERBS_IMAGE = themeOffersOliveHerbs;
export const THEME_JOIN_LEAVES_IMAGE = themeJoinGreenLeaves;
export const ABOUT_INTERIOR_IMAGE =
  '/assets/aistudio/c5e8494bf79194926978bde45b354fe2_97c1c1ba.jpg';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'EXPERIENCE EXCEPTIONAL DINING',
    titlePrefix: 'Exceptional Flavors,',
    titleHighlight: 'Unforgettable Moments',
    description:
      'Discover a refined dining experience where exceptional ingredients, inspired culinary artistry, and warm hospitality come together.',
    subline: 'Every plate tells a story. Every visit becomes a memory.',
    image: heroGourmetDish,
    imageAlt:
      'Pan-seared Atlantic salmon fillet with herb butter, charred asparagus, and saffron beurre blanc',
    caption: 'Autumn Tasting · Pan-Seared Atlantic Salmon',
  },
  {
    id: 'slide-2',
    eyebrow: 'DRY-AGED & CELLAR PAIRED',
    titlePrefix: 'Crafted With Fire,',
    titleHighlight: 'Served With Grace',
    description:
      'Prime cuts aged in-house for thirty-five days, kissed by white oak embers and paired with curated old-world vintages.',
    subline: 'An intimate evening crafted from cellar to table.',
    image: heroSteakPairing,
    imageAlt:
      'Sliced prime dry-aged ribeye steak with rosemary jus, roasted carrots, and red wine',
    caption: 'Cellar Selection · 35-Day Dry-Aged Ribeye',
  },
  {
    id: 'slide-3',
    eyebrow: 'CHEF TASTING COLLECTION',
    titlePrefix: 'Seasonal Harvest,',
    titleHighlight: 'Timeless Elegance',
    description:
      'From coastal diver scallops to black winter truffle risotto, our seasonal menu celebrates peak provenance in every course.',
    subline: 'Thoughtfully plated for celebratory gatherings.',
    image: heroTastingCourse,
    imageAlt:
      'Pan-seared diver scallops with golden champagne foam, caviar pearls, and edible blossoms',
    caption: 'Chef Tasting · Seared Diver Scallops & Caviar',
  },
];

export const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'cat-starters',
    label: 'Starters',
    image: dishBurrataHeirloom,
    imageAlt: 'Artisan starters featuring creamy Pugliese burrata and heirloom tomatoes',
  },
  {
    id: 'cat-main',
    label: 'Main Course',
    image: dishHerbSalmon,
    imageAlt: 'Main course herb-crusted salmon with baby potatoes and broccolini',
  },
  {
    id: 'cat-desserts',
    label: 'Desserts',
    image: dishClassicTiramisu,
    imageAlt: 'Classic layered Italian tiramisu dessert dusted with cocoa',
  },
  {
    id: 'cat-beverages',
    label: 'Beverages',
    image: dishSpicedBerrySpritz,
    imageAlt: 'Craft botanical blood orange and rosemary spritz beverage',
  },
  {
    id: 'cat-pizza',
    label: 'Pizza',
    image: dishMargheritaPizza,
    imageAlt: 'Wood-fired artisan Margherita pizza with fresh basil',
  },
  {
    id: 'cat-specials',
    label: "Chef's Specials",
    image: signatureChefSpecial,
    imageAlt: 'Chef specialty herb-crusted rack of lamb with wild morels',
  },
];

export const MENU_FILTER_TABS: MenuCategory[] = [
  'All Items',
  'Starters',
  'Main Course',
  'Desserts',
  'Beverages',
  'Pizza',
  "Chef's Specials",
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'herb-crusted-salmon',
    name: 'Herb-Crusted Salmon',
    category: 'Main Course',
    description:
      'Fresh salmon with aromatic herbs, seasonal vegetables, and a delicate butter sauce.',
    price: 24.99,
    rating: 4.8,
    reviewCount: 142,
    image: dishHerbSalmon,
    imageAlt: 'Herb-Crusted Salmon fillet with broccolini, roasted potatoes, and lemon butter sauce',
    badge: 'BESTSELLER',
    isChefSpecial: true,
    dietary: ['Gluten-Free'],
    pairingNote: 'Recommended with Chablis Premier Cru or sparkling mineral water.',
  },
  {
    id: 'creamy-garlic-prawn-pasta',
    name: 'Creamy Garlic Prawn Pasta',
    category: 'Main Course',
    description:
      'Handmade pasta tossed with tender prawns in a rich garlic cream sauce.',
    price: 21.99,
    rating: 4.7,
    reviewCount: 118,
    image: dishGarlicPrawnPasta,
    imageAlt: 'Handmade tagliolini pasta with seared tiger prawns and cherry tomato confit',
    badge: "CHEF'S PICK",
    dietary: ['Fresh Pasta'],
    pairingNote: 'Best enjoyed with crisp Vermentino or citrus botanicals.',
  },
  {
    id: 'signature-ribeye-steak',
    name: 'Signature Ribeye Steak',
    category: 'Main Course',
    description: 'Perfectly grilled premium steak served with roasted vegetables.',
    price: 29.99,
    rating: 4.9,
    reviewCount: 186,
    image: dishRibeyeSteak,
    imageAlt: 'Grilled prime ribeye steak sliced with thyme, roasted garlic, and root vegetables',
    badge: 'BESTSELLER',
    isChefSpecial: true,
    dietary: ['Gluten-Free'],
    pairingNote: 'Pairs gracefully with aged Bordeaux or Cabernet Sauvignon.',
  },
  {
    id: 'classic-tiramisu',
    name: 'Classic Tiramisu',
    category: 'Desserts',
    description:
      'Traditional Italian-inspired dessert layered with coffee and mascarpone.',
    price: 8.99,
    rating: 4.8,
    reviewCount: 164,
    image: dishClassicTiramisu,
    imageAlt: 'Classic Italian tiramisu layered with mascarpone cream and dark cocoa curl',
    dietary: ['Vegetarian'],
    pairingNote: 'Served best alongside single-origin espresso.',
  },
  {
    id: 'truffle-mushroom-risotto',
    name: 'Truffle Mushroom Risotto',
    category: 'Main Course',
    description:
      'Creamy arborio rice with wild mushrooms and delicate truffle aroma.',
    price: 18.99,
    rating: 4.7,
    reviewCount: 97,
    image: dishTruffleRisotto,
    imageAlt: 'Creamy arborio risotto topped with chanterelle mushrooms, parmesan, and black truffle',
    badge: 'NEW',
    isChefSpecial: true,
    dietary: ['Vegetarian', 'Gluten-Free'],
    pairingNote: 'Complements Pinot Noir or aged Parmigiano shavings.',
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'Pizza',
    description:
      'Fresh mozzarella, ripe tomatoes, basil, and a crisp artisan crust.',
    price: 16.99,
    rating: 4.8,
    reviewCount: 153,
    image: dishMargheritaPizza,
    imageAlt: 'Wood-fired Margherita pizza with fior di latte mozzarella and sweet basil',
    badge: 'BESTSELLER',
    dietary: ['Vegetarian'],
    pairingNote: '48-hour naturally leavened dough baked in a 850°F stone hearth.',
  },
  {
    id: 'mango-passion-mocktail',
    name: 'Mango Passion Mocktail',
    category: 'Beverages',
    description:
      'A refreshing tropical blend of mango, citrus, and passion fruit.',
    price: 7.99,
    rating: 4.9,
    reviewCount: 89,
    image: dishMangoPassionMocktail,
    imageAlt: 'Golden mango and passion fruit mocktail in fluted crystal coupe with mint',
    badge: 'NEW',
    dietary: ['Zero-Proof', 'Vegan'],
    pairingNote: 'Bright, aromatic, and pressed fresh to order.',
  },
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    description:
      'Warm chocolate dessert served with creamy vanilla ice cream.',
    price: 9.99,
    rating: 4.9,
    reviewCount: 175,
    image: dishChocolateLavaCake,
    imageAlt: 'Warm dark chocolate fondant cake with molten ganache and vanilla bean ice cream',
    badge: "CHEF'S PICK",
    dietary: ['Vegetarian'],
    pairingNote: 'Prepared with 70% Valrhona dark cacao and Madagascar vanilla.',
  },
  {
    id: 'heirloom-burrata-tartine',
    name: 'Heirloom Burrata & Sourdough',
    category: 'Starters',
    description:
      'Creamy Pugliese burrata with vine-ripened heirloom tomatoes, basil oil, and charred sourdough.',
    price: 15.5,
    rating: 4.8,
    reviewCount: 94,
    image: dishBurrataHeirloom,
    imageAlt: 'Creamy burrata with colorful heirloom tomatoes, basil oil, and toasted sourdough',
    badge: "CHEF'S PICK",
    dietary: ['Vegetarian'],
    pairingNote: 'Finished with 12-year aged Modena balsamic reduction.',
  },
  {
    id: 'yellowfin-tuna-tartare',
    name: 'Yellowfin Tuna Tartare',
    category: 'Starters',
    description:
      'Hand-diced yellowfin tuna layered with avocado mousse, yuzu ponzu, and black sesame tuile.',
    price: 19.5,
    rating: 4.9,
    reviewCount: 112,
    image: dishTunaTartare,
    imageAlt: 'Yellowfin tuna tartare with avocado mousse, yuzu droplets, and black sesame tuile',
    badge: 'NEW',
    isChefSpecial: true,
    dietary: ['Dairy-Free'],
    pairingNote: 'Bright citrus finish ideal before seafood or pasta mains.',
  },
  {
    id: 'wild-truffle-bianca-pizza',
    name: 'Wild Truffle Bianca Pizza',
    category: 'Pizza',
    description:
      'Wood-fired sourdough crust with fontina, caramelized shallots, cremini mushrooms, and fresh thyme.',
    price: 21.5,
    rating: 4.8,
    reviewCount: 84,
    image: dishTruffleBiancaPizza,
    imageAlt: 'Artisan white pizza with roasted wild mushrooms, melted fontina, and thyme',
    badge: "CHEF'S PICK",
    dietary: ['Vegetarian'],
    pairingNote: 'Finished tableside with cold-pressed white truffle oil.',
  },
  {
    id: 'blood-orange-rosemary-spritz',
    name: 'Blood Orange Rosemary Spritz',
    category: 'Beverages',
    description:
      'Botanical blood orange infusion shaken with garden rosemary, sparkling tonic, and clear ice.',
    price: 11.5,
    rating: 4.8,
    reviewCount: 76,
    image: dishSpicedBerrySpritz,
    imageAlt: 'Ruby blood orange and rosemary botanical spritz in crystal goblet',
    dietary: ['Zero-Proof', 'Vegan'],
    pairingNote: 'Crisp, bittersweet aperitif crafted for pre-dinner service.',
  },
];

export const SIGNATURE_DISH: MenuItem = {
  id: 'herb-crusted-rack-of-lamb',
  name: 'Herb-Crusted Rack of Lamb & Wild Morels',
  category: 'Main Course',
  description:
    'Pasture-raised rack of lamb roasted to a tender blush, finished with toasted herb persillade, velvety parsnip silk, foraged spring morels, and a tart pomegranate jus.',
  price: 38.0,
  rating: 5.0,
  reviewCount: 68,
  image: signatureChefSpecial,
  imageAlt:
    'Herb-crusted rack of lamb with wild morel mushrooms, parsnip puree, and pomegranate reduction',
  badge: "CHEF'S PICK",
  isChefSpecial: true,
  dietary: ['Chef Signature'],
  pairingNote: 'Executive Chef Julian Vance’s signature autumn centerpiece.',
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Every course arrived with remarkable poise. The herb-crusted salmon melted on the palate, and the warm candlelight made our anniversary unforgettable.',
    guestName: 'Elena Vance-Sterling',
    guestTitle: 'Editorial Director, Atelier Living',
    initials: 'EV',
    rating: 5,
    visitContext: 'Anniversary Dinner',
  },
  {
    id: 'test-2',
    quote:
      'From the yellowfin tuna tartare to the molten lava cake, the balance of textures and restraint in seasoning rivals Europe’s finest dining rooms.',
    guestName: 'Marcus Chen',
    guestTitle: 'Culinary Critic & Author',
    initials: 'MC',
    rating: 5,
    visitContext: 'Evening Tasting Menu',
  },
  {
    id: 'test-3',
    quote:
      'We ordered the dry-aged ribeye and truffle risotto for a private celebration at home—delivered warm, meticulously packed, and every bite extraordinary.',
    guestName: 'Claire & Henri Laurent',
    guestTitle: 'Private Dining Patrons',
    initials: 'CL',
    rating: 5,
    visitContext: 'Private Celebration',
  },
];
