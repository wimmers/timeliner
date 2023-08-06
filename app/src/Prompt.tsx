import React from "react";
import Box from "@mui/material/Box";
import LabelTextComponent from "./LabelTextComponent";
import {event} from './Decks';
import { useAppSettings } from "./AppState";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Prompt({newEvent}: {newEvent: event | undefined}) {
  if (!newEvent) {
    return <></>;
  }
  const settings = useAppSettings();
  const labelComponent =
    <LabelTextComponent label="Insert" text={newEvent.event} />;
  const imgComponent =
    <img src={newEvent.thumbnailUrl} alt={newEvent.event}
      style={{maxHeight: 100}}
    />;
  if (settings.prompt === 'text' || !newEvent.thumbnailUrl) {
    return <Box>{labelComponent}</Box>;
  }
  else if (settings.prompt === 'both') {
    return (
      <Stack direction='column' justifyContent='center'
        alignItems='center' sx={{mb: 1}}>
        {labelComponent}
        {imgComponent}
      </Stack>);
  }
  else {
    return (
    <Stack direction='row' justifyContent='center'
      alignItems='center' sx={{mt: 2, mb: 1}}>
      <Typography component="span" color="textSecondary" sx={{mr: 1}}>
        Insert:
      </Typography>
      {imgComponent}
    </Stack>);
  }
}