import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import type { LegalModalType } from '../types/restaurant';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenSearch: () => void;
  onOpenModal: (type: LegalModalType) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenSearch,
  onOpenModal,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countBump, setCountBump] = useState(false);
  const prevCountRef = useRef(cartCount);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setCountBump(true);
      const timer = window.setTimeout(() => setCountBump(false), 320);
      prevCountRef.current = cartCount;
      return () => window.clearTimeout(timer);
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_6px_22px_-12px_rgba(45,42,38,0.18)] border-b border-[#E7E5E0]'
            : 'border-b border-[#E7E5E0]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[74px] flex items-center justify-between gap-4 lg:gap-8">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-1.5 -ml-1.5 text-[#2D2A26] hover:text-[#D4A912] transition-colors"
            >
              <Menu className="w-6 h-6" strokeWidth={1.7} />
            </button>
            <BrandLogo
              compact
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Center: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#2D2A26]"
          >
            {[
              { label: 'Home', id: 'home' },
              { label: 'On The Menu', id: 'menu' },
              { label: 'Special Offers', id: 'special-offers' },
              { label: 'About Us', id: 'about' },
              { label: 'Contacts', id: 'footer-contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#3E6B2C] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#ECC124] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Reserve + Sunny Gold CTA + Search + Bag */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => onOpenModal('private-dining')}
              className="hidden xl:inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6965] hover:text-[#2D2A26] transition-colors whitespace-nowrap shrink-0"
            >
              PRIVATE DINING
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              className="hidden sm:inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6965] hover:text-[#2F5D28] transition-colors whitespace-nowrap shrink-0"
            >
              ADMIN
            </button>

            <button
              type="button"
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-[#2F5D28] hover:bg-[#23471E] text-white text-[11px] font-bold tracking-[0.12em] uppercase rounded-xs transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <span>BOOK A TABLE</span>
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search menu"
              className="p-2 text-[#2D2A26] hover:text-[#3E6B2C] transition-colors"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open dining bag, ${cartCount} items`}
              className="relative p-2 text-[#2D2A26] hover:text-[#3E6B2C] transition-colors"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span
                className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#ECC124] text-[#2D2A26] text-[10px] font-bold tabular-nums transition-transform duration-200 ${
                  countBump ? 'scale-125' : 'scale-100'
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-[#2D2A26]/55 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
        <aside
          className={`relative w-80 max-w-[85vw] h-full bg-white border-r border-[#E7E5E0] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-label="Mobile Navigation"
        >
          <div>
            <div className="px-6 py-5 border-b border-[#E7E5E0] flex items-center justify-between">
              <BrandLogo compact onClick={() => setMobileMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-[#2D2A26] hover:text-[#D4A912]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="px-6 py-5 flex flex-col">
              {[
                { label: 'Home', id: 'home' },
                { label: 'On The Menu', id: 'menu' },
                { label: 'Special Offers', id: 'special-offers' },
                { label: 'About Us', id: 'about' },
                { label: 'Guest Reviews', id: 'testimonials' },
                { label: 'Contacts', id: 'footer-contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="text-left py-3.5 text-sm font-medium text-[#2D2A26] hover:text-[#3E6B2C] border-b border-[#E7E5E0]/70 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('private-dining');
                }}
                className="text-left py-3.5 text-sm font-medium text-[#2D2A26] hover:text-[#3E6B2C] border-b border-[#E7E5E0]/70 transition-colors"
              >
                Private Dining
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left py-3.5 text-sm font-medium text-[#6B6965] hover:text-[#2F5D28] border-b border-[#E7E5E0]/70 transition-colors"
              >
                Admin Console
              </button>
            </nav>
          </div>

          <div className="p-6 border-t border-[#E7E5E0] bg-[#F7F7F5] space-y-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 px-5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Book a Table</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-[#6B6965] space-y-1">
              <a
                href={RESTAURANT_INFO.phoneHref}
                className="block hover:text-[#2D2A26] tabular-nums"
              >
                {RESTAURANT_INFO.phoneDisplay}
              </a>
              <a
                href={RESTAURANT_INFO.emailHref}
                className="block hover:text-[#2D2A26]"
              >
                {RESTAURANT_INFO.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};
