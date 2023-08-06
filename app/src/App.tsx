import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Timeline from './Timeline';
import StatsDisplay from './StatsDisplay';
import Settings from './Settings';
import { useAppState, useDispatch,
  findPlacementIndex, isCorrectlyPlaced } from './AppState';
import { GameSummary } from './GameSummary';
import Prompt from './Prompt';
import {event} from './Decks';


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
  const dispatch = useDispatch();
  const state = useAppState();
  const settings = state.settings;

  const onInsert = (index: number) => {
    const events = state.events;
    const newEvent = state.newEvent as event;

    if (isCorrectlyPlaced(events, newEvent, index)) {
      dispatch({type: 'insert', index});
      setTimeout(() => dispatch({type: "resetColor"}), settings.blinkTimeout);
    } else {
      const placementIndex = findPlacementIndex(state);
      dispatch({type: 'insert', index: placementIndex,
        event: {...newEvent, misplaced: true}});
      dispatch({type: 'wrong'});
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
        <>
          {state.gameOver ? <GameSummary /> : <Prompt newEvent={newEvent} /> }
          <Paper
            style={
              {maxHeight: 600, overflow: 'auto', backgroundColor}
            }
          >
            <Timeline events={events}
              onInsert={state.gameOver ? undefined : onInsert}
            />
          </Paper>
        </>
        <Copyright/>
      </Box>
    </Container>
  );
}
