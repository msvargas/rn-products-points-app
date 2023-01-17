/**
 * @format
 */

import React from 'react';

// Note: test renderer must be required after react-native.
import {DripsyProvider} from 'dripsy';
import {render, screen} from '@testing-library/react-native';
import Button from '../src/components/Button';
import {theme} from '../src/theme';

function Wrapper({children}: {children: React.ReactNode}) {
  return <DripsyProvider theme={theme}>{children}</DripsyProvider>;
}

describe('Button', () => {
  it('Render Button component correctly', () => {
    render(<Button sx={{flex: 1, mr: '$2'}}>Ganados</Button>, {
      wrapper: Wrapper,
    });
    expect(screen.getByText('Ganados')).toBeTruthy();
  });
});
