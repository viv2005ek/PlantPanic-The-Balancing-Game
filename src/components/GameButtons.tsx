import React from 'react';

interface GameButtonsProps {
  onSunPress: (pressed: boolean) => void;
  onWaterPress: (pressed: boolean) => void;
  disabled: boolean;
}

export const GameButtons: React.FC<GameButtonsProps> = ({ 
  onSunPress, 
  onWaterPress, 
  disabled 
}) => {
  return (
    <div className="flex justify-center space-x-8 mt-8">
      {/* Sun Button */}
      <button
        className={`
          group relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 
          rounded-full shadow-lg transition-all duration-200 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 hover:shadow-2xl active:scale-95'}
          border-4 border-yellow-300
        `}
        onMouseDown={() => !disabled && onSunPress(true)}
        onMouseUp={() => !disabled && onSunPress(false)}
        onMouseLeave={() => !disabled && onSunPress(false)}
        onTouchStart={() => !disabled && onSunPress(true)}
        onTouchEnd={() => !disabled && onSunPress(false)}
        disabled={disabled}
      >
        <div className="text-4xl select-none">☀️</div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-30 transition-opacity duration-200 animate-pulse" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full border-2 border-yellow-300 opacity-0 group-active:opacity-100 group-active:animate-ping" />
        
        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-sm">
          SOLAR
        </div>
      </button>

      {/* Water Button */}
      <button
        className={`
          group relative w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 
          rounded-full shadow-lg transition-all duration-200 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 hover:shadow-2xl active:scale-95'}
          border-4 border-blue-300
        `}
        onMouseDown={() => !disabled && onWaterPress(true)}
        onMouseUp={() => !disabled && onWaterPress(false)}
        onMouseLeave={() => !disabled && onWaterPress(false)}
        onTouchStart={() => !disabled && onWaterPress(true)}
        onTouchEnd={() => !disabled && onWaterPress(false)}
        disabled={disabled}
      >
        <div className="text-4xl select-none">💧</div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-200 animate-pulse" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-0 group-active:opacity-100 group-active:animate-ping" />
        
        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-blue-400 font-bold text-sm">
          HYDRO
        </div>
      </button>
    </div>
  );
};