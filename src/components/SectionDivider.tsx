import React from 'react';

interface SectionDividerProps {
  light?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ light = false }) => {
  const lineColor = light ? 'bg-[#B68A48]/50' : 'bg-[#B68A48]/45';
  const diamondColor = 'border-[#B68A48]';

  return (
    <div className="flex items-center justify-center gap-3 mt-3" aria-hidden="true">
      <span className={`h-px w-10 ${lineColor}`} />
      <span className={`w-2 h-2 rotate-45 border ${diamondColor}`} />
      <span className={`h-px w-10 ${lineColor}`} />
    </div>
  );
};
