import { render, screen, fireEvent } from '@testing-library/react';
import SearchResult from './SearchResult';
import '@testing-library/jest-dom';


const roomsMock = [
  { id: 1, reservations: [{ entry: "2025-03-01", departure: "2025-03-05" }] },
  { id: 2, reservations: [] }
];


test("Renders the search button", () => {
    render(<SearchResult setFilteredRooms={() => {}} rooms={roomsMock} setEntry={() => {}} setDeparture={() => {}} />);
    
    const searchButton = screen.getByRole("button", { name: /buscar/i });
    expect(searchButton).toBeInTheDocument();
  });  


test("Renders search button", () => {
  render(<SearchResult setFilteredRooms={() => {}} rooms={roomsMock} setEntry={() => {}} setDeparture={() => {}} />);
  
  const searchButton = screen.getByRole("button", { name: /buscar/i });

  if (!searchButton) {
    throw new Error("Search button doesn't found.");
  }
});


test("Calls function when search button is clicked", () => {
  let isCalled = false;

  const handleClick = () => {
    isCalled = true;
  };

  render(<SearchResult setFilteredRooms={handleClick} rooms={roomsMock} setEntry={() => {}} setDeparture={() => {}} />);
  
  const searchButton = screen.getByRole("button", { name: /buscar/i });
  fireEvent.click(searchButton);

  if (!isCalled) {
    throw new Error("Function was not called when the button was clicked.");
  }
});
