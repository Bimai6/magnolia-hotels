import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoomCard from './RoomCard';

describe('RoomCard Component', () => {
  const mockProps = {
    title: 'Habitación Deluxe',
    stars: 4,
    price: 120,
    img: 'https://via.placeholder.com/150'
  };

  test('renders the RoomCard component correctly', () => {
    render(<RoomCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(/Desde\s+\d+(\.\d{1,2})?\s?EUR/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProps.img);
    expect(screen.getByRole('button', { name: /reservar/i })).toBeInTheDocument();
  });

  test('renders the correct number of stars', () => {
    render(<RoomCard {...mockProps} />);
    const stars = screen.getAllByTestId('star-icon');
    expect(stars.length).toBe(mockProps.stars);
  });

  test('image has the correct src and alt attributes', () => {
    render(<RoomCard {...mockProps} />);
  
    const image = screen.getByRole('img');
  
    expect(image).toHaveAttribute('src', mockProps.img);
  
    expect(image).toHaveAttribute('alt');
  });
});
