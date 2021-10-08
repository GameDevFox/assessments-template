import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// import axios from 'axios';

import { countriesAtom } from './recoil';
import { getCountries } from './services';
import { Error } from './styles';

import { Country } from './Country';
import { Countries } from './Countries';

// const accessKey = 'd900be847c9fbbff3b15eec6702809a6';

const App = () => {
  const [error, setError] = useState('');

  const [countries, setCountries] = useRecoilState(countriesAtom);

  useEffect(() => {
    getCountries()
      .then(data => setCountries(data))
      .catch(() => setError('Error: Failed to load country data'));
  }, [setCountries]);

  return (
    <Router>
      <div>
        <h1>Country Time!!</h1>
        {error && <Error>{error}</Error>}

        {!countries && <h2>Loading...</h2>}
        {countries && (
          <>
            <Route exact path="/" render={() => <Countries value={countries}/>}/>
            <Route path="/country/:countryCode" component={Country}/>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
