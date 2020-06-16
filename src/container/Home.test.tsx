import React from 'react';
import renderer from 'react-test-renderer';

import Home from './Home';

describe('Home', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<Home history />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});