import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useAppSettings, useAppState } from "./AppState";
import LabelTextComponent from "./LabelTextComponent";
import Stack from "@mui/material/Stack";

export function GameSummary() {
  const dispatch: any = useDispatch();
  const state: any = useAppState();
  const settings: any = useAppSettings();

  const handleClickOpen = () => {
    dispatch({type: 'resetStats'});
    dispatch({type: 'changeDeck', deck: settings.deck});
  }

  return (<Box pl={1} mb={1}>
    <Typography variant="h5" color="textSecondary">
      Game Over!
    </Typography>
    <Stack direction='row' spacing={2} justifyContent='space-evenly' maxWidth={300}>
      <Stack>
        <LabelTextComponent label={"Correct"} text={state.right} />
        <LabelTextComponent
          label={"Longest streak"} text={state.longestStreak} />
      </Stack>
      <Stack>
      <LabelTextComponent
          label={"Previous best"} text={state.rightHighscore} />
        <LabelTextComponent
          label={"Previous best"} text={state.streakHighscore} />
      </Stack>
    </Stack>
    <Button variant="outlined" onClick={handleClickOpen} sx={{mt: 1}}>
      New Game!
    </Button>
  </Box>)
}