import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screen/Home/Home';
import Navbar from './screen/Navbar/Navbar';
import InfoPage from './screen/Info/InfoPage';
import ScanPage from './screen/ScanPage/ScanPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/scan" exact element={<ScanPage />} />
        </Routes>
        <Routes>
          <Route path="/info" exact element={<InfoPage />} />
        </Routes>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
