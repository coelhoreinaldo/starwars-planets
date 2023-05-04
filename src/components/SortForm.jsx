import React, { useContext } from 'react';
import { FilterContext } from '../contexts/FilterProvider';

function SortForm() {
  const {
    INITIAL_COLS, sortCol, setSortCol, sortBy, handleSortBysChange, handleSort,
  } = useContext(FilterContext);

  return (
    <fieldset>
      <label htmlFor="column-sort">
        <select
          id="column-sort"
          data-testid="column-sort"
          value={ sortCol }
          onChange={ ({ target }) => setSortCol(target.value) }
        >
          {INITIAL_COLS.map((e) => <option key={ e }>{e}</option>)}
        </select>
      </label>

      <legend name="sort">Ordenar</legend>

      <input
        type="radio"
        name="sort"
        id="ASC"
        value="ASC"
        checked={ sortBy === 'ASC' }
        onChange={ handleSortBysChange }
        data-testid="column-sort-input-asc"
      />
      <label htmlFor="ASC">ASC</label>
      <input
        type="radio"
        name="sort"
        id="DESC"
        value="DESC"
        checked={ sortBy === 'DESC' }
        onChange={ handleSortBysChange }
        data-testid="column-sort-input-desc"
      />
      <label htmlFor="DESC">DESC</label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar

      </button>
    </fieldset>
  );
}

export default SortForm;
