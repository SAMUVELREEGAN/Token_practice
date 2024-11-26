import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token)
        navigate('/landing')
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
