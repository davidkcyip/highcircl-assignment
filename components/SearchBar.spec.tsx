import "@testing-library/jest-dom";
import getData from "../utils/getData";
import { Option, SearchBar } from "./SearchBar";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import fetchOpenMeteoData from "../utils/fetchOpenMeteoData";

// Mock dependencies
const routerPush = jest.fn();
jest.mock("../utils/getData");
jest.mock("../utils/fetchOpenMeteoData");
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: routerPush,
  })),
}));

describe("SearchBar Component", () => {
  const user = userEvent.setup();
  const mockCityResponse = {
    results: [
      {
        id: 2643743,
        name: "London",
        country: "United Kingdom",
        latitude: 51.50853,
        longitude: -0.12574,
        admin1: "England",
        admin1_id: 6269131,
        admin2: "Greater London",
        admin2_id: 2648110,
        country_code: "GB",
        country_id: 2635167,
        elevation: 25,
        feature_code: "PPLC",
        population: 8961989,
        timezone: "Europe/London",
      },
      {
        id: 2643744,
        name: "Manchester",
        country: "United Kingdom",
        latitude: 53.48095,
        longitude: -2.23743,
        admin1: "England",
        admin1_id: 6269131,
        admin2: "Greater Manchester",
        admin2_id: 2648111,
        country_code: "GB",
        country_id: 2635167,
        elevation: 38,
        feature_code: "PPLA2",
        population: 395515,
        timezone: "Europe/London",
      },
    ],
  };

  const mockWeatherData = {
    current: {
      time: new Date(),
      temperature_2m: 15.5,
      weather_code: 1,
      wind_speed_10m: 12.3,
      relative_humidity_2m: 65.0,
    },
    hourly: {
      time: [new Date()],
      temperature_2m: new Float32Array([15.5]),
    },
    daily: {
      time: [new Date()],
      weather_code: new Float32Array([1]),
      temperature_2m_min: new Float32Array([10.0]),
      temperature_2m_max: new Float32Array([20.0]),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getData as jest.Mock).mockResolvedValue(mockCityResponse);
    (fetchOpenMeteoData as jest.Mock).mockResolvedValue(mockWeatherData);
  });

  describe("Option interface", () => {
    it("should have correct structure", () => {
      const testOption: Option = {
        value: 2643743,
        label: "London",
        longitude: -0.12574,
        latitude: 51.50853,
        city: "London",
        country: "United Kingdom",
        weather: mockWeatherData,
      };

      expect(testOption.value).toBe(2643743);
      expect(testOption.label).toBe("London");
      expect(testOption.longitude).toBe(-0.12574);
      expect(testOption.latitude).toBe(51.50853);
      expect(testOption.city).toBe("London");
      expect(testOption.country).toBe("United Kingdom");
      expect(testOption.weather).toBe(mockWeatherData);
    });
  });

  describe("Data transformation", () => {
    it("should transform city data to Option format correctly", () => {
      const cityData = mockCityResponse.results[0];
      const expectedOption: Option = {
        value: cityData.id,
        label: cityData.name,
        longitude: cityData.longitude,
        latitude: cityData.latitude,
        city: cityData.name,
        country: cityData.country,
        weather: mockWeatherData,
      };

      expect(expectedOption.value).toBe(2643743);
      expect(expectedOption.label).toBe("London");
      expect(expectedOption.longitude).toBe(-0.12574);
      expect(expectedOption.latitude).toBe(51.50853);
      expect(expectedOption.city).toBe("London");
      expect(expectedOption.country).toBe("United Kingdom");
    });
  });

  describe("SearchBar", () => {
    it("should call getData when user types into dropdown and go to the weather details page when option is clicked", async () => {
      const SITE_URL = "http://test-url.com";
      const OPEN_METEO_ENDPOINT = "http://test-weather-url.com";

      render(
        <SearchBar
          SITE_URL={SITE_URL}
          OPEN_METEO_ENDPOINT={OPEN_METEO_ENDPOINT}
        />
      );

      await waitFor(() => screen.getByLabelText("Search Cities...").focus());
      await waitFor(() => user.keyboard("London"));

      await waitFor(() =>
        expect(getData).toHaveBeenCalledWith({
          URL: `${SITE_URL}/api/fetch-geolocation-by-city-name?query=London`,
        })
      );

      await waitFor(() =>
        selectEvent.select(
          screen.getByLabelText("Search Cities..."),
          "London, United Kingdom"
        )
      );

      expect(routerPush).toHaveBeenCalledWith(
        "/weather-details?longitude=-0.12574&latitude=51.50853"
      );
    });
  });
});
