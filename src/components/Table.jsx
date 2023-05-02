import React from 'react';
// import AppContext from '../contexts/AppContext';
import useFetch from '../hooks/useFetch';

const API_URL = 'https://swapi.dev/api/planets';

function Table() {
  const { apiData } = useFetch(API_URL);

  // simplesmente usar um objectVALUES/KEYS NAO FUNCIONAAAAAAAAA
  // console.log(Object.values(apiData[0]));

  console.log(apiData);
  console.log('xd');
  return (
    <div>
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
          {apiData.map((element) => (
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
