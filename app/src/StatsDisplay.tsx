import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useAppSettings } from './AppState';

export default function StatsDisplay(
  { wrong, right, streak }: { [_: string]: number }
) {
  const settings: any = useAppSettings();

  let wrongDisplay; // Display number of errors or remaining lives (hearts)
  if (settings.mode === 'forever') {
    wrongDisplay =
      <Typography
        component="span"
        color="textSecondary"
        sx={{ px: 1, backgroundColor: "red" }}
      >
        {wrong}
      </Typography>;
  } else {
    const numHearts = 3 - wrong;
    const hearts = [];
    for (let i = 0; i < numHearts; i++) {
      hearts.push(<Typography
        component="span"
        color="textSecondary"
        key={i}
      >
        ❤️
      </Typography>);
    }
    wrongDisplay =
      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
        {hearts}
      </Stack>;
  }

  return (
    <Stack
      direction={
        settings.mode === 'forever' ? 'row' : {xs: "column", sm: 'row'}
      }
      justifyContent="space-between"
      alignItems="center"
      spacing={settings.mode === 'forever' ? 1 : {xs: 0, sm: 1}}
    >
      {wrongDisplay}
      <Stack direction="row" justifyContent="flex-end">
        <Typography
          component="span"
          color="textSecondary"
          sx={{ px: 1, backgroundColor: "green" }}
        >
          {right}
        </Typography>
        <Typography
          component="span"
          color="textSecondary"
          sx={{ px: 1, backgroundColor: "pink" }}
        >
          {streak}
        </Typography>
      </Stack>
    </Stack>
  )
}