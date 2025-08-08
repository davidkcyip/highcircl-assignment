import getData from "./getData";

describe("getData", () => {
  const mockSuccessResponse = {
    test: 1,
  };

  global.fetch = jest.fn(() => {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockSuccessResponse),
    });
  }) as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    process.env = {
      NODE_ENV: "development",
    };
  });

  it("should call fetch with the correct URL and options and return mockSuccessResponse", async () => {
    const URL = "http://test.com";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 123",
      },
    };
    const response = await getData({
      URL,
      options,
    });

    expect(fetch).toHaveBeenCalledWith(URL, options);
    expect(response).toStrictEqual(mockSuccessResponse);
  });
});
