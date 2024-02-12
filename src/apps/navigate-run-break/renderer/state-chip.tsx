import React from 'react';
import Chip from '@mui/material/Chip';
import ChairIcon from '@mui/icons-material/Chair';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export const StateChip = ({state}: { state: 'Running' | 'Stopped' }) => {
  return <>
    { state === 'Running' && (<Chip color='primary' icon={<DirectionsRunIcon />} label='計測中' />) }
    { state === 'Stopped' && (<Chip color='success' icon={<ChairIcon />} label='休憩中' />) }
  </>;
};