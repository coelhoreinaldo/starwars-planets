import React, { useContext } from 'react';
import { FilterContext } from '../contexts/FilterProvider';
import FilterForm from './FilterForm';
import SortForm from './SortForm';

function Form() {
  const {
    planetName, handleChange, filters, handleDeleteOneFilter,
  } = useContext(FilterContext);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <label data-testid="name-filter" htmlFor="name-filter">
        <input
          type="text"
          id="name-filter"
          value={ planetName }
          onChange={ handleChange }
          placeholder="Search by name"
        />
      </label>
      <FilterForm />
      <ul>
        {filters.length > 0 && filters.map((e) => (
          <li data-testid="filter" key={ e.column }>
            <button onClick={ () => handleDeleteOneFilter(e) }>X</button>
            <p>{`${e.column} ${e.operator} ${e.valueFilter}`}</p>
          </li>
        ))}
      </ul>
      <SortForm />
    </div>
  );
}

export default Form;
