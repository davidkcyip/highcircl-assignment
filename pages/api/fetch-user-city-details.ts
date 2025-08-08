// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export default async function handler(req: NextRequest) {
  if (req.method === "GET") {
    const params = req.nextUrl.searchParams;
    const longitude = params.get("longitude");
    const latitude = params.get("latitude");
    const API_URL = process.env.GEOAPIFY_ENDPOINT || "";
    const API_KEY = process.env.GEOAPIFY_API_KEY || "";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(
      `${API_URL}?lat=${latitude}&lon=${longitude}&apiKey=${API_KEY}`,
      options
    );

    // Transform or forward the response
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
