import {
  createContext, useCallback, useContext,
  useMemo, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export const FilterContext = createContext();

const INITIAL_COLS = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function FilterProvider({ children }) {
  const [planetName, setPlanetName] = useState('');

  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const [columnsOptions, setColumnsOptions] = useState(INITIAL_COLS);

  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState([]);

  const [sortCol, setSortCol] = useState('population');
  const [sortBy, setSortBy] = useState('ASC');

  const { apiData } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const { value } = target;

    setPlanetName(value);
  };

  useEffect(() => {
    const filterData = filters
      .reduce((acc, curr) => {
        const filter = acc.filter((e) => {
          switch (curr.operator) {
          case 'maior que':
            return e[curr.column] > Number(curr.valueFilter);
          case 'menor que':
            return e[curr.column] < Number(curr.valueFilter);
          default:
            return e[curr.column] === curr.valueFilter;
          }
        });
        return filter;
      }, apiData);

    setFilteredData(filterData);
  }, [filters, apiData, setFilteredData, sortBy, sortCol]);

  const handleFilter = useCallback((event, col, oper, value) => {
    event.preventDefault();
    setColumnsOptions(columnsOptions.filter((e) => e !== col));
    setColumn(columnsOptions.filter((e) => e !== col)[0]);
    setFilters([...filters, { column: col, operator: oper, valueFilter: value }]);
    setValueFilter(0);
  }, [columnsOptions, filters]);

  const handleDeleteOneFilter = useCallback((toBeDeleted) => {
    setColumnsOptions([...columnsOptions, toBeDeleted.column]);
    setColumn([...columnsOptions, toBeDeleted.column][0]);
    setFilters(filters.filter((e) => e !== toBeDeleted));
  }, [columnsOptions, filters]);

  const handleDeleteAll = useCallback(() => {
    setColumnsOptions(INITIAL_COLS);
    setColumn(INITIAL_COLS[0]);
    setFilters([]);
  }, []);

  const handleSort = useCallback(() => {
    const isUnknown = filteredData.filter((e) => e[sortCol] === 'unknown');
    const hasData = filteredData.filter((e) => e[sortCol] !== 'unknown');
    hasData.sort((a, b) => {
      if (sortBy === 'ASC') {
        return +a[sortCol] - +b[sortCol];
      }
      return +b[sortCol] - +a[sortCol];
    });
    setFilteredData([...hasData, ...isUnknown]);
  }, [filteredData, sortCol, sortBy]);

  const handleSortBysChange = ({ target }) => {
    const { value } = target;

    setSortBy(value);
  };

  const values = useMemo(() => ({
    planetName,
    setPlanetName,
    handleChange,

    filteredData,
    setFilteredData,
    handleFilter,
    handleDeleteAll,

    column,
    operator,
    valueFilter,
    setColumn,
    setOperator,
    setValueFilter,

    filters,
    setFilters,
    handleDeleteOneFilter,

    columnsOptions,
    setColumnsOptions,

    setSortCol,
    sortCol,
    INITIAL_COLS,
    setSortBy,
    sortBy,
    handleSort,
    handleSortBysChange,
  }), [filteredData, planetName, column, operator, valueFilter, filters,
    handleFilter, handleDeleteOneFilter, handleDeleteAll,
    columnsOptions, sortCol, sortBy, handleSort]);

  return (
    <FilterContext.Provider value={ values }>{children}</FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FilterProvider;
