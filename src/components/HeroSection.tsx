import React from 'react';
import { ChevronRight } from 'lucide-react';
import { THEME_HERO_WOOD_IMAGE } from '../data/menuData';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onBookTable: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookTable,
  onExploreMenu,
}) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[470px] md:min-h-[540px] flex items-center justify-center overflow-hidden bg-[#241E19]"
    >
      {/* Overhead Rustic Wood & Fresh Organic Produce Backdrop */}
      <ImageWithFallback
        src={THEME_HERO_WOOD_IMAGE}
        alt="Rustic dark wooden table framed by fresh organic kale, spinach, heirloom tomatoes, garlic, rosemary, and golden potatoes"
        loading="eager"
        fallbackTitle="Aurelle Organic Kitchen"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Centered Radial Dark Scrim ensuring >= 4.5:1 contrast */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,17,14,0.72)_0%,rgba(20,17,14,0.45)_65%,rgba(20,17,14,0.58)_100%)]"
        aria-hidden="true"
      />

      {/* Centered Editorial Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-14 md:py-20 text-center text-white">
        <h1 className="text-[clamp(2rem,4.4vw,3.5rem)] font-bold tracking-[0.06em] uppercase leading-tight drop-shadow-sm">
          FOOD WITH A PURPOSE!
        </h1>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/92 max-w-xl mx-auto font-normal">
          Welcome to Aurelle Fine Dining. We craft seasonal, organic, and sustainably sourced dishes using farm-fresh produce, artisan grains, and wild-caught seafood—served warmly in our dining room or delivered fresh to your door.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onExploreMenu}
            className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>EXPLORE MENU</span>
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={onBookTable}
            className="inline-flex items-center gap-1.5 px-7 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/60 text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-all duration-200"
          >
            <span>BOOK A TABLE</span>
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Authentic Organic Culinary Seal Stamps */}
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-7 sm:gap-10 text-white/90"
          aria-label="Culinary standards"
        >
          {/* Stamp 1: Organic Harvest */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-white/80 border-dashed flex flex-col items-center justify-center -rotate-6">
              <span className="text-[8px] tracking-[0.16em] uppercase font-bold">
                100%
              </span>
              <span className="text-[10px] tracking-[0.08em] uppercase font-bold leading-tight">
                ORGANIC
              </span>
              <span className="text-[7px] tracking-[0.14em] uppercase opacity-80">
                SOURCED
              </span>
            </div>
          </div>

          {/* Stamp 2: All Natural Boxed Stamp */}
          <div className="px-4 py-1.5 border-2 border-white/85 text-center">
            <span className="block text-xs sm:text-sm font-bold tracking-[0.16em] uppercase">
              ALL NATURAL
            </span>
          </div>

          {/* Stamp 3: Chef Crafted */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-white/80 flex flex-col items-center justify-center rotate-6">
              <span className="text-[8px] tracking-[0.14em] uppercase font-bold">
                FRESH
              </span>
              <span className="text-[10px] tracking-[0.1em] uppercase font-bold leading-tight">
                DAILY
              </span>
              <span className="text-[7px] tracking-[0.14em] uppercase opacity-80">
                CRAFTED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
