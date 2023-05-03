import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

function Table() {
  const { apiData, apiInitialState, setApiData, planetName, setPlanetName, column,
    setColumn, operator,
    setOperator, valueFilter, setValueFilter } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const { value } = target;

    setPlanetName(value);
  };

  const handleFilter = (col, oper, value) => {
    const operators = {
      'maior que': apiInitialState.filter((item) => item[col] > Number(value)),
      'menor que': apiInitialState.filter((item) => item[col] < Number(value)),
      'igual a': apiInitialState.filter((item) => item[col] === value),
    };

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
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
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
      >
        Filtrar

      </button>
      <table border="1">
        <thead className="has-background-primary">
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
                <td>{element.films}</td>
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
