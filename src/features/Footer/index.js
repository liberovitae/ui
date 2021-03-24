import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ReactCountryFlag from 'react-country-flag';
import {
  Grid,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  Telegram,
  Twitter,
  MonetizationOn,
  RssFeed,
  GitHub,
  Search,
  NotificationsOutlined,
  FavoriteBorderOutlined,
  AccountCircleOutlined,
  PostAddOutlined,
} from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, lighten } from '@material-ui/core/styles';
import {
  FAQ,
  NEWSLETTER,
  LANDING,
  JOBS,
  SAVED,
  ALERTS,
  ACCOUNT,
  JOB_POST,
  TERMS,
  PRIVACY,
  ABOUT,
  DONATE,
  VENUES,
  VENUE_POST,
} from '../../constants/routes';
import history from '../../constants/history';
import { scrollTop } from '../Shared/ScrollTop';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: '#323436',
    minHeight: '200px',
    padding: '1.5rem',
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  link: {
    color: '#fff',
    '&:hover': {
      color: lighten(theme.palette.primary.light, 0.2),
    },
  },
  container: {
    display: 'flex',
    maxWidth: '1100px',
    margin: 'auto',
  },
  icon: {
    verticalAlign: 'text-top',
  },
  feedback: {
    color: '#ccc',
    paddingRight: '1rem',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  columns: {
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    color: '#ccc',
  },
  copyLeft: {
    display: 'inline-block',
    transform: 'rotate(180deg)',
  },
  flag: {
    marginBottom: '3px',
  },
}));

