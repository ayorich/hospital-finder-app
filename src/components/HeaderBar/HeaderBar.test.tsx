import React from 'react';
import renderer from 'react-test-renderer';

import HeaderBar from './HeaderBar';

describe('HeaderBar', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<HeaderBar />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});