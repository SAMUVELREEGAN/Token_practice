import { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage setToken={setToken} />} />
          <Route path="/landing" element={token ? <LandingPage  setToken={setToken}/> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