const Footer = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        className={classes.container}
        container
        justify="space-between"
      >
        <Grid item className={classes.feedback} xs={12} md={2} lg={2}>
          Got questions, feedback or ideas? Check the{' '}
          <Link className={classes.link} to={FAQ}>
            FAQ
          </Link>
          , join us on{' '}
          <a className={classes.link} href="https://t.me/liberovitae">
            Telegram
          </a>{' '}
          or drop us a{' '}
          <a
            className={classes.link}
            href="mailto:mail@liberovitae.com"
          >
            message
          </a>
          .
          <p>
            You can also subscribe to our occasional{' '}
            <Link className={classes.link} to={NEWSLETTER}>
              newsletter
            </Link>{' '}
            and never miss an update from us.
          </p>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h6">
            <FormattedMessage id="footer.column2.header" />
          </Typography>
          <List>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                to={VENUES}
                onClick={() => {
                  scrollTop();
                }}
              >
                <ListItemText>
                  <Search fontSize="small" className={classes.icon} />{' '}
                  <FormattedMessage id="footer.column1.link1" />
                </ListItemText>
              </Link>
            </ListItem>

            <ListItem className={classes.listItem} disableGutters>
              <Link
                onClick={() => {
                  scrollTop();
                }}
                className={classes.link}
                to={VENUE_POST}
              >
                <ListItemText>
                  <PostAddOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column1.link2" />
                </ListItemText>
              </Link>
            </ListItem>

            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                to={ALERTS}
                onClick={() => {
                  history.location.pathname === ALERTS && scrollTop();
                }}
              >
                <ListItemText>
                  <NotificationsOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column1.link3" />
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                onClick={() => {
                  history.location.pathname === SAVED && scrollTop();
                }}
                to={{
                  pathname: SAVED,
                }}
              >
                <ListItemText>
                  <FavoriteBorderOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column1.link4" />
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                onClick={() => {
                  history.location.pathname === ACCOUNT &&
                    scrollTop();
                }}
                to={{
                  pathname: ACCOUNT,
                }}
              >
                <ListItemText>
                  <AccountCircleOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column1.link5" />
                </ListItemText>
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h6">
            <FormattedMessage id="footer.column3.header" />
          </Typography>
          <List>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                onClick={() => {
                  history.location.pathname === JOBS && scrollTop();
                }}
                to={JOBS}
              >
                <ListItemText>
                  <Search fontSize="small" className={classes.icon} />{' '}
                  <FormattedMessage id="footer.column2.link1" />
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                onClick={() => {
                  history.location.pathname === JOB_POST &&
                    scrollTop();
                }}
                to={JOB_POST}
              >
                <ListItemText>
                  <PostAddOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column2.link2" />
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                onClick={() => {
                  history.location.pathname === ALERTS && scrollTop();
                }}
                to={ALERTS}
              >
                <ListItemText>
                  <NotificationsOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column2.link3" />
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                onClick={() => {
                  history.location.pathname === SAVED && scrollTop();
                }}
                to={{
                  pathname: SAVED,
                }}
              >
                <ListItemText>
                  <FavoriteBorderOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column2.link4" />
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <Link
                className={classes.link}
                onClick={() => {
                  history.location.pathname === ACCOUNT &&
                    scrollTop();
                }}
                to={{
                  pathname: ACCOUNT,
                }}
              >
                <ListItemText>
                  <AccountCircleOutlined
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  <FormattedMessage id="footer.column2.link5" />
                </ListItemText>
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h6">
            <FormattedMessage id="footer.column4.header" />
          </Typography>
          <List>
            <ListItem className={classes.listItem} disableGutters>
              <a
                className={classes.link}
                target="_blank"
                href="https://t.me/liberovitae"
              >
                <ListItemText>
                  <Telegram
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  Telegram
                </ListItemText>
              </a>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <a
                className={classes.link}
                href="https://twitter.com/liberovitae"
                target="_blank"
              >
                <ListItemText>
                  <Twitter
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  Twitter
                </ListItemText>
              </a>
            </ListItem>

            <ListItem className={classes.listItem} disableGutters>
              <a
                className={classes.link}
                href="https://github.com/liberovitae"
                target="_blank"
              >
                <ListItemText>
                  <GitHub fontSize="small" className={classes.icon} />{' '}
                  GitHub
                </ListItemText>
              </a>
            </ListItem>

            <ListItem className={classes.listItem} disableGutters>
              <Link className={classes.link} to={DONATE}>
                <ListItemText>
                  <MonetizationOn
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  Donate
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <a
                href="/feed/rss.xml"
                target="_blank"
                className={classes.link}
              >
                <ListItemText>
                  <RssFeed
                    fontSize="small"
                    className={classes.icon}
                  />{' '}
                  RSS
                </ListItemText>
              </a>
            </ListItem>
          </List>
        </Grid>
        <Divider variant="fullWidth" className={classes.divider} />
        <Grid
          className={classes.columns}
          container
          justify="space-between"
        >
          <Grid item xs={12} sm={6}>
            <span className={classes.copyLeft}>&copy;</span>{' '}
            {new Date().getFullYear()}{' '}
            <Link
              onClick={() => {
                scrollTop();
              }}
              className={classes.link}
              to={LANDING}
            >
              <FormattedMessage id="site.name" />
            </Link>{' '}
            | Made with{' '}
            <Typography component="span" color="secondary">
              ♥
            </Typography>{' '}
            in GB{' '}
            <ReactCountryFlag
              className={classes.flag}
              countryCode={'GB'}
              svg
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              textAlign: matches ? null : 'right',
              marginTop: matches ? '0.5rem' : null,
            }}
            md={6}
          >
            <Link
              onClick={() => {
                history.location.pathname === TERMS && scrollTop();
              }}
              className={classes.link}
              to={TERMS}
            >
              {' '}
              Terms & conditions{' '}
            </Link>
            |{' '}
            <Link
              onClick={() => {
                history.location.pathname === PRIVACY && scrollTop();
              }}
              className={classes.link}
              to={PRIVACY}
            >
              Privacy policy
            </Link>{' '}
            |{' '}
            <Link
              onClick={() => {
                history.location.pathname === ABOUT && scrollTop();
              }}
              className={classes.link}
              to={ABOUT}
            >
              {' '}
              About
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
