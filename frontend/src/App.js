import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/admin" component={<AdminDashboard />} />
        <Route exact path="/employee" component={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
