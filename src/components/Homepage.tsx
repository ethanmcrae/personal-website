import React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Hello from './Hello';

const Homepage = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main">
        <Hello />
        {/* I got interested in programming when... (Minecraft) */}
        {/* Narrow in on technologies with links to projects */}
        {/* Conclude with contact info / social media */}
      </Box>
    </ThemeProvider>
  )
};

export default Homepage;
