import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App'
import planetsData from './mocks/planetsData';
import AppProvider from '../contexts/AppProvider';
import FilterProvider from '../contexts/FilterProvider';

describe('the App component', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (planetsData),
    });
  });

  it('should call a fetch', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);
    expect(fetch).toBeCalledTimes(1);

    const loadingEl = screen.getByText(/loading/i)
    expect(loadingEl).toBeInTheDocument();

    await waitFor(() => {
      const findByNameInput = screen.getAllByTestId('planet-name');
      expect(findByNameInput[0]).toBeInTheDocument()
    });

    const tatooine = screen.getByRole('cell', { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();

  })

  it('should have a input to find a planet by name', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);

    const findByNameInput = await screen.findByTestId('name-filter');
    expect(findByNameInput).toBeInTheDocument();

    const nameHeader = screen.getByRole('columnheader', { name: /name/i })
    expect(nameHeader).toBeInTheDocument();
  })
});

describe('the app component', () => {

  const errorMessage = '404 not found'

  it('should return a error message when fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue({
      message: errorMessage
    });
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);
    expect(fetch).toBeCalledTimes(1);
    const error = await screen.findByTestId('error')
    expect(error).toBeInTheDocument();
  })
});
