import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, WeatherEvent } from '../types/game';
import { 
  GAME_CONFIG, 
  getRandomWeatherEvent, 
  getDeathMessage, 
  calculatePlantHealth, 
  isInHarmony 
} from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    sunLevel: 50,
    waterLevel: 50,
    score: 0,
    plantHealth: 75,
    gameOver: false,
    deathMessage: '',
    currentWeather: null,
    weatherTimeLeft: 0,
    nextWeatherIn: GAME_CONFIG.WEATHER_BASE_INTERVAL,
    streakCount: 0,
    inHarmony: true,
  });

  const intervalRef = useRef<NodeJS.Timeout>();
  const weatherTimeoutRef = useRef<NodeJS.Timeout>();
  const harmonyStartRef = useRef<number>(Date.now());
  const isSunPressed = useRef(false);
  const isWaterPressed = useRef(false);

  const updateGame = useCallback(() => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.isPaused || prev.gameOver) return prev;

      let newSunLevel = prev.sunLevel;
      let newWaterLevel = prev.waterLevel;

      // Apply button presses
      if (isSunPressed.current) {
        newSunLevel = Math.min(100, newSunLevel + GAME_CONFIG.FILL_RATE);
      }
      if (isWaterPressed.current) {
        newWaterLevel = Math.min(100, newWaterLevel + GAME_CONFIG.FILL_RATE);
      }

      // Apply natural drain
      newSunLevel = Math.max(0, newSunLevel - GAME_CONFIG.DRAIN_RATE);
      newWaterLevel = Math.max(0, newWaterLevel - GAME_CONFIG.DRAIN_RATE);

      // Apply weather effects
      if (prev.currentWeather) {
        newSunLevel = Math.max(0, newSunLevel - prev.currentWeather.sunDrain);
        newWaterLevel = Math.max(0, newWaterLevel - prev.currentWeather.waterDrain);
      }

      // Check for game over
      const isGameOver = newSunLevel <= 0 || newWaterLevel <= 0 || 
                        newSunLevel >= 100 || newWaterLevel >= 100;

      if (isGameOver) {
        return {
          ...prev,
          sunLevel: newSunLevel,
          waterLevel: newWaterLevel,
          gameOver: true,
          deathMessage: getDeathMessage(newSunLevel, newWaterLevel),
          plantHealth: 0,
        };
      }

      // Calculate harmony streak
      const currentlyInHarmony = isInHarmony(newSunLevel, newWaterLevel);
      let newStreakCount = prev.streakCount;
      
      if (currentlyInHarmony && prev.inHarmony) {
        const now = Date.now();
        if (now - harmonyStartRef.current >= 1000) {
          newStreakCount = Math.floor((now - harmonyStartRef.current) / 1000);
        }
      } else if (currentlyInHarmony && !prev.inHarmony) {
        harmonyStartRef.current = Date.now();
        newStreakCount = 0;
      } else if (!currentlyInHarmony) {
        newStreakCount = 0;
      }

      return {
        ...prev,
        sunLevel: newSunLevel,
        waterLevel: newWaterLevel,
        score: prev.score + GAME_CONFIG.SCORE_INCREMENT,
        plantHealth: calculatePlantHealth(newSunLevel, newWaterLevel),
        streakCount: newStreakCount,
        inHarmony: currentlyInHarmony,
      };
    });
  }, []);

  const triggerWeatherEvent = useCallback(() => {
    const event = getRandomWeatherEvent();
    setGameState(prev => ({
      ...prev,
      currentWeather: event,
      weatherTimeLeft: event.duration,
    }));

    weatherTimeoutRef.current = setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentWeather: null,
        weatherTimeLeft: 0,
        nextWeatherIn: Math.max(
          GAME_CONFIG.WEATHER_MIN_INTERVAL,
          GAME_CONFIG.WEATHER_BASE_INTERVAL - (prev.score / 10000) * 1000
        ),
      }));
    }, event.duration);
  }, []);

  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      isPaused: false,
      sunLevel: 50,
      waterLevel: 50,
      score: 0,
      plantHealth: 75,
      gameOver: false,
      deathMessage: '',
      currentWeather: null,
      weatherTimeLeft: 0,
      nextWeatherIn: GAME_CONFIG.WEATHER_BASE_INTERVAL,
      streakCount: 0,
      inHarmony: true,
    });
    harmonyStartRef.current = Date.now();
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const setSunPressed = useCallback((pressed: boolean) => {
    isSunPressed.current = pressed;
  }, []);

  const setWaterPressed = useCallback((pressed: boolean) => {
    isWaterPressed.current = pressed;
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
      intervalRef.current = setInterval(updateGame, 100);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver, updateGame]);

  // Weather system
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver && !gameState.currentWeather) {
      const timeout = setTimeout(triggerWeatherEvent, gameState.nextWeatherIn);
      return () => clearTimeout(timeout);
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver, gameState.currentWeather, gameState.nextWeatherIn, triggerWeatherEvent]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (weatherTimeoutRef.current) clearTimeout(weatherTimeoutRef.current);
    };
  }, []);

  return {
    gameState,
    startGame,
    pauseGame,
    setSunPressed,
    setWaterPressed,
  };
};