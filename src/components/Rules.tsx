import React from 'react';

interface RulesProps {
  onClose: () => void;
}

export const Rules: React.FC<RulesProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-green-400 flex items-center">
            <span className="mr-3">🌱</span>
            How to Play Plant Panic
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6 text-white">
          <section>
            <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center">
              <span className="mr-2">🎯</span>
              Objective
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Keep your digital plant alive as long as possible by balancing its sunlight and water needs. 
              Watch out for random weather events that will try to kill your precious plant!
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-orange-400 mb-3 flex items-center">
              <span className="mr-2">🎮</span>
              Controls
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
                <div className="text-2xl">☀️</div>
                <div>
                  <div className="font-bold text-yellow-400">Solar Button</div>
                  <div className="text-sm text-gray-400">Click and hold to give your plant sunlight</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
                <div className="text-2xl">💧</div>
                <div>
                  <div className="font-bold text-blue-400">Hydro Button</div>
                  <div className="text-sm text-gray-400">Click and hold to water your plant</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center">
              <span className="mr-2">⚡</span>
              Gameplay Mechanics
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Both sun and water levels naturally drain over time</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Keep both bars between 15-85% for optimal health</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Bars flash red when in danger zones</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Your plant grows larger as your score increases</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Maintain perfect balance (30-70%) for harmony bonuses</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center">
              <span className="mr-2">🌪️</span>
              Weather Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-red-900/30 p-3 rounded border border-red-600">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">🔥</span>
                  <span className="font-bold text-red-400">Heatwave</span>
                </div>
                <p className="text-sm text-gray-300">Rapidly drains water levels</p>
              </div>
              <div className="bg-blue-900/30 p-3 rounded border border-blue-600">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">🌧️</span>
                  <span className="font-bold text-blue-400">Rainstorm</span>
                </div>
                <p className="text-sm text-gray-300">Blocks sunlight, drains sun levels</p>
              </div>
              <div className="bg-cyan-900/30 p-3 rounded border border-cyan-600">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">❄️</span>
                  <span className="font-bold text-cyan-400">Frost</span>
                </div>
                <p className="text-sm text-gray-300">Slowly drains both resources</p>
              </div>
              <div className="bg-purple-900/30 p-3 rounded border border-purple-600">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">🌀</span>
                  <span className="font-bold text-purple-400">Chaos Storm</span>
                </div>
                <p className="text-sm text-gray-300">Unpredictable effects, screen shakes!</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
              <span className="mr-2">💀</span>
              Game Over Conditions
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span><strong className="text-red-400">Sun level hits 0:</strong> Plant withers in darkness</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span><strong className="text-red-400">Water level hits 0:</strong> Plant becomes crispy</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span><strong className="text-red-400">Sun level hits 100:</strong> Plant burns to death</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span><strong className="text-red-400">Water level hits 100:</strong> Plant drowns</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center">
              <span className="mr-2">🏆</span>
              Scoring & Tips
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Score increases every second you survive</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Weather events become more frequent as you progress</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Try to maintain harmony (30-70%) for streak bonuses</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Quick reactions during weather events are crucial</span>
              </li>
            </ul>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Got it! Let's Play 🌱
          </button>
        </div>
      </div>
    </div>
  );
};