import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SwimmersPage from './pages/SwimmersPage';
import TeamsPage from './pages/TeamsPage';
import TrainingsPage from './pages/TrainingsPage';
import ProfilePage from './pages/ProfilePage';
import CompetitionPage from './pages/CompetitionPage';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import SwimmerForm from './components/swimmers/SwimmerForm';
import TrainingForm from './components/trainings/TrainingForm';
import TeamForm from './components/teams/TeamForm';
import CompetitionForm from './components/competitions/CompetitionForm';
import CompetitionDetails from './components/competitions/CompetitionDetails';

// Protected Route
const ProtectedRoute = ({ children, roles = [] }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles.length > 0 && !roles.includes(currentUser.role)) return <Navigate to="/dashboard" replace />;

  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div style={{ display: 'flex' }}>
          <Navigation />
          <main className="main-content" style={{ flex: 1 }}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Authenticated routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />

              {/* Swimmers */}
              <Route path="/swimmers" element={
                <ProtectedRoute roles={['ADMIN', 'COACH', 'SWIMMER']}>
                  <SwimmersPage />
                </ProtectedRoute>
              } />
              <Route path="/swimmers/new" element={
                <ProtectedRoute roles={['ADMIN', 'COACH']}>
                  <SwimmerForm />
                </ProtectedRoute>
              } />
              <Route path="/swimmers/:id/edit" element={
                <ProtectedRoute roles={['ADMIN', 'COACH']}>
                  <SwimmerForm />
                </ProtectedRoute>
              } />

              {/* Teams */}
              <Route path="/teams" element={
                <ProtectedRoute roles={['ADMIN', 'COACH']}>
                  <TeamsPage />
                </ProtectedRoute>
              } />
              <Route path="/teams/new" element={
                <ProtectedRoute roles={['ADMIN', 'COACH']}>
                  <TeamForm />
                </ProtectedRoute>
              } />
              <Route path="/teams/:id/edit" element={
                <ProtectedRoute roles={['ADMIN', 'COACH']}>
                  <TeamForm />
                </ProtectedRoute>
              } />

              {/* Trainings */}
              <Route path="/trainings" element={
                <ProtectedRoute roles={['ADMIN', 'COACH', 'SWIMMER']}>
                  <TrainingsPage />
                </ProtectedRoute>
              } />
              <Route path="/trainings/new" element={
                <ProtectedRoute roles={['ADMIN', 'COACH']}>
                  <TrainingForm />
                </ProtectedRoute>
              } />
              <Route path="/trainings/:id/edit" element={
                <ProtectedRoute roles={['ADMIN', 'COACH']}>
                  <TrainingForm />
                </ProtectedRoute>
              } />

              {/* Competitions */}
              <Route path="/competitions" element={
                <ProtectedRoute roles={['ADMIN', 'COACH', 'SWIMMER']}>
                  <CompetitionPage />
                </ProtectedRoute>
              } />
              <Route path="/competitions/new" element={
                <ProtectedRoute roles={['ADMIN']}>
                  <CompetitionForm />
                </ProtectedRoute>
              } />
              <Route path="/competitions/:id/edit" element={
                <ProtectedRoute roles={['ADMIN']}>
                  <CompetitionForm />
                </ProtectedRoute>
              } />
              <Route path="/competitions/:id" element={
                <ProtectedRoute roles={['ADMIN', 'COACH', 'SWIMMER']}>
                  <CompetitionDetails />
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
