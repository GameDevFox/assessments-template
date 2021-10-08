import data from './data.json';

import { CountryData } from './types';

export const getCountries = async (): Promise<CountryData[]> => {
  // const response = await axios.get('https://api.countrylayer.com/v2/all', { params: { access_key: accessKey } });
  // return response.data;

  return data as any;
};
