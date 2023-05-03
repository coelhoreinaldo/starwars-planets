import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const API_URL = 'https://swapi.dev/api/planets';

function AppProvider({ children }) {
  const [planetName, setPlanetName] = useState('');

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiInitialState, setApiInitialState] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

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
  }), [apiData, setApiData, apiInitialState, setApiInitialState, loading, errorMessage,
    planetName, setPlanetName, column, operator, valueFilter]);

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
