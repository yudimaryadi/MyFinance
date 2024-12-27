import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import TransactionReport from './components/TransactionReport';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* {session && (
          <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex space-x-4">
              <Link to="/" className="text-white hover:text-gray-300">Dashboard</Link>
              <Link to="/report" className="text-white hover:text-gray-300">Report</Link>
            </div>
          </nav>
        )} */}
        <Routes>
          <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
          <Route
            path="/"
            element={
              <PrivateRoute session={session}>
                <Dashboard session={session} />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute session={session}>
                <Dashboard session={session} reportMode={true} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;