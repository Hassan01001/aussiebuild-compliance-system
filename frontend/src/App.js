import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import './styles/global.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f1f2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f59e0b',
        fontSize: '14px',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        Loading AussieBuild...
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={() => {}} />;
  }

  return <Dashboard />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;