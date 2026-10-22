import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserProfileDropdownProps {
  onOpenProfileModal: () => void;
}

export function UserProfileDropdown({ onOpenProfileModal }: UserProfileDropdownProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-md bg-[#FFFFFF] hover:bg-[#FAFAF7] border border-[#E3E6E0] transition-colors cursor-pointer"
      >
        <div className="w-5 h-5 rounded-full bg-[#365B45] flex items-center justify-center text-white font-medium text-[10px]">
          {initials}
        </div>

        <span className="text-xs font-medium text-[#242824] hidden sm:inline-block">
          {user.name}
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#737873] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-md bg-[#FFFFFF] border border-[#E3E6E0] p-1 z-50">
          <div className="px-2.5 py-2 border-b border-[#E3E6E0]">
            <div className="text-xs font-semibold text-[#242824] truncate">{user.name}</div>
            <div className="text-[11px] text-[#737873] truncate">{user.email}</div>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenProfileModal();
              }}
              className="w-full text-left px-2.5 py-1.5 text-xs text-[#242824] hover:bg-[#FAFAF7] rounded transition-colors cursor-pointer"
            >
              Account details
            </button>

            <button
              type="button"
              onClick={async () => {
                setIsOpen(false);
                await logout();
              }}
              className="w-full text-left px-2.5 py-1.5 text-xs text-[#B42318] hover:bg-[#FEF3F2] rounded transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Sign out</span>
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
