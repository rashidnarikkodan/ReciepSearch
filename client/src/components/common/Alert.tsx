import type { ReactNode } from 'react';

export type AlertVariant = 'error' | 'success' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
}

export function Alert({ variant = 'error', children, className = '' }: AlertProps) {
  if (!children) return null;

  const variantStyles = {
    error: 'border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]',
    success: 'border-[#D1FADF] bg-[#ECFDF3] text-[#027A48]',
    info: 'border-[#E3E6E0] bg-[#FAFAF7] text-[#242824]',
  }[variant];

  return (
    <div
      role="alert"
      className={`p-3 rounded-lg border text-sm leading-relaxed ${variantStyles} ${className}`}
    >
      {children}
    </div>
  );
}
