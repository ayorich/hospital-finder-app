import React from "react";
import Enzyme, {shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import Home from "./Home";

Enzyme.configure({adapter: new EnzymeAdapter()})

it(" Home renders without error", () => {
    const wrapper = shallow(<Home history/>);
    const homeComponent = wrapper.find("[data-test='component-home']");
    expect(homeComponent.length).toBe(1)
});

