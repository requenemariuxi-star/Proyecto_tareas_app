import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

import LoginPage      from '../pages/LoginPage/LoginPage';
import DashboardPage  from '../pages/DashboardPage/DashboardPage';
import SubjectsPage   from '../pages/SubjectsPage/SubjectsPage';
import CalendarPage   from '../pages/CalendarPage/CalendarPage';
import NotificationsPage from '../pages/NotificationsPage/NotificationsPage';
import TaskListPage   from '../pages/TaskListPage/TaskListPage';

function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/subjects" element={<PrivateRoute><SubjectsPage /></PrivateRoute>} />
        <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><TaskListPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
