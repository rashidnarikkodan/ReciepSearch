import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ onSwitchToRegister, onSuccess }: LoginFormProps) {
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      onSuccess?.();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setLocalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#242824] tracking-tight">Sign in</h2>
        <p className="text-sm text-[#737873] mt-1">
          Enter your email and password to access your account.
        </p>
      </div>

      {displayError && (
        <Alert variant="error" className="mb-4">
          {displayError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (localError) setLocalError(null);
          }}
          required
          placeholder="name@example.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (localError) setLocalError(null);
          }}
          required
          placeholder="••••••••"
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          className="mt-2"
        >
          Sign in
        </Button>
      </form>

      <div className="mt-5 text-center text-sm text-[#737873]">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#365B45] hover:underline font-semibold transition-colors cursor-pointer"
        >
          Create account
        </button>
      </div>
    </div>
  );
}
