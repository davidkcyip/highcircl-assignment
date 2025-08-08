import "@testing-library/jest-dom";
import Error from "./Error";
import { render } from "@testing-library/react";

const props = {
  errorMessage: "Test Text",
};

const defaultErrorMessage =
  "This page either does not exist or we were not able to fetch data for this page. Please try again.";

describe("Error Component", () => {
  it("should render with the default error message if no errroMessage is passed in", async () => {
    const { getByText } = render(<Error />);

    expect(getByText(defaultErrorMessage)).toBeInTheDocument();
  });

  it("should render with the errorMessage passed in", async () => {
    const { getByText } = render(<Error {...props} />);

    expect(getByText(props.errorMessage)).toBeInTheDocument();
  });
});
