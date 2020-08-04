import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failSnackbarOpen, setFailSnackbarOpen] = useState(false);
  const [personalStateVisible, setPersonalStateVisible] = useState(true);
  const [companyGeneralStateVisible, setCompanyGeneralStateVisible] = useState(
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
