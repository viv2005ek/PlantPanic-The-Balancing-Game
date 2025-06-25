import React from 'react';

interface PlantProps {
  health: number;
  sunLevel: number;
  waterLevel: number;
  score: number;
}

export const Plant: React.FC<PlantProps> = ({ health, sunLevel, waterLevel, score }) => {
  const getPlantAnimation = () => {
    if (sunLevel <= 15 && waterLevel <= 15) return 'animate-pulse opacity-50';
    if (sunLevel <= 15) return 'animate-pulse text-gray-500';
    if (waterLevel <= 15) return 'animate-bounce text-yellow-500';
    if (sunLevel >= 85) return 'animate-spin text-red-500';
    if (waterLevel >= 85) return 'animate-pulse text-blue-300';
    if (health > 70) return 'animate-bounce text-green-400';
    return 'text-green-500';
  };

  const getPlantSize = () => {
    const baseSize = 8;
    const growthBonus = Math.floor(score / 5000);
    return Math.min(16, baseSize + growthBonus);
  };

  const getPlantEmoji = () => {
    if (sunLevel >= 85) return '🔥';
    if (waterLevel >= 85) return '🌊';
    if (sunLevel <= 15 && waterLevel <= 15) return '💀';
    if (sunLevel <= 15) return '🥀';
    if (waterLevel <= 15) return '🍂';
    if (health > 80) return '🌺';
    if (health > 60) return '🌻';
    if (health > 40) return '🌱';
    return '🌿';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Plant Sprite */}
      <div className="relative">
        <div 
          className={`transition-all duration-500 ${getPlantAnimation()}`}
          style={{ fontSize: `${getPlantSize()}rem` }}
        >
          {getPlantEmoji()}
        </div>
        
        {/* Health indicator particles */}
        {health > 80 && (
          <div className="absolute -top-4 -left-4 -right-4 -bottom-4 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 30}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Plant Status */}
      <div className="text-center">
        <div className="text-white font-bold mb-1">
          Health: {Math.round(health)}%
        </div>
        <div className="text-sm text-gray-400">
          {health > 90 && "Thriving! 🌟"}
          {health > 70 && health <= 90 && "Healthy 💚"}
          {health > 50 && health <= 70 && "Stable 🌿"}
          {health > 30 && health <= 50 && "Struggling 😰"}
          {health > 10 && health <= 30 && "Critical! 🚨"}
          {health <= 10 && "Near Death! ⚠️"}
        </div>
      </div>
    </div>
  );
};