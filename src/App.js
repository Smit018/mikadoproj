// src/App.js

import React from 'react';
import { Container, Typography } from '@mui/material';
import AdvancedDataTable from './AdvancedDataTable';

const App = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Advanced Data Table
      </Typography>
      <AdvancedDataTable />
    </Container>
  );
};

export default App;
