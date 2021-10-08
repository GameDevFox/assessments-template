import { useState } from "react";

import { Sort } from "./Sort";

export type SortItem<T> = [keyof T, Sort];

const sortByFieldFn = <T>(field: keyof T, direction: Sort) => (a: T, b: T) => {
  const aField: any = a[field];
  const bField: any = b[field];

  if(aField === bField)
    return 0;

  if(aField > bField)
    return 1 * direction;
  else
    return -1 * direction;
};

export const buildSort = <T>(sortItems: SortItem<T>[]) => (value: T[]) => {
  const result = [...value];

  sortItems.forEach(([field, direction]) => {
    result.sort(sortByFieldFn<T>(field, direction));
  });

  return result;
};

export const useSort = <T extends {}>() => {
  const [sortItems, setSortItems] = useState<SortItem<T>[]>([]);

  const getSort = (field: keyof T) => {
    const item = sortItems.find(([itemField]) => itemField === field);

    if(!item)
      return Sort.NO_SORT;

    return item[1];
  }

  const getSortOrder = (field: keyof T) => {
    const index = sortItems.findIndex(([itemField]) => itemField === field);
    if(index === -1)
      return null;

    return index + 1;
  }

  const handleSort = (field: keyof T, direction: Sort) => {
    // Remove field sort
    const newSort = sortItems.filter(([itemField]) => itemField !== field);

    if(direction !== Sort.NO_SORT)
      newSort.push([field, direction]);

    setSortItems(newSort);
  };

  const clearSort = () => setSortItems([]);

  const sort = buildSort(sortItems);

  return { sort, sortValue: sortItems, getSort, getSortOrder, setSort: handleSort, clearSort };
};
