import React, { createContext, useState } from 'react';

export const CompanyStateContext = createContext();
const CompanyStateContextProvider = (props) => {
  const [companyState, setCompanyState] = useState();

  return (
    <CompanyStateContext.Provider
      value={{
        companyState,
        setCompanyState,
      }}
    >
      {props.children}
    </CompanyStateContext.Provider>
  );
};

export default CompanyStateContextProvider;
