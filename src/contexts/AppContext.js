import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [successDeleteSnackbarOpen, setSuccessDeleteSnackbarOpen] = useState(
    false
  );
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failSnackbarOpen, setFailSnackbarOpen] = useState(false);
  const [personalStateVisible, setPersonalStateVisible] = useState(true);
  const [companyGeneralStateVisible, setCompanyGeneralStateVisible] = useState(
    true
  );
  const [companyMonthlyStateVisible, setCompanyMonthlyStateVisible] = useState(
    true
  );

  return (
    <AppContext.Provider
      value={{
        successSnackbarOpen,
        setSuccessSnackbarOpen,
        failSnackbarOpen,
        setFailSnackbarOpen,
        personalStateVisible,
        setPersonalStateVisible,
        companyGeneralStateVisible,
        setCompanyGeneralStateVisible,
        successDeleteSnackbarOpen,
        setSuccessDeleteSnackbarOpen,
        companyMonthlyStateVisible,
        setCompanyMonthlyStateVisible,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
