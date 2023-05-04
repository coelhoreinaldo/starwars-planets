import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'
import { planetsData } from './mocks';
import AppProvider from '../contexts/AppProvider';
import FilterProvider from '../contexts/FilterProvider';
import userEvent from '@testing-library/user-event';

describe('the FilterForm component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (planetsData),
    });
  });

  it('should filter the planets by name', async () => {
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

  it('should filter by comparison and accept multiple filters', async () => {
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
    userEvent.type(valueFilterEl, '10201')

    const filterBtn = screen.getByTestId('button-filter')
    expect(filterBtn).toBeInTheDocument();
    userEvent.click(filterBtn)

    expect(tatooinePlanet).not.toBeInTheDocument();
    const yavinPlanet = await screen.findByRole('cell', { name: /yavin iv/i });
    expect(yavinPlanet).toBeInTheDocument();
    const hothPlanet = screen.getByRole('cell', { name: /hoth/i })
    expect(hothPlanet).toBeInTheDocument();

    userEvent.selectOptions(findByColInput, 'population')
    userEvent.selectOptions(operatorEl, 'maior que');
    userEvent.clear(valueFilterEl)
    userEvent.type(valueFilterEl, '900')
    userEvent.click(filterBtn)

    const endorPlanet = await screen.findByRole('cell', { name: /endor/i });
    expect(endorPlanet).toBeInTheDocument();
    expect(yavinPlanet).toBeInTheDocument();
    expect(hothPlanet).not.toBeInTheDocument();

    userEvent.selectOptions(findByColInput, 'rotation_period')
    userEvent.selectOptions(operatorEl, 'igual a');
    userEvent.clear(valueFilterEl)
    userEvent.type(valueFilterEl, '18')
    userEvent.click(filterBtn)

    expect(endorPlanet).toBeInTheDocument();
    expect(yavinPlanet).not.toBeInTheDocument();

  })

  it('should delete a filter on X button', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);

    const findByColInput = await screen.findByTestId('column-filter');
    const operatorEl = screen.getByTestId('comparison-filter')
    const valueFilterEl = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')
    const yavinPlanet = await screen.findByRole('cell', { name: /yavin iv/i });
    const endorPlanet = await screen.findByRole('cell', { name: /endor/i });

    userEvent.selectOptions(findByColInput, 'rotation_period')
    userEvent.selectOptions(operatorEl, 'igual a');
    userEvent.clear(valueFilterEl)
    userEvent.type(valueFilterEl, '18')
    userEvent.click(filterBtn)

    expect(endorPlanet).toBeInTheDocument();
    expect(yavinPlanet).not.toBeInTheDocument();

    const deleteOneItemBtn = screen.getByRole('button', { name: /x/i });
    userEvent.click(deleteOneItemBtn);

    const yavinPlanet2 = await screen.findByRole('cell', { name: /yavin iv/i });
    expect(yavinPlanet2).toBeInTheDocument();
  })

  it('should delete all filters on remove fliters buttons', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);

    const findByColInput = await screen.findByTestId('column-filter');
    const operatorEl = screen.getByTestId('comparison-filter')
    const valueFilterEl = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')
    const yavinPlanet = await screen.findByRole('cell', { name: /yavin iv/i });
    const endorPlanet = screen.getByRole('cell', { name: /endor/i });
    const tatooinePlanet = screen.getByRole('cell', { name: /tatooine/i });

    expect(tatooinePlanet).toBeInTheDocument();

    userEvent.selectOptions(findByColInput, 'population')
    userEvent.selectOptions(operatorEl, 'maior que');
    userEvent.clear(valueFilterEl)
    userEvent.type(valueFilterEl, '900')
    userEvent.click(filterBtn)

    expect(yavinPlanet).toBeInTheDocument();
    expect(endorPlanet).toBeInTheDocument();

    userEvent.selectOptions(findByColInput, 'rotation_period')
    userEvent.selectOptions(operatorEl, 'igual a');
    userEvent.clear(valueFilterEl)
    userEvent.type(valueFilterEl, '18')
    userEvent.click(filterBtn)

    expect(tatooinePlanet).not.toBeInTheDocument();
    expect(yavinPlanet).not.toBeInTheDocument();

    const removeAllFiltersBtn = screen.getByTestId('button-remove-filters');
    userEvent.click(removeAllFiltersBtn)

    const tatooinePlanet2 = await screen.findByRole('cell', { name: /tatooine/i });

    expect(tatooinePlanet2).toBeInTheDocument();
    const yavinPlanet2 = await screen.findByRole('cell', { name: /yavin iv/i });
    expect(yavinPlanet2).toBeInTheDocument();
  })

})
