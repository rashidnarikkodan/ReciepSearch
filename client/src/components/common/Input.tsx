import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  type = 'text',
  id,
  className = '',
  required,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const effectiveType = isPasswordField ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#737873] mb-1.5"
        >
          {label}
          {required && <span className="text-[#B42318] ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={effectiveType}
          required={required}
          className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border rounded-lg text-[#242824] placeholder-[#737873] text-sm transition-colors focus:outline-none focus:ring-1 ${
            isPasswordField ? 'pr-10' : ''
          } ${
            error
              ? 'border-[#FDA29B] focus:border-[#B42318] focus:ring-[#B42318]'
              : 'border-[#E3E6E0] focus:border-[#365B45] focus:ring-[#365B45]'
          } ${className}`}
          {...props}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737873] hover:text-[#242824] transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-[#B42318]">{error}</p>
      )}
    </div>
  );
}
