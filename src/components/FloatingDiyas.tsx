import React from 'react';

export const FloatingDiyas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Top Left Floating Diya */}
      <div className="absolute -top-6 -left-6 sm:top-12 sm:left-8 opacity-25 hover:opacity-40 transition-opacity animate-float-slow">
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="40" r="28" fill="#F7C85B" opacity="0.25" filter="blur(8px)" />
          <path d="M50 16 C44 28 42 36 50 48 C58 36 56 28 50 16 Z" fill="#F7C85B" className="diya-flame-anim" />
          <path d="M20 52 Q50 78 80 52 Q72 80 50 80 Q28 80 20 52 Z" fill="#D49228" stroke="#F7C85B" strokeWidth="1.5" />
          <ellipse cx="50" cy="52" rx="30" ry="7" fill="#8C4A14" />
        </svg>
      </div>

      {/* Top Right Floating Diya */}
      <div className="absolute top-24 right-4 sm:right-12 opacity-30 animate-float-slow [animation-delay:2s]">
        <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="40" r="25" fill="#F7C85B" opacity="0.3" filter="blur(8px)" />
          <path d="M50 16 C44 28 42 36 50 48 C58 36 56 28 50 16 Z" fill="#FFA439" className="diya-flame-anim" />
          <path d="M20 52 Q50 78 80 52 Q72 80 50 80 Q28 80 20 52 Z" fill="#D49228" stroke="#F7C85B" strokeWidth="1.5" />
          <ellipse cx="50" cy="52" rx="30" ry="7" fill="#8C4A14" />
        </svg>
      </div>

      {/* Bottom Left Floating Diya */}
      <div className="absolute bottom-20 left-4 sm:left-14 opacity-20 animate-float-slow [animation-delay:4s]">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="40" r="26" fill="#F7C85B" opacity="0.2" filter="blur(10px)" />
          <path d="M50 16 C44 28 42 36 50 48 C58 36 56 28 50 16 Z" fill="#F7C85B" className="diya-flame-anim" />
          <path d="M20 52 Q50 78 80 52 Q72 80 50 80 Q28 80 20 52 Z" fill="#B87333" stroke="#F7C85B" strokeWidth="1.5" />
          <ellipse cx="50" cy="52" rx="30" ry="7" fill="#5C2E0B" />
        </svg>
      </div>

      {/* Bottom Right Floating Diya */}
      <div className="absolute bottom-32 -right-4 sm:right-16 opacity-25 animate-float-slow [animation-delay:1.5s]">
        <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="40" r="24" fill="#FFA439" opacity="0.25" filter="blur(8px)" />
          <path d="M50 16 C44 28 42 36 50 48 C58 36 56 28 50 16 Z" fill="#F7C85B" className="diya-flame-anim" />
          <path d="M20 52 Q50 78 80 52 Q72 80 50 80 Q28 80 20 52 Z" fill="#D49228" stroke="#F7C85B" strokeWidth="1.5" />
          <ellipse cx="50" cy="52" rx="30" ry="7" fill="#8C4A14" />
        </svg>
      </div>
    </div>
  );
};
