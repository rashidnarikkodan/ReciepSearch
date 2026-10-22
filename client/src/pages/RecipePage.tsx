import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/common/Button';
import { useState } from 'react';
import { UserProfileModal } from '../components/profile/UserProfileModal';

export function RecipePage() {
  const { user, logout } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#242824] flex flex-col font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E3E6E0] rounded-xl p-6 sm:p-8 space-y-4">
          <div className="border-b border-[#E3E6E0] pb-4">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FAFAF7] border border-[#E3E6E0] text-[#365B45]">
              Session Active
            </span>
            <h1 className="text-xl font-bold text-[#242824] mt-2">
              Welcome, {user?.name}
            </h1>
            <p className="text-sm text-[#737873] mt-1">
              Signed in as {user?.email} &bull; Role: {user?.role}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FAFAF7] border border-[#E3E6E0] text-sm text-[#737873] leading-relaxed">
            Authentication successfully verified. The complete recipe search and personal cookbook directory will be mounted on this route in the recipe search branch.
          </div>

          <div className="pt-2 flex gap-2.5">
            <Button
              variant="secondary"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex-1"
            >
              Account details
            </Button>
            <Button
              variant="danger"
              onClick={logout}
            >
              Sign out
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E3E6E0] bg-[#FFFFFF] py-3 text-center text-xs text-[#737873]">
        RecipeSearch &bull; Recipe Route
      </footer>

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}
