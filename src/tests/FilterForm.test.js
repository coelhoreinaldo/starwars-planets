import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'
import planetsData from './mocks/planetsData';
import AppProvider from '../contexts/AppProvider';
import FilterProvider from '../contexts/FilterProvider';
import userEvent from '@testing-library/user-event';

describe('the FilterForm component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (planetsData),
    });
  });

  it('should filter the planets by name search input', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);

    const findByNameInput = await screen.findByTestId('name-filter');
    expect(findByNameInput).toBeInTheDocument();

    const yavinPlanet = await screen.findByRole('cell', { name: /yavin iv/i });
    expect(yavinPlanet).toBeInTheDocument();
    userEvent.type(findByNameInput, 'tatoo')
    expect(yavinPlanet).not.toBeInTheDocument();
    const tatooinePlanet = await screen.findByRole('cell', { name: /tatooine/i });
    expect(tatooinePlanet).toBeInTheDocument();

  })

  it('should filter by options', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);

    const tatooinePlanet = await screen.findByRole('cell', { name: /tatooine/i });
    expect(tatooinePlanet).toBeInTheDocument();

    const findByColInput = screen.getByTestId('column-filter');
    expect(findByColInput).toBeInTheDocument()
    userEvent.selectOptions(findByColInput, 'diameter')

    const operatorEl = screen.getByTestId('comparison-filter')
    expect(operatorEl).toBeInTheDocument();
    userEvent.selectOptions(operatorEl, 'menor que')

    const valueFilterEl = screen.getByTestId('value-filter')
    expect(valueFilterEl).toBeInTheDocument();
    const populationValueFilter = '10201';
    userEvent.type(valueFilterEl, populationValueFilter)

    const filterBtn = screen.getByTestId('button-filter')
    expect(filterBtn).toBeInTheDocument();
    userEvent.click(filterBtn)

    expect(tatooinePlanet).not.toBeInTheDocument();
    const yavinPlanet = await screen.findByRole('cell', { name: /yavin iv/i });
    expect(yavinPlanet).toBeInTheDocument();
  })

})
