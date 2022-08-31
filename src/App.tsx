import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';

const App = () => {
  return (
    <HashRouter>
      {/* <NavBar /> */}
      <Routes>
          <Route path='/' element={<Homepage />} />
          {/* <Route path='/*' element={<Navigate to='/' replace={true} />} /> */}
      </Routes>
    </HashRouter>
  )
}

export default App;
