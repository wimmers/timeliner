import React, {useState} from 'react';
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
import FileDialog from './FileDialog';
import { useAppSettings, useUpdateSettings } from './AppState';
import { pre_deck, event, decks, convert, convert_deck } from './Decks';
import Box from '@mui/material/Box';
import ColorModeSwitch from './ColorModeSwitch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const appSettings = useAppSettings();
  const [settings, setSettings] = useState(appSettings);
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

  const handleColorModeChange = (_: any, checked: boolean) => {
    const colorMode = checked ? 'dark' : 'light';
    setSettings({...settings, colorMode});
    updateSettings({...appSettings, colorMode});
  };

  const handleFileLoaded = (
    {data, name}: {data: pre_deck | event[], name: string}
  ) => {
    let deck;
    if ("name" in data) {
      deck = convert_deck(data);
    }
    else {
      deck = {name, events: convert(data)};
    }
    decks.push(deck);
    setSettings({...settings, deck});
  };

  const colorModeSwitch =
    <ColorModeSwitch
      onChange={handleColorModeChange}
      checked={settings.colorMode === 'dark'}
    />;

  return (
    <Box>
      <IconButton onClick={handleClickOpen} >
        <SettingsIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={colorModeSwitch}
            label={`Dark mode: ${settings.colorMode === 'dark' ? 'on' : 'off'}`}
          />
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
                decks.map((deck, index: number) =>
                  <MenuItem value={deck as unknown as string} key={index}>
                    {deck.name}
                  </MenuItem>
                )
              }
            </Select>
            <Box width={8} height={8}></Box>
            <Button variant="outlined" onClick={() => setOpenFileDialog(true)}>
              Load Deck From File
            </Button>
            <FileDialog
              open={openFileDialog}
              onClose={() => setOpenFileDialog(false)}
              onFileLoaded={handleFileLoaded}
            />
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