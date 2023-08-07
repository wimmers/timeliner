import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import DialogContentText from '@mui/material/DialogContentText';
import minimal from './minimal.json';

interface FileDialogProps {
  open: boolean;
  onClose: () => void;
  onFileLoaded: (data: any) => void;
}

const jsonStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  // whiteSpace: 'pre-wrap',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f7f7f7',
  maxHeight: '300px',
  maxWidth: '450px',
  overflow: 'auto',
};

const FileDialog: React.FC<FileDialogProps> = (
  { open, onClose, onFileLoaded }
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleLoadFile = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        try {
          const jsonData = JSON.parse(result as string);
          onFileLoaded({data: jsonData, name: selectedFile.name});
          setError(null);
          onClose();
        } catch (error) {
          setError((error as Error).message);
        }
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {error && <Alert severity="error">{error}</Alert>}
      <DialogTitle>Load JSON File</DialogTitle>
      <DialogContent>
        <input type="file" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLoadFile} color="primary">
          Load
        </Button>
      </DialogActions>
      <DialogContent>
        <DialogContentText>
          Example
        </DialogContentText>
        <pre style={jsonStyle}>
          {JSON.stringify(minimal, null, 2)}
        </pre>
      </DialogContent>
    </Dialog>
  );
};

export default FileDialog;
