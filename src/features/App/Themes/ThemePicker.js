import {
  blue,
  purple,
  purpleDark,
  blueDark,
  orange,
  orangeDark,
} from './';

export const themePicker = ({
  reactiveRouteConfig,
  reactiveDarkTheme,
  theme,
}) => {
  if (reactiveRouteConfig.theme.colour === 'purple') {
    const purpleTheme = purple();

    if (
      theme.palette.primary.main === purpleTheme.palette.primary.main
    ) {
      return false;
    }

    if (reactiveDarkTheme) {
      localStorage.setItem('darkTheme', true);
      return purpleDark();
    }
    localStorage.setItem('darkTheme', false);
    return purpleTheme;
  }
  if (reactiveRouteConfig.theme.colour === 'blue') {
    const blueTheme = blue();

    if (
      theme.palette.primary.main === blueTheme.palette.primary.main
    ) {
      return false;
    }

    if (reactiveDarkTheme) {
      localStorage.setItem('darkTheme', true);
      return blueDark();
    }
    localStorage.setItem('darkTheme', false);
    return blueTheme;
  }

  if (reactiveRouteConfig.theme.colour === 'orange') {
    const orangeTheme = orange();

    if (
      theme.palette.primary.main === orangeTheme.palette.primary.main
    ) {
      return false;
    }

    if (reactiveDarkTheme) {
      localStorage.setItem('darkTheme', true);
      return orangeDark();
    }
    localStorage.setItem('darkTheme', false);
    return orangeTheme;
  }
};

export default themePicker;
