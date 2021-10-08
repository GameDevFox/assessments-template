import React from "react";

import styled from 'styled-components';
import { Sort } from "./Sort";

export const Style = styled.div`
  display: inline;

  cursor: pointer;
  width: 75px;
`;

const label = ['desc', 'no sort', 'asc'];

interface Props {
  value: Sort,
  onChange: (value: Sort) => void;
}

export const Sorter = ({ value, onChange }: Props) => {
  const handleClick = () => {
    let newValue = value + 1;
      if(newValue > 1)
        newValue = -1;

    onChange(newValue);
  };

  return (
    <Style onClick={handleClick}>{label[value + 1]}</Style>
  );
};
