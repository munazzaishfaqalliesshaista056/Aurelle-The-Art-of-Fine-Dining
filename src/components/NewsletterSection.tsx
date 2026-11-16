import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { THEME_JOIN_LEAVES_IMAGE } from '../data/menuData';
import { ImageWithFallback } from './ImageWithFallback';

export const NewsletterSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address (e.g., guest@domain.com).');
      return;
    }

    setError('');
    setSubmittedEmail(trimmedEmail);
    setEmail('');
    setGuestName('');
  };

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="relative w-full py-16 md:py-20 overflow-hidden bg-[#27461A]"
    >
      {/* Lush Sunlit Green Leaves Backdrop */}
      <ImageWithFallback
        src={THEME_JOIN_LEAVES_IMAGE}
        alt="Sunlit fresh organic spinach and basil leaves"
        loading="lazy"
        fallbackTitle="Fresh Organic Leaves"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-[#1B3111]/45"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center text-white">
        <h2
          id="newsletter-heading"
          className="text-[28px] sm:text-[34px] font-light tracking-tight"
        >
          Join Us <strong className="font-bold">Today!</strong>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/95">
          Subscribe to Receive Exclusive Seasonal Menus, Tasting Invitations &amp; Fresh Offers!
        </p>

        {submittedEmail ? (
          <div
            role="status"
            className="mt-7 bg-white/92 backdrop-blur-sm text-[#2D2A26] rounded-xs p-5 text-left flex items-start gap-3 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-[#3E6B2C] shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold">
                Subscription preview confirmed for {submittedEmail}
              </p>
              <p className="mt-1 text-xs text-[#6B6965] leading-relaxed">
                This is an interactive frontend demonstration; no external mailing list or backend database is connected in this static preview.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedEmail(null)}
                className="mt-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3E6B2C] underline underline-offset-4"
              >
                Use another email
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-7 max-w-md mx-auto space-y-3"
          >
            <div>
              <label htmlFor="newsletter-name" className="sr-only">
                Full Name
              </label>
              <input
                id="newsletter-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your Name (Optional)"
                className="w-full px-4 py-3 bg-white/88 backdrop-blur-xs border border-white/70 focus:bg-white focus:border-[#ECC124] focus:outline-none rounded-xs text-sm text-[#2D2A26] placeholder:text-[#6B6965]"
              />
            </div>

            <div>
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="E-mail Address"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'newsletter-error' : undefined}
                className="w-full px-4 py-3 bg-white/88 backdrop-blur-xs border border-white/70 focus:bg-white focus:border-[#ECC124] focus:outline-none rounded-xs text-sm text-[#2D2A26] placeholder:text-[#6B6965]"
              />
            </div>

            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="flex items-center justify-center gap-1.5 text-xs bg-red-950/75 text-white px-3 py-1.5 rounded-xs"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}

            <div className="pt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-8 py-3 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs shadow-md transition-colors"
              >
                <span>SUBSCRIBE NOW</span>
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
