import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import {
  Typography,
  Grid,
  Box,
  Button,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANDING } from '../../../constants/routes';

const useStyles = makeStyles({
  buttons: { textAlign: 'center' },
  button: {
    margin: '0.5rem',
  },
  crypto: {
    overflowWrap: 'anywhere',
  },
  divider: {
    marginBottom: '2rem',
  },
});

const Donate = ({}) => {
  const classes = useStyles();

  useEffect(() => {
    hero({
      title: 'Donate',
      subtitle: 'Support liberovitae.com',
    });
  }, []);

  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography paragraph variant="h6">
          liberovitae is free, open-source software, meaning no
          advertising, monetizing, or venture capital, ever. Your
          donations directly support full-time development & hosting
          of the project.
        </Typography>

        <Grid className={classes.buttons} item xs={12}>
          <Box mt={4} mb={4}>
            <a
              href="https://liberapay.com/liberovitae"
              target="_blank"
            >
              <Button
                className={classes.button}
                color="primary"
                variant="outlined"
              >
                Support on Liberapay
              </Button>
            </a>
            <a
              href="https://www.patreon.com/liberovitae"
              target="_blank"
            >
              <Button
                color="primary"
                className={classes.button}
                variant="outlined"
              >
                Support on Patreon
              </Button>
            </a>
            <a
              href="https://opencollective.com/liberovitae"
              target="_blank"
            >
              <Button
                className={classes.button}
                color="primary"
                variant="outlined"
              >
                Support on OpenCollective
              </Button>
            </a>
          </Box>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Box mb={6}>
            <Typography
              align="center"
              paragraph
              gutterBottom
              variant="h5"
            >
              Crypto
            </Typography>
            <Box p={0.5}>
              <Typography color="primary" component="span">
                Bitcoin (BTC):
              </Typography>{' '}
              <Box
                component="span"
                className={classes.crypto}
                fontFamily="Monospace"
              >
                1Mx8yqFfLQGTq2SBzfSZrPmurTuCJFVXWE
              </Box>
            </Box>
            <Box p={0.5}>
              <Typography color="primary" component="span">
                Ethereum (ETH):
              </Typography>{' '}
              <Box
                component="span"
                className={classes.crypto}
                fontFamily="Monospace"
              >
                0x27CAa0F8F280e7Fc55f9441cc22C96919931807a
              </Box>
            </Box>
            <Box p={0.5}>
              <Typography color="primary" component="span">
                Monero (XMR):
              </Typography>{' '}
              <Box
                component="span"
                className={classes.crypto}
                fontFamily="Monospace"
              >
                4Aeeugg5n2ZQQMSXRwWBTg4yRHrNoFBqvVWedu1uAyaeNmmWrsrfigPHKqgiLduKjP7V3E2pzthBZfH9SDQhhGC6MY5kZ58
              </Box>
            </Box>
          </Box>
        </Grid>
        <Link to={LANDING}>
          <Button color="primary">
            <FormattedMessage id="common.back" />
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Donate;
