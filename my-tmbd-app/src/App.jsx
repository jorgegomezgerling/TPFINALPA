// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Aquí irán otras rutas, por ejemplo, para ver detalles de una película */}
      </Routes>
    </Router>
  );
}

export default App;
