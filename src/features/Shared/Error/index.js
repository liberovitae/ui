import React from 'react';
import { useSnackbar } from 'notistack';

const ErrorMessage = ({ error }) => {
  const { enqueueSnackbar } = useSnackbar();
  return enqueueSnackbar(error.message, { variant: 'error' });
};
export default ErrorMessage;
