import React, { createContext, useState } from 'react';

export const PersonalDataContext = createContext();

const PersonalDataContextProvider = (props) => {
  const [personalData, setPersonalData] = useState();

  return (
    <PersonalDataContext.Provider
      value={{
        personalData,
        setPersonalData,
      }}
    >
      {props.children}
    </PersonalDataContext.Provider>
  );
};

export default PersonalDataContextProvider;
