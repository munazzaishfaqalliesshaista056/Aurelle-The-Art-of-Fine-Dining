import React from 'react';
import { ChevronRight, ClipboardList, Truck, Utensils } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface BenefitsStripProps {
  onOrderNow?: () => void;
}

const STEPS = [
  {
    id: 'step-1',
    icon: ClipboardList,
    title: 'Choose From Our Seasonal Menu',
  },
  {
    id: 'step-2',
    icon: Truck,
    title: 'We Will Deliver Your Order Fresh',
  },
  {
    id: 'step-3',
    icon: Utensils,
    title: 'Enjoy Our Pure Organic Food!',
  },
];

export const BenefitsStrip: React.FC<BenefitsStripProps> = ({ onOrderNow }) => {
  const { ref, isVisible } = useReveal();

  const handleCta = () => {
    if (onOrderNow) {
      onOrderNow();
      return;
    }
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-white py-14 md:py-16 border-b border-[#E7E5E0]"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-section ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <h2
          id="how-it-works-heading"
          className="text-[26px] sm:text-[32px] font-light text-[#2D2A26] tracking-tight"
        >
          How It <strong className="font-bold">Works</strong>?
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center px-2"
              >
                <div className="w-[78px] h-[78px] rounded-full border-2 border-[#ECC124]/65 bg-white flex items-center justify-center text-[#6B6965] shadow-[0_4px_14px_-6px_rgba(45,42,38,0.12)]">
                  <Icon className="w-8 h-8" strokeWidth={1.3} />
                </div>
                <p className="mt-4 text-[14.5px] leading-snug font-medium text-[#2D2A26] max-w-[180px]">
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-9">
          <button
            type="button"
            onClick={handleCta}
            className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors shadow-xs"
          >
            <span>ORDER NOW</span>
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};
