import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import getData from "@/utils/getData";
import Layout from "@/components/Layout";

import fetchOpenMeteoData, { WeatherData } from "@/utils/fetchOpenMeteoData";
import { getWeatherCodeDescription } from "@/utils/weatherCodes";

interface UserCityDetails {
  features: {
    properties: {
      name?: string;
      country: string;
      city?: string;
      address_line1?: string;
    };
  }[];
}

function WeatherDetails({
  OPEN_METEO_ENDPOINT,
  SITE_URL,
  userCityDetails,
  longitude,
  latitude,
}: {
  OPEN_METEO_ENDPOINT: string;
  SITE_URL: string;
  userCityDetails: UserCityDetails;
  longitude: string;
  latitude: string;
}) {
  const [weather, setWeather] = useState<WeatherData | undefined>();

  const onFetchWeatherData = async () => {
    const weatherData: WeatherData = await fetchOpenMeteoData({
      longitude: Number(longitude),
      latitude: Number(latitude),
      API_URL: OPEN_METEO_ENDPOINT,
    });
    setWeather(weatherData);
  };

  useEffect(() => {
    onFetchWeatherData();
  }, []);

  return (
    <Layout
      title={`Temperature details for ${
        userCityDetails.features?.[0].properties.city ||
        userCityDetails.features?.[0].properties.name ||
        userCityDetails.features?.[0].properties.address_line1
      }, ${userCityDetails.features?.[0].properties.country}`}
      description="Welcome to the Open Meteo Assignment by David Yip"
      SITE_URL={SITE_URL}
      OPEN_METEO_ENDPOINT={OPEN_METEO_ENDPOINT}
    >
      <div className="flex flex-col gap-4 m-4">
        <h1 className="text-center">
          {userCityDetails.features?.[0].properties.city ||
            userCityDetails.features?.[0].properties.name ||
            userCityDetails.features?.[0].properties.address_line1}
          , {userCityDetails.features?.[0].properties.country}
        </h1>
        <h2 className="text-center">
          {weather?.current?.temperature_2m.toFixed(2)}&#8451;
        </h2>
        {weather?.current.weather_code !== undefined &&
          weather.current.weather_code >= 0 && (
            <h3 className="text-center">
              {
                getWeatherCodeDescription(weather.current.weather_code)
                  .description
              }
            </h3>
          )}
        <div className="flex justify-center">
          {weather?.current.weather_code !== undefined &&
            weather.current.weather_code >= 0 &&
            React.createElement(
              getWeatherCodeDescription(weather.current.weather_code).Icon,
              {
                size: 200,
              }
            )}
        </div>
        <h3 className="flex justify-center">
          Wind Speed: {weather?.current.wind_speed_10m.toFixed(2)} km/h
        </h3>
        <h3 className="flex justify-center">
          Humidity: {weather?.current.relative_humidity_2m.toFixed(2)}%
        </h3>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { longitude, latitude },
  } = context;
  const SITE_URL = process.env.SITE_URL;
  const OPEN_METEO_ENDPOINT = process.env.OPEN_METEO_ENDPOINT || "";
  let userCityDetails: UserCityDetails = {
    features: [],
  };

  try {
    userCityDetails = await getData({
      URL: `${SITE_URL}/api/fetch-user-city-details?longitude=${longitude}&latitude=${latitude}`,
    });
  } catch (err) {
    console.error(err);
  }

  if (userCityDetails.features.length === 0) {
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
      longitude,
      latitude,
    },
  };
};

export default WeatherDetails;
