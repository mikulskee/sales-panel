import React, { createContext, useState } from 'react';

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateMenu = (state) => {
    setIsMenuOpen(state);
  };
  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        updateMenu,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
