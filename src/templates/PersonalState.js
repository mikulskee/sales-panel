import React, { useContext, useState, useEffect } from 'react';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { PersonalStateContext } from '../contexts/PersonalStateContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';
const PersonalState = () => {
  const [admin, setAdmin] = useState('');
  const { personalState } = useContext(PersonalStateContext);
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
      title='Stan indywidualny'
      data={personalState}
      admin={admin}
    />
  );
};

export default PersonalState;
