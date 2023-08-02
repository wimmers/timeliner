import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LabelTextComponent (
  { label, text }: {[_: string]: string | number}
) {

  return (
    <Box sx={{my: 1}}>
      <Typography component="span" color="textSecondary" sx={{mr: 1}}>
        {label}:
      </Typography>
      <Typography component="span">
        {text}
      </Typography>
    </Box>
  );
};