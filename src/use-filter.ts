import { useState } from "react";

export const buildFilter = <T>(filters: Record<keyof T, string> | {}) => (value: T[]) => {
  let filteredValue: T[] = [...value];
  if(value) {
    Object.entries<string>(filters).forEach(filterItem => {
      const [name, value] = filterItem as [keyof T, string];

      if(value.trim() === '')
        return;

      filteredValue = filteredValue.filter(item => {
        const fieldValue = item[name];
        const pattern = `.*${value.toLowerCase()}.*`;
        return new RegExp(pattern, 'i').test((fieldValue as any).toString());
      });
    });
  }

  return filteredValue;
};

export const useFilter = <T extends Record<string, string>>(filterLabels: Record<keyof T, string>) => {
  const [filters, setFilters] = useState<Record<keyof T, string> | {}>({});

  const addFilter = (name: keyof T) => {
    setFilters(filters => {
      const newFilters = { ...filters, [name]: '' };
      return newFilters;
    });
  };

  const setFilter = (name: keyof T, newValue: string) => {
    setFilters(filters => {
      const entries = Object.entries(filters).map(([key, value]) => {
        if(key === name)
          return [key, newValue];
        else
          return [key, value];
      });
      return Object.fromEntries(entries);
    });
  };

  const clearFilter = (name: keyof T) => {
    setFilters(filters => {
      const entries = Object.entries<string>(filters).filter(([key]) => key !== name);
      return Object.fromEntries<string>(entries);
    });
  };

  const clearFilters = () => setFilters({});

  const filter = buildFilter(filters);

  return { filter, filters, filterLabels, addFilter, setFilter, clearFilter, clearFilters };
};
