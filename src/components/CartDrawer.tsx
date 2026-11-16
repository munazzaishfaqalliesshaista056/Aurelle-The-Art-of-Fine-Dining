import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import type { CartItem, OrderRecord } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onBrowseMenu: () => void;
  onCreateOrder: (payload: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }) => OrderRecord;
}

const FREE_DELIVERY_THRESHOLD = 50;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseMenu,
  onCreateOrder,
}) => {
  const [viewMode, setViewMode] = useState<'cart' | 'checkout-demo' | 'summary'>(
    'cart'
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const [customerAddressNote, setCustomerAddressNote] = useState<string | null>(null);
  const [savedOrderNumber, setSavedOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = window.setTimeout(() => {
        setViewMode('cart');
        setSavedOrderNumber(null);
      }, 250);
      return () => window.clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = items.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const totalCount = items.reduce((sum, entry) => sum + entry.quantity, 0);
  const qualifiesFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length === 0 || qualifiesFreeDelivery ? 0 : 6.5;
  const estimatedTotal = subtotal + deliveryFee;
  const amountRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleReviewDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      setCheckoutError('Please complete your name, phone number, and delivery address.');
      return;
    }
    setCheckoutError('');
    const created = onCreateOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      items,
      subtotal,
      deliveryFee,
      total: estimatedTotal,
    });
    setSavedOrderNumber(created.orderNumber);
    setCustomerAddressNote(created.deliveryAddress);
    setViewMode('summary');
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        className="absolute inset-0 bg-[#2D2A26]/55 backdrop-blur-xs"
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white border-l border-[#E7E5E0] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E7E5E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            {viewMode === 'checkout-demo' && (
              <button
                type="button"
                onClick={() => setViewMode('cart')}
                aria-label="Back to cart"
                className="p-1 -ml-1 text-[#6B6965] hover:text-[#2D2A26]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-[#ECC124]" strokeWidth={1.8} />
            <h2 className="text-lg font-bold text-[#2D2A26]">
              {viewMode === 'checkout-demo'
                ? 'Order Summary Review'
                : viewMode === 'summary'
                ? 'Demo Order Preview'
                : 'Your Dining Bag'}
            </h2>
            {viewMode === 'cart' && (
              <span className="text-xs text-[#6B6965] tabular-nums">
                ({totalCount})
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-1.5 text-[#6B6965] hover:text-[#2D2A26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Complimentary Delivery Progress */}
        {items.length > 0 && viewMode === 'cart' && (
          <div className="px-6 py-3 bg-[#F7F7F5] border-b border-[#E7E5E0] text-xs">
            <div className="flex items-center justify-between text-[#2D2A26] mb-1.5">
              <span>
                {qualifiesFreeDelivery
                  ? 'Complimentary delivery unlocked'
                  : `Add $${amountRemaining.toFixed(2)} more for complimentary delivery`}
              </span>
              <span className="tabular-nums font-bold text-[#3E6B2C]">
                {Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100))}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#E7E5E0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ECC124] transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (subtotal / FREE_DELIVERY_THRESHOLD) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 && viewMode !== 'summary' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#F7F7F5] border border-[#E7E5E0] flex items-center justify-center text-[#ECC124] mb-4">
                <ShoppingBag className="w-6 h-6" strokeWidth={1.6} />
              </div>
              <h3 className="text-lg font-bold text-[#2D2A26]">
                Your bag is currently empty
              </h3>
              <p className="mt-2 text-sm text-[#6B6965] max-w-xs">
                Explore our chef-crafted starters, mains, wood-fired pizzas, and botanical drinks to begin your order.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseMenu();
                }}
                className="mt-6 px-6 py-3 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors"
              >
                Explore Menu
              </button>
            </div>
          ) : viewMode === 'cart' ? (
            <ul className="divide-y divide-[#E7E5E0]">
              {items.map(({ item, quantity }) => (
                <li key={item.id} className="py-4 flex gap-4">
                  <div className="w-20 h-20 overflow-hidden bg-[#F7F7F5] shrink-0 border border-[#E7E5E0]">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.imageAlt}
                      fallbackTitle={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[15px] font-bold text-[#2D2A26] leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#6B6965] mt-0.5 tabular-nums">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from bag`}
                        className="p-1 text-[#6B6965] hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#E7E5E0] bg-[#F7F7F5]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center text-[#2D2A26] hover:text-[#3E6B2C]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#2D2A26] tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center text-[#2D2A26] hover:text-[#3E6B2C]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-base font-bold text-[#2D2A26] tabular-nums">
                        ${(item.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : viewMode === 'checkout-demo' ? (
            <form
              id="demo-checkout-form"
              onSubmit={handleReviewDemoSubmit}
              className="space-y-4"
            >
              <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E5E0] text-xs text-[#6B6965] leading-relaxed">
                Frontend checkout preview: enter sample delivery details below to inspect the finalized order summary. No payment is charged or transmitted.
              </div>

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Elena Sterling"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                >
                  Contact Phone *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (212) 555-0148"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
                >
                  Delivery Address *
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="245 Crosby Street, Apt 4B, New York, NY"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#ECC124] focus:outline-none text-sm"
                />
              </div>

              {checkoutError && (
                <p role="alert" className="text-xs text-red-700">
                  {checkoutError}
                </p>
              )}
            </form>
          ) : (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-[#F7F7F5] border border-[#3E6B2C]/35 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3E6B2C] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-[#2D2A26]">
                    Order Recorded · {savedOrderNumber || 'Demo'}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B6965] leading-relaxed">
                    Saved for <strong className="text-[#2D2A26]">{customerName}</strong> ({customerPhone}) at {customerAddressNote || deliveryAddress}. This order is now visible in the Admin Orders Manager.
                  </p>
                </div>
              </div>

              <div className="border border-[#E7E5E0] p-4 bg-white space-y-2 text-sm">
                {items.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-2 text-[#2D2A26]"
                  >
                    <span>
                      {quantity}&times; {item.name}
                    </span>
                    <span className="tabular-nums font-semibold">
                      ${(item.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-[#E7E5E0] flex justify-between font-bold text-[#2D2A26]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">${estimatedTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClearCart();
                  setViewMode('cart');
                  onClose();
                }}
                className="w-full py-3 bg-[#2D2A26] hover:bg-black text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors"
              >
                Reset Bag &amp; Close
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && viewMode !== 'summary' && (
          <div className="px-6 py-5 border-t border-[#E7E5E0] bg-[#F7F7F5] space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#6B6965]">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#2D2A26]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#6B6965]">
                <span>Delivery</span>
                <span className="tabular-nums text-[#2D2A26]">
                  {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E7E5E0] flex justify-between text-lg font-bold text-[#2D2A26]">
                <span>Estimated Total</span>
                <span className="tabular-nums">${estimatedTotal.toFixed(2)}</span>
              </div>
            </div>

            {viewMode === 'cart' ? (
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => setViewMode('checkout-demo')}
                  className="w-full py-3.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="w-full py-2 text-xs text-[#6B6965] hover:text-[#2D2A26] transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            ) : (
              <button
                type="submit"
                form="demo-checkout-form"
                className="w-full py-3.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-colors"
              >
                Preview Order Summary
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
