import { render, screen } from '@testing-library/react';
import ButtonSearch from './ButtonSearch';
import '@testing-library/jest-dom';

describe('ButtonSearch Component', () => {
  test('should render the ButtonSearch component', () => {
    render(<ButtonSearch />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('should display "RESERVAR" text on the button', () => {
    render(<ButtonSearch />);
    const buttonText = screen.getByText(/RESERVAR/i);
    expect(buttonText).toBeInTheDocument();
  });

  test('should display the bed icon in the button', () => {
    render(<ButtonSearch />);
    const icon = screen.getByAltText('bed icon');
    expect(icon).toBeInTheDocument();
  });
});
