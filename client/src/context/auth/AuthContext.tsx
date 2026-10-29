import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AuthContext } from './authContextDef';
import { authApi } from '../../apis/authApi';
import type { User, LoginDTO, RegisterDTO, AuthContextType } from '../../types/auth.types';

const USER_STORAGE_KEY = 'recipe_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const openAuthModal = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setError(null);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setError(null);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authApi.getMe();
        setUser(currentUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthModalOpen(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Invalid email or password. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.register(data);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
      setUser(res.user);
      setIsAuthModalOpen(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please check your details.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch (err) {
      console.warn('Server logout error:', err);
    } finally {
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    openAuthModal,
    closeAuthModal,
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
