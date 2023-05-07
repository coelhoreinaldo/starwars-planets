import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppProvider from './contexts/AppProvider';
import FilterProvider from './contexts/FilterProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <AppProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AppProvider>,
  );
