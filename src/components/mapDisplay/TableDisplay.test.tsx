import React from 'react';
import renderer from 'react-test-renderer';

import TableDisplay from './TableDisplay';

describe('TableDisplay', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<TableDisplay mapValue/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
