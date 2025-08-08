describe("GET /api/fetch-user-city-details", () => {
  const mockSuccessResponse = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          datasource: {
            sourcename: "openstreetmap",
            attribution: "© OpenStreetMap contributors",
            license: "Open Database License",
            url: "https://www.openstreetmap.org/copyright",
          },
          country: "United Kingdom",
          country_code: "gb",
          state: "England",
          county: "Norfolk",
          city: "Norwich",
          postcode: "NR4 6NQ",
          suburb: "Tuckswood",
          street: "Hall Road",
          housenumber: "544",
          iso3166_2: "GB-ENG",
          iso3166_2_sublevel: "GB-NFK",
          lon: 1.282813149999995,
          lat: 52.602391999999995,
          state_code: "ENG",
          distance: 7.0997485874248225,
          result_type: "building",
          county_code: "NFK",
          formatted: "544 Hall Road, Norwich, NR4 6NQ, United Kingdom",
          address_line1: "544 Hall Road",
          address_line2: "Norwich, NR4 6NQ, United Kingdom",
          category: "building.residential",
          timezone: {
            name: "Europe/London",
            offset_STD: "+00:00",
            offset_STD_seconds: 0,
            offset_DST: "+01:00",
            offset_DST_seconds: 3600,
            abbreviation_STD: "GMT",
            abbreviation_DST: "BST",
          },
          plus_code: "9F43J72M+X4",
          plus_code_short: "J72M+X4 Norwich, Norfolk, United Kingdom",
          rank: {
            importance: 0.00000999999999995449,
            popularity: 5.448879939815315,
          },
          place_id:
            "513e0fe2146786f43f599eaf592e1b4d4a40f00102f90168f2f02500000000c00203e203236f70656e7374726565746d61703a616464726573733a7761792f363336353437363838",
        },
        geometry: {
          type: "Point",
          coordinates: [1.282813149999995, 52.602391999999995],
        },
        bbox: [1.2827402, 52.6023475, 1.2828861, 52.6024365],
      },
    ],
    query: {
      lat: 52.60246977939515,
      lon: 1.2827149354465632,
      plus_code: "9F43J72M+X3",
    },
  };

  const mockFailedResponse = {
    statusCode: 400,
    error: "Bad Request",
    message: '"lat" must be less than or equal to 90',
  };

  global.fetch = jest.fn((url) => {
    const params = url.split("?")[1];
    const latitude = params.split("latitude=")[1];
    if (latitude >= -90 && latitude <= 90) {
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

  const userCityDetailsEndpoint =
    "http://localhost:3000/api/fetch-user-city-details";

  beforeEach(() => {
    jest.clearAllMocks();

    process.env = {
      NODE_ENV: "development",
      GEOAPIFY_ENDPOINT: "https://geoapify.com",
      GEOAPIFY_API_KEY: "123",
    };
  });

  it("should return a 200 status and the mockSuccessResponse", async () => {
    const response = await fetch(
      `${userCityDetailsEndpoint}?longitude=1.02322&latitude=23.000`,
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
      `${userCityDetailsEndpoint}?longitude=1.02322&latitude=100.000`,
      {
        method: "GET",
      }
    );
    const body = await response.json();

    expect(response.status).toEqual(400);
    expect(body).toEqual(mockFailedResponse);
  });
});
