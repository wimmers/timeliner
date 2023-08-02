import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useAppSettings, useAppState } from "./AppState";
import LabelTextComponent from "./LabelTextComponent";

export function GameSummary() {
  const dispatch: any = useDispatch();
  const state: any = useAppState();
  const settings: any = useAppSettings();

  const handleClickOpen = () => {
    dispatch({type: 'resetStats'});
    dispatch({type: 'changeDeck', deck: settings.deck});
  }

  return (<>
    <Typography variant="h5" color="textSecondary">
      Game Summary
    </Typography>
    <Box sx={{pl: 1}}>
      <LabelTextComponent label={"Correct"} text={state.right} />
      <LabelTextComponent
        label={"Previous correct highscore"} text={state.rightHighscore} />
      <LabelTextComponent label={"Longest streak"} text={state.longestStreak} />
      <LabelTextComponent
        label={"Previous streak highscore"} text={state.streakHighscore} />
    </Box>
    <Button variant="outlined" onClick={handleClickOpen} sx={{ml: 0.5, mt: 1}}>
      New Game!
    </Button>
  </>)
}