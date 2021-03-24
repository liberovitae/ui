import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { Link, withRouter } from 'react-router-dom';
import { REGISTER } from '../../../constants/routes';
import RegisterForm from './RegisterForm';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  showPassword: false,
};

const RegisterPage = () => {
  return <Register />;
};

const Register = () => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.register.hero.title" />,
      subtitle: (
        <FormattedMessage id="account.register.hero.subtitle" />
      ),
    });
  }, []);

  const {
    username,
    email,
    password,
    passwordConfirmation,
    showPassword,
  } = state;

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event, signUp) => {
    event.preventDefault();
    signUp();
  };

  const handleClickShowPassword = (event, key) => {
    setState({ ...state, [key]: !state[key] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <RegisterForm
      onSubmit={onSubmit}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      onChange={onChange}
      username={username}
      password={password}
      passwordConfirmation={passwordConfirmation}
      email={email}
      showPassword={showPassword}
    />
  );
};
const RegisterLink = () => (
  <p>
    Don't have an account?
    <Link to={REGISTER}> Register here</Link>
  </p>
);

export default withRouter(RegisterPage);

export { Register, RegisterLink };
