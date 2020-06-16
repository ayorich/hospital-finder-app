import React from 'react';
import renderer from 'react-test-renderer';

import SideBar from './SideBar';

describe('SideBar', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<SideBar />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
