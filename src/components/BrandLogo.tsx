import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  compact?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  compact = false,
  onClick,
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#2D2A26]';
  const subColor = variant === 'light' ? 'text-white/75' : 'text-[#6B6965]';

  return (
    <a
      href="#home"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ECC124] shrink-0"
      aria-label="Aurelle – Organic & Fine Dining, Home"
    >
      {/* Circular emblem echoing the reference's organic badge mark */}
      <svg
        width={compact ? '36' : '42'}
        height={compact ? '36' : '42'}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <circle cx="22" cy="22" r="20" fill="#ECC124" />
        <circle
          cx="22"
          cy="22"
          r="16.5"
          stroke="#FFFFFF"
          strokeWidth="1.3"
          strokeDasharray="2 2"
        />
        <path
          d="M22 12C17.5 16 16.5 21.5 19.5 26C21 28.2 22 30 22 31.5C22 30 23 28.2 24.5 26C27.5 21.5 26.5 16 22 12Z"
          fill="#3E6B2C"
        />
        <path
          d="M22 16V31"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col text-left leading-none">
        <span
          className={`font-sans font-bold tracking-[0.12em] uppercase whitespace-nowrap ${
            compact ? 'text-base sm:text-lg' : 'text-lg md:text-xl'
          } ${textColor}`}
        >
          AURELLE
        </span>
        <span
          className={`mt-1 text-[9px] tracking-[0.2em] uppercase font-medium whitespace-nowrap ${subColor}`}
        >
          ORGANIC FINE DINING
        </span>
      </div>
    </a>
  );
};
