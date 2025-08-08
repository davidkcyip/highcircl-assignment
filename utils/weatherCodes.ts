import {
  WiDaySunny,
  WiDayCloudy,
  WiDaySunnyOvercast,
  WiFog,
  WiDaySprinkle,
  WiDayShowers,
  WiDayRain,
  WiDaySnow,
  WiDayThunderstorm,
  WiDaySnowThunderstorm,
} from "react-icons/wi";
import { IconType } from "react-icons";

export interface WeatherCode {
  description: string;
  Icon: IconType;
}

const WEATHER_CODES: Record<number, WeatherCode> = {
  0: {
    description: "Clear Sky",
    Icon: WiDaySunny,
  },
  1: {
    description: "Mainly clear",
    Icon: WiDaySunny,
  },
  2: {
    description: "Partly cloudy",
    Icon: WiDayCloudy,
  },
  3: {
    description: "Overcast",
    Icon: WiDaySunnyOvercast,
  },
  45: {
    description: "Foggy",
    Icon: WiFog,
  },
  48: {
    description: "Depositing Rime Fog",
    Icon: WiFog,
  },
  51: {
    description: "Light drizzle",
    Icon: WiDaySprinkle,
  },
  53: {
    description: "Moderate drizzle",
    Icon: WiDaySprinkle,
  },
  55: {
    description: "Dense drizzle",
    Icon: WiDaySprinkle,
  },
  56: {
    description: "Light freezing drizzle",
    Icon: WiDaySprinkle,
  },
  57: {
    description: "Dense freezing drizzle",
    Icon: WiDaySprinkle,
  },
  61: {
    description: "Slight rain",
    Icon: WiDayShowers,
  },
  63: {
    description: "Moderate rain",
    Icon: WiDayShowers,
  },
  65: {
    description: "Heavy rain",
    Icon: WiDayRain,
  },
  66: {
    description: "Light freezing rain",
    Icon: WiDayShowers,
  },
  67: {
    description: "Heavy freezing rain",
    Icon: WiDayRain,
  },
  71: {
    description: "Slight snow fall",
    Icon: WiDaySnow,
  },
  73: {
    description: "Moderate snow fall",
    Icon: WiDaySnow,
  },
  75: {
    description: "Heavy snow fall",
    Icon: WiDaySnow,
  },
  77: {
    description: "Snow grains",
    Icon: WiDaySnow,
  },
  80: {
    description: "Slight rain showers",
    Icon: WiDayRain,
  },
  81: {
    description: "Moderate rain showers",
    Icon: WiDayRain,
  },
  82: {
    description: "Violent rain showers",
    Icon: WiDayRain,
  },
  85: {
    description: "Slight snow showers",
    Icon: WiDaySnow,
  },
  86: {
    description: "Heavy snow showers",
    Icon: WiDaySnow,
  },
  95: {
    description: "Slight or moderate thunderstorm",
    Icon: WiDayThunderstorm,
  },
  96: {
    description: "Thunderstorm with slight hail",
    Icon: WiDaySnowThunderstorm,
  },
  99: {
    description: "Thunderstorm with heavy hail",
    Icon: WiDaySnowThunderstorm,
  },
};

export const getWeatherCodeDescription = (weatherCode: number) =>
  WEATHER_CODES[weatherCode as keyof typeof WEATHER_CODES] || {
    description: "Error",
  };
