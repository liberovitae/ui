import { createMuiTheme, lighten } from '@material-ui/core/styles';
import darkCKEditorTheme from './darkCKEditorTheme.css';

const purpleDarkTheme = () => {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#f48fb1',
      },
      secondary: {
        main: '#D9534F',
      },
      background: {
        default: '#000',
      },
      type: 'dark',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
          },
          a: {
            color: '#f48fb1',
            '&:hover': {
              color: lighten('#f48fb1', 0.2),
            },
          },
          overflow: {
            overflow: 'hidden',
          },
          '*::-webkit-scrollbar': {
            width: '0.4em',
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#f48fb1',
            outline: '1px solid slategrey',
          },
          '--ck-focus-ring': '1px solid #f48fb1',
          scrollbar: {
            backgroundColor: lighten('#f48fb1', 0.2),
          },
        },
      },
      MuiFormLabel: {
        root: {
          marginBottom: '0.5rem',
          verticalAlign: 'middle',
        },
      },
      MuiDropzoneArea: {
        root: {
          backgroundColor: 'black',
          border: 'solid 1px !important',
          borderColor: 'rgba(255, 255, 255, 0.25) !important',
          minHeight: 'unset !important',
        },
        textContainer: {
          color: 'rgba(255, 255, 255, 0.3) !important',
        },
        icon: { color: 'rgba(255, 255, 255, 0.3) !important' },
      },

      MuiDropzonePreviewList: {
        root: {
          flexDirection: 'row',
          justifyContent: 'center',
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: '#000',
        },
      },
    },
  });
};

export default purpleDarkTheme;
