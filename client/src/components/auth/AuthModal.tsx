import { useAuth } from '../../hooks/useAuth';
import { Modal } from '../common/Modal';
import { Logo } from '../common/Logo';
import { AuthCard } from './AuthCard';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      title={<Logo size="sm" />}
      maxWidth="max-w-[440px]"
    >
      <div className="p-5">
        <AuthCard
          key={authModalMode}
          initialMode={authModalMode}
          onSuccess={closeAuthModal}
        />
      </div>
    </Modal>
  );
}
