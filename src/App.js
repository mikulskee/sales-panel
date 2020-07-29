import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Header from './components/Header/Header';
import CompanyState from './templates/CompanyState';
import PersonalState from './templates/PersonalState';
import CompanyStateMonthly from './templates/CompanyStateMonthly';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/personal-state' component={PersonalState} />
          <Route path='/company-state' component={CompanyState} />
          <Route
            path='/company-state-monthly'
            component={CompanyStateMonthly}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
