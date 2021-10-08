import React, { useEffect, useState } from 'react';

// import axios from 'axios';

import data from './data.json';
import { Error } from './styles';
import { CountryData } from './types';

import { CountryTable } from './CountryTable';

// const accessKey = 'd900be847c9fbbff3b15eec6702809a6';

const getCountries = async (): Promise<CountryData[]> => {
  // const response = await axios.get('https://api.countrylayer.com/v2/all', { params: { access_key: accessKey } });
  // return response.data;

  return data as any;
};

const App = () => {
  const [countries, setCountries] = useState<CountryData[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getCountries()
      .then(data => setCountries(data))
      .catch(() => setError('Error: Failed to load country data'));
  }, []);

  return (
    <div>
      <h1>Country Time!!</h1>
      {error && <Error>{error}</Error>}

      {!countries && <h2>Loading...</h2>}
      {countries && <CountryTable value={countries}/>}
    </div>
  );
};

export default App;
