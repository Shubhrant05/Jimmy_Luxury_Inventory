import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './Components/Auth/Auth'
import Signup from './Components/Auth/Signup';
import Inventory from './Components/Inventory/index';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Inventory/>} />
          <Route path="/settings" element={<h1>SETTINGS</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
