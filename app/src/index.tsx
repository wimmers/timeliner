import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import getTheme from './theme';
import { StateProvider, useAppSettings } from './AppState';

function Main() {
  const settings = useAppSettings();

  const theme = React.useMemo(
    () => getTheme(settings.colorMode),
    [settings.colorMode],
  );

  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StateProvider>
  );
}

const rootElement = document.getElementById('root');

if (rootElement === null) {
  console.error("Could not retrieve DOM root... Exiting!");
}
else {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
      <Main/>
  );
}
