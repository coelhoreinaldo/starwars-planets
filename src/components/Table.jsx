import React, { useContext } from 'react';
import { FilterContext } from '../contexts/FilterProvider';
import Form from './Form';
import AppContext from '../contexts/AppContext';

function Table() {
  const { loading, errorMessage } = useContext(AppContext);
  const { filteredData, planetName } = useContext(FilterContext);

  if (loading) {
    return (<p>Loading...</p>);
  }

  if (errorMessage) {
    return (<p data-testid="error">{errorMessage}</p>);
  }

  return (
    <div className="">
      <Form />
      <table className="" border="1px">
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
        </thead>
        <tbody>
          {filteredData
            .filter((e) => e.name.toLowerCase().includes(planetName.toLowerCase()))
            .map((element) => (
              <tr key={ element.name }>
                <td data-testid="planet-name">{element.name}</td>
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
