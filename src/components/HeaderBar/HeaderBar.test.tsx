import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import HeaderBar from "./HeaderBar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

it(" HeaderBar renders without error", () => {
  const wrapper = shallow(
    <HeaderBar radiusValue setRadiusValue setsearchQuery />
  );
  const headerComponent = wrapper.find("[data-test='component-HeaderBar']");
  expect(headerComponent.length).toBe(1);
});
