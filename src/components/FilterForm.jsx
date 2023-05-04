import React, { useContext } from 'react';
import { FilterContext } from '../contexts/FilterProvider';

const MAX_FILTER_OPTIONS = 5;
function FilterForm() {
  const { column, setColumn, operator, setOperator, valueFilter, setValueFilter,
    filters, handleDeleteAll, handleFilter, columnsOptions } = useContext(FilterContext);
  return (
    <form>
      <label htmlFor="column-filter">
        Column
        <select
          data-testid="column-filter"
          id="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
          value={ column }
        >
          {columnsOptions.map((e) => <option value={ e } key={ e }>{e}</option>)}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operator
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          value={ operator }
          onChange={ ({ target }) => setOperator(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          type="number"
          name="value-filter"
          id="value-filter"
          value={ valueFilter }
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilter(column, operator, valueFilter) }
        disabled={ filters.length === MAX_FILTER_OPTIONS }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteAll }
        disabled={ filters.length === 0 }
      >
        Remover Filtros

      </button>
    </form>
  );
}

export default FilterForm;
