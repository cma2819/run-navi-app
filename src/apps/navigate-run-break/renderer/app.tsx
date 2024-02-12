import { Box, Button, Card, CardContent, Grid, Typography, Stack, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BreakProgress } from './break-progress';
import { StateChip } from './state-chip';

export const NavigateRunBreakApp = () => {
  const [ running, setRunning ] = useState<number>(0);
  const [ breaking, setBreaking ] = useState<number>(0);
  const [ shouldBreak, setShouldBreak ] = useState<number>(0);
  const [ noticeThreshold, setNoticeThreshold ] = useState<number>(1);
  const [ isRunning, setIsRunning ] = useState<boolean>(false);

  useEffect(() => {
    window.navigateRunBreakApi.onUpdateMonitor((payload) => {
      setRunning(payload.running);
      setBreaking(payload.breaking);
      setShouldBreak(payload.shouldBreak);
      setNoticeThreshold(payload.threshold);
      setIsRunning(payload.isRunning);
    });
  }, []);

  const runningTimeLabel = `${Math.floor(running / 3600)}:${String(Math.floor((running % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(running % 60)).padStart(2, '0')}`;
  const breakingTimeLabel = `${Math.floor(breaking / 3600)}:${String(Math.floor((breaking % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(breaking % 60)).padStart(2, '0')}`;

  const resetMonitor = () => {
    window.navigateRunBreakApi.resetMonitor();
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant='body2'>
            計測時間 - { runningTimeLabel }
            </Typography>
            <Typography variant='body2'>
            休憩時間 - { breakingTimeLabel }
            </Typography>
          </Box>
          <Box>
            <StateChip state={isRunning ? 'Running' : 'Stopped'} />
          </Box>
          <BreakProgress shouldBeBreak={shouldBreak} threshold={noticeThreshold} />
          <Button variant='outlined' fullWidth onClick={resetMonitor}>リセット</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};