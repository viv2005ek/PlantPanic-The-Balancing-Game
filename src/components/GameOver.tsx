import React from 'react';

interface GameOverProps {
  score: number;
  deathMessage: string;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, deathMessage, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-2 border-red-500 rounded-lg p-8 max-w-md mx-4 text-center">
        <div className="text-6xl mb-4 animate-bounce">💀</div>
        
        <h2 className="text-3xl font-bold text-red-500 mb-4">GAME OVER</h2>
        
        <div className="text-lg text-white mb-4 p-4 bg-gray-800 rounded border border-gray-600">
          {deathMessage}
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="text-2xl font-bold text-yellow-400">
            Final Score: {score.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            Survival Time: {Math.floor(score / 100)}s
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🌱 Try Again
        </button>
        
        <div className="mt-4 text-xs text-gray-500">
          Can you keep your plant alive longer?
        </div>
      </div>
    </div>
  );
};