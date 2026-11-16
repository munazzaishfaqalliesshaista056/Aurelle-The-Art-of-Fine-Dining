import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { SIGNATURE_DISH } from '../data/menuData';
import type { MenuItem } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface SearchModalProps {
  menuItems: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onInspectDish: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  menuItems,
  isOpen,
  onClose,
  onAddToCart,
  onInspectDish,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const results = useMemo(() => {
    const allDishes = [...menuItems, SIGNATURE_DISH];
    const q = query.trim().toLowerCase();
    if (!q) return allDishes.slice(0, 6);
    return allDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(q) ||
        dish.category.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q)
    );
  }, [menuItems, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search Aurelle Menu"
    >
      <div
        className="absolute inset-0 bg-[#2D2A26]/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-white border border-[#E7E5E0] shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E7E5E0] flex items-center gap-3 bg-[#F7F7F5]">
          <Search className="w-5 h-5 text-[#3E6B2C] shrink-0" />
          <label htmlFor="menu-search-input" className="sr-only">
            Search dishes by name or ingredient
          </label>
          <input
            ref={inputRef}
            id="menu-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search salmon, ribeye, truffle risotto, tiramisu..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#2D2A26] placeholder:text-[#6B6965] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-[#6B6965] hover:text-[#2D2A26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B6965] mb-3">
            {query.trim()
              ? `Matching Dishes (${results.length})`
              : 'Popular Recommendations'}
          </p>

          {results.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#6B6965]">
              No dishes matched &ldquo;{query}&rdquo;. Try searching for salmon, pasta, pizza, or dessert.
            </div>
          ) : (
            <ul className="divide-y divide-[#E7E5E0]">
              {results.map((dish) => (
                <li
                  key={dish.id}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onInspectDish(dish);
                    }}
                    className="flex items-center gap-3.5 text-left min-w-0 flex-1 group"
                  >
                    <div className="w-14 h-14 overflow-hidden bg-[#F7F7F5] shrink-0 border border-[#E7E5E0]">
                      <ImageWithFallback
                        src={dish.image}
                        alt={dish.imageAlt}
                        fallbackTitle={dish.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-bold text-[#2D2A26] group-hover:text-[#3E6B2C] truncate">
                        {dish.name}
                      </p>
                      <p className="text-xs text-[#6B6965] truncate">
                        {dish.category} · ${dish.price.toFixed(2)}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onAddToCart(dish)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.1em] uppercase rounded-xs transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
