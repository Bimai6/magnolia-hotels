import { render, screen } from '@testing-library/react';
import ButtonSearch from './ButtonSearch';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const Wrapper = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

describe('ButtonSearch Component', () => {
  test('should render the ButtonSearch component', () => {
    render(<ButtonSearch />, { wrapper: Wrapper });
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('should display "RESERVAR" text on the button', () => {
    render(<ButtonSearch />, { wrapper: Wrapper });
    const buttonText = screen.getByText(/RESERVAR/i);
    expect(buttonText).toBeInTheDocument();
  });

  test('should display the bed icon in the button', () => {
    render(<ButtonSearch />, { wrapper: Wrapper });
    const icon = screen.getByAltText('bed icon');
    expect(icon).toBeInTheDocument();
  });
});