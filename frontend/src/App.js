import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import LoginForm from './components/LoginForm';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = (email) => {
        // Perform login logic here
        // For example, you can make an API call to authenticate the user
        // and set the loggedInUser state with the user object
        setLoggedInUser({ email });
    };
    return (
      <Router>
          <nav>
              <Link to="/admin">Admin</Link> <span />
              <Link to="/employee">Employee</Link>
          </nav>
          <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route 
                  path="/employee" 
                  element={loggedInUser ? <EmployeeDashboard user={loggedInUser} /> : <LoginForm onLogin={handleLogin} />} 
              />
          </Routes>
      </Router>
  );
}

export default App;