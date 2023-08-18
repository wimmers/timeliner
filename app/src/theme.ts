import { PaletteMode } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default function getTheme(colorMode: PaletteMode) {
  const basePalette = {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    }
  };
  const options = colorMode === 'light' ? {
    palette: {
      ...basePalette,
      mode: colorMode
    }
  } : {
    palette: {
      mode: colorMode
    }
  }
  return createTheme(options);
}
