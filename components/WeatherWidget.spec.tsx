import "@testing-library/jest-dom";
import WeatherWidget from "./WeatherWidget";
import { render } from "@testing-library/react";

const props = {
  city: "London",
  date: new Date(),
  minTemp: 20,
  maxTemp: 28,
  weatherCode: 1,
};

describe("WeatherWidget Component", () => {
  it("should render with all fields visible if all props passed in", async () => {
    const { getByText } = render(<WeatherWidget {...props} />);

    expect(getByText(props.city)).toBeInTheDocument();
    expect(getByText(props.date.toLocaleDateString())).toBeInTheDocument();
    expect(getByText(`${props.minTemp.toFixed(2)}℃`)).toBeInTheDocument();
    expect(getByText(`${props.maxTemp.toFixed(2)}℃`)).toBeInTheDocument();
    expect(getByText("Mainly clear")).toBeInTheDocument();
  });
});
