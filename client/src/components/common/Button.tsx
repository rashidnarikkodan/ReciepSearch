import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'py-1.5 px-3 text-xs rounded-md',
    md: 'py-2.5 px-4 text-sm rounded-lg',
  }[size];

  const variantStyles = {
    primary: 'bg-[#365B45] text-white hover:bg-[#2b4937]',
    secondary: 'bg-[#FAFAF7] text-[#242824] border border-[#E3E6E0] hover:bg-[#E3E6E0]',
    danger: 'bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA] hover:bg-[#FEE4E2]',
    ghost: 'text-[#737873] hover:text-[#242824] hover:bg-[#FAFAF7]',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
