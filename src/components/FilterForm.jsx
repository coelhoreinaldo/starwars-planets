import React, { useContext } from 'react';
import { FilterContext } from '../contexts/FilterProvider';

const MAX_FILTER_OPTIONS = 5;
function FilterForm() {
  const { column, setColumn, operator, setOperator, valueFilter, setValueFilter,
    filters, handleDeleteAll, handleFilter, columnsOptions } = useContext(FilterContext);
  return (
    <form
      onSubmit={ (e) => handleFilter(e, column, operator, valueFilter) }
      onReset={ handleDeleteAll }
      className="form-filter"
    >
      <section className="filter-options">
        <div>
          <label htmlFor="column-filter">
            Column
          </label>
          <select
            data-testid="column-filter"
            id="column-filter"
            onChange={ ({ target }) => setColumn(target.value) }
            value={ column }
          >
            {columnsOptions.map((e) => <option value={ e } key={ e }>{e}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="comparison-filter">
            Operator
          </label>
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
        </div>
        <input
          data-testid="value-filter"
          type="number"
          name="value-filter"
          id="value-filter"
          value={ valueFilter }
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
      </section>
      <section className="filter-buttons">
        <button
          type="submit"
          data-testid="button-filter"
          disabled={ filters.length === MAX_FILTER_OPTIONS }
        >
          Filtrar
        </button>
        <button
          type="reset"
          data-testid="button-remove-filters"
          disabled={ filters.length === 0 }
        >
          Remover Filtros

        </button>
      </section>
    </form>
  );
}

export default FilterForm;
