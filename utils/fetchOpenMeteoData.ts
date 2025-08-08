import { fetchWeatherApi } from "openmeteo";

export interface WeatherData {
  current: {
    time: Date;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: Float32Array | null;
  };
  daily: {
    time: Date[];
    weather_code: Float32Array | null;
    temperature_2m_min: Float32Array | null;
    temperature_2m_max: Float32Array | null;
  };
}

const fetchOpenMeteoData = async ({
  longitude,
  latitude,
  API_URL,
}: {
  longitude: number;
  latitude: number;
  API_URL: string;
}): Promise<WeatherData> => {
  const params = {
    latitude,
    longitude,
    daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
    hourly: "temperature_2m",
    current: [
      "temperature_2m",
      "weather_code",
      "wind_speed_10m",
      "relative_humidity_2m",
    ],
  };

  const responses = await fetchWeatherApi(API_URL, params);

  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const weatherData: WeatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      weather_code: current.variables(1)!.value(),
      wind_speed_10m: current.variables(2)!.value(),
      relative_humidity_2m: current.variables(3)!.value(),
    },
    hourly: {
      time: [
        ...Array(
          (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
    },
    daily: {
      time: [
        ...Array(
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      weather_code: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      temperature_2m_max: daily.variables(2)!.valuesArray(),
    },
  };

  return weatherData;
};

export default fetchOpenMeteoData;
