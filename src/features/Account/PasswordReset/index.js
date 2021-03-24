import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import PasswordResetForm from './PasswordResetForm';

const INITIAL_STATE = {
  email: '',
};

const PasswordReset = ({ refetch, history }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const { email } = state;

  useEffect(() => {
    hero({
      title: (
        <FormattedMessage id="account.password_reset.hero.title" />
      ),
      subtitle: (
        <FormattedMessage id="account.password_reset.hero.subtitle" />
      ),
    });
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event, passwordReset) => {
    event.preventDefault();
    passwordReset();
  };

  return (
    <PasswordResetForm
      email={email}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(PasswordReset);
