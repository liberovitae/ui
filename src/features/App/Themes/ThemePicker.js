import { useReactiveVar } from '@apollo/client';
import {
  blue,
  purple,
  purpleDark,
  blueDark,
  orange,
  orangeDark,
} from './';
import { useTheme } from '@material-ui/core/styles';

import {
  routeConfig,
  darkTheme,
} from '../../../constants/globalVars';

export const themePicker = () => {
  const reactiveRouteConfig = useReactiveVar(routeConfig);
  const reactiveDarkTheme = useReactiveVar(darkTheme);
  const theme = useTheme();
  const { theme: routeTheme } = reactiveRouteConfig;
  const { colour } = routeTheme;

  switch (colour) {
    case 'purple':
      const purpleTheme = purple();
      if (
        theme.palette.primary.main ===
        purpleTheme.palette.primary.main
      )
        break;

      if (reactiveDarkTheme) {
        localStorage.setItem('darkTheme', true);
        return purpleDark();
      }
      localStorage.setItem('darkTheme', false);
      return purpleTheme;

    case 'blue':
      const blueTheme = blue();
      if (
        theme.palette.primary.main === blueTheme.palette.primary.main
      )
        break;

      if (reactiveDarkTheme) {
        localStorage.setItem('darkTheme', true);
        return blueDark();
      }
      localStorage.setItem('darkTheme', false);
      return blueTheme;

    case 'orange':
      const orangeTheme = orange();
      if (
        theme.palette.primary.main ===
        orangeTheme.palette.primary.main
      )
        break;
      if (
        theme.palette.primary.main ===
        orangeTheme.palette.primary.main
      ) {
        return false;
      }

      if (reactiveDarkTheme) {
        localStorage.setItem('darkTheme', true);
        return orangeDark();
      }
      localStorage.setItem('darkTheme', false);
      return orangeTheme;

    default:
      return purpleTheme;
  }
};

export default themePicker;
