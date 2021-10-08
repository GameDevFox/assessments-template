import React from 'react';
import { useRouteMatch } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { countriesAtom } from './recoil';

interface RouteMatch {
  countryCode: string;
}

const Style = styled.div`
  h2 {
    text-decoration: underline;
  }

  th {
    text-align: left;
  }
`;

export const Country = () => {
  const countries = useRecoilValue(countriesAtom);
  const routeMatch = useRouteMatch<RouteMatch>();

  const { countryCode } = routeMatch.params;
  const country = countries?.find(country => country.alpha3Code === countryCode);

  return (
    <Style>
      <h2>{country?.name}</h2>
      <table>
        <tbody>
          <tr>
            <th>Captial:</th>
            <td>{country?.capital}</td>
          </tr>
          <tr>
            <th>Country Code:</th>
            <td>{country?.alpha3Code}</td>
          </tr>
          <tr>
            <th>Region:</th>
            <td>{country?.region}</td>
          </tr>
        </tbody>
      </table>
    </Style>
  );
};
