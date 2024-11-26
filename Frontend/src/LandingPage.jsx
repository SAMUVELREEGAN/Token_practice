import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/', { replace: true })
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Landing Page</h1>
      <button onClick={logout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
};

export default LandingPage;
