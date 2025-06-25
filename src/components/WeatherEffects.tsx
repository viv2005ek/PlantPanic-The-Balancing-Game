import React from 'react';
import { WeatherEvent } from '../types/game';

interface WeatherEffectsProps {
  weather: WeatherEvent | null;
  timeLeft: number;
}

export const WeatherEffects: React.FC<WeatherEffectsProps> = ({ weather, timeLeft }) => {
  if (!weather) return null;

  const getWeatherOverlay = () => {
    switch (weather.type) {
      case 'heatwave':
        return 'bg-gradient-to-b from-red-500/20 to-orange-500/20';
      case 'rainstorm':
        return 'bg-gradient-to-b from-blue-500/20 to-gray-600/30';
      case 'frost':
        return 'bg-gradient-to-b from-cyan-300/20 to-blue-400/20';
      case 'chaos':
        return 'bg-gradient-to-b from-purple-500/20 to-pink-500/20';
      default:
        return '';
    }
  };

  const getWeatherAnimation = () => {
    switch (weather.type) {
      case 'chaos':
        return 'animate-pulse';
      case 'heatwave':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Weather Overlay */}
      <div className={`fixed inset-0 pointer-events-none ${getWeatherOverlay()} ${getWeatherAnimation()}`} />
      
      {/* Weather Alert */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl border-2 border-red-400 animate-bounce">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-spin">{weather.icon}</span>
            <div>
              <div className="font-bold text-lg">{weather.message}</div>
              <div className="text-sm opacity-90">
                {Math.ceil(timeLeft / 1000)}s remaining
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Particles */}
      {weather.type === 'rainstorm' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-400 opacity-60 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      )}

      {weather.type === 'chaos' && (
        <div className="fixed inset-0 animate-pulse" 
             style={{ 
               animation: 'shake 0.5s infinite',
               transform: 'translateX(0)' 
             }} 
        />
      )}

      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-1px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};