import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'
import { planetsData } from './mocks';
import AppProvider from '../contexts/AppProvider';
import FilterProvider from '../contexts/FilterProvider';
import userEvent from '@testing-library/user-event';

describe('the SortForm component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (planetsData),
    });
  });

  it('should sort the planets by ASC', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);

    const tatooinePlanet = await screen.findByRole('cell', { name: /tatooine/i });
    expect(tatooinePlanet).toBeInTheDocument();

    const allPlanets = screen.getAllByTestId('planet-name');
    expect(allPlanets[0]).toContainHTML('Tatooine')

    const columnSortEl = screen.getByTestId('column-sort');
    const ascEl = screen.getByTestId('column-sort-input-asc')
    const sortButton = screen.getByTestId('column-sort-button')

    expect(columnSortEl).toBeInTheDocument()
    expect(ascEl).toBeInTheDocument()
    expect(sortButton).toBeInTheDocument()

    userEvent.selectOptions(columnSortEl, 'rotation_period')
    userEvent.click(ascEl);
    userEvent.click(sortButton);

    const allPlanetsPostFilter = await screen.findAllByTestId('planet-name');
    expect(allPlanetsPostFilter[0]).toContainHTML('Endor')
    expect(allPlanetsPostFilter[1]).toContainHTML('Tatooine')
  })
  it('should sort the planets by DESC', async () => {
    render(<AppProvider><FilterProvider><App /></FilterProvider></AppProvider>);

    const tatooinePlanet = await screen.findByRole('cell', { name: /tatooine/i });
    expect(tatooinePlanet).toBeInTheDocument();

    const allPlanets = screen.getAllByTestId('planet-name');
    expect(allPlanets[0]).toContainHTML('Tatooine')

    const columnSortEl = screen.getByTestId('column-sort');
    const descEl = screen.getByTestId('column-sort-input-desc')
    const sortButton = screen.getByTestId('column-sort-button')

    expect(columnSortEl).toBeInTheDocument()
    expect(descEl).toBeInTheDocument()
    expect(sortButton).toBeInTheDocument()

    userEvent.selectOptions(columnSortEl, 'rotation_period')
    userEvent.click(descEl);
    userEvent.click(sortButton);

    const allPlanetsPostFilter = await screen.findAllByTestId('planet-name');
    expect(allPlanetsPostFilter[0]).toContainHTML('Alderaan')
    expect(allPlanetsPostFilter[1]).toContainHTML('Yavin IV')
  })

})
