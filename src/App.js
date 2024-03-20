import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirecting
import 'react-toastify/dist/ReactToastify.css';
import Auth from './Components/Auth/Auth'
import Signup from './Components/Auth/Signup';
import Inventory from './Components/Inventory/index';
import Settings from './Components/Settings/Settings';
import { useState, useEffect } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const jwtToken = getCookie('jwt');
      setAuthenticated(jwtToken !== undefined);
    };

    checkAuthentication();
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={authenticated ? <Inventory /> : <Navigate to="/" />}
          />
          <Route
            path="/settings"
            element={authenticated ? <Settings /> : <Navigate to="/" />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
