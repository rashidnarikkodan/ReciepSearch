import { useAuth } from '../../hooks/useAuth';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Account details"
      maxWidth="max-w-md"
    >
      <div className="p-6 space-y-4 bg-[#FFFFFF]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#365B45] flex items-center justify-center text-white text-sm font-bold">
            {initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-[#242824]">{user.name}</div>
            <div className="text-xs text-[#737873] mt-0.5">{user.email}</div>
          </div>
        </div>

        <div className="rounded-lg bg-[#FAFAF7] border border-[#E3E6E0] divide-y divide-[#E3E6E0] text-sm">
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#737873]">Account Role</span>
            <span className="text-[#242824] font-medium capitalize">{user.role}</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#737873]">Member Since</span>
            <span className="text-[#242824]">{joinDate}</span>
          </div>
        </div>

        <div className="flex gap-2.5 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={async () => {
              onClose();
              await logout();
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </Modal>
  );
}
