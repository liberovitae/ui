import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import ExploreIcon from '@material-ui/icons/Explore';
import {
  makeStyles,
  useTheme,
  lighten,
  darken,
} from '@material-ui/core/styles';
import { Typography, Fade } from '@material-ui/core';
import { routeConfig, hero } from '../../../constants/globalVars';
import { useReactiveVar } from '@apollo/client';
import ParticleBackground from './ParticleBackground';
import { objCompare } from '../../../helpers';
import INITIAL_SEARCH_STATE from '../../../constants/initialSearch';
const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      marginTop: !props ? '5rem' : '3rem',
      [theme.breakpoints.down('xs')]: {
        marginTop: 0,
      },
      padding: '1rem',
      textAlign: 'center',
      minHeight: '180px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? lighten(theme.palette.background.default, 0.06)
          : darken(theme.palette.background.default, 0.01),
    },
    subtitle: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? lighten(theme.palette.background.default, 0.06)
          : darken(theme.palette.background.default, 0.01),
      fontSize: '1.3rem',
      marginTop: '2rem',
    },
    flag: {
      marginLeft: '0.5rem',
      width: '2rem',
      height: '2rem',
      verticalAlign: 'bottom',
    },
    exploreIcon: {
      verticalAlign: 'bottom',
      height: '2rem',
      width: '2rem',
      marginLeft: '0.3rem',
    },
    container: {
      zIndex: 10,
    },
  }));

const Hero = React.memo(
  ({ title, subtitle, country }) => {
    const reactiveHero = useReactiveVar(hero);
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const theme = useTheme(reactiveRouteConfig);
    const isEmptySearch = objCompare(
      reactiveRouteConfig.searchVar(),
      INITIAL_SEARCH_STATE,
    );

    console.log(isEmptySearch);
    const classes = useStyles(isEmptySearch)();
    const heroRoot = document.getElementById('heroRoot');

    if (title || reactiveHero?.title) {
      return (
        <Fade in>
          <div id="heroRoot" className={classes.root}>
            <ParticleBackground
              routeConfig={routeConfig}
              theme={theme}
              heroRoot={heroRoot}
              style={classes.root}
            />
            <div className={classes.container}>
              <div className={classes.container}>
                <Typography className={classes.title} variant="h4">
                  {title || reactiveHero?.title}
                </Typography>

                <Typography className={classes.subtitle}>
                  {subtitle || reactiveHero?.subtitle}

                  {country?.length === 2 ||
                  reactiveHero?.country?.length === 2 ? (
                    <ReactCountryFlag
                      countryCode={country || reactiveHero?.country}
                      svg
                      className={classes.flag}
                      title={country}
                    />
                  ) : country || reactiveHero?.country ? (
                    <ExploreIcon
                      color="primary"
                      className={classes.exploreIcon}
                    />
                  ) : null}
                </Typography>
              </div>
            </div>
          </div>
        </Fade>
      );
    }
    return '';
  },
  (prevProps, nextProps) => {
    if (prevProps !== nextProps) return false;
    return true;
  },
);

export default Hero;
