import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../components/common/Logo';
import { AuthCard } from '../components/auth/AuthCard';

export function AuthPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/recipes" replace />;
  }

  const handleSuccess = () => {
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#242824] flex flex-col font-sans">
      <header className="w-full bg-[#FFFFFF] border-b border-[#E3E6E0] py-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="md" asLink />
          <span className="text-xs text-[#737873] font-medium">Authentication</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-[440px] rounded-lg bg-[#FFFFFF] border border-[#E3E6E0] p-6 sm:p-8">
          <AuthCard initialMode="login" onSuccess={handleSuccess} />
        </div>
      </main>

      <footer className="border-t border-[#E3E6E0] bg-[#FFFFFF] py-3 text-center text-xs text-[#737873]">
        RecipeSearch &bull; Secure Authentication
      </footer>
    </div>
  );
}
