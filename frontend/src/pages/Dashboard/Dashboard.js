import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleLabel = () => {
    const roles = {
      manager: 'Project Manager',
      supervisor: 'Site Supervisor',
      worker: 'Construction Worker'
    };
    return roles[user?.role] || user?.role;
  };

  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">AB</div>
          <div>
            <div className="logo-text">AussieBuild</div>
            <div className="logo-sub">v1.0.0 — NSW</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Main</div>
          <div className="nav-item active">
            <span className="nav-icon">⊞</span>
            Dashboard
          </div>
          <div className="nav-item nav-disabled">
            <span className="nav-icon">📋</span>
            Compliance Reports
            <span className="nav-coming">Soon</span>
          </div>
          <div className="nav-item nav-disabled">
            <span className="nav-icon">📦</span>
            Asset Tracking
            <span className="nav-coming">Soon</span>
          </div>
          {user?.role === 'manager' && (
            <>
              <div className="nav-label" style={{ marginTop: '8px' }}>Management</div>
              <div className="nav-item nav-disabled">
                <span className="nav-icon">👥</span>
                User Management
                <span className="nav-coming">Soon</span>
              </div>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-pill">
            <div className="user-avatar">{user?.avatar}</div>
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{getRoleLabel()}</div>
            </div>
            <button className="logout-btn" onClick={logout} title="Sign out">✕</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-breadcrumb">
            AussieBuild / <span>Dashboard</span>
          </div>
          <div className="topbar-right">
            <div className="site-badge">{user?.siteName}</div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">
              {getGreeting()}, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="page-sub">
              {new Date().toLocaleDateString('en-AU', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} — {user?.siteName}
            </p>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Compliance Rate</div>
              <div className="stat-value">—</div>
              <div className="stat-tag tag-blue">Coming in Sprint 3</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Open Incidents</div>
              <div className="stat-value">—</div>
              <div className="stat-tag tag-blue">Coming in Sprint 2</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Assets Tracked</div>
              <div className="stat-value">—</div>
              <div className="stat-tag tag-blue">Coming in Sprint 4</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Reports This Week</div>
              <div className="stat-value">—</div>
              <div className="stat-tag tag-blue">Coming in Sprint 2</div>
            </div>
          </div>

          {/* WELCOME CARD */}
          <div className="welcome-card">
            <div className="welcome-icon">🏗️</div>
            <div className="welcome-content">
              <h2 className="welcome-title">
                AussieBuild System is live
              </h2>
              <p className="welcome-text">
                You are logged in as <strong>{getRoleLabel()}</strong> at <strong>{user?.siteName}</strong>. 
                The compliance reporting and asset tracking modules are currently under development 
                and will be available in the upcoming sprints.
              </p>
            </div>
          </div>

          {/* ROLE INFO */}
          <div className="role-card">
            <div className="role-card-header">Your access level</div>
            <div className="role-card-body">
              {user?.role === 'manager' && (
                <p>As a <strong>Project Manager</strong> you will have access to all 5 NSW sites, full compliance reports, asset register, and user management.</p>
              )}
              {user?.role === 'supervisor' && (
                <p>As a <strong>Site Supervisor</strong> you will have access to your site's compliance reports, asset tracking, and incident reporting.</p>
              )}
              {user?.role === 'worker' && (
                <p>As a <strong>Construction Worker</strong> you will have access to incident reporting and equipment check-in/check-out.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;