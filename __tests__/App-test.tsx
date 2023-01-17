/**
 * @format
 */

import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import {DripsyProvider} from 'dripsy';
import {render, screen, fireEvent} from '@testing-library/react-native';
import Button from '../src/components/Button';
import {theme} from '../src/theme';

function Wrapper({children}: {children: React.ReactNode}) {
  return <DripsyProvider theme={theme}>{children}</DripsyProvider>;
}

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Bienvenido de vuelta!')).toBeTruthy();
    expect(screen.getByText('TUS PUNTOS')).toBeTruthy();
    expect(screen.getByText('TUS MOVIMIENTOS')).toBeTruthy();
    expect(screen.getByText('Todos')).toBeTruthy();
    expect(screen.queryByText('Ganados')).toBeNull();
    expect(screen.queryByText('Canjeados')).toBeNull();

    fireEvent.press(screen.getByText('Todos'));

    expect(screen.getByText('Ganados')).toBeTruthy();
    expect(screen.getByText('Canjeados')).toBeTruthy();
  });

  it('Render Button component correctly', () => {
    render(<Button sx={{flex: 1, mr: '$2'}}>Ganados</Button>, {
      wrapper: Wrapper,
    });
    expect(screen.getByText('Ganados')).toBeTruthy();
  });
});
