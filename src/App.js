import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Header from './components/Header/Header';
import CompanyState from './templates/CompanyState';
import PersonalState from './templates/PersonalState';
import CompanyStateMonthly from './templates/CompanyStateMonthly';
import CompanyStateContextProvider from './contexts/CompanyStateContext';
import MainTemplate from './templates/MainTemplate';
import UserContextProvider from './contexts/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <CompanyStateContextProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={MainTemplate} />
            <Route path='/personal-state' component={PersonalState} />
            <Route path='/company-state' component={CompanyState} />
            <Route
              path='/company-state-monthly'
              component={CompanyStateMonthly}
            />
          </Switch>
        </BrowserRouter>
      </CompanyStateContextProvider>
    </UserContextProvider>
  );
};

export default App;
