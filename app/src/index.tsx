import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { StateProvider } from './AppState';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  console.error("Could not retrieve DOM root... Exiting!");
}
else {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StateProvider>
        <App />
      </StateProvider>
    </ThemeProvider>,
  );
}
