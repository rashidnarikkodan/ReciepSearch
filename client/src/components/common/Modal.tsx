import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-[440px]',
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative w-full ${maxWidth} rounded-md bg-[#FFFFFF] border border-[#E3E6E0] z-10 overflow-hidden shadow-sm`}
      >
        {title && (
          <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#EBECE8] bg-[#FFFFFF]">
            <div className="text-sm font-bold text-[#242824]">{title}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-6 h-6 rounded text-[#737873] hover:text-[#242824] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
