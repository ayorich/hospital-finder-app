import React from 'react';
import renderer from 'react-test-renderer';

import SignUp from './SignUp';

describe('SignUp', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<SignUp />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});