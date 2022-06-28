import React from 'react';
import { render } from '@testing-library/react';
import { debug } from 'jest-preview';
import GroupInformation from '../GroupInformation';

describe('<GroupInformation/>', () => {

  it('should render normally', () => {
    const result = render(<GroupInformation/>);
    debug();
    expect(result.container).toMatchSnapshot();
  });

});