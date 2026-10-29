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
        <div className="w-full px-3.5 sm:px-6 lg:px-8 h-13 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 sm:gap-8">
            <Logo size="sm" asLink />

            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/recipes"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isExploreActive && !isFavoritesActive
                    ? 'text-[#242824] font-semibold bg-[#F0F2ED]'
                    : 'text-[#737873] hover:text-[#242824] hover:bg-[#F7F8F5]'
                }`}
              >
                Explore
              </Link>

              <Link
                to="/favorites"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isFavoritesActive
                    ? 'text-[#242824] font-semibold bg-[#F0F2ED]'
                    : 'text-[#737873] hover:text-[#242824] hover:bg-[#F7F8F5]'
                }`}
              >
                <span>Favorites</span>
                {isAuthenticated && favoritesCount > 0 && (
                  <span className="text-[10px] font-semibold text-[#365B45] bg-[#365B45]/10 px-1.5 py-0.5 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <UserProfileDropdown onOpenProfileModal={() => setIsProfileModalOpen(true)} />
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuthModal('login')}
                >
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openAuthModal('register')}
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
