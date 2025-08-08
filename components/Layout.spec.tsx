import "@testing-library/jest-dom";
import Layout from "./Layout";
import { render, waitFor } from "@testing-library/react";

const props = {
  title: "test title",
  description: "test description",
  SITE_URL: "https://test-url.com",
  OPEN_METEO_ENDPOINT: "https://test-open-meteo.com",
};

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// this test will not test the SEO parts of this component as that should be handled by Cypress or PlayWright
// nor will it test the SearchBar as that's tested separately
describe("Layout Component", () => {
  it("should render with the correct child element", async () => {
    const { getByTestId } = render(
      <Layout {...props}>
        <div data-testid="child">123</div>
      </Layout>
    );

    const childElement = getByTestId("child");

    await waitFor(() => expect(childElement).toBeInTheDocument());
    await waitFor(() => expect(childElement).toHaveTextContent("123"));
    await waitFor(() => expect(childElement.tagName).toStrictEqual("DIV"));
  });
});
