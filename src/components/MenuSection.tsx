import React, { useState } from 'react';
import { Check, ChevronRight, Star } from 'lucide-react';
import { MENU_FILTER_TABS } from '../data/menuData';
import { useReveal } from '../hooks/useReveal';
import type { MenuCategory, MenuItem } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface MenuSectionProps {
  menuItems: MenuItem[];
  activeCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  onAddToCart: (item: MenuItem) => void;
  onInspectDish: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onInspectDish,
}) => {
  const { ref, isVisible } = useReveal();
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === 'All Items') return true;
    if (activeCategory === "Chef's Specials") return Boolean(item.isChefSpecial);
    return item.category === activeCategory;
  });

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1100);
  };

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-white py-16 md:py-20 border-b border-[#E7E5E0]"
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-section ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div className="text-center mb-8">
          <h2
            id="menu-heading"
            className="text-[26px] sm:text-[32px] font-light text-[#2D2A26] tracking-tight"
          >
            This Week <strong className="font-bold">Special Meals:</strong>
          </h2>
          <p className="mt-2.5 text-sm sm:text-[15px] text-[#6B6965] max-w-xl mx-auto">
            Chef-crafted organic seasonal plates, handmade pastas, wood-fired classics, and cold-pressed botanicals.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter menu by category"
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {MENU_FILTER_TABS.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase rounded-xs border transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#2F5D28] text-white border-[#2F5D28] shadow-xs'
                    : 'bg-[#F7F7F5] text-[#2D2A26] border-[#E7E5E0] hover:border-[#ECC124] hover:text-[#3E6B2C]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#F7F7F5] border border-[#E7E5E0] p-10 text-center">
            <p className="text-lg font-medium text-[#2D2A26]">
              No dishes currently listed under {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => onSelectCategory('All Items')}
              className="mt-4 px-5 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold uppercase tracking-[0.14em] rounded-xs transition-colors"
            >
              View All Dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item) => {
              const isAdded = recentlyAddedId === item.id;
              return (
                <article
                  key={item.id}
                  className="group bg-white border border-[#E7E5E0] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(45,42,38,0.16)]"
                >
                  {/* Food Image */}
                  <button
                    type="button"
                    onClick={() => onInspectDish(item)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F7F5] text-left"
                    aria-label={`View details for ${item.name}`}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      fallbackTitle={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    {item.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#3E6B2C] border border-[#E7E5E0] px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] uppercase">
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Card Details */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between text-center">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] text-[#6B6965] mb-1.5">
                        <span className="uppercase tracking-[0.1em]">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1 tabular-nums text-[#2D2A26] font-semibold">
                          <Star className="w-3.5 h-3.5 fill-[#ECC124] text-[#ECC124]" />
                          <span>{item.rating.toFixed(1)}</span>
                          <span className="text-[#6B6965] font-normal">
                            ({item.reviewCount})
                          </span>
                        </span>
                      </div>

                      <h3 className="text-[16px] sm:text-[17px] leading-snug font-bold text-[#2D2A26] group-hover:text-[#3E6B2C] transition-colors">
                        <button
                          type="button"
                          onClick={() => onInspectDish(item)}
                          className="hover:underline decoration-[#ECC124] underline-offset-4"
                        >
                          {item.name}
                        </button>
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B6965] line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-[#E7E5E0] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-[#6B6965]">
                          Price
                        </span>
                        <span className="text-lg font-bold text-[#2D2A26] tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleQuickAdd(item)}
                        aria-label={`Add ${item.name} to cart`}
                        className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase rounded-xs transition-colors ${
                          isAdded
                            ? 'bg-[#3E6B2C] text-white'
                            : 'bg-[#2F5D28] hover:bg-[#23471E] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>ADDED TO BAG</span>
                          </>
                        ) : (
                          <>
                            <span>PURCHASE NOW</span>
                            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
