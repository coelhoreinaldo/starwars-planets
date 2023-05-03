import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const API_URL = 'https://swapi.dev/api/planets';
const INITIAL_COLS = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function AppProvider({ children }) {
  const [planetName, setPlanetName] = useState('');

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiInitialState, setApiInitialState] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const [columnsOptions, setColumnsOptions] = useState(INITIAL_COLS);

  const [filters, setFilters] = useState([]);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const newData = data.results.map((item) => {
        delete item.residents;
        return item;
      });
      setApiInitialState(newData);
      setApiData(newData);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const values = useMemo(() => ({
    apiData,
    setApiData,
    apiInitialState,
    setApiInitialState,
    loading,
    errorMessage,

    planetName,
    setPlanetName,
    column,
    operator,
    valueFilter,
    setColumn,
    setOperator,
    setValueFilter,

    filters,
    setFilters,

    columnsOptions,
    setColumnsOptions,
  }), [apiData, setApiData, apiInitialState, setApiInitialState, loading, errorMessage,
    planetName, setPlanetName, column, operator, valueFilter, filters, setFilters,
    columnsOptions]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;
