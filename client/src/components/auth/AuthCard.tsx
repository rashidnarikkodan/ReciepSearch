import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export type AuthMode = 'login' | 'register';

interface AuthCardProps {
  initialMode?: AuthMode;
  onSuccess?: () => void;
  className?: string;
}

export function AuthCard({
  initialMode = 'login',
  onSuccess,
  className = '',
}: AuthCardProps) {
  const [activeTab, setActiveTab] = useState<AuthMode>(initialMode);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-[#EBECE8] mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('login')}
          className={`pb-2 px-3 text-xs font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'login'
              ? 'text-[#242824] font-semibold border-[#365B45]'
              : 'text-[#737873] border-transparent hover:text-[#242824]'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('register')}
          className={`pb-2 px-3 text-xs font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'register'
              ? 'text-[#242824] font-semibold border-[#365B45]'
              : 'text-[#737873] border-transparent hover:text-[#242824]'
          }`}
        >
          Create account
        </button>
      </div>

      {activeTab === 'login' ? (
        <LoginForm
          onSwitchToRegister={() => setActiveTab('register')}
          onSuccess={onSuccess}
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() => setActiveTab('login')}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}
