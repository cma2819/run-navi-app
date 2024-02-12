import React from 'react';
import { renderApp } from './render';
import './styles';
import { Container } from '@mui/material';
import { AppList } from './components/apps/app-list';

const App = () => {
  return (
    <Container>
      <AppList />
    </Container>);
};

renderApp(<App />);