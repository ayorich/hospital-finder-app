import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import SignUp from "./SignUp";

Enzyme.configure({ adapter: new EnzymeAdapter() });

it(" SignUp renders without error", () => {
  const wrapper = shallow(<SignUp.WrappedComponent history />);
  const signComponent = wrapper.find("[data-test='component-SignUp']");
  expect(signComponent.length).toBe(1);
});
