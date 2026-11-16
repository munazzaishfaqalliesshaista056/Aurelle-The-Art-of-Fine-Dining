import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import type { LegalModalType } from '../types/restaurant';

interface LegalModalProps {
  modalType: LegalModalType;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  modalType,
  onClose,
  onOpenReservation,
}) => {
  useEffect(() => {
    document.body.style.overflow = modalType ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalType]);

  if (!modalType) return null;

  const contentMap: Record<
    Exclude<LegalModalType, null>,
    { eyebrow: string; title: string; paragraphs: string[]; showBookCta?: boolean }
  > = {
    story: {
      eyebrow: 'OUR CULINARY PHILOSOPHY',
      title: 'Seasonal Provenance & Unhurried Craft',
      paragraphs: [
        'At Aurelle, every menu begins at dawn with direct partnerships across regional organic farms, coastal day-boat captains, and artisan millers. Rather than masking ingredients, our kitchen lets peak harvest flavor lead.',
        'Under the direction of Executive Chef Julian Vance, slow-fermented sourdough crusts, cold-pressed olive oils, and wood-fired hearth cooking come together in an inviting dining room designed for genuine conversation.',
      ],
      showBookCta: true,
    },
    'private-dining': {
      eyebrow: 'PRIVATE DINING & EVENTS',
      title: 'The Mercer Salon & Tasting Room',
      paragraphs: [
        'Host intimate milestone dinners, executive gatherings, or bespoke tasting evenings for 10 to 34 guests inside our candlelit private salon.',
        `Our concierge team customizes multi-course seasonal menus, cellar pairings, and floral tablescapes tailored to your occasion. Reach us directly at ${RESTAURANT_INFO.phoneDisplay} or ${RESTAURANT_INFO.email}.`,
      ],
      showBookCta: true,
    },
    privacy: {
      eyebrow: 'LEGAL NOTICE',
      title: 'Privacy Policy',
      paragraphs: [
        'Aurelle Fine Dining respects guest privacy. Shopping bag selections are stored solely in your browser localStorage for convenience across page refreshes.',
        'Reservation and newsletter forms on this website operate as interactive frontend demonstrations and do not transmit or store personal records on external servers.',
      ],
    },
    terms: {
      eyebrow: 'LEGAL NOTICE',
      title: 'Terms & Conditions',
      paragraphs: [
        'Menu selections, seasonal availability, and pricing displayed on Aurelle Fine Dining are curated for dining room and local delivery service within our Manhattan coverage zone.',
        'Complimentary delivery applies automatically to eligible orders totaling $50.00 or more before applicable taxes.',
      ],
    },
  };

  const active = contentMap[modalType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div
        className="absolute inset-0 bg-[#2D2A26]/65 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-white border border-[#E7E5E0] shadow-2xl overflow-hidden">
        <div className="px-6 py-5 bg-[#F7F7F5] border-b border-[#E7E5E0] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#3E6B2C]">
              {active.eyebrow}
            </p>
            <h2
              id="info-modal-title"
              className="text-2xl font-bold text-[#2D2A26] mt-0.5"
            >
              {active.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#6B6965] hover:text-[#2D2A26]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm leading-relaxed text-[#6B6965]">
          {active.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}

          <div className="pt-3 flex flex-wrap justify-end gap-3">
            {active.showBookCta && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenReservation();
                }}
                className="px-5 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors"
              >
                Book a Table
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#E7E5E0] hover:border-[#ECC124] text-[#2D2A26] text-xs font-bold tracking-[0.12em] uppercase rounded-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
