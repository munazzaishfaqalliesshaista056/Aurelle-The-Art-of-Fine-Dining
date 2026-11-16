import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CATEGORY_TILES } from '../data/menuData';
import { useReveal } from '../hooks/useReveal';
import type { MenuCategory } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface MenuCategoriesProps {
  activeCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
}

export const MenuCategories: React.FC<MenuCategoriesProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const { ref, isVisible } = useReveal();

  const handleCategoryClick = (category: MenuCategory) => {
    onSelectCategory(category);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-[#F7F7F5] py-14 md:py-16 border-b border-[#E7E5E0]"
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-section ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-10">
          <h2
            id="categories-heading"
            className="text-[26px] sm:text-[32px] font-light text-[#2D2A26] tracking-tight"
          >
            From Our <strong className="font-bold">Menu:</strong>
          </h2>
        </div>

        {/* Clean framed category cards echoing the reference's square bottom-labeled menu tiles */}
        <div className="flex lg:grid lg:grid-cols-6 gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-2 lg:pb-0 snap-x snap-mandatory">
          {CATEGORY_TILES.map((cat) => {
            const isSelected = activeCategory === cat.label;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.label)}
                className={`group flex flex-col shrink-0 w-44 sm:w-48 lg:w-auto snap-start bg-white border transition-all duration-200 overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-[#ECC124] ${
                  isSelected
                    ? 'border-[#ECC124] shadow-md -translate-y-0.5'
                    : 'border-[#E7E5E0] hover:border-[#ECC124] hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden bg-[#EDEAE4]">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.imageAlt}
                    loading="lazy"
                    fallbackTitle={cat.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="px-3 py-3 bg-white flex items-center justify-center gap-1 border-t border-[#E7E5E0]">
                  <span
                    className={`text-xs font-bold tracking-[0.08em] uppercase whitespace-nowrap ${
                      isSelected
                        ? 'text-[#3E6B2C]'
                        : 'text-[#2D2A26] group-hover:text-[#3E6B2C]'
                    }`}
                  >
                    {cat.label}
                  </span>
                  <ChevronRight
                    className="w-3.5 h-3.5 text-[#ECC124] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
