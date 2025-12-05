import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useWebSocketStore } from './store/websocketStore';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PathPage from './pages/PathPage';
import LessonPage from './pages/LessonPage';
import TeamPage from './pages/TeamPage';
import LeaderboardPage from './pages/LeaderboardPage';
import MissionsPage from './pages/MissionsPage';
import StorePage from './pages/StorePage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { token, fetchMe } = useAuthStore();
  const { connect } = useWebSocketStore();

  useEffect(() => {
    if (token) {
      fetchMe().catch(() => {});
      connect();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
        
        <Route path="/" element={token ? <MainLayout /> : <Navigate to="/login" />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="path" element={<PathPage />} />
          <Route path="lesson/:lessonId" element={<LessonPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="missions" element={<MissionsPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
