
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {
  shouldBeBreak: number;
  threshold: number;
};

export const BreakProgress = (props: Props) => {
  const progressValue = Math.min(100, Math.floor((props.shouldBeBreak / props.threshold) * 100));
  const breakTimeLabel = `${Math.floor(props.shouldBeBreak / 3600)}:${String(Math.floor((props.shouldBeBreak % 3600) / 60)).padStart(2, '0')}:${String(props.shouldBeBreak % 60).padStart(2, '0')}`;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color={props.shouldBeBreak < props.threshold ? 'primary' : 'warning'} variant="determinate" value={progressValue} style={{
          height: 10,
        }} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{breakTimeLabel}</Typography>
      </Box>
    </Box>
  );
};
