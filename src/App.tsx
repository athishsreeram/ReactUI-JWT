import * as React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [authCallValue, setAuthCallValue] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://welcome-yehr.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=your_username&password=password',
      });

      const { token } = await response.json();
      setToken(token);
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const handleAuthorizedRequest = async () => {
    try {
      const response = await fetch('https://welcome-yehr.onrender.com/auth', {
        headers: {
          Authorization: token,
        },
      });

      const data = await response.text();
      const message = data || '';
      setAuthCallValue(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>React Flask API Demo</h1>
      {loggedIn ? (
        <div>
          <p>You are logged in.</p>
          <p>The token value is: {token}</p>
          <button onClick={handleAuthorizedRequest}>
            Make Authorized Request
          </button>

          <p>The Auth Call value is: {authCallValue}</p>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
