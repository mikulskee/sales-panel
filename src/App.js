import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CompanyState from './templates/CompanyState';
import PersonalState from './templates/PersonalState';
import CompanyStateMonthly from './templates/CompanyStateMonthly';
import MainTemplate from './templates/MainTemplate';
import CompanyStateContextProvider from './contexts/CompanyStateContext';
import UserContextProvider from './contexts/UsersContext';
import PersonalDataContextProvider from './contexts/PersonalDataContext';
import Header from './components/Header/Header';
import PersonalStateContextProvider from './contexts/PersonalStateContext';
import MainDashboard from './templates/MainDashboard';

const App = () => {
  return (
    <UserContextProvider>
      <PersonalDataContextProvider>
        <PersonalStateContextProvider>
          <CompanyStateContextProvider>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route path='/' exact component={MainTemplate} />
                <Route path='/dashboard' component={MainDashboard} />
                <Route path='/personal-state' component={PersonalState} />
                <Route path='/company-state' component={CompanyState} />
                <Route
                  path='/company-state-monthly'
                  component={CompanyStateMonthly}
                />
              </Switch>
            </BrowserRouter>
          </CompanyStateContextProvider>
        </PersonalStateContextProvider>
      </PersonalDataContextProvider>
    </UserContextProvider>
  );
};

export default App;
