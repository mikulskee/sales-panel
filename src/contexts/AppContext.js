import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [successDeleteSnackbarOpen, setSuccessDeleteSnackbarOpen] = useState(
    false
  );
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failSnackbarOpen, setFailSnackbarOpen] = useState(false);
  const [personalStateVisible, setPersonalStateVisible] = useState('true');
  const [companyGeneralStateVisible, setCompanyGeneralStateVisible] = useState(
    'true'
  );
  const [companyMonthlyStateVisible, setCompanyMonthlyStateVisible] = useState(
    'true'
  );
  const [usersStateVisible, setUsersStateVisible] = useState({
    KK: 'false',
    EH: 'false',
    VF: 'false',
  });

  useEffect(() => {
    if (!localStorage.getItem('usersStateVisible')) {
      localStorage.setItem(
        'usersStateVisible',
        JSON.stringify(usersStateVisible)
      );
    } else {
      setUsersStateVisible(
        JSON.parse(localStorage.getItem('usersStateVisible'))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeUsersStateVisible = (state, initials) => {
    console.log({ ...usersStateVisible, [initials]: state });
    setUsersStateVisible({ ...usersStateVisible, [initials]: state });
    localStorage.setItem(
      'usersStateVisible',
      JSON.stringify({
        ...usersStateVisible,
        [initials]: state,
      })
    );
  };
  useEffect(() => {
    if (!localStorage.getItem('personalStateVisible')) {
      localStorage.setItem('personalStateVisible', `${personalStateVisible}`);
    } else {
      setPersonalStateVisible(localStorage.getItem('personalStateVisible'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePersonalStateVisible = (state) => {
    setPersonalStateVisible(state);
    localStorage.setItem('personalStateVisible', state);
  };
  useEffect(() => {
    if (!localStorage.getItem('companyGeneralStateVisible')) {
      localStorage.setItem(
        'companyGeneralStateVisible',
        `${companyGeneralStateVisible}`
      );
    } else {
      setCompanyGeneralStateVisible(
        localStorage.getItem('companyGeneralStateVisible')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCompanyGeneralStateVisible = (state) => {
    setCompanyGeneralStateVisible(state);
    localStorage.setItem('companyGeneralStateVisible', state);
  };

  useEffect(() => {
    if (!localStorage.getItem('companyMonthlyStateVisible')) {
      localStorage.setItem(
        'companyMonthlyStateVisible',
        `${companyMonthlyStateVisible}`
      );
    } else {
      setCompanyMonthlyStateVisible(
        localStorage.getItem('companyMonthlyStateVisible')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCompanyMonthlyStateVisible = (state) => {
    setCompanyMonthlyStateVisible(state);
    localStorage.setItem('companyMonthlyStateVisible', state);
  };
  return (
    <AppContext.Provider
      value={{
        successSnackbarOpen,
        setSuccessSnackbarOpen,
        failSnackbarOpen,
        setFailSnackbarOpen,
        personalStateVisible,
        changePersonalStateVisible,
        companyGeneralStateVisible,
        changeCompanyGeneralStateVisible,
        successDeleteSnackbarOpen,
        setSuccessDeleteSnackbarOpen,
        companyMonthlyStateVisible,
        changeCompanyMonthlyStateVisible,
        usersStateVisible,
        changeUsersStateVisible,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
