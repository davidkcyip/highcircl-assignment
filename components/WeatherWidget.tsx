import React from "react";
import { getWeatherCodeDescription } from "@/utils/weatherCodes";

export default function WeatherWidget({
  city,
  date,
  minTemp,
  maxTemp,
  weatherCode,
}: {
  city?: string;
  date?: Date;
  minTemp?: number;
  maxTemp: number;
  weatherCode: number;
}) {
  return (
    <div className="flex flex-col items-center border-1 rounded p-4 shadow-card">
      {city ? <h3>{city}</h3> : <></>}
      {date ? <h3>{date.toLocaleDateString()}</h3> : <></>}
      <h4>{getWeatherCodeDescription(weatherCode).description}</h4>
      {React.createElement(getWeatherCodeDescription(weatherCode).Icon, {
        size: 80,
      })}
      <div className="flex flex-col">
        <h4>{maxTemp.toFixed(2)}&#8451;</h4>
        {minTemp ? <span>{minTemp.toFixed(2)}&#8451;</span> : <></>}
      </div>
    </div>
  );
}
