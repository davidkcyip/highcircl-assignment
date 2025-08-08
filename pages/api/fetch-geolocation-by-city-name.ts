// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export interface GeoLocationResult {
  admin1?: string;
  admin1_id?: number;
  admin2?: string;
  admin2_id?: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation?: number;
  feature_code?: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population?: number;
  timezone?: string;
}

export interface GeoLocationResults {
  results: GeoLocationResult[];
}

export default async function handler(req: NextRequest) {
  if (req.method === "GET") {
    const params = req.nextUrl.searchParams;
    const name = params.get("query");
    const API_URL = process.env.OPEN_METEO_GEOCODING_ENDPOINT || "";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(`${API_URL}?name=${name}&count=5`, options);

    // Transform or forward the response
    const data: GeoLocationResults = await response.json();

    console.log(data);

    return NextResponse.json(data, { status: response.status });
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
