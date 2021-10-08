import { buildFilter } from "./use-filter";

const data = [
  { name: 'Adam', city: 'Kirkland' },
  { name: 'Sally', city: 'Independence' },
  { name: 'Elise', city: 'Overland Park' },
  { name: 'Jacob', city: 'Palmyra' },
  { name: 'Peter', city: 'Boise' },
  { name: 'Mary', city: 'Jerusalem' },
  { name: 'James', city: 'Mesa' },
];

describe('use-filter', () => {
  it('should work', () => {
    let filter = buildFilter({ name: 'a', city: 'e' });
    let result = filter(data);
    expect(result).toEqual([
      { name: 'Sally', city: 'Independence' },
      { name: 'Mary', city: 'Jerusalem' },
      { name: 'James', city: 'Mesa' }
    ]);

    filter = buildFilter({ name: 'e', city: 'o' });
    result = filter(data);
    expect(result).toEqual([
      { name: 'Elise', city: 'Overland Park' },
      { name: 'Peter', city: 'Boise' }
    ]);
  });
});
