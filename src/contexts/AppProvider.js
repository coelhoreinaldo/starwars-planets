import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const INITIAL_STATE = { nome: 'teste', idade: 27 };
function AppProvider({ children }) {
  const [state1, setState1] = useState(INITIAL_STATE);

  const values = useMemo(() => ({
    state1, setState1,
  }), [state1, setState1]);

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
