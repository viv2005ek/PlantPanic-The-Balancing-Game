export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  sunLevel: number;
  waterLevel: number;
  score: number;
  plantHealth: number;
  gameOver: boolean;
  deathMessage: string;
  currentWeather: WeatherEvent | null;
  weatherTimeLeft: number;
  nextWeatherIn: number;
  streakCount: number;
  inHarmony: boolean;
}

export interface WeatherEvent {
  type: 'heatwave' | 'rainstorm' | 'frost' | 'chaos';
  name: string;
  icon: string;
  sunDrain: number;
  waterDrain: number;
  duration: number;
  message: string;
}

export interface PlantState {
  size: number;
  health: number;
  animation: 'idle' | 'happy' | 'thirsty' | 'burning' | 'drowning' | 'growing';
  rotation: number;
}