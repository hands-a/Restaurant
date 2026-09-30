import React from "react";

const Logo = ({ className = "", variant = "dark", compact = false }) => {
  const isDark = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Custom SVG brand mark: plate + arc */}
      <div className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 group-hover:scale-105 ${isDark ? "bg-primary/10 border border-primary/20" : "bg-white/10 border border-white/20 group-hover:border-primary/50"}`}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Plate circle */}
          <circle cx="12" cy="14" r="7" stroke="#d97706" strokeWidth="1.5" />
          {/* Inner plate ring */}
          <circle cx="12" cy="14" r="4.5" stroke="#d97706" strokeWidth="0.8" strokeOpacity="0.5" />
          {/* Fork tine 1 */}
          <line x1="8" y1="2" x2="8" y2="8" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          {/* Fork tine 2 */}
          <line x1="10" y1="2" x2="10" y2="8" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          {/* Fork handle */}
          <line x1="9" y1="8" x2="9" y2="10" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
          {/* Spoon */}
          <ellipse cx="15.5" cy="4" rx="1.5" ry="2.5" stroke="#d97706" strokeWidth="1.2" />
          <line x1="15.5" y1="6.5" x2="15.5" y2="10" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {!compact && (
        <div className="flex flex-col justify-center">
          <span className={`text-2xl font-display font-bold tracking-tight leading-none ${isDark ? "text-text-primary" : "text-white"}`}>
            Restaurantly
          </span>
          <span className={`text-[10px] font-sans font-bold tracking-[0.28em] uppercase mt-0.5 ${isDark ? "text-primary" : "text-primary-light"}`}>
            Fine Dining & Co.
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
