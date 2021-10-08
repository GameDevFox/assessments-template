import { Sort } from "./Sort";
import { buildSort, SortItem } from "./use-sort";

interface Data {
  id: number;
  name: string;
  age: number;
}

const data: Data[] = [
  { id: 1, name: 'James', age: 34 },
  { id: 2, name: 'Sally', age: 23 },
  { id: 3, name: 'Alice', age: 34 },
  { id: 4, name: 'Peter', age: 45 },
  { id: 5, name: 'Adam', age: 34 },
];

describe('sort', () => {
  it('should sort by name then age', () => {
    const sortItems: SortItem<Data>[] = [['name', Sort.ASC],['age', Sort.DESC]];
    const sort = buildSort(sortItems);

    const result = sort(data);
    expect(result).toEqual([
      { id: 4, name: 'Peter', age: 45 },
      { id: 5, name: 'Adam', age: 34 },
      { id: 3, name: 'Alice', age: 34 },
      { id: 1, name: 'James', age: 34 },
      { id: 2, name: 'Sally', age: 23 }
    ]);
  });

  it('should sort by age then name', () => {
    const sortItems: SortItem<Data>[] = [['age', Sort.ASC], ['name', Sort.DESC]];
    const sort = buildSort(sortItems);

    const result = sort(data);
    expect(result).toEqual([
      { id: 2, name: 'Sally', age: 23 },
      { id: 4, name: 'Peter', age: 45 },
      { id: 1, name: 'James', age: 34 },
      { id: 3, name: 'Alice', age: 34 },
      { id: 5, name: 'Adam', age: 34 }
    ]);
  });
});
