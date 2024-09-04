import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersTable from './Components/UsersTable';
import UserDetail from './Components/UserDetail'; 
import Home from './Components/Home'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
