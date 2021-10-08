import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Icon } from './Icon';
import { Filters } from './Filters';
import { Sorter, Style as SorterStyle } from './Sorter';
import { IconButton } from './styles';
import { CountryData } from './types';
import { useFilter } from './use-filter';
import { useSort } from './use-sort';

export const Style = styled.table`
  border-collapse: collapse;

  ${SorterStyle} {
    color: darkorange;
    float: right;
    border-left: 1px solid black;
    margin-left: 6px;
  }

  .sortOrder {
    float: right;
    margin-left: -10px;
  }

  th, td {
    border: 1px solid black;
    padding: 2px;
  }
`;

const FilterIcon = (props: any) => <IconButton><Icon {...props} value="filter"/></IconButton>;

interface Props {
  value: CountryData[];
}

interface HeaderProps {
  label: string;
  sortField: keyof CountryData;
}

const filterLabels = {
  name: 'Name',
  capital: 'Capital',
  region: 'Region',
  alpha3Code: 'Country Code',
};

export const Countries = (props: Props) => {
  const { value } = props;

  const { sort, getSort, getSortOrder, setSort, clearSort } = useSort<CountryData>();
  const {
    filter, filters, addFilter,
    setFilter, clearFilter, clearFilters
  } = useFilter<CountryData>(filterLabels);

  const Header = ({ label, sortField }: HeaderProps) => {
    const sorterValue = getSort(sortField);

    const sortOrder = getSortOrder(sortField);

    return (
      <th>
        {label}
        <FilterIcon onClick={() => addFilter(sortField)}/>
        <div className="sortOrder">{sortOrder && `#${sortOrder}`}</div>
        {sortField && <Sorter value={sorterValue} onChange={value => setSort(sortField, value)}/>}
      </th>
    );
  };

  // Filter & Sort
  const filteredValue = filter(value || []);
  const sortedValue = sort(filteredValue);

  const showFilters = Object.entries(filters).length !== 0;

  return (
    <>
      {showFilters && (
        <Filters
          filters={filters} filterLabels={filterLabels}
          setFilter={setFilter} clearFilter={clearFilter}
          clearFilters={clearFilters}
        />
      )}

      <p>
        <button onClick={clearSort}>Clear Sort</button>
      </p>

      <Style>
        <thead>
          <tr>
            <Header label="Name" sortField="name"/>
            <Header label="Captial" sortField="capital"/>
            <Header label="Region" sortField="region"/>
            <Header label="Country Code" sortField="alpha3Code"/>
          </tr>
        </thead>
        <tbody>
          {sortedValue.map(item => (
            <tr key={item.name}>
              <td>
                <Link to={`/country/${item.alpha3Code}`}>{item.name}</Link>
              </td>
              <td>{item.capital}</td>
              <td>{item.region}</td>
              <td>{item.alpha3Code}</td>
            </tr>
          ))}
        </tbody>
      </Style>
    </>
  );
};
