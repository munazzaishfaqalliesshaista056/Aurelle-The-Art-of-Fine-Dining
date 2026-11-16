import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ABOUT_INTERIOR_IMAGE } from '../data/menuData';
import { useReveal } from '../hooks/useReveal';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutSectionProps {
  onDiscoverStory: () => void;
}

const HIGHLIGHTS = [
  '100% seasonal, sustainably harvested farm produce and coastal catch.',
  'Thoughtful culinary craft with zero artificial additives or refined sugars.',
  'A candlelit dining room designed for warm hospitality and lasting memories.',
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  onDiscoverStory,
}) => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white py-16 md:py-22 border-b border-[#E7E5E0]"
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-section ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-12">
          <h2
            id="about-heading"
            className="text-[26px] sm:text-[32px] font-light text-[#2D2A26] tracking-tight"
          >
            About <strong className="font-bold">Us:</strong>
          </h2>
          <p className="mt-2 text-sm sm:text-[15px] text-[#6B6965] max-w-xl mx-auto">
            What we are all about at Aurelle is pure seasonal dining for our guests and our planet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Editorial Photograph (User's Uploaded Candlelit Dining Room Photo) */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[500px] lg:h-[540px] overflow-hidden border border-[#E7E5E0] bg-[#151311] shadow-[0_18px_40px_-18px_rgba(45,42,38,0.22)]">
              <ImageWithFallback
                src={ABOUT_INTERIOR_IMAGE}
                alt="Candlelit fine dining room at Aurelle featuring crystal chandeliers, velvet chairs, marble tables, and framed gallery art"
                loading="lazy"
                fallbackTitle="Aurelle Dining Room"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Story Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#3E6B2C]">
              OUR STORY
            </p>
            <h3 className="mt-2 text-[26px] sm:text-[32px] leading-[1.2] font-bold text-[#2D2A26]">
              A Passion for Exceptional Food
            </h3>

            <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-[#6B6965]">
              <p>
                Founded on the belief that wholesome organic ingredients and refined culinary technique belong together, Aurelle brings together peak-harvest produce, wild-caught seafood, and an intimate candlelit dining room.
              </p>
              <p>
                Every morning our kitchen partners directly with regional growers and artisan millers—transforming honest ingredients into vibrant, balanced plates made fresh to order.
              </p>
            </div>

            <ul className="mt-6 space-y-3 border-t border-[#E7E5E0] pt-5">
              {HIGHLIGHTS.map((point, index) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-[#2D2A26]"
                >
                  <span className="font-bold text-[#ECC124] tabular-nums mt-0.5">
                    0{index + 1}.
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                type="button"
                onClick={onDiscoverStory}
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors shadow-xs"
              >
                <span>DISCOVER OUR STORY</span>
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
