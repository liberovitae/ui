import React from 'react';
import { useSnackbar } from 'notistack';

const Snackbar = ({ message, variant }) => {
  const { enqueueSnackbar } = useSnackbar();
  return enqueueSnackbar(message, { variant: variant });
};
export default Snackbar;
