// list.test.js
import { render, screen } from '@testing-library/react';
import List from './list';

describe('List Component', () => {
  const mockData = [
    { name: "Ontario", capital: "Toronto", flagUrl: "https://exampleurl.com/ontario-flag.svg" },
    { name: "Quebec", capital: "Quebec City", flagUrl: "https://exampleurl.com/quebec-flag.svg" }
  ];

  test('Test to check if the list is rendering', () => {
    render(<List data={mockData} />);
    expect(screen.getByText('Ontario')).toBeInTheDocument();
    expect(screen.getByText('Quebec')).toBeInTheDocument();
  });

});
