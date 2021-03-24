import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LOGIN } from '../../constants/routes';
import { GET_ME } from './queries';

const withAuthorization = (conditionFn) => (Component) => (props) => {
  const { data, networkStatus } = useQuery(GET_ME);

  if (networkStatus < 7) {
    return null;
  }

  return conditionFn(data) ? (
    <Component {...props} />
  ) : (
    <Redirect to={LOGIN} />
  );
};

export default withAuthorization;
