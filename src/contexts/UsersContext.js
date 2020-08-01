import React, { createContext, useState } from 'react';

export const UsersContext = createContext();

const UsersContextProvider = (props) => {
  const [users, setUsers] = useState();

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;