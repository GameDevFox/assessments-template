import React from 'react';
import styled from 'styled-components';

import { Icon } from './Icon';
import { IconButton } from './styles';

export interface Props {
  filters: Record<string, string>;
  filterLabels: Record<string, string>;
  setFilter: any;
  clearFilter: any;
  clearFilters: any;
};

const TrashIcon = (props: any) => <IconButton><Icon {...props} value="trash"/></IconButton>

const Style = styled.div`
  padding: 8px 0;
  border-top: 2px solid black;
  border-bottom: 2px solid black;

  .header {
    margin: 0;
    padding-bottom: 10px;
  }
`;

export const Filters = (props: Props) => {
  const { filters, filterLabels, setFilter, clearFilter, clearFilters } = props;

  return (
    <Style>
      <h2 className="header">Filters</h2>
      <table>
        <tbody>
          {Object.entries(filters).map(entry => {
            const [name, value] = entry;

            return (
                <tr key={name}>
                  <td>{filterLabels[name]}</td>
                  <td>
                    <input type="text" value={value} onChange={e => setFilter(name, e.currentTarget.value)}/>
                  </td>
                  <td>
                    <TrashIcon onClick={() => clearFilter(name)}/>
                  </td>
                </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => clearFilters()}>Clear Filters</button>
    </Style>
  );
};
