import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { ACCOUNT } from '../../../constants/routes';
import LoginForm from './LoginForm';

const LoginPage = ({ history, refetch, session }) => (
  <Login history={history} session={session} refetch={refetch} />
);

const INITIAL_STATE = {
  login: '',
  password: '',
};

const Login = ({ refetch, history, session }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const { login, password } = state;

  useEffect(() => {
    if (session?.me) {
      history.push(ACCOUNT);
    }

    hero({
      title: <FormattedMessage id="account.login.hero.title" />,
      subtitle: <FormattedMessage id="account.login.hero.subtitle" />,
    });
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event, signIn) => {
    event.preventDefault();
    sessionStorage.clear();
    signIn();
  };

  return (
    <LoginForm
      login={login}
      refetch={refetch}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(LoginPage);

export { Login };
