import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthPage } from '../pages/AuthPage';
import { RecipePage } from '../pages/RecipePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

import { LoadingScreen } from '../components/common/LoadingScreen';

function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/recipe" replace />;
  }

  return <Navigate to="/auth" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect: inspects authentication and routes to /recipe or /auth */}
      <Route path="/" element={<RootRedirect />} />

      {/* Auth page */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected recipe destination */}
      <Route
        path="/recipe"
        element={
          <ProtectedRoute>
            <RecipePage />
          </ProtectedRoute>
        }
      />
      <Route path="/recipes" element={<Navigate to="/recipe" replace />} />

      {/* 404 Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
