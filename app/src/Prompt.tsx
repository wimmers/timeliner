import React from "react";
import Box from "@mui/material/Box";
import LabelTextComponent from "./LabelTextComponent";
import {event} from './Decks';
import { useAppSettings } from "./AppState";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Prompt({newEvent}: {newEvent: event}) {
  const settings: any = useAppSettings();
  if (settings.prompt == 'text' || !newEvent.thumbnailUrl) {
    return <Box>
      <LabelTextComponent label="Insert" text={newEvent.event} />
    </Box>;
  }
  else {
    return (
    <Stack direction='row' justifyContent='center'
      alignItems='center' sx={{mt: 2, mb: 1}}>
      <Typography component="span" color="textSecondary" sx={{mr: 1}}>
        Insert:
      </Typography>
      <img src={newEvent.thumbnailUrl} alt={newEvent.event}
        style={{maxHeight: 100}}
      />
    </Stack>);
  }
}