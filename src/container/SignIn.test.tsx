import React from 'react';
import renderer from 'react-test-renderer';

import Signin from './SignIn';

describe('Signin', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<Signin />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});