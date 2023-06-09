import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const API_URL = 'https://swapi.dev/api/planets';

function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const newData = data.results.map((item) => {
        delete item.residents;
        return item;
      });
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
    apiData, setApiData, loading, errorMessage,
  }), [apiData, loading, errorMessage]);

  return (
    <AppContext.Provider value={ values }>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;
