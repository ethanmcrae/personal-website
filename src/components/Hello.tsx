import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import hello from '../cells/hello';

const Hello = (): JSX.Element => {
  useEffect(() => {
    hello();
  }, []);
  return (
    <Box
      component="section"
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Container sx={{
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <Box>
          <Typography id='hello'>
            Hello, I'm <span id='ethan'>Ethan McRae</span>.
            <br></br>
            I'm a full-stack web developer.
          </Typography>
        </Box>
      </Container>
      <Box
        component="canvas"
        id="hello-canvas"
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0
        }}
      />
    </Box>
  )
};

export default Hello;
