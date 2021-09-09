//Jest test (given to us by LHL)
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";

/*
  A test that renders a React Component
*/

//describe is used if want to group a series of tests, not required if just single test
//"it" is the exact same as "test". it = test
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});