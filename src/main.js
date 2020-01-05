import Game from 'Game';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';

const defaultTheme = {
  palette: {
    primary: {
    },
    secondary: {
    },
  },
};

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(defaultTheme)}>
    <CssBaseline />
    <Game />
  </MuiThemeProvider>,
  document.getElementById('dice')
);
