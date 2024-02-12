import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { NavigateRunBreakApp } from '../../../apps/navigate-run-break/renderer/app';

export const AppList = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <NavigateRunBreakApp />
      </Grid>
    </Grid>
  );
};