import { render, screen, waitFor, fireEvent,act  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () => {
          if (url.endsWith('territories')) {
            return Promise.resolve([{ name: "Yukon", capital: "Whitehorse", flagUrl: "https://exampleurl.com/yukon-flag.svg" }]);
          } else {
            // Default mock response for provinces data
            return Promise.resolve([{ name: "Ontario", capital: "Toronto", flagUrl: "https://exampleurl.com/ontario-flag.svg" }]);
          }
        },
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('Test for Checking if data is redered on the page from the list', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Ontario')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test('Test for page switch button', async () => {
    render(<App />);
    const territoriesMenuItem = await screen.findByText(/territories/i);
  
    await act(async () => {
      userEvent.click(territoriesMenuItem);
    });
    
    // Wait for content to render on page
    await screen.findByText('Yukon');
    
    // Simulate a click 
    const showCapitalButton = await screen.findByRole('button', { name: /show capital/i });
    await act(async () => {
      userEvent.click(showCapitalButton);
    });
    
    await screen.findByText('Whitehorse');
    
    // assertions
    expect(screen.getByRole('img', { name: /yukon's flag/i })).toHaveAttribute('src', 'https://exampleurl.com/yukon-flag.svg');
  });

});
