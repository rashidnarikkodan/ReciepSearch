import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm({ onSwitchToLogin, onSuccess }: RegisterFormProps) {
  const { register, error, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!name.trim() || name.trim().length < 2) {
      setLocalError('Name must be at least 2 characters long.');
      return;
    }

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      onSuccess?.();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setLocalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-[#242824] tracking-tight">Create an account</h2>
        <p className="text-sm text-[#737873] mt-1">
          Register with your details to access the platform.
        </p>
      </div>

      {displayError && (
        <Alert variant="error" className="mb-4">
          {displayError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (localError) setLocalError(null);
          }}
          required
          placeholder="Jane Doe"
        />

        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (localError) setLocalError(null);
          }}
          required
          placeholder="jane@example.com"
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
          placeholder="Min. 6 characters"
        />

        <Input
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (localError) setLocalError(null);
          }}
          required
          placeholder="Repeat password"
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          className="mt-2"
        >
          Create account
        </Button>
      </form>

      <div className="mt-5 text-center text-sm text-[#737873]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#365B45] hover:underline font-semibold transition-colors cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
