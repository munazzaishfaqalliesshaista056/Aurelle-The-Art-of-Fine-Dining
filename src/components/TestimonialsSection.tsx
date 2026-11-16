import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';
import { useReveal } from '../hooks/useReveal';

export const TestimonialsSection: React.FC = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white py-16 md:py-20 border-b border-[#E7E5E0]"
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-section ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-[26px] sm:text-[32px] font-light text-[#2D2A26] tracking-tight"
          >
            What Our <strong className="font-bold">Guests Say:</strong>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="bg-[#F7F7F5] border border-[#E7E5E0] p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-200 hover:shadow-md"
            >
              <div>
                <div
                  className="flex items-center gap-1 mb-4"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-[#ECC124] text-[#ECC124]"
                    />
                  ))}
                </div>
                <blockquote className="text-[14.5px] leading-[1.7] text-[#2D2A26]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E5E0] flex items-center gap-3.5">
                <div
                  className="w-10 h-10 rounded-full bg-[#ECC124]/20 border border-[#ECC124] flex items-center justify-center text-xs font-bold text-[#2D2A26] shrink-0"
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#2D2A26] truncate">
                    {item.guestName}
                  </p>
                  <p className="text-xs text-[#6B6965] truncate">
                    {item.guestTitle} · {item.visitContext}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
