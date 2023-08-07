import * as React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import { useAppSettings, useUpdateSettings } from './AppState';
import { decks } from './Decks';
import Box from '@mui/material/Box';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [settings, setSettings] = React.useState(useAppSettings());
  const updateSettings = useUpdateSettings();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateSettings(settings);
    handleClose();
  };

  const handleDeckChange = (event: any) => {
    setSettings({...settings, deck: event.target.value});
  };

  const handleModeChange = (event: any) => {
    setSettings({...settings, mode: event.target.value});
  };

  const handlePromptChange = (event: any) => {
    setSettings({...settings, prompt: event.target.value});
  };

  return (
    <Box>
      <IconButton onClick={handleClickOpen} >
        <SettingsIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
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
        <DialogContent>
          <InputLabel id="select-mode-label">Mode</InputLabel>
            <Select
            labelId="select-mode-label"
            id="select-mode"
            value={settings.mode}
            label="Mode"
            onChange={handleModeChange}
            >
              <MenuItem value={"forever"} key={0}>
                Play forever
              </MenuItem>
              <MenuItem value={"three-lives"} key={1}>
                Survival (three lives)
              </MenuItem>
            </Select>
        </DialogContent>
        <DialogContent>
          <InputLabel id="select-prompt-label">Prompt</InputLabel>
            <Select
            labelId="select-prompt-label"
            id="select-prompt"
            value={settings.prompt}
            label="Prompt"
            onChange={handlePromptChange}
            >
              <MenuItem value={"text"} key={1}>
                Text
              </MenuItem>
              <MenuItem value={"image"} key={0}>
                Image (if available)
              </MenuItem>
              <MenuItem value={"both"} key={0}>
                Text and Image
              </MenuItem>
            </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}