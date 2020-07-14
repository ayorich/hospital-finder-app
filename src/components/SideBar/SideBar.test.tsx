import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import SideBar from './SideBar';

Enzyme.configure({ adapter: new EnzymeAdapter() });

it(' SideBar renders without error', () => {
    const wrapper = shallow(<SideBar setmapValue setSpinner />);
    const SideComponent = wrapper.find("[data-test='component-SideBar']");
    expect(SideComponent.length).toBe(1);
});
