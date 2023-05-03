import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const MAX_FILTER_OPTIONS = 5;
function Table() {
  const {
    apiData, setApiData, planetName, setPlanetName, column,
    setColumn, operator, setOperator, valueFilter, setValueFilter, filters,
    setFilters, columnsOptions, setColumnsOptions,
  } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const { value } = target;

    setPlanetName(value);
  };

  const handleFilter = (col, oper, value) => {
    // const columns = filters.map((e) => e.column);
    // if (columns.includes(col)) {
    //   return;
    // }

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
      <table border="1">
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>films</th>
            <th>population</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
          {/* <tr>
            {apiData.map((element, i) => <th key={ i }>{element.name}</th>)}
          </tr> */}
        </thead>
        <tbody>
          {apiData
            .filter((e) => e.name.toLowerCase().includes(planetName.toLowerCase()))
            .map((element) => (
              <tr key={ element.name }>
                <td>{element.name}</td>
                <td>{element.rotation_period}</td>
                <td>{element.orbital_period}</td>
                <td>{element.diameter}</td>
                <td>{element.climate}</td>
                <td>{element.gravity}</td>
                <td>{element.terrain}</td>
                <td>{element.surface_water}</td>
                <td>{element.films.map((film) => <p key={ film }>{film}</p>)}</td>
                <td>{element.population}</td>
                <td>{element.created}</td>
                <td>{element.edited}</td>
                <td>{element.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
