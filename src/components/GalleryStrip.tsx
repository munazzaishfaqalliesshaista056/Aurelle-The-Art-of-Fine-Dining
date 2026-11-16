import React from 'react';
import { Camera } from 'lucide-react';
import type { MenuItem } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface GalleryStripProps {
  menuItems: MenuItem[];
  onInspectDish: (dish: MenuItem) => void;
}

export const GalleryStrip: React.FC<GalleryStripProps> = ({
  menuItems,
  onInspectDish,
}) => {
  const galleryDishes = menuItems.slice(0, 8);

  return (
    <section aria-label="Aurelle Kitchen Gallery">
      {/* Sunny Harvest Gold Gallery Header Strip */}
      <div className="bg-[#ECC124] py-3.5 px-4 text-center">
        <p className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#2D2A26]">
          <Camera className="w-4 h-4" strokeWidth={2} />
          <span>AURELLE&apos;S KITCHEN GALLERY:</span>
        </p>
      </div>

      {/* Seamless Photo Strip */}
      <div className="grid grid-cols-4 lg:grid-cols-8 bg-[#2D2A26]">
        {galleryDishes.map((dish) => (
          <button
            key={dish.id}
            type="button"
            onClick={() => onInspectDish(dish)}
            aria-label={`Inspect ${dish.name}`}
            className="group relative aspect-square overflow-hidden focus-visible:outline-2 focus-visible:outline-[#ECC124]"
          >
            <ImageWithFallback
              src={dish.image}
              alt={dish.imageAlt}
              loading="lazy"
              fallbackTitle={dish.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#2D2A26]/0 group-hover:bg-[#2D2A26]/35 transition-colors" />
          </button>
        ))}
      </div>
    </section>
  );
};
