import React from "react";

interface DinoMascotProps {
  mood?: "happy" | "excited" | "thinking" | "cooking";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

export function DinoMascot({ 
  mood = "happy", 
  size = "md", 
  className = "",
  animate = true 
}: DinoMascotProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  const animationClass = animate ? "animate-float" : "";

  // Simple SVG dino chef
  return (
    <div className={`${sizeClasses[size]} ${animationClass} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="30" ry="25" fill="#4ade80" />
        
        {/* Head */}
        <ellipse cx="50" cy="35" rx="22" ry="20" fill="#4ade80" />
        
        {/* Snout */}
        <ellipse cx="65" cy="40" rx="12" ry="8" fill="#22c55e" />
        
        {/* Eye */}
        <circle cx="55" cy="30" r="6" fill="white" />
        <circle cx="57" cy="29" r="3" fill="#1a1a1a" />
        <circle cx="58" cy="28" r="1" fill="white" />
        
        {/* Nostril */}
        <circle cx="72" cy="38" r="2" fill="#166534" />
        
        {/* Mouth/smile */}
        <path 
          d={mood === "excited" ? "M 55 48 Q 65 55, 75 48" : "M 58 46 Q 65 50, 72 46"} 
          stroke="#166534" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Chef hat */}
        <ellipse cx="45" cy="18" rx="18" ry="8" fill="white" />
        <rect x="32" y="10" width="26" height="12" rx="3" fill="white" />
        <ellipse cx="45" cy="8" rx="12" ry="6" fill="white" />
        
        {/* Tiny arms */}
        <ellipse cx="25" cy="55" rx="6" ry="4" fill="#22c55e" transform="rotate(-30 25 55)" />
        <ellipse cx="75" cy="55" rx="6" ry="4" fill="#22c55e" transform="rotate(30 75 55)" />
        
        {/* Holding a spatula */}
        {mood === "cooking" && (
          <>
            <rect x="78" y="45" width="3" height="20" rx="1" fill="#8B4513" />
            <ellipse cx="79.5" cy="42" rx="6" ry="4" fill="#666" />
          </>
        )}
        
        {/* Spikes on back */}
        <path d="M 30 30 L 25 20 L 32 28" fill="#22c55e" />
        <path d="M 35 25 L 32 12 L 38 22" fill="#22c55e" />
        <path d="M 42 23 L 40 8 L 46 20" fill="#22c55e" />
        
        {/* Legs */}
        <ellipse cx="35" cy="82" rx="8" ry="5" fill="#22c55e" />
        <ellipse cx="65" cy="82" rx="8" ry="5" fill="#22c55e" />
        
        {/* Tail */}
        <path d="M 20 60 Q 5 70, 10 80" stroke="#4ade80" strokeWidth="12" fill="none" strokeLinecap="round" />
        
        {/* Blush */}
        {(mood === "happy" || mood === "excited") && (
          <ellipse cx="68" cy="42" rx="4" ry="2" fill="#fca5a5" opacity="0.6" />
        )}
        
        {/* Thinking bubbles */}
        {mood === "thinking" && (
          <>
            <circle cx="80" cy="20" r="3" fill="#d1d5db" />
            <circle cx="85" cy="12" r="4" fill="#d1d5db" />
            <circle cx="92" cy="5" r="5" fill="#d1d5db" />
          </>
        )}
      </svg>
    </div>
  );
}
