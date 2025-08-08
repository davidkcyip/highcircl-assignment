describe("GET /api/fetch-user-city-details", () => {
  const mockSuccessResponse = {
    results: [
      {
        id: 2643743,
        name: "London",
        latitude: 51.50853,
        longitude: -0.12574,
        elevation: 25,
        feature_code: "PPLC",
        country_code: "GB",
        admin1_id: 6269131,
        admin2_id: 2648110,
        timezone: "Europe/London",
        population: 8961989,
        country_id: 2635167,
        country: "United Kingdom",
        admin1: "England",
        admin2: "Greater London",
      },
      {
        id: 6058560,
        name: "London",
        latitude: 42.98339,
        longitude: -81.23304,
        elevation: 252,
        feature_code: "PPL",
        country_code: "CA",
        admin1_id: 6093943,
        admin2_id: 6073256,
        timezone: "America/Toronto",
        population: 346765,
        country_id: 6251999,
        country: "Canada",
        admin1: "Ontario",
        admin2: "Middlesex County",
      },
    ],
    generationtime_ms: 0.61130524,
  };

  const mockFailedResponse = {
    error: true,
    reason: "Query must not be null.",
  };

  global.fetch = jest.fn((url) => {
    const params = url.split("?")[1];
    const query = params.split("query=")[1];
    if (query) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockSuccessResponse),
      });
    } else {
      return Promise.resolve({
        ok: true,
        status: 400,
        json: () => Promise.resolve(mockFailedResponse),
      });
    }
  }) as jest.Mock;

  const fetchGeolocationByCityNameEndpoint =
    "http://localhost:3000/api/fetch-geolocation-by-city-name";

  beforeEach(() => {
    jest.clearAllMocks();

    process.env = {
      NODE_ENV: "development",
      OPEN_METEO_GEOCODING_ENDPOINT: "https://open-meteo.com",
    };
  });

  it("should return a 200 status and the mockSuccessResponse", async () => {
    const response = await fetch(
      `${fetchGeolocationByCityNameEndpoint}?query=london`,
      {
        method: "GET",
      }
    );
    const body = await response.json();

    expect(response.status).toEqual(200);
    expect(body).toEqual(mockSuccessResponse);
  });

  it("should return a 400 status and the mockFailedResponse", async () => {
    const response = await fetch(
      `${fetchGeolocationByCityNameEndpoint}?query=`,
      {
        method: "GET",
      }
    );
    const body = await response.json();

    expect(response.status).toEqual(400);
    expect(body).toEqual(mockFailedResponse);
  });
});
