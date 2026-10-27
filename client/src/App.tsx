import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import { FavoritesProvider } from './context/favorites/FavoritesContext';
import { AppRoutes } from './routes/AppRoutes';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <AppRoutes />
          <AuthModal />
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}