import React, { useContext } from 'react';
import { FilterContext } from '../contexts/FilterProvider';

const MAX_FILTER_OPTIONS = 5;
function Form() {
  const { planetName, handleChange,
    column, setColumn, operator, setOperator, valueFilter, setValueFilter,
    filters, handleDeleteAll, handleDeleteOneFilter, handleFilter,
    columnsOptions, INITIAL_COLS, sortCol, setSortCol,
    sortBy, handleSortBysChange, handleSort,
  } = useContext(FilterContext);

  return (
    <div>
      <label data-testid="name-filter" htmlFor="name-filter">
        <input
          type="text"
          id="name-filter"
          value={ planetName }
          onChange={ handleChange }
          placeholder="Search by name"
        />
      </label>
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

      <ul>
        {filters.length > 0 && filters.map((e) => (
          <li data-testid="filter" key={ e.column }>
            <button onClick={ () => handleDeleteOneFilter(e) }>X</button>
            <p>{`${e.column} ${e.operator} ${e.valueFilter}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Form;

// const operators = {
//   'maior que': apiData.filter((item) => item[col] > Number(value)),
//   'menor que': apiData.filter((item) => item[col] < Number(value)),
//   'igual a': apiData.filter((item) => item[col] === value),
// };
// setApiData(operators[oper]);
