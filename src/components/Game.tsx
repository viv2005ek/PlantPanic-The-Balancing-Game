import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameBars } from './GameBars';
import { Plant } from './Plant';
import { GameButtons } from './GameButtons';
import { WeatherEffects } from './WeatherEffects';
import { GameOver } from './GameOver';
import { Rules } from './Rules';
import { Pause, Play, HelpCircle } from 'lucide-react';

export const Game: React.FC = () => {
  const { gameState, startGame, pauseGame, setSunPressed, setWaterPressed } = useGameState();
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Weather Effects */}
      <WeatherEffects 
        weather={gameState.currentWeather} 
        timeLeft={gameState.weatherTimeLeft} 
      />

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Plant Panic
              </h1>
              <p className="text-gray-400 text-lg">The Balancing Act</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowRules(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <HelpCircle size={20} />
                <span>Rules</span>
              </button>
              
              {gameState.isPlaying && (
                <button
                  onClick={pauseGame}
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
                >
                  {gameState.isPaused ? <Play size={20} /> : <Pause size={20} />}
                  <span>{gameState.isPaused ? 'Resume' : 'Pause'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="relative z-10 px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {!gameState.isPlaying ? (
            /* Start Screen */
            <div className="text-center py-20">
              <div className="text-8xl mb-8 animate-bounce">🌱</div>
              <h2 className="text-3xl font-bold mb-4">Welcome to Plant Panic!</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Can you keep your digital plant alive in this chaotic weather simulator? 
                Balance sunlight and water while surviving random weather events!
              </p>
              <button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🌱 Start Growing!
              </button>
            </div>
          ) : (
            /* Game Screen */
            <div className="space-y-8">
              {/* Score Display */}
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  Score: {gameState.score.toLocaleString()}
                </div>
                <div className="text-gray-400">
                  Survival Time: {Math.floor(gameState.score / 100)}s
                </div>
              </div>

              {/* Game Bars */}
              <GameBars
                sunLevel={gameState.sunLevel}
                waterLevel={gameState.waterLevel}
                streakCount={gameState.streakCount}
                inHarmony={gameState.inHarmony}
              />

              {/* Plant */}
              <div className="flex justify-center py-8">
                <Plant
                  health={gameState.plantHealth}
                  sunLevel={gameState.sunLevel}
                  waterLevel={gameState.waterLevel}
                  score={gameState.score}
                />
              </div>

              {/* Game Buttons */}
              <GameButtons
                onSunPress={setSunPressed}
                onWaterPress={setWaterPressed}
                disabled={gameState.isPaused || gameState.gameOver}
              />

              {/* Pause Overlay */}
              {gameState.isPaused && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
                  <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-8 text-center">
                    <div className="text-4xl mb-4">⏸️</div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">Game Paused</h3>
                    <p className="text-gray-400 mb-6">Your plant is safe for now...</p>
                    <button
                      onClick={pauseGame}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Resume Game
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Game Over Modal */}
      {gameState.gameOver && (
        <GameOver
          score={gameState.score}
          deathMessage={gameState.deathMessage}
          onRestart={startGame}
        />
      )}

      {/* Rules Modal */}
      {showRules && <Rules onClose={() => setShowRules(false)} />}

      {/* Made with Bolt Badge */}
      <style jsx>{`
        .bolt-badge {
          transition: all 0.3s ease;
        }
        @keyframes badgeIntro {
          0% { transform: rotateY(-90deg); opacity: 0; }
          100% { transform: rotateY(0deg); opacity: 1; }
        }
        .bolt-badge-intro {
          animation: badgeIntro 0.8s ease-out 1s both;
        }
        .bolt-badge-intro.animated {
          animation: none;
        }
        @keyframes badgeHover {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(22deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .bolt-badge:hover {
          animation: badgeHover 0.6s ease-in-out;
        }
      `}</style>
      
      <div className="fixed bottom-4 right-4 z-50">
        <a 
          href="https://bolt.new/?rid=os72mi" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block transition-all duration-300 hover:shadow-2xl"
        >
          <img 
            src="https://storage.bolt.army/logotext_poweredby_360w.png" 
            alt="Powered by Bolt.new badge" 
            className="h-8 md:h-10 w-auto shadow-lg opacity-90 hover:opacity-100 bolt-badge bolt-badge-intro"
            onAnimationEnd={(e) => e.currentTarget.classList.add('animated')}
          />
        </a>
      </div>
    </div>
  );
};