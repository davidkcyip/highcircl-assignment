import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  env: {
    SITE_URL: "http://localhost:3000",
    OPEN_METEO_ENDPOINT: "https://api.open-meteo.com/v1/forecast",
    OPEN_METEO_GEOCODING_ENDPOINT:
      "https://geocoding-api.open-meteo.com/v1/search",
    GEOAPIFY_ENDPOINT: "https://api.geoapify.com/v1/geocode/reverse",
    IP_API_ENDPOINT: "http://ip-api.com/json/",
  },
  reactStrictMode: false,
};

export default nextConfig;
