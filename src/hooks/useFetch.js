import { useCallback, useEffect, useState } from 'react';

const useFetch = (API_URL) => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
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
      console.log(newData);
      setApiData(newData);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return ({
    loading, apiData, errorMessage,
  });
};

export default useFetch;
