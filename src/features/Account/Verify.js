import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../constants/globalVars';
import {
  JOBS,
  VENUES,
  VENUE_POST,
  ACCOUNT,
  JOB_POST,
} from '../../constants/routes';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Typography, Grid } from '@material-ui/core';
import history from '../../constants/history';
import { VERIFY_USER } from './Dashboard/queries';

const VerifyAccount = ({ session, refetch }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { token, type } = useParams();

  const [verifyUser, { data }] = useMutation(VERIFY_USER, {
    variables: { token: token, type: type },
    onCompleted: (data) => {
      if (data) {
        hero({
          title: <FormattedMessage id="common.success" />,
          subtitle: (
            <FormattedMessage id="account.verify.hero.subtitle_success" />
          ),
        });
        localStorage.setItem('token', data.verifyUser.token);
        refetch();
      }
    },
    onError: (err) => {
      hero({
        title: <FormattedMessage id="common.failure" />,
        subtitle: (
          <FormattedMessage id="account.verify.hero.subtitle_failure" />
        ),
      });
    },
  });

  useEffect(() => {
    if (session?.me?.verified && !type) {
      enqueueSnackbar('Your account is already verified', {
        variant: 'warning',
      });
      return history.push(LANDING);
    }
    verifyUser();
  }, []);

  return (
    <Grid container justify="center">
      <Grid item>
        {data && data.verifyUser ? (
          <Grid item>
            <Typography paragraph gutterBottom>
              <FormattedMessage id="account.verify.success_text" />
            </Typography>
            <div>
              <Link to={JOBS}>Find a job</Link>
            </div>

            <div>
              <Link to={JOB_POST}>Post a job</Link>
            </div>
            <div>
              <Link to={VENUES}>Find a venue</Link>
            </div>
            <div>
              <Link to={VENUE_POST}>Post a venue</Link>
            </div>
            <div>
              <Link to={ACCOUNT}>My account</Link>
            </div>
          </Grid>
        ) : (
          <FormattedMessage id="account.verify.failure_text" />
        )}
      </Grid>
    </Grid>
  );
};

export default VerifyAccount;
