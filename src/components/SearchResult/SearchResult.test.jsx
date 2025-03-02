import { render, screen, fireEvent } from '@testing-library/react';
import SearchResult from './SearchResult';
import '@testing-library/jest-dom';
import {vi} from 'vitest';

const roomsMock = [
  { id: 1, reservations: [{ entry: "2025-03-01", departure: "2025-03-05" }] },
  { id: 2, reservations: [] }
];

test("Renders the search button", () => {
  render(<SearchResult setFilteredRooms={() => {}} rooms={roomsMock} setEntry={() => {}} setDeparture={() => {}} />);
  
  const searchButton = screen.getByRole("button", { name: /buscar/i });
  expect(searchButton).toBeInTheDocument();
});

test("Calls function when search button is clicked", async () => {
  const setFilteredRoomsMock = vi.fn();
  
  render(
    <SearchResult 
      setFilteredRooms={setFilteredRoomsMock} 
      rooms={roomsMock} 
      setEntry={() => {}} 
      setDeparture={() => {}} 
    />
  );

  const searchButton = screen.getByRole("button", { name: /buscar/i });
  fireEvent.click(searchButton);

  await new Promise((r) => setTimeout(r, 600));

  expect(setFilteredRoomsMock).toHaveBeenCalled();
});

test("Displays 'Fecha de entrada' text", () => {
  render(<SearchResult setFilteredRooms={() => {}} rooms={roomsMock} setEntry={() => {}} setDeparture={() => {}} />);
  
  const entryText = screen.getByText(/fecha de entrada/i);
  expect(entryText).toBeInTheDocument();
});
