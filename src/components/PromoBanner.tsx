import React from 'react';
import { ChevronRight } from 'lucide-react';
import { THEME_OFFERS_HERBS_IMAGE } from '../data/menuData';
import { ImageWithFallback } from './ImageWithFallback';

interface PromoBannerProps {
  onOrderNow: () => void;
  onExploreMenu?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onOrderNow,
  onExploreMenu,
}) => {
  return (
    <section
      id="special-offers"
      aria-labelledby="special-offers-heading"
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#4C4233]"
    >
      {/* Sunlit Fresh Herbs, Mortar & Olive Oil Backdrop */}
      <ImageWithFallback
        src={THEME_OFFERS_HERBS_IMAGE}
        alt="Fresh organic basil, rosemary, wooden mortar and pestle beside golden extra virgin olive oil on rustic wood"
        loading="lazy"
        fallbackTitle="Special Offers"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/15" aria-hidden="true" />

      {/* Centered Translucent Frosted Offer Panel */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white/88 backdrop-blur-md border border-white/80 shadow-[0_20px_50px_-15px_rgba(20,17,14,0.38)] px-6 py-10 sm:px-10 sm:py-12 text-center">
          <h2
            id="special-offers-heading"
            className="text-[26px] sm:text-[32px] font-light text-[#2D2A26] tracking-tight"
          >
            Our <strong className="font-bold">Special Offers:</strong>
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#2D2A26]/15">
            {/* Left Offer */}
            <div className="pb-8 md:pb-0 md:pr-8 flex flex-col items-center justify-between">
              <div>
                <p className="text-xl sm:text-2xl font-bold tracking-[0.04em] text-[#2D2A26]">
                  20% OFF FIRST ORDER
                </p>
                <p className="mt-2 font-serif italic text-xl sm:text-2xl text-[#3E6B2C]">
                  Chef&apos;s Tasting Pairing
                </p>
                <p className="mt-3 text-sm text-[#4B4843] leading-relaxed">
                  Seasonal Starter
                  <br />
                  Signature Main Course
                  <br />
                  Artisan Dessert or Mocktail
                </p>
              </div>
              <button
                type="button"
                onClick={onOrderNow}
                className="mt-6 inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors shadow-xs"
              >
                <span>PURCHASE NOW</span>
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Right Offer */}
            <div className="pt-8 md:pt-0 md:pl-8 flex flex-col items-center justify-between">
              <div>
                <p className="text-xl sm:text-2xl font-bold tracking-[0.04em] text-[#2D2A26]">
                  FREE DELIVERY $50+
                </p>
                <p className="mt-2 font-serif italic text-xl sm:text-2xl text-[#3E6B2C]">
                  Fresh Farm-to-Table Box
                </p>
                <p className="mt-3 text-sm text-[#4B4843] leading-relaxed">
                  Complimentary Courier Delivery
                  <br />
                  Prepared Fresh to Order Daily
                  <br />
                  Curated Multi-Course Selections
                </p>
              </div>
              <button
                type="button"
                onClick={onExploreMenu || onOrderNow}
                className="mt-6 inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors shadow-xs"
              >
                <span>EXPLORE MENU</span>
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
