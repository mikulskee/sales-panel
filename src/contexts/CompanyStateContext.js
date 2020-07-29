import React, { createContext, useState } from 'react';

export const CompanyStateContext = createContext();
const CompanyStateContextProvider = (props) => {
  const [companyState, setCompanyState] = useState({
    plus: [
      {
        name: 'Amelia von Jugendin',
        date: '07.09.2020 - 10.11.2020',
      },
      {
        name: 'Kundinga Oberschleisen',
        date: '07.09.2020 - 10.11.2020',
      },
      {
        name: 'Burgundia Vielschmeltzer',
        date: '07.09.2020 - 10.11.2020',
      },
    ],

    minus: [
      {
        name: 'Bemblina Augsbergen',
        date: '07.09.2020',
      },
      {
        name: 'Agathe Monchengladbach',
        date: '07.09.2020',
      },
    ],
  });

  return (
    <CompanyStateContext.Provider
      value={{
        companyState,
      }}
    >
      {props.children}
    </CompanyStateContext.Provider>
  );
};

export default CompanyStateContextProvider;
