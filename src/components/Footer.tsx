import React from 'react';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Share2,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import type { LegalModalType } from '../types/restaurant';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenModal: (type: LegalModalType) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReservation,
  onOpenModal,
  onOpenAdmin,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="footer-contact"
      className="bg-[#33302C] text-[#EAE8E3] border-t border-[#24211E]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Dark Textured Contact & Navigation Panel */}
        <div className="lg:col-span-7 px-6 sm:px-10 py-12 md:py-14 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <BrandLogo variant="light" />

            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ECC124] shrink-0" />
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="hover:text-[#ECC124] transition-colors tabular-nums font-medium"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#ECC124] shrink-0" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ECC124] shrink-0" />
                <a
                  href={RESTAURANT_INFO.emailHref}
                  className="hover:text-[#ECC124] transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('home');
                }}
                aria-label="Aurelle on Facebook"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#ECC124] text-white hover:text-[#2D2A26] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('home');
                }}
                aria-label="Aurelle on Instagram"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#ECC124] text-white hover:text-[#2D2A26] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#newsletter"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('newsletter');
                }}
                aria-label="Share Aurelle"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#ECC124] text-white hover:text-[#2D2A26] flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-white/12 space-y-3">
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/85"
            >
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('home');
                }}
                className="hover:text-[#ECC124] transition-colors"
              >
                Home
              </a>
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('menu');
                }}
                className="hover:text-[#ECC124] transition-colors"
              >
                On The Menu
              </a>
              <a
                href="#special-offers"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('special-offers');
                }}
                className="hover:text-[#ECC124] transition-colors"
              >
                Special Offers
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('about');
                }}
                className="hover:text-[#ECC124] transition-colors"
              >
                About Us
              </a>
              <button
                type="button"
                onClick={onOpenReservation}
                className="hover:text-[#ECC124] transition-colors"
              >
                Reservation
              </button>
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/60">
              <p>&copy; 2026 Aurelle Fine Dining. All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-[#ECC124] transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-[#ECC124] transition-colors"
                >
                  Terms &amp; Conditions
                </button>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-[#ECC124] transition-colors"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Light Neighborhood Street & Opening Hours Card echoing the reference footer map */}
        <div className="lg:col-span-5 bg-[#EFECE5] text-[#2D2A26] p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E7E5E0]">
          {/* Subtle architectural street grid SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
            viewBox="0 0 400 300"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 70 H400 M0 155 H400 M0 235 H400" stroke="#C9C4B8" strokeWidth="6" />
            <path d="M90 0 V300 M210 0 V300 M320 0 V300" stroke="#C9C4B8" strokeWidth="5" />
            <path d="M40 290 L380 20" stroke="#DDD8CD" strokeWidth="3" />
          </svg>

          <div className="relative z-10 bg-white/95 border border-[#E7E5E0] p-5 shadow-sm max-w-sm">
            <div className="flex items-start gap-2.5 mb-3">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#2D2A26]">
                  Aurelle Dining Room
                </p>
                <p className="text-xs text-[#6B6965]">
                  {RESTAURANT_INFO.address}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7E5E0] space-y-1.5 text-xs">
              <p className="font-bold uppercase tracking-[0.1em] text-[#3E6B2C] mb-1">
                Opening Hours
              </p>
              <div className="flex justify-between gap-3">
                <span className="text-[#6B6965]">Mon – Fri</span>
                <span className="font-semibold tabular-nums">
                  {RESTAURANT_INFO.hours.weekdays}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#6B6965]">Sat – Sun</span>
                <span className="font-semibold tabular-nums">
                  {RESTAURANT_INFO.hours.weekends}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#6B6965]">Holidays</span>
                <span className="font-semibold tabular-nums">
                  {RESTAURANT_INFO.hours.holidays}
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6">
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-5 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors shadow-xs"
            >
              Reserve Your Table &gt;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
