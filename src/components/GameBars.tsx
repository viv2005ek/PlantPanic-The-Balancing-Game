import React from 'react';

interface GameBarsProps {
  sunLevel: number;
  waterLevel: number;
  streakCount: number;
  inHarmony: boolean;
}

export const GameBars: React.FC<GameBarsProps> = ({ 
  sunLevel, 
  waterLevel, 
  streakCount, 
  inHarmony 
}) => {
  const getSunBarColor = () => {
    if (sunLevel <= 15 || sunLevel >= 85) return 'from-red-500 to-red-600';
    return 'from-yellow-400 to-orange-500';
  };

  const getWaterBarColor = () => {
    if (waterLevel <= 15 || waterLevel >= 85) return 'from-red-500 to-red-600';
    return 'from-blue-400 to-cyan-500';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Sun Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">☀️</span>
            <span className="text-yellow-400 font-bold">Sun Energy</span>
          </div>
          <span className="text-white font-mono">{Math.round(sunLevel)}%</span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r transition-all duration-300 ${getSunBarColor()} ${
              (sunLevel <= 15 || sunLevel >= 85) ? 'animate-pulse' : ''
            }`}
            style={{ width: `${sunLevel}%` }}
          />
        </div>
        {(sunLevel <= 15 || sunLevel >= 85) && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold animate-bounce">
            {sunLevel <= 15 ? 'LOW SUN!' : 'TOO HOT!'}
          </div>
        )}
      </div>

      {/* Water Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💧</span>
            <span className="text-blue-400 font-bold">Water Level</span>
          </div>
          <span className="text-white font-mono">{Math.round(waterLevel)}%</span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r transition-all duration-300 ${getWaterBarColor()} ${
              (waterLevel <= 15 || waterLevel >= 85) ? 'animate-pulse' : ''
            }`}
            style={{ width: `${waterLevel}%` }}
          />
        </div>
        {(waterLevel <= 15 || waterLevel >= 85) && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold animate-bounce">
            {waterLevel <= 15 ? 'DRY SOIL!' : 'TOO WET!'}
          </div>
        )}
      </div>

      {/* Harmony Indicator */}
      {inHarmony && streakCount > 2 && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full animate-pulse">
            <span className="text-sm">🌿</span>
            <span className="font-bold">{streakCount}s in Perfect Harmony!</span>
            <span className="text-sm">🌿</span>
          </div>
        </div>
      )}
    </div>
  );
};