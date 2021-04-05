import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { LOGIN, REGISTER } from '../../../constants/routes';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const AuthBlock = ({}) => {
  const classes = useStyles();

  return (
    <Typography align="center">
      <Link className={classes.link} to={LOGIN}>
        Login{' '}
      </Link>
      or{' '}
      <Link className={classes.link} to={REGISTER}>
        register
      </Link>{' '}
      to comment
    </Typography>
  );
};
export default AuthBlock;
