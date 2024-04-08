import { render, screen, fireEvent } from '@testing-library/react';
import Item from './item';

describe('Item Component', () => {
  const mockProps = {
    name: "Ontario",
    capital: "Toronto",
    flagUrl: "https://exampleurl.com/ontario-flag.svg"
  };


  test('Test to check the capital for the province', () => {
    render(<Item {...mockProps} />);
    const toggleButton = screen.getByText('Show Capital');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Toronto')).toBeInTheDocument(); 
  });
  
  test('Test to check if the image is loaded', () => {
    render(<Item {...mockProps} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${mockProps.name}'s Flag`);
  });

});