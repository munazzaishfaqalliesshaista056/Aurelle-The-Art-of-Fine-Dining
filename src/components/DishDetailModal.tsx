import React, { useEffect, useState } from 'react';
import { Minus, Plus, Star, X } from 'lucide-react';
import type { MenuItem } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddMultiple: (dish: MenuItem, quantity: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddMultiple,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
    document.body.style.overflow = dish ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [dish]);

  if (!dish) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      <div
        className="absolute inset-0 bg-[#2D2A26]/65 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-white border border-[#E7E5E0] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#F7F7F5]">
          <ImageWithFallback
            src={dish.image}
            alt={dish.imageAlt}
            fallbackTitle={dish.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#3E6B2C]">
                {dish.category}
                {dish.badge ? ` · ${dish.badge}` : ''}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dish details"
                className="p-1 -mt-1 -mr-1 text-[#6B6965] hover:text-[#2D2A26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2
              id="dish-modal-title"
              className="mt-2 text-2xl font-bold text-[#2D2A26]"
            >
              {dish.name}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-xs text-[#6B6965] tabular-nums">
              <span className="inline-flex items-center gap-1 text-[#2D2A26] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#ECC124] text-[#ECC124]" />
                {dish.rating.toFixed(1)}
              </span>
              <span>·</span>
              <span>{dish.reviewCount} guest reviews</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#6B6965]">
              {dish.description}
            </p>

            {dish.pairingNote && (
              <div className="mt-4 pt-3.5 border-t border-[#E7E5E0]">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#3E6B2C] font-bold">
                  Sommelier &amp; Kitchen Note
                </p>
                <p className="mt-1 text-xs italic text-[#2D2A26]/85">
                  {dish.pairingNote}
                </p>
              </div>
            )}

            {dish.dietary && dish.dietary.length > 0 && (
              <p className="mt-3 text-xs text-[#6B6965]">
                Dietary: {dish.dietary.join(' · ')}
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E7E5E0] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#2D2A26] tabular-nums">
                ${(dish.price * quantity).toFixed(2)}
              </span>

              <div className="inline-flex items-center border border-[#E7E5E0] bg-[#F7F7F5]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 flex items-center justify-center text-[#2D2A26] hover:text-[#3E6B2C]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 flex items-center justify-center text-[#2D2A26] hover:text-[#3E6B2C]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddMultiple(dish, quantity);
                onClose();
              }}
              className="w-full py-3.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-colors"
            >
              Add to Dining Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
