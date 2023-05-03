import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const MAX_FILTER_OPTIONS = 5;
function Form() {
  const {
    apiData, setApiData, planetName, setPlanetName, column,
    setColumn, operator, setOperator, valueFilter, setValueFilter, filters,
    setFilters, columnsOptions, setColumnsOptions } = useContext(AppContext);
  const handleChange = ({ target }) => {
    const { value } = target;

    setPlanetName(value);
  };

  const handleFilter = (col, oper, value) => {
    const operators = {
      'maior que': apiData.filter((item) => item[col] > Number(value)),
      'menor que': apiData.filter((item) => item[col] < Number(value)),
      'igual a': apiData.filter((item) => item[col] === value),
    };

    setColumnsOptions(columnsOptions.filter((e) => e !== column));
    setColumn(columnsOptions[1]);
    setFilters([...filters, { column, operator, valueFilter }]);
    setApiData(operators[oper]);
  };
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
      <section>
        {filters.length > 0 && filters.map((e) => (
          <p key={ e.column }>{`${e.column} ${e.operator} ${e.valueFilter}`}</p>
        ))}

      </section>
    </div>
  );
}

export default Form;
