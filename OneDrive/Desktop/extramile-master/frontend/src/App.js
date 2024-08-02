import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  return (
    <Router>
      <nav>
        <ul>
            <li>
                <Link to="/admin">Admin Dashboard</Link>
            </li>
            <li>
                <Link to="/employee">Employee Dashboard</Link>
            </li>
        </ul>
    </nav>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
