import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SIGNATURE_DISH } from '../data/menuData';
import { useReveal } from '../hooks/useReveal';
import type { MenuItem } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface SignatureExperienceProps {
  onExploreDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
}

export const SignatureExperience: React.FC<SignatureExperienceProps> = ({
  onExploreDish,
  onAddToCart,
}) => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="signature-experience"
      aria-labelledby="signature-heading"
      className="bg-[#F7F7F5] py-16 md:py-20 border-b border-[#E7E5E0]"
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-section ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-[#E7E5E0] p-6 sm:p-10 lg:p-12">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
            <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#3E6B2C]">
              CHEF&apos;S SIGNATURE EXPERIENCE
            </p>
            <h2
              id="signature-heading"
              className="text-[26px] sm:text-[32px] leading-[1.2] font-bold text-[#2D2A26]"
            >
              {SIGNATURE_DISH.name}
            </h2>
            <p className="text-[15px] leading-relaxed text-[#6B6965]">
              {SIGNATURE_DISH.description}
            </p>
            <p className="text-xs italic font-serif text-[#3E6B2C]">
              {SIGNATURE_DISH.pairingNote}
            </p>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#2D2A26] tabular-nums">
                ${SIGNATURE_DISH.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#6B6965] uppercase tracking-[0.1em]">
                Evening Tasting Feature
              </span>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onExploreDish(SIGNATURE_DISH)}
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors"
              >
                <span>EXPLORE DISH</span>
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => onAddToCart(SIGNATURE_DISH)}
                className="px-5 py-3 bg-white hover:bg-[#F7F7F5] text-[#2D2A26] border border-[#E7E5E0] hover:border-[#ECC124] text-xs font-bold tracking-[0.12em] uppercase rounded-xs transition-colors"
              >
                ADD TO ORDER
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDEAE4]">
              <ImageWithFallback
                src={SIGNATURE_DISH.image}
                alt={SIGNATURE_DISH.imageAlt}
                loading="lazy"
                fallbackTitle={SIGNATURE_DISH.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
