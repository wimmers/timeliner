import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Timeline from './Timeline';
import LabelTextComponent from './LabelTextComponent';
import StatsDisplay from './StatsDisplay';
import Settings from './Settings';
import { useAppState, useDispatch } from './AppState';
import { GameSummary } from './GameSummary';
import Prompt from './Prompt';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center"
      sx={{mt:2}}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/wimmers">
        Fuglerede
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function App() {
  const dispatch: any = useDispatch();
  const state: any = useAppState();
  const settings = state.settings;

  const onInsert = (index: number) => {
    const events = state.events;
    const newEvent = state.newEvent;
    const ts = newEvent.timestamp;
    const before = events[index]?.timestamp;
    const after = events[index+1]?.timestamp;
    if (!(before && before > ts) && !(after && after < ts)) {
      dispatch({type: 'insert', index});
      setTimeout(() => dispatch({type: "resetColor"}), settings.blinkTimeout);
    } else {
      dispatch({type: 'wrong', index});
      setTimeout(() => dispatch({type: "resetColor"}), settings.blinkTimeout);
    }
  };

  const {newEvent, events, right, wrong, streak, backgroundColor} = state;

  return (
    <Container maxWidth="sm">
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          mt={{xs: 0.5, sm: 1, md: 1.5, lg: 2}}
        >
          <Stack
            direction="row" justifyContent="flex-start" alignItems="baseline"
          >
            <Typography variant="h4" component="h1">
              Timeliner.AI
            </Typography>
            <Settings />
          </Stack>
          <StatsDisplay wrong={wrong} right={right} streak={streak} />
        </Stack>
        {state.gameOver ?
          <GameSummary /> :
          <>
            <Prompt newEvent={newEvent} />
            <Paper
              style={
                {maxHeight: 600, overflow: 'auto', backgroundColor}
              }
            >
              <Timeline events={events} onInsert={onInsert} />
            </Paper>
          </>
        }
        <Copyright/>
      </Box>
    </Container>
  );
}
