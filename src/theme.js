import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, pink, red, green} from '@material-ui/core/colors';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#b3e5fc',
      main: lightBlue[500],
      dark: '#0277bd',
      contrastText: '#fff',
    },
    secondary: pink,
    error: red,
    success: green,
    gradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  overrides: {
    MuiTypography: {
      headline: {
        fontWeight: 300
      },
      subheading: {
        fontWeight: 300
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    }

  },
});

export default muiTheme;