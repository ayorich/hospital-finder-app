import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import SignIn from "./SignIn";

Enzyme.configure({ adapter: new EnzymeAdapter() });

it(" SignIn renders without error", () => {
  const wrapper = shallow(<SignIn/>);
  const signComponent = wrapper.find("[data-test='component-SignIn']");
  expect(signComponent.length).toBe(1);
});
