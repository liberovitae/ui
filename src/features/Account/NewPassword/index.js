import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import NewPasswordForm from './NewPasswordForm';

const INITIAL_STATE = {
  password: '',
  passwordConfirmation: '',
};

const NewPassword = ({ refetch, history }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const { password, passwordConfirmation } = state;

  useEffect(() => {
    hero({
      title: (
        <FormattedMessage id="account.new_password.hero.title" />
      ),
      subtitle: (
        <FormattedMessage id="account.new_password.hero.subtitle" />
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
    <NewPasswordForm
      password={password}
      passwordConfirmation={passwordConfirmation}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(NewPassword);
