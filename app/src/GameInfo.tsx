import * as React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/InfoRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSettings, useDispatch, useUpdateSettings } from './AppState';
import { decks } from './Decks';
import Stack from '@mui/material/Stack';

export default function GameInfo({isOpen}: {isOpen?: boolean}) {
  const [open, setOpen] = React.useState(isOpen || false);
  const settings = useAppSettings();
  const updateSettings = useUpdateSettings();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({type: 'startGame'});
  };

  const handleDeckChange = (event: any) => {
    updateSettings({...settings, deck: event.target.value});
  };

  return (
    <Box>
      <IconButton onClick={handleClickOpen} >
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome!</DialogTitle>
        <DialogContent>
        <Stack spacing={1}>
        <DialogContentText>
          Insert the event at the top in the timeline below.
        </DialogContentText>
        <DialogContentText>
          Click any of the bars to insert.
        </DialogContentText>
        <DialogContentText>
          Finish the timeline to win the game!
        </DialogContentText>
        </Stack>
        </DialogContent>
        <DialogContent>
          <InputLabel id="select-deck-label">Deck</InputLabel>
            <Select
              labelId="select-deck-label"
              id="select-deck"
              value={settings.deck}
              label="Deck"
              onChange={handleDeckChange}
            >
              {
                decks.map(({name, value}, index: number) =>
                  <MenuItem value={value as unknown as string} key={index}>
                    {name}
                  </MenuItem>
                )
              }
            </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay, let's go!</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}