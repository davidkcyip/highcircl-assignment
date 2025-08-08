import { getWeatherCodeDescription } from "./weatherCodes";
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

// Mock react-icons to avoid issues with icon components in tests
jest.mock("react-icons/wi", () => ({
  WiDaySunny: jest.fn(() => "WiDaySunny"),
  WiDayCloudy: jest.fn(() => "WiDayCloudy"),
  WiDaySunnyOvercast: jest.fn(() => "WiDaySunnyOvercast"),
  WiFog: jest.fn(() => "WiFog"),
  WiDaySprinkle: jest.fn(() => "WiDaySprinkle"),
  WiDayShowers: jest.fn(() => "WiDayShowers"),
  WiDayRain: jest.fn(() => "WiDayRain"),
  WiDaySnow: jest.fn(() => "WiDaySnow"),
  WiDayThunderstorm: jest.fn(() => "WiDayThunderstorm"),
  WiDaySnowThunderstorm: jest.fn(() => "WiDaySnowThunderstorm"),
}));

describe("weatherCodes", () => {
  describe("getWeatherCodeDescription function", () => {
    describe("valid weather codes", () => {
      it("should return correct data for weather code 0 (Clear Sky)", () => {
        const result = getWeatherCodeDescription(0);

        expect(result.description).toBe("Clear Sky");
        expect(result.Icon).toBe(WiDaySunny);
      });

      it("should return correct data for weather code 1 (Mainly clear)", () => {
        const result = getWeatherCodeDescription(1);

        expect(result.description).toBe("Mainly clear");
        expect(result.Icon).toBe(WiDaySunny);
      });

      it("should return correct data for weather code 2 (Partly cloudy)", () => {
        const result = getWeatherCodeDescription(2);

        expect(result.description).toBe("Partly cloudy");
        expect(result.Icon).toBe(WiDayCloudy);
      });

      it("should return correct data for weather code 3 (Overcast)", () => {
        const result = getWeatherCodeDescription(3);

        expect(result.description).toBe("Overcast");
        expect(result.Icon).toBe(WiDaySunnyOvercast);
      });

      it("should return correct data for weather code 45 (Foggy)", () => {
        const result = getWeatherCodeDescription(45);

        expect(result.description).toBe("Foggy");
        expect(result.Icon).toBe(WiFog);
      });

      it("should return correct data for weather code 48 (Depositing Rime Fog)", () => {
        const result = getWeatherCodeDescription(48);

        expect(result.description).toBe("Depositing Rime Fog");
        expect(result.Icon).toBe(WiFog);
      });

      it("should return correct data for weather code 51 (Light drizzle)", () => {
        const result = getWeatherCodeDescription(51);

        expect(result.description).toBe("Light drizzle");
        expect(result.Icon).toBe(WiDaySprinkle);
      });

      it("should return correct data for weather code 53 (Moderate drizzle)", () => {
        const result = getWeatherCodeDescription(53);

        expect(result.description).toBe("Moderate drizzle");
        expect(result.Icon).toBe(WiDaySprinkle);
      });

      it("should return correct data for weather code 55 (Dense drizzle)", () => {
        const result = getWeatherCodeDescription(55);

        expect(result.description).toBe("Dense drizzle");
        expect(result.Icon).toBe(WiDaySprinkle);
      });

      it("should return correct data for weather code 56 (Light freezing drizzle)", () => {
        const result = getWeatherCodeDescription(56);

        expect(result.description).toBe("Light freezing drizzle");
        expect(result.Icon).toBe(WiDaySprinkle);
      });

      it("should return correct data for weather code 57 (Dense freezing drizzle)", () => {
        const result = getWeatherCodeDescription(57);

        expect(result.description).toBe("Dense freezing drizzle");
        expect(result.Icon).toBe(WiDaySprinkle);
      });

      it("should return correct data for weather code 61 (Slight rain)", () => {
        const result = getWeatherCodeDescription(61);

        expect(result.description).toBe("Slight rain");
        expect(result.Icon).toBe(WiDayShowers);
      });

      it("should return correct data for weather code 63 (Moderate rain)", () => {
        const result = getWeatherCodeDescription(63);

        expect(result.description).toBe("Moderate rain");
        expect(result.Icon).toBe(WiDayShowers);
      });

      it("should return correct data for weather code 65 (Heavy rain)", () => {
        const result = getWeatherCodeDescription(65);

        expect(result.description).toBe("Heavy rain");
        expect(result.Icon).toBe(WiDayRain);
      });

      it("should return correct data for weather code 66 (Light freezing rain)", () => {
        const result = getWeatherCodeDescription(66);

        expect(result.description).toBe("Light freezing rain");
        expect(result.Icon).toBe(WiDayShowers);
      });

      it("should return correct data for weather code 67 (Heavy freezing rain)", () => {
        const result = getWeatherCodeDescription(67);

        expect(result.description).toBe("Heavy freezing rain");
        expect(result.Icon).toBe(WiDayRain);
      });

      it("should return correct data for weather code 71 (Slight snow fall)", () => {
        const result = getWeatherCodeDescription(71);

        expect(result.description).toBe("Slight snow fall");
        expect(result.Icon).toBe(WiDaySnow);
      });

      it("should return correct data for weather code 73 (Moderate snow fall)", () => {
        const result = getWeatherCodeDescription(73);

        expect(result.description).toBe("Moderate snow fall");
        expect(result.Icon).toBe(WiDaySnow);
      });

      it("should return correct data for weather code 75 (Heavy snow fall)", () => {
        const result = getWeatherCodeDescription(75);

        expect(result.description).toBe("Heavy snow fall");
        expect(result.Icon).toBe(WiDaySnow);
      });

      it("should return correct data for weather code 77 (Snow grains)", () => {
        const result = getWeatherCodeDescription(77);

        expect(result.description).toBe("Snow grains");
        expect(result.Icon).toBe(WiDaySnow);
      });

      it("should return correct data for weather code 80 (Slight rain showers)", () => {
        const result = getWeatherCodeDescription(80);

        expect(result.description).toBe("Slight rain showers");
        expect(result.Icon).toBe(WiDayRain);
      });

      it("should return correct data for weather code 81 (Moderate rain showers)", () => {
        const result = getWeatherCodeDescription(81);

        expect(result.description).toBe("Moderate rain showers");
        expect(result.Icon).toBe(WiDayRain);
      });

      it("should return correct data for weather code 82 (Violent rain showers)", () => {
        const result = getWeatherCodeDescription(82);

        expect(result.description).toBe("Violent rain showers");
        expect(result.Icon).toBe(WiDayRain);
      });

      it("should return correct data for weather code 85 (Slight snow showers)", () => {
        const result = getWeatherCodeDescription(85);

        expect(result.description).toBe("Slight snow showers");
        expect(result.Icon).toBe(WiDaySnow);
      });

      it("should return correct data for weather code 86 (Heavy snow showers)", () => {
        const result = getWeatherCodeDescription(86);

        expect(result.description).toBe("Heavy snow showers");
        expect(result.Icon).toBe(WiDaySnow);
      });

      it("should return correct data for weather code 95 (Slight or moderate thunderstorm)", () => {
        const result = getWeatherCodeDescription(95);

        expect(result.description).toBe("Slight or moderate thunderstorm");
        expect(result.Icon).toBe(WiDayThunderstorm);
      });

      it("should return correct data for weather code 96 (Thunderstorm with slight hail)", () => {
        const result = getWeatherCodeDescription(96);

        expect(result.description).toBe("Thunderstorm with slight hail");
        expect(result.Icon).toBe(WiDaySnowThunderstorm);
      });

      it("should return correct data for weather code 99 (Thunderstorm with heavy hail)", () => {
        const result = getWeatherCodeDescription(99);

        expect(result.description).toBe("Thunderstorm with heavy hail");
        expect(result.Icon).toBe(WiDaySnowThunderstorm);
      });
    });

    describe("invalid weather codes", () => {
      it("should return error description for non-existent weather code", () => {
        const result = getWeatherCodeDescription(999);

        expect(result.description).toBe("Error");
        expect(result.Icon).toBeUndefined();
      });

      it("should return error description for negative weather code", () => {
        const result = getWeatherCodeDescription(-1);

        expect(result.description).toBe("Error");
        expect(result.Icon).toBeUndefined();
      });
    });
  });
});
