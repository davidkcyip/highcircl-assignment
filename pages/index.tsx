import React, { useState, useEffect } from "react";
import getData from "@/utils/getData";
import Layout from "@/components/Layout";

import fetchOpenMeteoData, { WeatherData } from "@/utils/fetchOpenMeteoData";
import WeatherWidget from "@/components/WeatherWidget";
import { UserCityDetails } from "@/types/UserCityDetails";

function Home({
  OPEN_METEO_ENDPOINT,
  SITE_URL,
  userCityDetails,
}: {
  OPEN_METEO_ENDPOINT: string;
  SITE_URL: string;
  userCityDetails: UserCityDetails;
}) {
  const [weather, setWeather] = useState<WeatherData | undefined>();

  const onFetchWeatherData = async () => {
    const weatherData: WeatherData = await fetchOpenMeteoData({
      longitude: Number(userCityDetails.lon),
      latitude: Number(userCityDetails.lat),
      API_URL: OPEN_METEO_ENDPOINT,
    });
    setWeather(weatherData);
  };

  useEffect(() => {
    onFetchWeatherData();
  }, []);

  return (
    <Layout
      title={`Weather details for ${userCityDetails.city}, ${userCityDetails.country}`}
      description="Welcome to the Open Meteo Assignment by David Yip"
      SITE_URL={SITE_URL}
      OPEN_METEO_ENDPOINT={OPEN_METEO_ENDPOINT}
    >
      <div className="flex flex-col gap-4 m-4">
        <h1 className="text-center">
          {userCityDetails.city}, {userCityDetails.country}
        </h1>
        <div className="flex gap-2 items-center justify-center text-center">
          {weather?.current.weather_code !== undefined &&
            weather.current.weather_code >= 0 &&
            weather?.current.temperature_2m && (
              <WeatherWidget
                weatherCode={weather.current.weather_code}
                maxTemp={weather.current.temperature_2m}
              />
            )}
        </div>
        <h1 className="text-center mt-8">5-Day Forecast</h1>
        {weather?.daily.time[0] && weather?.daily.weather_code && (
          <div className="flex gap-2 items-center justify-center text-center">
            {[1, 2, 3, 4, 5].map((index) => {
              const minTemp = weather?.daily.temperature_2m_min?.[index];
              const maxTemp = weather?.daily.temperature_2m_max?.[index];
              const weatherCode = weather?.daily.weather_code?.[index];

              if (
                minTemp !== undefined &&
                maxTemp !== undefined &&
                weatherCode !== undefined
              ) {
                return (
                  <WeatherWidget
                    key={index}
                    date={weather.daily.time[index]}
                    minTemp={minTemp}
                    maxTemp={maxTemp}
                    weatherCode={weatherCode}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const SITE_URL = process.env.SITE_URL;
  const OPEN_METEO_ENDPOINT = process.env.OPEN_METEO_ENDPOINT;
  const IP_API_ENDPOINT = process.env.IP_API_ENDPOINT || "";
  let userCityDetails: UserCityDetails = {
    city: "Unknown",
    country: "Unknown",
    countryCode: "Unknown",
    lat: 0,
    lon: 0,
  };

  try {
    userCityDetails = await getData({
      URL: IP_API_ENDPOINT,
    });
  } catch (err) {
    console.error(err);
  }

  if (userCityDetails.city === "Unknown") {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return {
    props: {
      SITE_URL,
      OPEN_METEO_ENDPOINT,
      userCityDetails,
    },
  };
}

export default Home;
