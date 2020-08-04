import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import CompanyStateContextProvider from './contexts/CompanyStateContext';
import UserContextProvider from './contexts/UsersContext';
import PersonalDataContextProvider from './contexts/PersonalDataContext';
import Header from './components/Header/Header';
import MainDashboard from './templates/MainDashboard';
import AppContextProvider from './contexts/AppContext';

const App = () => {
  return (
    <UserContextProvider>
      <PersonalDataContextProvider>
        <CompanyStateContextProvider>
          <AppContextProvider>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route path='/' exact component={MainTemplate} />
                <Route path='/dashboard' component={MainDashboard} />
              </Switch>
            </BrowserRouter>
          </AppContextProvider>
        </CompanyStateContextProvider>
      </PersonalDataContextProvider>
    </UserContextProvider>
  );
};

export default App;
