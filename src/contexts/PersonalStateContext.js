import React, { createContext, useState } from 'react';

export const PersonalStateContext = createContext();

const PersonalStateContextProvider = (props) => {
  const [personalState, setPersonalState] = useState();

  return (
    <PersonalStateContext.Provider
      value={{
        personalState,
        setPersonalState,
      }}
    >
      {props.children}
    </PersonalStateContext.Provider>
  );
};

export default PersonalStateContextProvider;
