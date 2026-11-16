import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  X,
} from 'lucide-react';
import type {
  ReservationFormData,
  ReservationRecord,
} from '../types/restaurant';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateReservation: (payload: ReservationFormData) => ReservationRecord;
}

const TIME_SLOTS = [
  '12:00 PM',
  '1:15 PM',
  '5:30 PM',
  '6:15 PM',
  '7:00 PM',
  '7:45 PM',
  '8:30 PM',
  '9:15 PM',
];

function getTodayIsoDate(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60_000);
  return local.toISOString().split('T')[0];
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onCreateReservation,
}) => {
  const minDate = useMemo(() => getTodayIsoDate(), []);

  const [formData, setFormData] = useState<ReservationFormData>({
    guestName: '',
    email: '',
    phone: '',
    date: minDate,
    time: '7:00 PM',
    guests: 2,
    specialRequests: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReservationFormData, string>>
  >({});
  const [confirmation, setConfirmation] = useState<{
    referenceCode: string;
    data: ReservationFormData;
  } | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ReservationFormData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = formData.phone.replace(/\D/g, '');

    if (!formData.guestName.trim() || formData.guestName.trim().length < 2) {
      nextErrors.guestName = 'Please enter the primary guest name.';
    }
    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }
    if (!formData.date || formData.date < minDate) {
      nextErrors.date = 'Please select today or a future reservation date.';
    }
    if (!formData.time) {
      nextErrors.time = 'Please choose a preferred seating time.';
    }
    if (formData.guests < 1 || formData.guests > 12) {
      nextErrors.guests = 'Party size must be between 1 and 12 guests.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const saved = onCreateReservation(formData);
    setConfirmation({
      referenceCode: saved.referenceCode,
      data: formData,
    });
  };

  const resetAndClose = () => {
    setConfirmation(null);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
    >
      <div
        className="absolute inset-0 bg-[#2D2A26]/65 backdrop-blur-xs"
        onClick={resetAndClose}
      />

      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border border-[#E7E5E0] shadow-2xl">
        <div className="px-6 sm:px-8 py-5 border-b border-[#E7E5E0] flex items-center justify-between bg-[#F7F7F5]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3E6B2C]">
              AURELLE CONCIERGE
            </p>
            <h2
              id="reservation-modal-title"
              className="text-2xl font-bold text-[#2D2A26] mt-0.5"
            >
              Reserve Your Table
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close reservation modal"
            className="p-2 text-[#6B6965] hover:text-[#2D2A26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {confirmation ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#ECC124]/20 flex items-center justify-center text-[#3E6B2C]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#3E6B2C]">
                  Demonstration Request Recorded · {confirmation.referenceCode}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-[#2D2A26]">
                  Thank You, {confirmation.data.guestName}
                </h3>
                <p className="mt-2 text-sm text-[#6B6965] max-w-md mx-auto leading-relaxed">
                  Please note: this interactive form is a frontend reservation demonstration. No live table has been booked with the restaurant, as no backend reservation API is connected yet.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-[#F7F7F5] border border-[#E7E5E0] p-4 text-left text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B6965]">Date</span>
                  <span className="font-semibold text-[#2D2A26] tabular-nums">
                    {confirmation.data.date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6965]">Seating Time</span>
                  <span className="font-semibold text-[#2D2A26] tabular-nums">
                    {confirmation.data.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6965]">Party Size</span>
                  <span className="font-semibold text-[#2D2A26] tabular-nums">
                    {confirmation.data.guests}{' '}
                    {confirmation.data.guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                {confirmation.data.specialRequests && (
                  <div className="pt-2 border-t border-[#E7E5E0]">
                    <span className="text-xs uppercase tracking-wider text-[#6B6965] block">
                      Notes
                    </span>
                    <span className="text-[#2D2A26]">
                      {confirmation.data.specialRequests}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  className="px-5 py-2.5 border border-[#E7E5E0] hover:border-[#ECC124] text-xs font-bold tracking-[0.14em] uppercase rounded-xs text-[#2D2A26]"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors"
                >
                  Return to Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                  >
                    Guest Name <span className="text-[#3E6B2C]">*</span>
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={(e) =>
                      setFormData({ ...formData, guestName: e.target.value })
                    }
                    placeholder="Claire Laurent"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm text-[#2D2A26]"
                  />
                  {errors.guestName && (
                    <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.guestName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="res-email"
                    className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                  >
                    Email Address <span className="text-[#3E6B2C]">*</span>
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="claire@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm text-[#2D2A26]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-phone"
                    className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                  >
                    Contact Number <span className="text-[#3E6B2C]">*</span>
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (212) 555-0194"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm text-[#2D2A26] tabular-nums"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="res-guests"
                    className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                  >
                    Number of Guests <span className="text-[#3E6B2C]">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#3E6B2C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="res-guests"
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm text-[#2D2A26] tabular-nums"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.guests && (
                    <p className="mt-1 text-xs text-red-700">{errors.guests}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-date"
                    className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                  >
                    Reservation Date <span className="text-[#3E6B2C]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#3E6B2C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="res-date"
                      type="date"
                      min={minDate}
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm text-[#2D2A26] tabular-nums"
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-700">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="res-time"
                    className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                  >
                    Reservation Time <span className="text-[#3E6B2C]">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#3E6B2C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="res-time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm text-[#2D2A26] tabular-nums"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-xs text-red-700">{errors.time}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="res-requests"
                  className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                >
                  Special Requests{' '}
                  <span className="text-[#6B6965] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="res-requests"
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialRequests: e.target.value,
                    })
                  }
                  placeholder="Dietary preferences, window seating, or celebration notes..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm text-[#2D2A26]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-[#6B6965]">
                  Interactive reservation preview · Fields marked * are required.
                </p>
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-colors whitespace-nowrap"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
