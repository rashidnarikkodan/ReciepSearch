import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './common/Logo';
import { Button } from './common/Button';
import { UserProfileDropdown } from './profile/UserProfileDropdown';
import { UserProfileModal } from './profile/UserProfileModal';

export function Navbar() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E3E6E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="sm" asLink />

          {/* Auth Controls */}
          <div className="flex items-center gap-2.5">
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
                  Create account
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
