import { WeatherEvent } from '../types/game';

export const GAME_CONFIG = {
  MAX_LEVEL: 100,
  DRAIN_RATE: 0.5,
  FILL_RATE: 2,
  WEATHER_BASE_INTERVAL: 10000,
  WEATHER_MIN_INTERVAL: 5000,
  SCORE_INCREMENT: 100,
  HARMONY_THRESHOLD: 5, // seconds
  DANGER_THRESHOLD: 15,
  OVERFLOW_THRESHOLD: 85,
};

export const WEATHER_EVENTS: WeatherEvent[] = [
  {
    type: 'heatwave',
    name: 'Heatwave',
    icon: '🔥',
    sunDrain: 0,
    waterDrain: 3,
    duration: 5000,
    message: 'SCORCHING HEAT!'
  },
  {
    type: 'rainstorm', 
    name: 'Rainstorm',
    icon: '🌧️',
    sunDrain: 3,
    waterDrain: 0,
    duration: 5000,
    message: 'HEAVY RAIN!'
  },
  {
    type: 'frost',
    name: 'Frost',
    icon: '❄️',
    sunDrain: 1.5,
    waterDrain: 1.5,
    duration: 6000,
    message: 'FREEZING COLD!'
  },
  {
    type: 'chaos',
    name: 'Chaos Storm',
    icon: '🌀',
    sunDrain: 2,
    waterDrain: 2,
    duration: 4000,
    message: 'CHAOS UNLEASHED!'
  }
];

export const getRandomWeatherEvent = (): WeatherEvent => {
  return WEATHER_EVENTS[Math.floor(Math.random() * WEATHER_EVENTS.length)];
};

export const getDeathMessage = (sunLevel: number, waterLevel: number): string => {
  if (sunLevel <= 0 && waterLevel <= 0) {
    return "Your plant died of pure neglect! 😵";
  } else if (sunLevel <= 0) {
    return "Your plant withered in darkness! 🌑";
  } else if (waterLevel <= 0) {
    return "Your plant became a crispy snack! 🔥";
  } else if (sunLevel >= 100) {
    return "Your plant was fried to a crisp! ☀️💀";
  } else if (waterLevel >= 100) {
    return "Your plant drowned in love! 💧😵";
  }
  return "Your plant has ascended to plant heaven! 👼";
};

export const calculatePlantHealth = (sunLevel: number, waterLevel: number): number => {
  const sunHealth = sunLevel > 85 ? 85 - (sunLevel - 85) : sunLevel;
  const waterHealth = waterLevel > 85 ? 85 - (waterLevel - 85) : waterLevel;
  return Math.min(sunHealth, waterHealth);
};

export const isInHarmony = (sunLevel: number, waterLevel: number): boolean => {
  return sunLevel >= 30 && sunLevel <= 70 && waterLevel >= 30 && waterLevel <= 70;
};