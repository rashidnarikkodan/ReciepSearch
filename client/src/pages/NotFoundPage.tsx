import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#242824] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-[400px] w-full text-center p-6 sm:p-8 bg-[#FFFFFF] border border-[#E3E6E0] rounded-xl space-y-4">
        <div className="flex justify-center">
          <Logo size="md" asLink />
        </div>

        <div>
          <span className="text-3xl font-extrabold text-[#365B45]">404</span>
          <h1 className="text-lg font-bold text-[#242824] mt-2">
            Page not found
          </h1>
          <p className="text-sm text-[#737873] mt-1 leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2">
          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={() => navigate('/')}
          >
            Return to home
          </Button>
        </div>
      </div>
    </div>
  );
}
