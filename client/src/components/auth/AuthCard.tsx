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
      {/* Tab Switcher */}
      <div className="grid grid-cols-2 p-1 mb-6 rounded-lg bg-[#FAFAF7] border border-[#E3E6E0]">
        <button
          type="button"
          onClick={() => setActiveTab('login')}
          className={`py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'login'
              ? 'bg-[#FFFFFF] text-[#242824] border border-[#E3E6E0]'
              : 'text-[#737873] hover:text-[#242824]'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('register')}
          className={`py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'register'
              ? 'bg-[#FFFFFF] text-[#242824] border border-[#E3E6E0]'
              : 'text-[#737873] hover:text-[#242824]'
          }`}
        >
          Create account
        </button>
      </div>

      {/* Form Content */}
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
