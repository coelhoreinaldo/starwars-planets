import React, { useContext } from 'react';
import { FilterContext } from '../contexts/FilterProvider';
import FilterForm from './FilterForm';
import SortForm from './SortForm';
import '../styles/Form.css';

function Form() {
  const {
    planetName, handleChange, filters, handleDeleteOneFilter,
  } = useContext(FilterContext);

  return (
    <section className="main-filters">
      <input
        data-testid="name-filter"
        type="text"
        id="name-filter"
        className="name-filter"
        value={ planetName }
        onChange={ handleChange }
        placeholder="Search by name"
      />
      <FilterForm />
      <SortForm />
      <ul>
        {filters.length > 0 && filters.map((e) => (
          <li data-testid="filter" key={ e.column }>
            <button
              id="delete-one"
              onClick={ () => handleDeleteOneFilter(e) }
            >
              X
            </button>
            <p>{`${e.column} ${e.operator} ${e.valueFilter}`}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Form;
