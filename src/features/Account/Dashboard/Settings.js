import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REVERT_EMAIL } from './queries';
import { hero, hideBlog } from '../../../constants/globalVars';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Button,
  Fade,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import {
  ACCOUNT_EDIT,
  PASSWORD_EDIT,
  ACCOUNT_DELETE,
} from '../../../constants/routes';

const useStyles = makeStyles({
  container: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    width: '100%',
  },
  button: {
    width: '100%',
    marginBottom: '0.5rem',
  },
  section: {
    paddingBottom: '2rem',
  },
  email: {
    marginBottom: '0.5rem',
    overflowWrap: 'anywhere',
    paddingRight: '0.5rem',
  },
  username: {
    marginBottom: '0.5rem',
  },
  deleteButton: {
    alignSelf: 'flex-end',
  },
});

const Settings = ({ session, refetch }) => {
  const classes = useStyles();
  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.settings.hero_title" />,
      subtitle: (
        <FormattedMessage id="account.settings.hero_subtitle" />
      ),
    });
  }, []);

  const [state, setState] = useState({
    hideBlog: JSON.parse(localStorage.getItem('hideBlog')),
  });

  const [revertEmail] = useMutation(REVERT_EMAIL, {
    onCompleted: ({ revertEmail }) => revertEmail && refetch(),
  });

  const handleBlogPosts = () => {
    if (hideBlog()) {
      setState({ hideBlog: false });
      hideBlog(false);
      localStorage.removeItem('hideBlog');
      return;
    }
    setState({ hideBlog: true });
    hideBlog(true);
    localStorage.setItem('hideBlog', true);
  };

  return (
    <Fade in>
      <div>
        <Typography paragraph variant="h6">
          <FormattedMessage id="account.settings.info_title" />
        </Typography>
        <Grid container alignItems="center">
          <Grid item className={classes.username} xs={3}>
            <strong>
              <FormattedMessage id="common.username" />
            </strong>
          </Grid>
          <Grid className={classes.username} item xs={9}>
            {session.me.username}
          </Grid>
          <Grid item xs={3}>
            <strong>
              <FormattedMessage id="common.email" />
            </strong>
          </Grid>
          <Grid item xs={5} className={classes.email}>
            {session.me.secondaryEmail
              ? session.me.secondaryEmail + ' (unverified)'
              : session.me.email}
          </Grid>
          <Grid item xs={4}>
            {session.me.secondaryEmail && (
              <Button
                onClick={() => revertEmail()}
                className={classes.button}
                color="primary"
                variant="outlined"
              >
                Revert last change
              </Button>
            )}
            <Link to={ACCOUNT_EDIT}>
              <Button
                className={classes.button}
                color="primary"
                variant="outlined"
              >
                <FormattedMessage id="account.settings.change_email_button" />
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          className={classes.section}
        >
          <Grid item xs={3}>
            <strong>
              <FormattedMessage id="common.password" />
            </strong>
          </Grid>
          <Grid item xs={5}>
            *******
          </Grid>
          <Grid item xs={4}>
            <Link to={PASSWORD_EDIT}>
              <Button
                className={classes.button}
                color="primary"
                variant="outlined"
              >
                <FormattedMessage id="account.settings.change_password_button" />
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.section}>
          <Grid item>
            <Typography paragraph variant="h6">
              Options
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={state.hideBlog}
                  onChange={handleBlogPosts}
                  name="hideBlog"
                  color="primary"
                />
              }
              label="Hide blog posts"
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography paragraph variant="h6">
              <FormattedMessage id="account.settings.delete_account_button" />
            </Typography>
            <Typography>
              <FormattedMessage id="account.settings.delete_account_text" />
            </Typography>
          </Grid>
          <Grid className={classes.deleteButton} item xs={4}>
            <Link to={ACCOUNT_DELETE}>
              <Button
                className={classes.button}
                color="secondary"
                variant="outlined"
              >
                <FormattedMessage id="account.settings.delete_account_button" />
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default Settings;
