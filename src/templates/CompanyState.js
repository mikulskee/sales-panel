import React, { useContext, useState, useEffect } from 'react';

import StateDashboard from '../components/StateDashboard/StateDashboard';
import { CompanyStateContext } from '../contexts/CompanyStateContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';

const CompanyState = () => {
  const [admin, setAdmin] = useState('');

  const { companyState } = useContext(CompanyStateContext);
  const { personalData } = useContext(PersonalDataContext);

  useEffect(() => {
    if (personalData) {
      if (personalData.initials === 'AK') {
        setAdmin('admin');
      } else {
        setAdmin('');
      }
    }
  }, [personalData]);

  return (
    <StateDashboard
      title='Stan firmowy ogólny'
      data={companyState}
      admin={admin}
    />
  );
};

export default CompanyState;
