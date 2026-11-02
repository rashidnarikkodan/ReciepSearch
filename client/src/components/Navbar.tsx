import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { Logo } from './common/Logo';
import { Button } from './common/Button';
import { UserProfileDropdown } from './profile/UserProfileDropdown';
import { UserProfileModal } from './profile/UserProfileModal';

export function Navbar() {
  const location = useLocation();
  const { isAuthenticated, openAuthModal } = useAuth();
  const { favoritesCount } = useFavorites();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const isExploreActive =
    location.pathname === '/' ||
    location.pathname.startsWith('/recipe');
  const isFavoritesActive = location.pathname.startsWith('/favorites');

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#EBECE8]">
        <div className="w-full px-3 sm:px-6 lg:px-8 h-13 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Logo size="sm" asLink />
          </div>

          <nav className="flex items-center justify-center gap-4 sm:gap-8 shrink-0">
            <Link
              to="/recipes"
              className={`group relative py-1.5 text-xs sm:text-sm transition-colors ${
                isExploreActive && !isFavoritesActive
                  ? 'text-[#242824] font-semibold'
                  : 'text-[#737873] hover:text-[#242824] font-medium'
              }`}
            >
              <span>Explore</span>
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-[2px] bg-[#365B45] rounded-full transition-all duration-300 ease-out ${
                  isExploreActive && !isFavoritesActive
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>

            <Link
              to="/favorites"
              className={`group relative py-1.5 text-xs sm:text-sm transition-colors flex items-center gap-1 sm:gap-1.5 ${
                isFavoritesActive
                  ? 'text-[#242824] font-semibold'
                  : 'text-[#737873] hover:text-[#242824] font-medium'
              }`}
            >
              <span>Favorites</span>
              {isAuthenticated && favoritesCount > 0 && (
                <span className="text-[10px] font-semibold text-[#365B45] bg-[#365B45]/10 px-1.5 py-0.2 rounded-full">
                  {favoritesCount}
                </span>
              )}
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-[2px] bg-[#365B45] rounded-full transition-all duration-300 ease-out ${
                  isFavoritesActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </nav>

          <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2">
            {isAuthenticated ? (
              <UserProfileDropdown onOpenProfileModal={() => setIsProfileModalOpen(true)} />
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuthModal('login')}
                  className="px-2 sm:px-3 text-xs"
                >
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openAuthModal('register')}
                  className="px-2.5 sm:px-3 text-xs"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
