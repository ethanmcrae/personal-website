import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './style.css';

const App = () => {
  return (
    <HashRouter>
      <Routes>
          <Route path='/' element={<h1>Hello, World!</h1>} />
          <Route path='/*' element={<Navigate to='/' replace={true} />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
