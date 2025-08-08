import getData from "@/utils/getData";
import AsyncSelect from "react-select/async";
import { useRouter } from "next/router";
import { FormatOptionLabelMeta } from "react-select";
import Link from "next/link";
import { GeoLocationResults } from "@/pages/api/fetch-geolocation-by-city-name";
import fetchOpenMeteoData, { WeatherData } from "@/utils/fetchOpenMeteoData";
import WeatherWidget from "./WeatherWidget";

export interface Option {
  readonly value: number;
  readonly label: string;
  readonly longitude: number;
  readonly latitude: number;
  readonly city: string;
  readonly country: string;
  readonly weather: WeatherData;
}

export function SearchBar({
  SITE_URL,
  OPEN_METEO_ENDPOINT,
}: {
  SITE_URL: string;
  OPEN_METEO_ENDPOINT: string;
}) {
  const router = useRouter();

  const loadOptions = async (inputValue: string) =>
    new Promise<Option[]>(async (resolve) => {
      const { results }: GeoLocationResults = await getData({
        URL: `${SITE_URL}/api/fetch-geolocation-by-city-name?query=${inputValue}`,
      });

      const cities = results
        ? await Promise.all(
            results.map(async (city) => {
              const weatherData: WeatherData = await fetchOpenMeteoData({
                longitude: city.longitude,
                latitude: city.latitude,
                API_URL: OPEN_METEO_ENDPOINT,
              });

              return {
                value: city.id,
                label: city.name,
                longitude: city.longitude,
                latitude: city.latitude,
                city: city.name,
                country: city.country,
                weather: weatherData,
              };
            })
          )
        : [];

      resolve(cities);
    });

  const formatOptionLabel = (
    option: Option,
    { context }: FormatOptionLabelMeta<Option>
  ) => {
    if (context === "menu") {
      return (
        <div className="cursor-pointer">
          <WeatherWidget
            city={`${option.city}, ${option.country}`}
            maxTemp={option.weather.current.temperature_2m}
            weatherCode={option.weather.current.weather_code}
          />
        </div>
      );
    } else {
      return option.label;
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-primary shadow-header relative z-[2]">
      <Link href="/" className="mr-auto font-bold">
        Home
      </Link>
      <form aria-label="Search Cities">
        <label className="sr-only" htmlFor="search">
          Search Cities...
        </label>
        <AsyncSelect<Option>
          name="search"
          inputId="search"
          loadOptions={loadOptions}
          classNames={{
            container: () => "min-w-[200px] xs:min-w-[400px]",
            menu: () => "mt-0! rounded-t-[0]!",
            menuList: () => "pt-0! pb-0!",
            option: (state) =>
              state.isFocused ? "bg-secondary! shadow-card" : "",
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          placeholder="Search Cities..."
          onChange={(val: Option | null) =>
            router.push(
              `/weather-details?longitude=${val?.longitude}&latitude=${val?.latitude}`
            )
          }
          formatOptionLabel={formatOptionLabel}
          noOptionsMessage={() => null}
          loadingMessage={() => null}
          defaultValue={null}
          value={null}
        />
      </form>
    </div>
  );
}
