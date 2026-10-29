import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from '../pages/AuthPage';
import { RecipePage } from '../pages/RecipePage';
import { RecipeDetailPage } from '../pages/RecipeDetailPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/recipes" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/recipes" element={<RecipePage />} />
      <Route path="/recipe" element={<Navigate to="/recipes" replace />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      <Route path="/recipe/:id" element={<RecipeDetailPage />} />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
